// // /* eslint-disable react/prop-types */
// // import React, { useState, useEffect } from 'react';
// // import { Calendar, momentLocalizer } from 'react-big-calendar';
// // import moment from 'moment';
// // import 'react-big-calendar/lib/css/react-big-calendar.css';
// // import axios from 'axios';
// // import { baseUrl } from '../../../environment';
// // import {
// //   FormControl,
// //   InputLabel,
// //   MenuItem,
// //   Paper,
// //   Select,
// //   Button,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   TextField,
// //   Container,
// //   Typography,
// // } from '@mui/material';
// // import AssignPeriod2 from '../../../school/components/assign period/AssignPeriod2';

// // const localizer = momentLocalizer(moment);
// // const eventStyleGetter = (event, start, end, isSelected) => {
// //   const style = {
// //     backgroundColor: event.bgColor || '#3174ad',
// //     color: 'white',
// //     borderRadius: '4px',
// //     padding: '5px',
// //     border: 'none',
// //   };
// //   return {
// //     style,
// //   };
// // };


// // const periods = [
// //   { id: 1, label: 'Period 1 (10:00 AM - 11:00 AM)', startTime: '10:00', endTime: '11:00' },
// //   { id: 2, label: 'Period 2 (11:00 AM - 12:00 PM)', startTime: '11:00', endTime: '12:00' },
// //   { id: 3, label: 'Period 3 (12:00 PM - 1:00 PM)', startTime: '12:00', endTime: '13:00' },
// //   { id: 4, label: 'Lunch Break (1:00 PM - 2:00 PM)', startTime: '13:00', endTime: '14:00' }, // break
// //   { id: 5, label: 'Period 4 (2:00 PM - 3:00 PM)', startTime: '14:00', endTime: '15:00' },
// //   { id: 6, label: 'Period 5 (3:00 PM - 4:00 PM)', startTime: '15:00', endTime: '16:00' },
// // ];

// // const Schedule = () => {
// //   const [events, setEvents] = useState([]);
// //   const [allClasses, setAllClasses] = useState([]);
// //   const [allTeachers, setAllTeachers] = useState([]);
// //   const [selectedClass, setSelectedClass] = useState(null);
// //   const [selectedEvent, setSelectedEvent] = useState(null);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [openAddDialog, setOpenAddDialog] = useState(false);

// //   // Fetch all classes
// //   const fetchAllClasses = () => {
// //     axios
// //       .get(`${baseUrl}/class/fetch-all`)
// //       .then((resp) => {
// //         setAllClasses(resp.data.data);
// //         setSelectedClass(resp.data.data[0]._id);
// //       })
// //       .catch((e) => {
// //         console.error('Error in fetching all Classes');
// //       });
// //   };

  

// //   useEffect(() => {
// //     fetchAllClasses();
// //     // fetchAllTeachers();
// //   }, []);

// //   // Fetch periods for the selected class
// //   useEffect(() => {
// //     const fetchClassPeriods = async () => {
// //       if (!selectedClass) return;
// //       try {
// //         const response = await axios.get(`${baseUrl}/period/class/${selectedClass}`);
// //         const periods = response.data.periods;
// //         console.log(periods)
// //         const eventsData = periods.map((period) => ({
// //           id: period._id,
// //           title:`${period.subject?period.subject.subject_name:""}, By ${period.teacher?period.teacher.name:""}`,
// //           start: new Date(period.startTime),
// //           end: new Date(period.endTime)
// //         }));
// //         setEvents(eventsData);
// //       } catch (error) {
// //         console.error('Error fetching periods:', error);
// //       }
// //     };

// //     fetchClassPeriods();
// //   }, [selectedClass,openDialog,openAddDialog]);

// //   const handleClassChange = (e) => {
// //     setSelectedClass(e.target.value);
// //   };

// //   const handleSelectEvent = (event) => {
// //     setSelectedEvent(event.id);
// //     setOpenDialog(true);
// //   };

// //   const handleCloseDialog = () => {
// //     setOpenDialog(false);
// //     setSelectedEvent(null);
// //   };

// //   const handleOpenAddDialog = () => {
    
