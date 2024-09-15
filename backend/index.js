const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const authRoutes = require('./routes/authRoutes');
const s3Router=require('./s3Upload.js');
const complaintStatus = require('./routes/ComplaintStatus.js');
const complaintRoutes=require('./routes/ComplaintRoutes.js');
const uploadMediaRoute = require('./s3Upload.js');
const SubmitComplain=require('./routes/submitComplaint.js');
const AnalysisRoutes = require('./routes/AnalysisRoutes.js');
const TransferIrrelavent =require('./routes/TransferandIrrelavent.js');
const Ocr=require('./routes/Ocr.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));






  const genAI = new GoogleGenerativeAI('AIzaSyAT_Z210Ey_bOdT4Y1CfPAiLoSrRvvmR0U');

  app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;
    const formattedPrompt = `User prompt : ${prompt} ,You are an AI model equipped to provide information and answer questions about Indian Railways. Your goal is to assist users by delivering accurate and relevant answers on a variety of topics. Here is a comprehensive set of categories and types of questions you should be able to handle:

Operational Questions:
Train Schedules and Timetables:

What are the schedules for specific trains?
How can I find the timetable for a particular route?
Are there any delays or changes in the train schedule?
Station Management:

What facilities are available at a specific railway station?
Are there any ongoing projects at a particular station?
Train Operations:

What are the general operational procedures for Indian Railways?
How does train scheduling work?
Administrative Questions:
Staffing and Human Resources:

What are the current staffing levels at major railway stations?
How is human resource management handled within Indian Railways?
Safety and Compliance:

What are the safety protocols followed by Indian Railways?
How does Indian Railways ensure compliance with regulations?
Budget and Funding:

What is the general budget allocation for Indian Railways?
How is funding managed for different projects?
Customer Service and Public Relations:
Passenger Complaints and Feedback:

How can passengers submit complaints or feedback?
What is the process for handling passenger complaints?
Service Enhancements:

What new services or amenities have been introduced recently?
Are there any upcoming improvements in passenger services?
Technical and IT:
System Performance:

What IT systems are used for managing train operations?
How is system performance monitored?
Data and Analytics:

How does Indian Railways use data for operational decisions?
What kind of analytics is performed for improving services?
Infrastructure:
Project Updates:

What are the current major infrastructure projects underway?
How are infrastructure projects managed and updated?
Maintenance:

What is the schedule for routine maintenance of trains and tracks?
How is emergency maintenance handled?

give some small response not too big
if possible give output in proper format means well structured
if possible answer in points format..like it should look like json format
in your response you should not give * or any special charachter you can use number
Also reply in the same language that user ask...like if user ask "Varanasi me kon kon se railway stations hain?" so in this case you should able to detect hindi language and you should reply in hindi text language
`;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(formattedPrompt);
        const response = await result.response;
        const newtext = await response.text();

        // Log the raw response to inspect what's being returned
        console.log("Raw response from Generative AI:", newtext);

        res.json({ response: newtext });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Error generating response' });
    }
});







  
app.use('/auth', authRoutes);
app.use('/image',s3Router);
app.use('/complaintstatus',complaintStatus);
app.use('/complaintslogs', complaintRoutes);
app.use('/', uploadMediaRoute);
app.use('/', SubmitComplain);
app.use('/resolve',TransferIrrelavent);
app.use('/complaints', AnalysisRoutes);
app.use('/',Ocr)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
