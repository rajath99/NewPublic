// // const Period = require('../model/period.model');

// // // Controller to create a period
// // exports.createPeriod = async (req, res) => {
// //   try {
// //     const { teacher, subject, classId, startTime, endTime, workType } = req.body;
// //     const schoolId = req.user.schoolId;
// //     const newPeriod = new Period({
// //        teacher, 
// //        subject, 
// //        class: classId, 
// //        startTime:new Date(startTime),
// //        endTime:new Date(endTime), 
// //        school:schoolId
// //       });

// //     await newPeriod.save();
// //     res.status(201).json({ message: 'Period assigned successfully', period: newPeriod });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error creating period', error });
// //     console.log("Error", error)
// //   }
// // };

// // // Controller to get periods for a specific teacher
// // exports.getTeacherPeriods = async (req, res) => {
// //   try {
// //     const schoolId = req.user.schoolId;
// //     const { teacherId } = req.params;
// //     const periods = await Period.find({ teacher: teacherId,school:schoolId }).populate('class').populate('subject');
// //     res.status(200).json({ periods });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching periods', error });
// //   }
// // };

// // exports.getPeriodsWithId = async (req, res) => {
// //     try {
// //       const { id } = req.params;
// //       const period = await Period.findById(id).populate('class').populate('subject').populate('teacher');
// //       res.status(200).json({ period });
// //     } catch (error) {
// //       res.status(500).json({ message: 'Error fetching periods by id', error });
// //     }
// //   };

// // // Controller to get periods for a specific CLASS
// // exports.getClassPeriods = async (req, res) => {
    
// //     try {
// //       const { classId } = req.params;
// //       const schoolId = req.user.schoolId;
// //       const periods = await Period.find({class:classId,school:schoolId}).populate('subject').populate('teacher');
// //       console.log(classId)
// //       res.status(200).json({ periods });
// //     } catch (error) {
// //       res.status(500).json({ message: 'Error fetching periods', error });
// //     }
// //   };

// //   // all periods
// // exports.getPeriods = async (req, res) => {
// //     try {
// //       const schoolId = req.user.schoolId;
// //       const periods = await Period.find({school:schoolId}).populate('class').populate('subject').populate("teacher")
// //       res.status(200).json({ periods });
// //     } catch (error) {
// //       res.status(500).json({ message: 'Error fetching periods', error });
// //     }
// //   };


// // // Update period
// // exports.updatePeriod = async (req, res) => {

// //   try {
// //     const { startTime, endTime,teacher, subject } = req.body; // we will only update teacher and subject
// //     const periodId = req.params.id;
// //     const updatedPeriod = await Period.findOneAndUpdate(
// //       {_id:periodId,school:req.user.schoolId},
// //       { subject,teacher },
// //       { new: true }
// //     );
// //     res.status(200).json({ message: 'Period updated successfully', period: updatedPeriod });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error updating period', error });
// //   }
// // };

// // // Delete period
// // exports.deletePeriod = async (req, res) => {
// //   try {
// //     const periodId = req.params.id;
// //     await Period.findByIdAndDelete(periodId);
// //     res.status(200).json({ message: 'Period deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error deleting period', error });
// //   }
// // };


// const Period = require('../model/period.model');

// // ===================================================
// // 1. MODIFIED: createPeriod function
// // ===================================================
// // Controller to create a period
// exports.createPeriod = async (req, res) => {
//   try {
//     // Add 'workType' to the destructured body
//     const { teacher, subject, classId, startTime, endTime, workType } = req.body;
//     const schoolId = req.user.schoolId;

//     // Add validation for the new field
//     if (!teacher || !subject || !classId || !startTime || !endTime || !workType) {
//         return res.status(400).json({ message: 'Please provide all required fields, including work type.' });
//     }

//     const newPeriod = new Period({
//        teacher, 
//        subject, 
//        class: classId, 
//        startTime: new Date(startTime),
//        endTime: new Date(endTime), 
//        school: schoolId,
//        workType: workType // Add the new field here
//       });

//     await newPeriod.save();
//     res.status(201).json({ message: 'Period assigned successfully', period: newPeriod });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating period', error });
//     console.log("Error", error)
//   }
// };

