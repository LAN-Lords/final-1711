const express=require('express');
const app = express();
app.use(express.json());

app.get('/register/:id',async(req,res)=>{
    res.send(req.params.body);
})

app.listen(4000,()=>{
    console.log('Server is running on port 3000');
})