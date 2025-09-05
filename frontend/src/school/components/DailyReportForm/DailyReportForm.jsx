// // src/components/DailyReportForm.jsx

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from '@mui/material';
// import moment from 'moment';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import axios from 'axios';
// import { baseUrl } from '../../environment'; // Make sure this path is correct

// // Helper to create 8 initial rows
// const createInitialRows = () => {
//   const periodLabels = [
//     'Period 1', 'Period 2', 'Period 3', 'Lunch Break',
//     'Period 4', 'Period 5', 'Period 6', 'Period 7' // Assuming 8 slots
//   ];
//   return periodLabels.map(pds => ({
//     pds,
//     subject: '',
//     activitiesDone: '',
//     assignments: '',
//   }));
// };

// const DailyReportForm = ({ selectedClass, allClasses }) => {
//   const [reportDate, setReportDate] = useState(new Date());
//   const [reportData, setReportData] = useState(createInitialRows());

//   const selectedClassName =
//     allClasses.find((c) => c._id === selectedClass)?.class_text || 'N/A';
  
//   // --- Placeholder for backend integration ---
//   // When the component mounts or selectedClass/reportDate changes,
//   // try to fetch existing data for that day.
//   useEffect(() => {
//     const fetchReport = async () => {
//       if (!selectedClass) return;
//       try {
//         // YOU WILL NEED TO CREATE THIS BACKEND ENDPOINT
//         const formattedDate = moment(reportDate).format('YYYY-MM-DD');
//         const res = await axios.get(`${baseUrl}/daily-report/${selectedClass}/${formattedDate}`);
//         if (res.data) {
//           setReportData(res.data.reportData); // Load data from DB
//         } else {
//           setReportData(createInitialRows()); // Reset to empty form
//         }
//       } catch (error) {
//         console.log('No report found for this date, starting a new one.');
//         setReportData(createInitialRows()); // Reset to empty form on error (e.g., 404)
//       }
//     };

//     fetchReport();
//   }, [selectedClass, reportDate]);


//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedData = [...reportData];
//     updatedData[index][name] = value;
//     setReportData(updatedData);
//   };

//   const handleSaveReport = async () => {
//     // --- Placeholder for backend integration ---
//     try {
//         // YOU WILL NEED TO CREATE THIS BACKEND ENDPOINT (e.g., a POST or PUT request)
//         const payload = {
//             classId: selectedClass,
//             date: moment(reportDate).format('YYYY-MM-DD'),
//             reportData: reportData,
//         };
//         // await axios.post(`${baseUrl}/daily-report`, payload);
//         alert('Report saved successfully! (Frontend Only)'); // Replace with actual API call
//     } catch (error) {
//         console.error('Failed to save report', error);
//         alert('Failed to save report.');
//     }
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();

//     // 1. Header
//     doc.setFontSize(18);
//     doc.setFont('helvetica', 'bold');
//     doc.text('New Public English School', 105, 20, { align: 'center' });

//     // 2. Sub-header and Details
//     doc.setFontSize(14);
//     doc.setFont('helvetica', 'normal');
//     doc.text('Daily Report', 105, 30, { align: 'center' });

//     doc.setFontSize(10);
//     doc.text(`Date: ${moment(reportDate).format('MMMM Do, YYYY')}`, 15, 40);
//     doc.text(`Day: ${moment(reportDate).format('dddd')}`, 85, 40);
//     doc.text(`Class: ${selectedClassName}`, 150, 40);

//     // 3. Table
//     const tableColumn = ['Pds', 'Subject', 'Activities Done', 'Assignments'];
//     const tableRows = [];

//     reportData.forEach(row => {
//       const rowData = [
//         row.pds,
//         row.subject,
//         row.activitiesDone,
//         row.assignments,
//       ];
//       tableRows.push(rowData);
//     });

//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 50, // Y position to start the table
//       theme: 'grid',
//       headStyles: { fillColor: [22, 160, 133] }, // Header color
//     });

//     // 4. Save the PDF
//     doc.save(`Daily_Report_${selectedClassName}_${moment(reportDate).format('YYYY-MM-DD')}.pdf`);
//   };

//   return (
//     <Paper sx={{ padding: '20px', marginTop: '20px' }}>
//       <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
//         <Typography variant="h4">New Public English School</Typography>
//         <Typography variant="h6">Daily Report</Typography>
//       </Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//         <Typography><b>Date:</b> {moment(reportDate).format('MMMM Do, YYYY')}</Typography>
//         <Typography><b>Day:</b> {moment(reportDate).format('dddd')}</Typography>
//         <Typography><b>Class:</b> {selectedClassName}</Typography>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//               <TableCell>Pds</TableCell>
//               <TableCell>Subject</TableCell>
//               <TableCell>Activities Done</TableCell>
//               <TableCell>Assignments</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {reportData.map((row, index) => (
//               <TableRow key={index}>
//                 <TableCell>{row.pds}</TableCell>
//                 <TableCell>
//                   <TextField
//                     name="subject"
//                     variant="standard"
//                     fullWidth
//                     value={row.subject}
//                     onChange={(e) => handleInputChange(index, e)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     name="activitiesDone"
//                     variant="standard"
//                     fullWidth
//                     value={row.activitiesDone}
//                     onChange={(e) => handleInputChange(index, e)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     name="assignments"
//                     variant="standard"
//                     fullWidth
//                     value={row.assignments}
//                     onChange={(e) => handleInputChange(index, e)}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box sx={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
//          <Button variant="contained" color="secondary" onClick={handleSaveReport}>
//           Save Report
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
//           Download as PDF
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default DailyReportForm;


