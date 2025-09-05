// /* eslint-disable react/prop-types */
// import React, { useState, useEffect } from 'react';
// import { Container, Button, Select, MenuItem, InputLabel, FormControl, TextField, Typography } from '@mui/material';
// import axios from 'axios';
// import { baseUrl } from '../../../environment';

// const periods = [
//   { id: 1, label: 'Period 1 (10:00 AM - 11:00 AM)', startTime: '10:00', endTime: '11:00' },
//   { id: 2, label: 'Period 2 (11:00 AM - 12:00 PM)', startTime: '11:00', endTime: '12:00' },
//   { id: 3, label: 'Period 3 (12:00 PM - 1:00 PM)', startTime: '12:00', endTime: '13:00' },
//   { id: 4, label: 'Lunch Break (1:00 PM - 2:00 PM)', startTime: '13:00', endTime: '14:00' }, // break
//   { id: 5, label: 'Period 4 (2:00 PM - 3:00 PM)', startTime: '14:00', endTime: '15:00' },
//   { id: 6, label: 'Period 5 (3:00 PM - 4:00 PM)', startTime: '15:00', endTime: '16:00' },
// ];

// const AssignPeriod2 = ({classId,isEdit, periodId, close}) => {
//   const [teachers, setTeachers] = useState([]);
// //   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [teacher, setTeacher] = useState('');
//   const [subject, setSubject] = useState('');
// //   const [classId, setClassId] = useState('');
//   const [selectedPeriod, setSelectedPeriod] = useState(null);
//   const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  
//   const [message, setMessage] = useState("");
//   const [type,  setType] = useState("success")

