// frontend/src/school/components/lesson-plan/DailyLessonPlan.jsx

import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Typography, Select, MenuItem, TextField, Button, Box, FormControl, InputLabel, Grid
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { baseUrl } from '../../../environment';

// Helper to create the initial 5 empty sections
const createInitialSections = () => Array(5).fill({
  classId: '',
  subjectId: '',
  lesson: '',
  teachingAids: '',
  topicPresentation: '',
  assignments: '',
});

const DailyLessonPlan = () => {
  // State for dropdown data
  const [teachers, setTeachers] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  
  // State for the form
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [planDate, setPlanDate] = useState(moment().format('YYYY-MM-DD'));
  const [planSections, setPlanSections] = useState(createInitialSections());
  
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data for dropdowns on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teacherRes, classRes, subjectRes] = await Promise.all([
          axios.get(`${baseUrl}/teacher/fetch-with-query`),
          axios.get(`${baseUrl}/class/fetch-all`),
          axios.get(`${baseUrl}/subject/fetch-all`),
        ]);
        setTeachers(teacherRes.data.data);
        setAllClasses(classRes.data.data);
        setSubjects(subjectRes.data.data);
        // Optional: auto-select the first teacher
        if (teacherRes.data.data.length > 0) {
            setSelectedTeacher(teacherRes.data.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching initial data", error);
      }
    };
    fetchData();
  }, []);

  // Fetch existing lesson plan when teacher or date changes
  useEffect(() => {
    if (!selectedTeacher || !planDate) return;

    const fetchPlan = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/lesson-plans/${selectedTeacher}/${planDate}`);
        if (res.data && res.data.planSections) {
            // Fill up the array to 5 if the saved plan has fewer sections
            const fetchedSections = res.data.planSections;
            const fullSections = [...fetchedSections, ...Array(5 - fetchedSections.length).fill(createInitialSections()[0])];
            setPlanSections(fullSections);
        } else {
          setPlanSections(createInitialSections());
        }
      } catch (error) {
        console.error("Error fetching lesson plan", error);
        setPlanSections(createInitialSections());
      }
    };
    fetchPlan();
  }, [selectedTeacher, planDate]);

  const handleSectionChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSections = [...planSections];
    updatedSections[index] = { ...updatedSections[index], [name]: value };
    setPlanSections(updatedSections);
  };

  const handleSavePlan = async () => {
    if (!selectedTeacher) {
        alert("Please select a teacher.");
        return;
    }
    setIsSaving(true);
    try {
        const payload = {
            teacherId: selectedTeacher,
            date: planDate,
            planSections: planSections,
        };
        await axios.post(`${baseUrl}/api/lesson-plans`, payload);
        alert("Lesson plan saved successfully!");
    } catch (error) {
        console.error("Error saving lesson plan", error);
        alert("Failed to save lesson plan.");
    } finally {
        setIsSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const teacherName = teachers.find(t => t._id === selectedTeacher)?.name || 'N/A';

    // Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Daily Lesson Plan', 105, 15, { align: 'center' });

    // Top-level Info
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name of the teacher: ${teacherName}`, 14, 25);
    doc.text(`Date: ${moment(planDate).format('MMMM Do, YYYY')}`, 140, 25);
    
    let startY = 35; // Initial Y position for the first section

    planSections.forEach((section, index) => {
        if (index > 0) doc.line(14, startY - 5, 196, startY - 5); // Separator line
        
        const className = allClasses.find(c => c._id === section.classId)?.class_text || '__________';
        const subjectName = subjects.find(s => s._id === section.subjectId)?.subject_name || '__________';
        
        // Use autoTable for a structured layout that provides ample space
        autoTable(doc, {
            startY: startY,
            theme: 'plain',
            styles: { fontSize: 9, cellPadding: 1.5 },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
            body: [
                [`Section ${index + 1}`],
                ['Class / Subject:', `${className} / ${subjectName}`],
                ['Lesson:', section.lesson],
                ['Teaching aids to be used:', section.teachingAids],
                ['Topic Presentation / Objectives:', section.topicPresentation],
                ['Assignments / Class works:', section.assignments],
            ],
            // This hook gives cells a minimum height, creating the "space to write"
            didParseCell: function (data) {
                if(data.row.index > 0) { // Don't apply to the header row
                    data.cell.styles.minCellHeight = 20; 
                }
                if(data.row.index === 0) { // Style the "Section X" header
                    data.cell.styles.fontStyle = 'bold';
                    data.cell.styles.fillColor = '#f0f0f0';
                }
            }
        });
        startY = doc.lastAutoTable.finalY + 10; // Update Y for the next section
        
        if (startY > 260 && index < planSections.length - 1) { // Check for page break
            doc.addPage();
            startY = 15;
        }
    });

    doc.save(`Lesson_Plan_${teacherName}_${planDate}.pdf`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">Daily Lesson Plan</Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Name of the teacher</InputLabel>
              <Select value={selectedTeacher} label="Name of the teacher" onChange={(e) => setSelectedTeacher(e.target.value)}>
                {teachers.map(t => <MenuItem key={t._id} value={t._id}>{t.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              label="Date"
              fullWidth
              value={planDate}
              onChange={(e) => setPlanDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {planSections.map((section, index) => (
          <Box key={index} sx={{ border: '1px solid #ddd', p: 2, mb: 3, borderRadius: '4px' }}>
            <Typography variant="h6" gutterBottom>Section {index + 1}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select name="classId" value={section.classId} label="Class" onChange={(e) => handleSectionChange(index, e)}>
                    {allClasses.map(c => <MenuItem key={c._id} value={c._id}>{c.class_text}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                 <FormControl fullWidth>
                  <InputLabel>Subject</InputLabel>
                  <Select name="subjectId" value={section.subjectId} label="Subject" onChange={(e) => handleSectionChange(index, e)}>
                    {subjects.map(s => <MenuItem key={s._id} value={s._id}>{s.subject_name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField name="lesson" label="Lesson" fullWidth value={section.lesson} onChange={(e) => handleSectionChange(index, e)} />
              </Grid>
              <Grid item xs={12}>
                <TextField name="teachingAids" label="Teaching aids to be used in the class" multiline rows={2} fullWidth value={section.teachingAids} onChange={(e) => handleSectionChange(index, e)} />
              </Grid>
              <Grid item xs={12}>
                <TextField name="topicPresentation" label="Topic Presentation / Teaching points and objectives" multiline rows={4} fullWidth value={section.topicPresentation} onChange={(e) => handleSectionChange(index, e)} />
              </Grid>
              <Grid item xs={12}>
                <TextField name="assignments" label="Assignments / Class works" multiline rows={2} fullWidth value={section.assignments} onChange={(e) => handleSectionChange(index, e)} />
              </Grid>
            </Grid>
          </Box>
        ))}
        
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSavePlan} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Plan'}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDownloadPDF}>
                Download as PDF
            </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DailyLessonPlan;