// //     setOpenAddDialog(true);
// //   };

// //   const handleCloseAddDialog = () => {
// //     setOpenAddDialog(false);
// //   };


// //   return (
// //     <Container>
// //        <Typography className="hero-text" variant="h2" sx={{textAlign:"center"}}>Weekly Schedule</Typography>

// //       <Paper sx={{ margin: '10px', padding: '10px' }}>
// //         <FormControl sx={{ minWidth: '220px', marginTop: '10px' }}>
// //           <Typography >Change Class</Typography>
// //           <Select  value={selectedClass} onChange={handleClassChange} onBlur={handleClassChange}>
// //             {allClasses &&
// //               allClasses.map((value) => (
// //                 <MenuItem key={value._id} value={value._id}>
// //                   {value.class_text}
// //                 </MenuItem>
// //               ))}
// //           </Select>
// //         </FormControl>
// //       </Paper>

// //       <Button variant="contained" color="primary" onClick={handleOpenAddDialog} style={{ marginBottom: '10px' }}>
// //         Add New Period
// //       </Button>

// //       <Calendar
// //         localizer={localizer}
// //         events={events}
// //         defaultView="week"
// //         views={['week']}
// //         step={30}
// //         timeslots={1}
// //         min={new Date(1970, 1, 1, 10, 0, 0)}
// //  startAccessor="start"
// //       endAccessor="end"
// //       onSelectEvent={handleSelectEvent}
// //         max={new Date(1970, 1, 1, 17, 0, 0)}
// //         defaultDate={new Date()}
// //         showMultiDayTimes
      
// //         style={{ height: '100%', width: '100%'}}
// //         formats={{ timeGutterFormat: 'hh:mm A' }}
// //       />

// //       {/* Modal for Editing Events */}
// //       <Dialog open={openDialog} onClose={handleCloseDialog}>
// //         <DialogTitle>Edit Period</DialogTitle>
// //         <DialogContent>
// //           <AssignPeriod2 classId={selectedClass} isEdit={true} periodId={selectedEvent} close={handleCloseDialog} />
// //         </DialogContent>
// //         <DialogActions>
         
// //           <Button onClick={handleCloseDialog}>Cancel</Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Modal for Adding New Period */}
// //       <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
// //         <DialogTitle>Add New Period</DialogTitle>
// //        <AssignPeriod2 classId={selectedClass} close={handleCloseAddDialog} />
// //         <DialogActions>
          
// //           <Button onClick={handleCloseAddDialog}>Cancel</Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Container>
// //   );
// // };




//Attempt 2
// // export default Schedule;

// /* eslint-disable react/prop-types */
// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import axios from 'axios';
// import { baseUrl } from '../../../environment';
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Container,
//   Typography,
//   Box, // Import Box for layout
// } from '@mui/material';
// import AssignPeriod2 from '../../../school/components/assign period/AssignPeriod2';

// // Import the new form component
// import DailyReportForm from '../../../school/components/DailyReportForm/DailyReportForm'; // Adjust the path as necessary

// const localizer = momentLocalizer(moment);

// // ... (eventStyleGetter and periods array remain the same) ...
// const eventStyleGetter = (event, start, end, isSelected) => {
//     const style = {
//       backgroundColor: event.bgColor || '#3174ad',
//       color: 'white',
//       borderRadius: '4px',
//       padding: '5px',
//       border: 'none',
//     };
//     return {
//       style,
//     };
//   };

// const Schedule = () => {
//   const [events, setEvents] = useState([]);
//   const [allClasses, setAllClasses] = useState([]);
//   const [allTeachers, setAllTeachers] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(''); // Initialize as empty string
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openAddDialog, setOpenAddDialog] = useState(false);

//   // **** NEW STATE FOR TOGGLING VIEWS ****
//   const [view, setView] = useState('schedule'); // 'schedule' or 'report'

//   const fetchAllClasses = () => {
//     axios
//       .get(`${baseUrl}/class/fetch-all`)
//       .then((resp) => {
//         setAllClasses(resp.data.data);
//         if (resp.data.data.length > 0) {
//           setSelectedClass(resp.data.data[0]._id); // Set the first class as default
//         }
//       })
//       .catch((e) => {
//         console.error('Error in fetching all Classes');
//       });
//   };

