const express=require('express');
const router=express.Router();
const Complaint=require('../models/Complaint');



router.get('/dashboard/matrics',async(req,res)=>{
      try{
            const complaints=await Complaint.find();
            const totalComplaints=complaints.length;
            const totalResolved=complaints.filter(c=>c.status === 'Resolved').length;

            const resolutionTimes=complaints.filter(c=>c.resolvedAt).map(c=>(new Date(c.resolvedAt) - new Date(c.assignedAt))/(1000*60*60));

            const avgResolutionTime=resolutionTimes.length>0 ? resolutionTimes.reduce((acc,val)=>acc+val,0)/resolutionTimes.length : 0;

      }catch(error){

      }
}
)