// src/components/DailyReportForm.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import moment from 'moment';
import jsPDF from 'jspdf';
//import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
//import { baseUrl } from '../../environment'; // Make sure this path is correct
import { baseUrl } from "../../../environment";
// Helper to create 8 initial rows
const createInitialRows = () => {
  const periodLabels = [
    'Period 1', 'Period 2', 'Period 3', 'Lunch Break',
    'Period 4', 'Period 5', 'Period 6', 'Period 7' // Assuming 8 slots
  ];
  return periodLabels.map(pds => ({
    pds,
    subject: '',
    activitiesDone: '',
    assignments: '',
  }));
};

const DailyReportForm = ({ selectedClass, allClasses }) => {
  const [reportDate, setReportDate] = useState(new Date());
  const [reportData, setReportData] = useState(createInitialRows());
  const [isSaving, setIsSaving] = useState(false); // UPDATED: Add a saving state

  const selectedClassName =
    allClasses.find((c) => c._id === selectedClass)?.class_text || 'N/A';
  
  // --- UPDATED: This now connects to your real backend ---
  useEffect(() => {
    const fetchReport = async () => {
      if (!selectedClass) return;
      try {
        const formattedDate = moment(reportDate).format('YYYY-MM-DD');
        // UPDATED: Corrected the API endpoint
        const res = await axios.get(`${baseUrl}/daily-reports/${selectedClass}/${formattedDate}`);
        
        // The backend returns null if no report is found
        if (res.data && res.data.reportData && res.data.reportData.length > 0) {
          setReportData(res.data.reportData); // Load data from DB
        } else {
          setReportData(createInitialRows()); // Reset to empty form if no report exists
        }
      } catch (error) {
        console.error('Error fetching daily report:', error);
        setReportData(createInitialRows()); // Reset to empty form on error
      }
    };

    fetchReport();
  }, [selectedClass, reportDate]);


  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedData = [...reportData];
    updatedData[index][name] = value;
    setReportData(updatedData);
  };

  // --- UPDATED: This now connects to your real backend ---
  const handleSaveReport = async () => {
    if (!selectedClass) {
        alert('Please select a class before saving.');
        return;
    }
    setIsSaving(true);
    try {
        const payload = {
            classId: selectedClass,
            date: moment(reportDate).format('YYYY-MM-DD'),
            reportData: reportData,
        };
        // UPDATED: Corrected API endpoint and made the actual POST request
        await axios.post(`${baseUrl}/api/daily-reports`, payload);
        alert('Report saved successfully!');
    } catch (error) {
        console.error('Failed to save report', error);
        alert('Failed to save report. Please try again.');
    } finally {
        setIsSaving(false); // Ensure the button is re-enabled even if there's an error
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // 1. Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('New Public English School', 105, 20, { align: 'center' });

    // 2. Sub-header and Details
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Daily Report', 105, 30, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Date: ${moment(reportDate).format('MMMM Do, YYYY')}`, 15, 40);
    doc.text(`Day: ${moment(reportDate).format('dddd')}`, 85, 40);
    doc.text(`Class: ${selectedClassName}`, 150, 40);

    // 3. Table
    const tableColumn = ['Pds', 'Subject', 'Activities Done', 'Assignments'];
    const tableRows = [];

    reportData.forEach(row => {
      const rowData = [
        row.pds,
        row.subject,
        row.activitiesDone,
        row.assignments,
      ];
      tableRows.push(rowData);
    });

    // doc.autoTable({
    //   head: [tableColumn],
    //   body: tableRows,
    //   startY: 50,
    //   theme: 'grid',
    //   headStyles: { fillColor: [22, 160, 133] },
    // });

    // CORRECT (pass the 'doc' object as the first argument)
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
    });

    // 4. Save the PDF
    doc.save(`Daily_Report_${selectedClassName}_${moment(reportDate).format('YYYY-MM-DD')}.pdf`);
  };

  return (
    <Paper sx={{ padding: '20px', marginTop: '20px' }}>
      <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <Typography variant="h4">New Public English School</Typography>
        <Typography variant="h6">Daily Report</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography><b>Date:</b> {moment(reportDate).format('MMMM Do, YYYY')}</Typography>
        <Typography><b>Day:</b> {moment(reportDate).format('dddd')}</Typography>
        <Typography><b>Class:</b> {selectedClassName}</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Pds</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Activities Done</TableCell>
              <TableCell>Assignments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.pds}</TableCell>
                <TableCell>
                  <TextField
                    name="subject"
                    variant="standard"
                    fullWidth
                    value={row.subject}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="activitiesDone"
                    variant="standard"
                    fullWidth
                    value={row.activitiesDone}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="assignments"
                    variant="standard"
                    fullWidth
                    value={row.assignments}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
         {/* UPDATED: Button now reflects saving state */}
         <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleSaveReport}
            disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Report'}
        </Button>
        <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
          Download as PDF
        </Button>
      </Box>
    </Paper>
  );
};

export default DailyReportForm;