//   useEffect(() => {
//     fetchAllClasses();
//   }, []);

//   useEffect(() => {
//     const fetchClassPeriods = async () => {
//       if (!selectedClass) return;
//       try {
//         const response = await axios.get(`${baseUrl}/period/class/${selectedClass}`);
//         const periods = response.data.periods;
//         const eventsData = periods.map((period) => ({
//           id: period._id,
//           title: `${period.subject ? period.subject.subject_name : ''}, By ${period.teacher ? period.teacher.name : ''}`,
//           start: new Date(period.startTime),
//           end: new Date(period.endTime),
//         }));
//         setEvents(eventsData);
//       } catch (error) {
//         console.error('Error fetching periods:', error);
//       }
//     };
//     if (view === 'schedule') { // Only fetch periods if in schedule view
//         fetchClassPeriods();
//     }
//   }, [selectedClass, openDialog, openAddDialog, view]); // Add view to dependency array

//   const handleClassChange = (e) => {
//     setSelectedClass(e.target.value);
//   };

//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event.id);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedEvent(null);
//   };

//   const handleOpenAddDialog = () => {
//     console.log("1. 'Add New Period' button clicked!");
//     console.log("2. The current selectedClass is:", selectedClass);
//     setOpenAddDialog(true);
//   };

//   const handleCloseAddDialog = () => {
//     setOpenAddDialog(false);
//   };

//   return (
//     <Container>
//       <Typography className="hero-text" variant="h2" sx={{ textAlign: 'center' }}>
//         {view === 'schedule' ? 'Weekly Schedule' : 'Daily Report'}
//       </Typography>

//       <Paper sx={{ margin: '10px', padding: '10px' }}>
//         <FormControl sx={{ minWidth: '220px', marginTop: '10px' }}>
//           <Typography>Change Class</Typography>
//           <Select value={selectedClass} onChange={handleClassChange}>
//             {allClasses &&
//               allClasses.map((value) => (
//                 <MenuItem key={value._id} value={value._id}>
//                   {value.class_text}
//                 </MenuItem>
//               ))}
//           </Select>
//         </FormControl>
//       </Paper>

//       {/* **** VIEW TOGGLE BUTTONS **** */}
//       <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
//         <Button
//           variant={view === 'schedule' ? 'contained' : 'outlined'}
//           onClick={() => setView('schedule')}
//         >
//           View Schedule
//         </Button>
//         <Button
//           variant={view === 'report' ? 'contained' : 'outlined'}
//           onClick={() => setView('report')}
//         >
//           View Daily Report
//         </Button>
//       </Box>

//       {/* **** CONDITIONAL RENDERING **** */}
//       {view === 'schedule' ? (
//         <>
//           <Button variant="contained" color="primary" onClick={handleOpenAddDialog} style={{ marginBottom: '10px' }}>
//             Add New Period
//           </Button>

//           <Calendar
//             localizer={localizer}
//             events={events}
//             defaultView="week"
//             views={['week']}
//             step={30}
//             timeslots={1}
//             min={new Date(1970, 1, 1, 10, 0, 0)}
//             startAccessor="start"
//             endAccessor="end"
//             onSelectEvent={handleSelectEvent}
//             max={new Date(1970, 1, 1, 17, 0, 0)}
//             defaultDate={new Date()}
//             showMultiDayTimes
//             style={{ height: '100%', width: '100%' }}
//             formats={{ timeGutterFormat: 'hh:mm A' }}
//           />
//         </>
//       ) : (
//         <DailyReportForm selectedClass={selectedClass} allClasses={allClasses} />
//       )}

//       {/* ... (Your Dialogs for Add/Edit Period remain unchanged) ... */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         {/* ... */}
//       </Dialog>
//       <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
//         <DialogTitle>Add New Period</DialogTitle>

//         {/* ... */}
//       </Dialog>
//     </Container>
//   );
// };

// export default Schedule;


