const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/ocr-image', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;

  Tesseract.recognize(imagePath, 'eng', {
    logger: (m) => console.log(m),
  }).then((result) => {
    const text = result.data.text;

    // Example regex to extract information. Adjust it according to your ticket's format.
    const pnrNo = text.match(/PNR No:\s*(\d+)/)?.[1] || '';
    const trainNo = text.match(/Train No:\s*(\d+)/)?.[1] || '';
    const coachNo = text.match(/Coach:\s*(\w+)/)?.[1] || '';
    const seatNo = text.match(/Seat No:\s*(\d+)/)?.[1] || '';

    // Clean up the uploaded image after processing
    fs.unlinkSync(imagePath);

    res.json({
      pnrNo,
      trainNo,
      coachNo,
      seatNo,
      message: 'OCR processed successfully',
    });
  }).catch((error) => {
    res.status(500).json({ message: 'Failed to process image', error });
  });
});
module.exports = router;