//dono work kr rha


const express = require('express');
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const path = require('path');
require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const Complaint = require('./models/Complaint');

// AWS S3 client configuration
const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIAT7JJVELFOHJO7XS3',
        secretAccessKey: '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'
    }
});

// Multer configuration to store files in memory
const uploadWithMulter = multer({
    storage: multer.memoryStorage() // Store files in memory
}).single('file'); // Limit to one file

// Function to process the file with ML model
const processWithMLModel = async (file) => {
    try {
        const form = new FormData();
        
        // Append the file to the form data
        form.append('file', file.buffer, { filename: file.originalname, contentType: file.mimetype });

        // Send the file to the ML model
        const mlResponse = await axios.post('http://localhost:8000/upload-image', form, {
            headers: {
                ...form.getHeaders() // Include form-data headers
            }
        });

        return mlResponse.data;
    } catch (error) {
        console.error('Error processing with ML model:', error);
        throw new Error('Error processing file with ML model.');
    }
};

// Function to upload the file to AWS S3 and get the URL
const uploadToAws = async (file) => {
         try {
             const uploadParams = {
                 Bucket: 'sih-railmadad',
                 Key: `${Date.now()}${path.extname(file.originalname)}`,
                 Body: file.buffer,
                 ContentType: file.mimetype
             };
    
         const upload = new Upload({
             client: s3,
             params: uploadParams,
         });
    
             await upload.done();
             const fileUrl = `https://sih-railmadad.s3.amazonaws.com/${uploadParams.Key}`;
    
             return fileUrl;
         } catch (error) {
             console.error('Error uploading to AWS:', error);
             throw new Error('Error uploading file to AWS S3.');
         }
    };
// Main handler function
const handleUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Process the file with ML model
        const mlData = await processWithMLModel(req.file);

        // Upload the file to AWS S3
        const fileUrl = await uploadToAws(req.file);

        // Save the complaint to MongoDB
        const complaintData = req.body;
        const { complaint_description, category } = mlData;

        const complaint = new Complaint({
            userId: complaintData.userId,  // Assuming you have a user authentication middleware
            trainNo: complaintData.trainNo || null,
            pnrNo: complaintData.pnrNo || null,
            coachNo: complaintData.coachNo || null,
            seatNo: complaintData.seatNo || null,
            description: complaintData.description || null,
            file: fileUrl || null,
            category: category || null,
            complaint_description: complaint_description || null,
            status: 'Under Review',
            resolutionText: complaintData.resolutionText || null
        });

        await complaint.save();

        res.json({ message: "Complaint submitted successfully", complaint, url: fileUrl });
    } catch (error) {
        console.error('Error handling upload:', error);
        res.status(500).json({ error: error.message });
    }
};

const router = express.Router();

router.post('/upload-media', (req, res) => {
    uploadWithMulter(req, res, err => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(422).json({ error: 'Error uploading file. Please try again.' });
        }
        handleUpload(req, res);
    });
});



router.post('/resolve-complaint/:id', uploadWithMulter, async (req, res) => {
    try {
        const { resolutionText } = req.body;
        console.log(resolutionText,req.file);

        if (!req.file || !resolutionText) {
            return res.status(400).json({ error: 'Both resolution text and image are required.' });
        }

        // Upload the resolution image to S3
        const resolutionImageUrl = await uploadToAws(req.file);

        // Fetch the complaint by ID
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        // Update complaint fields
        const resolvedAt = new Date();
        const resolvedMonth = `${resolvedAt.getFullYear()}-${(resolvedAt.getMonth() + 1).toString().padStart(2, '0')}`;

        complaint.resolutionText = resolutionText;
        complaint.resolutionImageUrl = resolutionImageUrl;
        complaint.status = 'Resolved';
        complaint.resolvedAt = resolvedAt;
        complaint.resolvedMonth = resolvedMonth;
        complaint.isArchived = true;

        // Save the updated complaint
        await complaint.save();

        res.json({ 
            message: 'Complaint resolved successfully', 
            complaint 
        });
    } catch (error) {
        console.error('Error resolving complaint:', error);
        res.status(500).json({ error: 'Server error' });
    }
});




module.exports = router;