//Attempt 3
/* eslint-disable react/prop-types */
// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import axios from 'axios';
// import { baseUrl } from '../../../environment';
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent, // Import DialogContent
//   DialogTitle,
//   Container,
//   Typography,
//   Box,
// } from '@mui/material';
// import AssignPeriod2 from '../../../school/components/assign period/AssignPeriod2';

// // Import the new form component
// import DailyReportForm from '../../../school/components/DailyReportForm/DailyReportForm';
// // At the top of Schedule.jsx

// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// const localizer = momentLocalizer(moment);

// const eventStyleGetter = (event, start, end, isSelected) => {
//     const style = {
//       backgroundColor: event.bgColor || '#3174ad',
//       color: 'white',
//       borderRadius: '4px',
//       padding: '5px',
//       border: 'none',
//     };
//     return {
//       style,
//     };
//   };

// const Schedule = () => {
//   const [events, setEvents] = useState([]);
//   const [allClasses, setAllClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(''); // Initialize as empty string
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
  
//   // **** NEW STATE FOR TOGGLING VIEWS ****
//   const [view, setView] = useState('schedule'); // 'schedule' or 'report'

//   const fetchAllClasses = () => {
//     axios
//       .get(`${baseUrl}/class/fetch-all`)
//       .then((resp) => {
//         setAllClasses(resp.data.data);
//         if (resp.data.data && resp.data.data.length > 0) {
//           setSelectedClass(resp.data.data[0]._id); // Set the first class as default
//         }
//       })
//       .catch((e) => {
//         console.error('Error in fetching all Classes', e);
//       });
//   };

//   useEffect(() => {
//     fetchAllClasses();
//   }, []);

//   useEffect(() => {
//     const fetchClassPeriods = async () => {
//       if (!selectedClass) return;
//       try {
//         const response = await axios.get(`${baseUrl}/period/class/${selectedClass}`);
//         const periods = response.data.periods;
//         console.log("Raw periods from API:", periods); 
//         const eventsData = periods.map((period) => ({
//           id: period._id,
//           title: `${period.subject?.subject_name || ''} (${period.workType}), By ${period.teacher?.name || ''}`,
//           //title: `${period.subject ? period.subject.subject_name : ''}, By ${period.teacher ? period.teacher.name : ''}`,
//           start: new Date(period.startTime),
//           end: new Date(period.endTime),
//         }));
//         setEvents(eventsData);
//       } catch (error) {
//         console.error('Error fetching periods:', error);
//       }
//     };
//     if (view === 'schedule') {
//         fetchClassPeriods();
//     }
//   }, [selectedClass, openDialog, openAddDialog, view]);

//   const handleClassChange = (e) => {
//     setSelectedClass(e.target.value);
//   };

//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event.id);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedEvent(null);
//   };

//   const handleOpenAddDialog = () => {
//     console.log("1. 'Add New Period' button clicked!");
//     console.log("2. The current selectedClass is:", selectedClass);
//     setOpenAddDialog(true);
//   };

//   const handleCloseAddDialog = () => {
//     setOpenAddDialog(false);
//   };

//    // --- NEW DOWNLOAD FUNCTION ---
//   const handleDownloadSchedulePDF = () => {
//     if (events.length === 0) {
//       alert('There are no scheduled periods to download for this class.');
//       return;
//     }

//     const doc = new jsPDF();
//     const selectedClassName =
//       allClasses.find((c) => c._id === selectedClass)?.class_text || 'Unknown Class';

//     doc.setFontSize(18);
//     doc.setFont('helvetica', 'bold');
//     doc.text('New Public English School', 105, 20, { align: 'center' });
//     doc.setFontSize(14);
//     doc.setFont('helvetica', 'normal');
//     doc.text(`Weekly Schedule for Class: ${selectedClassName}`, 105, 30, { align: 'center' });

//     const tableColumn = ['Day', 'Start Time', 'End Time', 'Subject', 'Teacher'];
//     const tableRows = [];
//     const sortedEvents = [...events].sort((a, b) => a.start - b.start);

