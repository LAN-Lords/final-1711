const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const s3Router=require('./s3Upload.js');
const complaintStatus = require('./routes/ComplaintStatus.js');
const complaintRoutes=require('./routes/ComplaintRoutes.js');
const uploadMediaRoute = require('./s3Upload.js');
const SubmitComplain=require('./routes/submitComplaint.js');
const AnalysisRoutes = require('./routes/AnalysisRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


  
app.use('/auth', authRoutes);
app.use('/image',s3Router);
app.use('/complaintstatus',complaintStatus);
app.use('/complaintslogs', complaintRoutes);
app.use('/', uploadMediaRoute);
app.use('/', SubmitComplain);

app.use('/complaints', AnalysisRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