//   useEffect(() => {
//     // Fetch teachers, classes, and subjects
//     const fetchData = async () => {
//       const teacherResponse = await axios.get(`${baseUrl}/teacher/fetch-with-query`, { params: {} });
//       const classResponse = await axios.get(`${baseUrl}/class/fetch-all`);
//       const subjectResponse = await axios.get(`${baseUrl}/subject/fetch-all`, { params: {} });
//       setSubjects(subjectResponse.data.data);
//       setTeachers(teacherResponse.data.data);
//     //   setClasses(classResponse.data.data);
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedPeriod) {
//       alert('Please select a period');
//       return;
//     }

    

//     try {
//       await axios.post(`${baseUrl}/period/create`, {
//         teacher,
//         subject,
//         classId,
//         startTime:date+" "+selectedPeriod.startTime,
//         endTime:date+" "+ selectedPeriod.endTime,
//       });
//       alert('Period assigned successfully');
//       setMessage("Perid assigned Successfully.");
//       close()
//     } catch (error) {
//       console.error('Error assigning period:', error);
//       setMessage("Error in Assigning.")
//     }
//   };

//   const handleUpdateEvent = async () => {
//     try {
//       await axios.put(`${baseUrl}/period/update/${periodId}`, {
//         teacher,
//         subject,
//         classId,
//         startTime:date+" "+selectedPeriod.startTime,
//         endTime:date+" "+ selectedPeriod.endTime,
//       });
//       alert('Period updated successfully');
//       setMessage('Period updated successfully');
//       close()
//     } catch (error) {
//       console.error('Error updating period:', error);
//       setMessage("Period update Error.")
//     }
//   };

//   const handleDeleteEvent = async () => {
//     try {
//       await axios.delete(`${baseUrl}/period/delete/${periodId}`);
//       alert('Period deleted successfully');
//       setMessage("Period deleted successfully.")
//       close()
//     } catch (error) {
//       console.error('Error deleting period:', error);
//       setMessage("Error in period delete.")
//     }
//   };

//   // Fetch the period details if editing
//   const fetchPeriodsWithId = async (periodId) => {
//     try {
//       const response = await axios.get(`${baseUrl}/period/${periodId}`);
//       const periodData = response.data.period;
//       const startTime  = new Date(periodData.startTime).getHours();
//     //   console.log(new Date(periodData.startTime),"periodic data")
//       setTeacher(periodData.teacher._id);
//       setSubject(periodData.subject._id);
//       setSelectedPeriod(periods.find(p => p.startTime === `${startTime}:00`)); // match by startTime
//       setDate(periodData.startTime.substring(0, 10)); // date part of startTime
//     } catch (error) {
//       console.error('Error fetching period details:', error);
//     }
//   };

//   useEffect(() => {
//     if (isEdit && periodId) {
//       fetchPeriodsWithId(periodId);
//     }

//   }, [isEdit, periodId,message]);



//   return (
//     <Container>
//       <h2>Assign Period to Teacher</h2>
//       <form onSubmit={handleSubmit}>
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Teacher</InputLabel>
//           <Select label={"Teacher"} value={teacher} onChange={(e) => setTeacher(e.target.value)} required>
//             {teachers.map((teacher) => (
//               <MenuItem key={teacher._id} value={teacher._id}>{teacher.name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Subject</InputLabel>
//           <Select label={"Subject"} value={subject} onChange={(e) => setSubject(e.target.value)} required>
//             {subjects.map((sbj) => (
//               <MenuItem key={sbj._id} value={sbj._id}>{sbj.subject_name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>


//         {/* Select predefined periods */}
     
//           <FormControl fullWidth margin="normal">
//           <InputLabel>Select Period</InputLabel>
//           <Select value={selectedPeriod?selectedPeriod.id:""}
//           label="Select Period"
//            onChange={(e) => setSelectedPeriod(periods.find(p => p.id === e.target.value))}
//            disabled={isEdit?true:false}
//             required>
//             {periods.map((period) => (
//               <MenuItem key={period.id} value={period.id}>
//                 {period.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
        
      

//         <TextField
//           label="Date"
//           type="date"
//           fullWidth
//           // InputLabelProps={{ shrink: true }}
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           disabled={isEdit?true:false}
//           required
//         />

       
//         {isEdit?<>
//             <Button onClick={handleDeleteEvent} color="secondary">
//             Delete
//           </Button>
//           <Button onClick={handleUpdateEvent} color="primary">
//             Update
//           </Button>
//           </>:
//            <Button type="submit" variant="contained" color="primary">
//            Assign Period
//          </Button>
//          }
//       </form>
//     </Container>
//   );
// };

// export default AssignPeriod2;


/* eslint-disable react/prop-types */
// import React, { useState, useEffect } from 'react';
// import { Container, Button, Select, MenuItem, InputLabel, FormControl, TextField, Typography } from '@mui/material';
// import axios from 'axios';
// import { baseUrl } from '../../../environment';

// const periods = [
//   { id: 1, label: 'Period 1 (10:00 AM - 11:00 AM)', startTime: '10:00', endTime: '11:00' },
//   { id: 2, label: 'Period 2 (11:00 AM - 12:00 PM)', startTime: '11:00', endTime: '12:00' },
//   { id: 3, label: 'Period 3 (12:00 PM - 1:00 PM)', startTime: '12:00', endTime: '13:00' },
//   { id: 4, label: 'Lunch Break (1:00 PM - 2:00 PM)', startTime: '13:00', endTime: '14:00' }, // break
//   { id: 5, label: 'Period 4 (2:00 PM - 3:00 PM)', startTime: '14:00', endTime: '15:00' },
//   { id: 6, label: 'Period 5 (3:00 PM - 4:00 PM)', startTime: '15:00', endTime: '16:00' },
// ];

// const AssignPeriod2 = ({classId, isEdit, periodId, close}) => {
//   const [teachers, setTeachers] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [teacher, setTeacher] = useState('');
//   const [subject, setSubject] = useState('');
//   const [selectedPeriod, setSelectedPeriod] = useState(null);
//   // FIX 1: Initialize date correctly for the text field
//   const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Fetch teachers and subjects
//     const fetchData = async () => {
//       try {
//         const teacherResponse = await axios.get(`${baseUrl}/teacher/fetch-with-query`, { params: {} });
//         const subjectResponse = await axios.get(`${baseUrl}/subject/fetch-all`, { params: {} });
//         setSubjects(subjectResponse.data.data);
//         setTeachers(teacherResponse.data.data);
//       } catch (error) {
//         console.error("Error fetching initial data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedPeriod) {
//       alert('Please select a period');
//       return;
//     }

//     // FIX 2: Create robust ISO date strings for the backend
//     const payload = {
//       teacher,
//       subject,
//       classId,
//       // This creates a full, proper date object that Mongoose can handle perfectly.
//       startTime: new Date(`${date}T${selectedPeriod.startTime}:00`),
//       endTime: new Date(`${date}T${selectedPeriod.endTime}:00`),
//     };

//     try {
//       // The URL construction here looks correct.
//       await axios.post(`${baseUrl}/period/create`, payload);
//       alert('Period assigned successfully');
//       close();
//     } catch (error) {
//       console.error('Error assigning period:', error);
//       // Provide more useful error feedback to the user
//       const errorMsg = error.response?.data?.msg || "An unexpected error occurred.";
//       setMessage(`Error in Assigning: ${errorMsg}`);
//     }
//   };

//   const handleUpdateEvent = async () => {
//     if (!selectedPeriod) {
//       alert('Please select a period');
//       return;
//     }

//     // FIX 2 (Applied here as well): Create robust ISO date strings
//     const payload = {
//         teacher,
//         subject,
//         classId,
//         startTime: new Date(`${date}T${selectedPeriod.startTime}:00`),
//         endTime: new Date(`${date}T${selectedPeriod.endTime}:00`),
//     };

//     try {
//       await axios.put(`${baseUrl}/period/update/${periodId}`, payload);
//       alert('Period updated successfully');
//       close();
//     } catch (error) {
//       console.error('Error updating period:', error);
//       const errorMsg = error.response?.data?.msg || "An unexpected error occurred.";
//       setMessage(`Period update Error: ${errorMsg}`);
//     }
//   };

//   const handleDeleteEvent = async () => {
//     try {
//       await axios.delete(`${baseUrl}/period/delete/${periodId}`);
//       alert('Period deleted successfully');
//       close();
//     } catch (error) {
//       console.error('Error deleting period:', error);
//       const errorMsg = error.response?.data?.msg || "An unexpected error occurred.";
//       setMessage(`Error in period delete: ${errorMsg}`);
//     }
//   };

//   // Fetch the period details if editing
//   const fetchPeriodsWithId = async (periodId) => {
//     try {
//       const response = await axios.get(`${baseUrl}/period/${periodId}`);
//       const periodData = response.data.period;
//       const startTime  = new Date(periodData.startTime);
      
//       setTeacher(periodData.teacher._id);
//       setSubject(periodData.subject._id);
      
//       // Pad the hour with a leading zero if needed (e.g., 9 -> 09)
//       const startHour = startTime.getHours().toString().padStart(2, '0');
//       setSelectedPeriod(periods.find(p => p.startTime === `${startHour}:00`));

//       // Set the date field correctly from the fetched data
//       setDate(periodData.startTime.substring(0, 10));
//     } catch (error) {
//       console.error('Error fetching period details:', error);
//     }
//   };

//   useEffect(() => {
//     if (isEdit && periodId) {
//       fetchPeriodsWithId(periodId);
//     }
//   }, [isEdit, periodId]); // Removed 'message' from dependencies to avoid re-fetching on error

//   return (
//     <Container>
//       {/* Displaying the error message if there is one */}
//       {message && <Typography color="error" style={{ marginBottom: '10px' }}>{message}</Typography>}

//       <h2>{isEdit ? 'Edit Period' : 'Assign Period to Teacher'}</h2>
//       <form onSubmit={handleSubmit}>
//         {/* ... The rest of your form JSX (Selects, TextFields) remains the same ... */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Teacher</InputLabel>
//           <Select label={"Teacher"} value={teacher} onChange={(e) => setTeacher(e.target.value)} required>
//             {teachers.map((teacher) => (
//               <MenuItem key={teacher._id} value={teacher._id}>{teacher.name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Subject</InputLabel>
//           <Select label={"Subject"} value={subject} onChange={(e) => setSubject(e.target.value)} required>
//             {subjects.map((sbj) => (
//               <MenuItem key={sbj._id} value={sbj._id}>{sbj.subject_name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Select Period</InputLabel>
//           <Select 
//            value={selectedPeriod ? selectedPeriod.id : ""}
//            label="Select Period"
//            onChange={(e) => setSelectedPeriod(periods.find(p => p.id === e.target.value))}
//            disabled={isEdit ? true : false}
//             required>
//             {periods.map((period) => (
//               <MenuItem key={period.id} value={period.id}>
//                 {period.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
        
//         <TextField
//           label="Date"
//           type="date"
//           fullWidth
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           disabled={isEdit ? true : false}
//           required
//           // This ensures the label doesn't overlap the date value
//           InputLabelProps={{ shrink: true }}
//         />
       
//         {isEdit ? (
//           <div style={{ marginTop: '20px' }}>
//             <Button onClick={handleDeleteEvent} color="secondary" variant="outlined" style={{ marginRight: '10px' }}>
//               Delete
//             </Button>
//             <Button onClick={handleUpdateEvent} variant="contained" color="primary">
//               Update
//             </Button>
//           </div>
//         ) : (
//            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
//              Assign Period
//            </Button>
//          )}
//       </form>
//     </Container>
//   );
// };

// export default AssignPeriod2;



/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Container, Button, Select, MenuItem, InputLabel, FormControl, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../environment';

const periods = [
  { id: 1, label: 'Period 1 (10:00 AM - 11:00 AM)', startTime: '10:00', endTime: '11:00' },
  { id: 2, label: 'Period 2 (11:00 AM - 12:00 PM)', startTime: '11:00', endTime: '12:00' },
  { id: 3, label: 'Period 3 (12:00 PM - 1:00 PM)', startTime: '12:00', endTime: '13:00' },
  { id: 4, label: 'Lunch Break (1:00 PM - 2:00 PM)', startTime: '13:00', endTime: '14:00' }, // break
  { id: 5, label: 'Period 4 (2:00 PM - 3:00 PM)', startTime: '14:00', endTime: '15:00' },
  { id: 6, label: 'Period 5 (3:00 PM - 4:00 PM)', startTime: '15:00', endTime: '16:00' },
];

const AssignPeriod2 = ({classId, isEdit, periodId, close}) => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teacher, setTeacher] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  
  // --- 1. ADD NEW STATE FOR THE DROPDOWN ---
  const [workType, setWorkType] = useState('');
  // ------------------------------------------

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch teachers and subjects
    const fetchData = async () => {
      try {
        const teacherResponse = await axios.get(`${baseUrl}/teacher/fetch-with-query`, { params: {} });
        const subjectResponse = await axios.get(`${baseUrl}/subject/fetch-all`, { params: {} });
        setSubjects(subjectResponse.data.data);
        setTeachers(teacherResponse.data.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPeriod || !workType) { // Add validation
      alert('Please fill out all fields, including Work Type.');
      return;
    }

    const payload = {
      teacher,
      subject,
      classId,
      startTime: new Date(`${date}T${selectedPeriod.startTime}:00`),
      endTime: new Date(`${date}T${selectedPeriod.endTime}:00`),
      workType, // --- 2. ADD workType TO THE PAYLOAD ---
    };

    console.log("Submitting this payload:", payload);

    try {
      await axios.post(`${baseUrl}/period/create`, payload);
      alert('Period assigned successfully');
      close();
    } catch (error) {
      console.error('Error assigning period:', error);
      const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
      setMessage(`Error in Assigning: ${errorMsg}`);
    }
  };

  const handleUpdateEvent = async () => {
    if (!selectedPeriod || !workType) { // Add validation
        alert('Please fill out all fields, including Work Type.');
        return;
    }
    
    // Your backend controller for update only needs teacher, subject, and workType
    const payload = {
        teacher,
        subject,
        workType, // --- 2. ADD workType TO THE PAYLOAD ---
    };

    try {
      await axios.put(`${baseUrl}/period/update/${periodId}`, payload);
      alert('Period updated successfully');
      close();
    } catch (error) {
      console.error('Error updating period:', error);
      const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
      setMessage(`Period update Error: ${errorMsg}`);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`${baseUrl}/period/delete/${periodId}`);
      alert('Period deleted successfully');
      close();
    } catch (error) {
      console.error('Error deleting period:', error);
      const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
      setMessage(`Error in period delete: ${errorMsg}`);
    }
  };

  const fetchPeriodsWithId = async (periodId) => {
    try {
      const response = await axios.get(`${baseUrl}/period/${periodId}`);
      const periodData = response.data.period;
      const startTime  = new Date(periodData.startTime);
      
      setTeacher(periodData.teacher._id);
      setSubject(periodData.subject._id);
      
      // --- 3. SET workType STATE WHEN EDITING ---
      setWorkType(periodData.workType || ''); // Use fallback for older records
      
      const startHour = startTime.getHours().toString().padStart(2, '0');
      setSelectedPeriod(periods.find(p => p.startTime === `${startHour}:00`));
      setDate(periodData.startTime.substring(0, 10));
    } catch (error) {
      console.error('Error fetching period details:', error);
    }
  };

  useEffect(() => {
    if (isEdit && periodId) {
      fetchPeriodsWithId(periodId);
    }
  }, [isEdit, periodId]);

  return (
    <Container>
      {message && <Typography color="error" style={{ marginBottom: '10px' }}>{message}</Typography>}

      <h2>{isEdit ? 'Edit Period' : 'Assign Period to Teacher'}</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Teacher</InputLabel>
          <Select label={"Teacher"} value={teacher} onChange={(e) => setTeacher(e.target.value)} required>
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>{teacher.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Subject</InputLabel>
          <Select label={"Subject"} value={subject} onChange={(e) => setSubject(e.target.value)} required>
            {subjects.map((sbj) => (
              <MenuItem key={sbj._id} value={sbj._id}>{sbj.subject_name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* --- 4. ADD THE NEW DROPDOWN --- */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Work Type</InputLabel>
          <Select
            label="Work Type"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
          >
            <MenuItem value="T.B">T.B</MenuItem>
            <MenuItem value="C.W">C.W</MenuItem>
            <MenuItem value="T.B+C.W">T.B+C.W</MenuItem>
          </Select>
        </FormControl>
        {/* ---------------------------------- */}

        <FormControl fullWidth margin="normal">
          <InputLabel>Select Period</InputLabel>
          <Select 
           value={selectedPeriod ? selectedPeriod.id : ""}
           label="Select Period"
           onChange={(e) => setSelectedPeriod(periods.find(p => p.id === e.target.value))}
           disabled={isEdit ? true : false}
            required>
            {periods.map((period) => (
              <MenuItem key={period.id} value={period.id}>
                {period.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isEdit ? true : false}
          required
          InputLabelProps={{ shrink: true }}
        />
       
        {isEdit ? (
          <div style={{ marginTop: '20px' }}>
            <Button onClick={handleDeleteEvent} color="secondary" variant="outlined" style={{ marginRight: '10px' }}>
              Delete
            </Button>
            <Button onClick={handleUpdateEvent} variant="contained" color="primary">
              Update
            </Button>
          </div>
        ) : (
           <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
             Assign Period
           </Button>
         )}
      </form>
    </Container>
  );
};

export default AssignPeriod2;