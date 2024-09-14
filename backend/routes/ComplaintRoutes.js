const express=require('express');
const router=express.Router();
const Complaint=require('../models/Complaint');

router.get('/all',async(req,res)=>{
    try{
         const complaints=await Complaint.find({ isArchived: false });
         console.log(complaints.length);
         res.status(200).json(complaints);
    }catch(e){
         res.status(500).json({message:e.message});
    }
});

// Fetch a single complaint by ID
router.get('/:complaintId', async (req, res) => {
  const { complaintId } = req.params;

  try {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(complaint);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});



// router.put('/:complaintId', async (req, res) => {
//   const { complaintId } = req.params;
//   const { status } = req.body;
//   console.log('update hu main');
  
//   if (!status || !['Under Review', 'Assigned', 'Resolved'].includes(status)) {
//     return res.status(400).json({ message: 'Invalid status' });
//   }
  
//   try {
//     const complaint = await Complaint.findById(complaintId);  // Corrected the function name
//     if (!complaint) {
//       return res.status(404).json({ message: 'Complaint not found' });
//     }
    
//     complaint.status = status;
//     if (status === 'Assigned') {
//       complaint.assignedAt = new Date();
//     } else if (status === 'Resolved') {
//       complaint.resolvedAt = new Date();
//     }

//     await complaint.save();
//     res.status(200).json(complaint);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });



router.put('/:id', async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, isArchived: req.body.isArchived },
      { new: true }
    );
    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






module.exports = router;