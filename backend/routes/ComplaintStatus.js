// const express=require('express');
// const router=express.Router();
// const Complaint = require('../models/Complaint');

// router.get('/:userId',async(req,res)=>{
//      try{
//           const complaint=await Complaint.findById(req.params.userId);
//           console.log(req.params.userId);
//           if(!complaint){
//               return res.status(200).json({message:'No Complaint found'});
//           }
//           res.status(200).json(complaint);
//      }catch(e){
//          res.status(500).json({message:e.message});
//      }
// });
// module.exports = router;


const express=require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

router.get('/:complaintId', async (req, res) => {
    try {
        console.log(req.params);
        const complaint = await Complaint.findById(req.params.complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'No Complaint found' });
        }
        res.status(200).json(complaint);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const allComplaints = await Complaint.find(); // Fetch all documents
        res.status(200).json(allComplaints);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


module.exports = router;
