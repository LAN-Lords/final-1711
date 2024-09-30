# LAN LORDS - Automated Complaint Processing System

## Overview
The **LAN LORDS** project is a customer complaint processing system designed to automate the classification and resolution of customer complaints using advanced AI/ML models and a robust backend infrastructure. The system handles various forms of input (image, audio, video) and processes them to extract relevant information, which is then used for automated complaint classification and resolution. The project includes features like real-time complaint tracking, predictive analysis, and multilingual chatbot support.

## Key Features

### Preprocessing Models:
- **Image Preprocessing**: Using OpenCV for image input.
- **Video Preprocessing**: Frame extraction using FFmpeg and OpenCV for video input.
- **Audio Preprocessing**: Audio sampling using Librosa for audio input.

### Model Ensemble:
- **OCR Model**: Text extraction from images using Tesseract OCR.
- **Image/Audio/Video → Text Model**: Using CLIP and Random Forests to convert multimedia inputs into text.
- **Predictive Analysis**: Utilizing the XGBoost model to predict future issues based on past complaints.

### Automated Complaint Processing:
- Classification and assignment of complaints based on extracted data.

### Customer Interface:
- **Real-time complaint tracking**.
- **Complaint registration**.
- **Multilingual chatbot (AdamW)** for assistance.
- **Feedback mechanism** for service improvement.

### Admin Interface:
- Manage **complaint logs** and resolutions.
- Handle **manual assignment** for wrongly classified complaints.
- **Multilingual chatbot** for admin assistance.
- Predict **future issues** based on data trends.

### Backend Web Server:
- **Node.js-based server** handling API requests and managing interactions between the frontend and models.

### Database:
- **MongoDB**: Used to store complaint data, logs, and system metadata.
- **AWS S3 Object Store**: Used for storage of image, audio, and video inputs.

## Technology Stack
- **Frontend**: Customer and admin interfaces for complaint registration, tracking, and resolution.
- **Backend**: Node.js with a robust API handling data flow between interfaces and models.
- **Database**: MongoDB for data persistence, AWS S3 for media storage.

### AI/ML Models:
- **Preprocessing**: OpenCV, FFmpeg, Librosa.
- **Text Models**: CLIP, Random Forests.
- **OCR**: Tesseract OCR.
- **Predictive Model**: XGBoost.