//     sortedEvents.forEach(event => {
//       const [subject, teacherPart] = event.title.split(', By ');
//       const teacher = teacherPart ? teacherPart.trim() : 'N/A';
//       const rowData = [
//         moment(event.start).format('dddd'),
//         moment(event.start).format('hh:mm A'),
//         moment(event.end).format('hh:mm A'),
//         subject.trim(),
//         teacher,
//       ];
//       tableRows.push(rowData);
//     });

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 40,
//       theme: 'grid',
//       headStyles: { fillColor: [41, 128, 185] },
//     });

//     doc.save(`Weekly_Schedule_${selectedClassName.replace(/\s/g, '_')}.pdf`);
//   };



//   return (
//     <Container>
//       <Typography className="hero-text" variant="h2" sx={{ textAlign: 'center' }}>
//         {view === 'schedule' ? 'Weekly Schedule' : 'Daily Report'}
//       </Typography>

//       <Paper sx={{ margin: '10px', padding: '10px' }}>
//         <FormControl sx={{ minWidth: '220px', marginTop: '10px' }}>
//           <Typography>Change Class</Typography>
//           <Select value={selectedClass} onChange={handleClassChange}>
//             {allClasses &&
//               allClasses.map((value) => (
//                 <MenuItem key={value._id} value={value._id}>
//                   {value.class_text}
//                 </MenuItem>
//               ))}
//           </Select>
//         </FormControl>
//       </Paper>

//       <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
//         <Button
//           variant={view === 'schedule' ? 'contained' : 'outlined'}
//           onClick={() => setView('schedule')}
//         >
//           View Schedule
//         </Button>
//         <Button
//           variant={view === 'report' ? 'contained' : 'outlined'}
//           onClick={() => setView('report')}
//         >
//           View Daily Report
//         </Button>
//       </Box>

//       {view === 'schedule' ? (
//         <>
//           <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
//           <Button variant="contained" color="primary" onClick={handleOpenAddDialog} style={{ marginBottom: '10px' }}>
//             Add New Period
//           </Button>
// <Button variant="contained" color="secondary" onClick={handleDownloadSchedulePDF}>
//               Download Schedule as PDF
//             </Button>
//           </Box>

//           <Calendar
//             localizer={localizer}
//             events={events}
//             defaultView="week"
//             views={['week']}
//             step={30}
//             timeslots={1}
//             min={new Date(1970, 1, 1, 10, 0, 0)}
//             startAccessor="start"
//             endAccessor="end"
//             onSelectEvent={handleSelectEvent}
//             max={new Date(1970, 1, 1, 17, 0, 0)}
//             defaultDate={new Date()}
//             showMultiDayTimes
//             style={{ height: '100%', width: '100%' }}
//             formats={{ timeGutterFormat: 'hh:mm A' }}
//           />
//         </>
//       ) : (
//         <DailyReportForm selectedClass={selectedClass} allClasses={allClasses} />
//       )}

//       {/* Modal for Editing Events */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Edit Period</DialogTitle>
//         <DialogContent>
//           <AssignPeriod2 classId={selectedClass} isEdit={true} periodId={selectedEvent} close={handleCloseDialog} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//         </DialogActions>
//       </Dialog>

//       {/* =========== THIS IS THE FIX =========== */}
//       {/* Modal for Adding New Period */}
//       <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
//         <DialogTitle>Add New Period</DialogTitle>
//         <DialogContent>
//           {/* We are putting the form component back in here */}
//           <AssignPeriod2 classId={selectedClass} close={handleCloseAddDialog} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseAddDialog}>Cancel</Button>
//         </DialogActions>
//       </Dialog>
//       {/* ======================================= */}
      
//     </Container>
//   );
// };

// export default Schedule;



/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { baseUrl } from '../../../environment';
import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  Typography,
  Box,
} from '@mui/material';
import AssignPeriod2 from '../../../school/components/assign period/AssignPeriod2';
import DailyReportForm from '../../../school/components/DailyReportForm/DailyReportForm';

const localizer = momentLocalizer(moment);