// // ===================================================
// // NO CHANGES NEEDED for any of the "get" functions
// // ===================================================
// exports.getTeacherPeriods = async (req, res) => { /* ... no changes ... */ };
// exports.getPeriodsWithId = async (req, res) => { /* ... no changes ... */ };
// exports.getClassPeriods = async (req, res) => { /* ... no changes ... */ };
// exports.getPeriods = async (req, res) => { /* ... no changes ... */ };


// // ===================================================
// // 2. MODIFIED: updatePeriod function
// // ===================================================
// // Update period
// exports.updatePeriod = async (req, res) => {
//   try {
//     // Destructure all fields that can be updated, including the new 'workType'
//     const { teacher, subject, workType } = req.body;
//     const periodId = req.params.id;

//     // Create an object with the fields to update.
//     // This is a robust way to handle updates, as it only includes the fields
//     // that were actually sent in the request body.
//     const updateFields = {};
//     if (teacher) updateFields.teacher = teacher;
//     if (subject) updateFields.subject = subject;
//     if (workType) updateFields.workType = workType;

//     // Check if there is anything to update
//     if (Object.keys(updateFields).length === 0) {
//         return res.status(400).json({ message: 'No fields to update provided.' });
//     }

//     const updatedPeriod = await Period.findOneAndUpdate(
//       { _id: periodId, school: req.user.schoolId },
//       { $set: updateFields }, // Use the dynamically created updateFields object
//       { new: true }
//     );

//     if (!updatedPeriod) {
//         return res.status(404).json({ message: 'Period not found or you do not have permission to edit it.' });
//     }

//     res.status(200).json({ message: 'Period updated successfully', period: updatedPeriod });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating period', error });
//   }
// };

// // ===================================================
// // NO CHANGES NEEDED for deletePeriod function
// // ===================================================
// // Delete period
// exports.deletePeriod = async (req, res) => { /* ... no changes ... */ };

const Period = require('../model/period.model');

// Controller to create a period
exports.createPeriod = async (req, res) => {
  try {
    const { teacher, subject, classId, startTime, endTime, workType } = req.body;
    const schoolId = req.user.schoolId;

    if (!teacher || !subject || !classId || !startTime || !endTime || !workType) {
        return res.status(400).json({ message: 'Please provide all required fields, including work type.' });
    }

    const newPeriod = new Period({
       teacher, 
       subject, 
       class: classId, 
       startTime: new Date(startTime),
       endTime: new Date(endTime), 
       school: schoolId,
       workType: workType // The critical fix is here
      });

    await newPeriod.save();
    res.status(201).json({ message: 'Period assigned successfully', period: newPeriod });
  } catch (error) {
    res.status(500).json({ message: 'Error creating period', error });
    console.log("Error", error)
  }
};

// ... (all your 'get' functions) ...
exports.getTeacherPeriods = async (req, res) => { /* ... */ };
exports.getPeriodsWithId = async (req, res) => { /* ... */ };
exports.getClassPeriods = async (req, res) => { 
    try {
      const { classId } = req.params;
      const schoolId = req.user.schoolId;
      const periods = await Period.find({class:classId,school:schoolId}).populate('subject').populate('teacher');
      res.status(200).json({ periods });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching periods', error });
    }
};
exports.getPeriods = async (req, res) => { /* ... */ };

// Update period
exports.updatePeriod = async (req, res) => {
  try {
    const { teacher, subject, workType } = req.body;
    const periodId = req.params.id;

    const updateFields = {};
    if (teacher) updateFields.teacher = teacher;
    if (subject) updateFields.subject = subject;
    if (workType) updateFields.workType = workType;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No fields to update provided.' });
    }

    const updatedPeriod = await Period.findOneAndUpdate(
      { _id: periodId, school: req.user.schoolId },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedPeriod) {
        return res.status(404).json({ message: 'Period not found or you do not have permission to edit it.' });
    }

    res.status(200).json({ message: 'Period updated successfully', period: updatedPeriod });
  } catch (error) {
    res.status(500).json({ message: 'Error updating period', error });
  }
};

// Delete period
exports.deletePeriod = async (req, res) => {
  try {
    const periodId = req.params.id;
    await Period.findByIdAndDelete(periodId);
    res.status(200).json({ message: 'Period deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting period', error });
  }
};