const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.bgColor || '#3174ad',
      color: 'white',
      borderRadius: '4px',
      padding: '5px',
      border: 'none',
    };
    return { style };
};

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [view, setView] = useState('schedule');

  const fetchAllClasses = () => {
    axios
      .get(`${baseUrl}/class/fetch-all`)
      .then((resp) => {
        setAllClasses(resp.data.data);
        if (resp.data.data && resp.data.data.length > 0) {
          setSelectedClass(resp.data.data[0]._id);
        }
      })
      .catch((e) => {
        console.error('Error in fetching all Classes', e);
      });
  };

  useEffect(() => {
    fetchAllClasses();
  }, []);

  useEffect(() => {
    const fetchClassPeriods = async () => {
      if (!selectedClass) return;
      try {
        const response = await axios.get(`${baseUrl}/period/class/${selectedClass}`);
        const periods = response.data.periods;
        
        const eventsData = periods.map((period) => ({
          id: period._id,
          title: `${period.subject?.subject_name || ''} (${period.workType || 'N/A'}), By ${period.teacher?.name || ''}`,
          start: new Date(period.startTime),
          end: new Date(period.endTime),
          subjectName: period.subject?.subject_name || 'N/A',
          teacherName: period.teacher?.name || 'N/A',
          workType: period.workType || 'N/A',
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };
    if (view === 'schedule') {
        fetchClassPeriods();
    }
  }, [selectedClass, openDialog, openAddDialog, view]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleDownloadSchedulePDF = () => {
    if (events.length === 0) {
      alert('There are no scheduled periods to download for this class.');
      return;
    }

    const doc = new jsPDF();
    const selectedClassName =
      allClasses.find((c) => c._id === selectedClass)?.class_text || 'Unknown Class';

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('New Public English School', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Weekly Schedule for Class: ${selectedClassName}`, 105, 30, { align: 'center' });

    const tableColumn = ['Day', 'Time', 'Subject', 'Work Type', 'Teacher'];
    const tableRows = [];
    const sortedEvents = [...events].sort((a, b) => a.start - b.start);

    sortedEvents.forEach(event => {
      const rowData = [
        moment(event.start).format('dddd'),
        `${moment(event.start).format('hh:mm A')} - ${moment(event.end).format('hh:mm A')}`,
        event.subjectName,
        event.workType,
        event.teacherName,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(`Weekly_Schedule_${selectedClassName.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <Container>
      <Typography className="hero-text" variant="h2" sx={{ textAlign: 'center' }}>
        {view === 'schedule' ? 'Weekly Schedule' : 'Daily Report'}
      </Typography>

      <Paper sx={{ margin: '10px', padding: '10px' }}>
        <FormControl sx={{ minWidth: '220px', marginTop: '10px' }}>
          <Typography>Change Class</Typography>
          <Select value={selectedClass} onChange={handleClassChange}>
            {allClasses.map((value) => ( // Make sure this line is correct
                <MenuItem key={value._id} value={value._id}>
                  {value.class_text}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Paper>

      <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
        <Button variant={view === 'schedule' ? 'contained' : 'outlined'} onClick={() => setView('schedule')}>
          View Schedule
        </Button>
        <Button variant={view === 'report' ? 'contained' : 'outlined'} onClick={() => setView('report')}>
          View Daily Report
        </Button>
      </Box>

      {view === 'schedule' ? (
        <>
          <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
              Add New Period
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDownloadSchedulePDF}>
              Download Schedule as PDF
            </Button>
          </Box>
          <Calendar
            localizer={localizer}
            events={events}
            defaultView="week"
            views={['week']}
            step={30}
            timeslots={1}
            min={new Date(1970, 1, 1, 10, 0, 0)}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            max={new Date(1970, 1, 1, 17, 0, 0)}
            defaultDate={new Date()}
            showMultiDayTimes
            style={{ height: '100%', width: '100%' }}
            formats={{ timeGutterFormat: 'hh:mm A' }}
          />
        </>
      ) : (
        <DailyReportForm selectedClass={selectedClass} allClasses={allClasses} />
      )}

      {/* Dialogs */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Period</DialogTitle>
        <DialogContent>
          <AssignPeriod2 classId={selectedClass} isEdit={true} periodId={selectedEvent} close={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Period</DialogTitle>
        <DialogContent>
          <AssignPeriod2 classId={selectedClass} close={handleCloseAddDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Schedule;