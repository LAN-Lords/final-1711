// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ComplaintForm() {
//     const [trainNo, setTrainNo] = useState('');
//     const [pnrNo, setPnrNo] = useState('');
//     const [media, setMedia] = useState(null);
//     const [coachNo, setCoachNo] = useState('');
//     const [seatNo, setSeatNo] = useState('');
//     const [description, setDescription] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [mediaUrl, setMediaUrl] = useState(''); // Track single media URL
//     const [isFileUploaded, setIsFileUploaded] = useState(true); // Track file upload status
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleFileChange = (e) => {
//         setMedia(e.target.files[0]); // Expecting a single file
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
    
//         // Step 1: Upload media file to S3 via Node.js backend
//         let mediaUrl = '';
//         if (media) {
//             const formData = new FormData();
//             formData.append('file', media);
    
//             try {
//                 const response = await axios.post('http://localhost:8001/upload-media', formData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 mediaUrl = response.data.url;
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//                 setIsSubmitting(false);
//                 return; // Stop further processing
//             }
//         }
    
//         // Step 2: Send complaint details to the backend for ML model analysis and MongoDB storage
//         const complaintData = { trainNo, pnrNo, mediaUrl, coachNo, seatNo, description };
    
//         try {
//             const res = await axios.post('http://localhost:8001/submit-complaint', complaintData);
//             const { complaint_description, category } = res.data;
//             console.log('ML model analysis result:', complaint_description);
//             console.log('ML model category:', category);
    
//             // Show success message
//             setSuccessMessage('Complaint submitted successfully!');
//         } catch (err) {
//             console.error('Error submitting complaint:', err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
    

//     useEffect(() => {
//         if (isFileUploaded && isSubmitting) {
//             // Step 2: Send complaint details to the backend for ML model analysis and MongoDB storage
//             const complaintData = { trainNo, pnrNo, mediaUrl, coachNo, seatNo, description };

//             axios.post('http://localhost:8001/submit-complaint', complaintData)
//                 .then((res) => {
//                     const { complaint_description, category } = res.data;
//                     console.log('ML model analysis result:', complaint_description);
//                     console.log('ML model category:', category);

//                     // Show success or take further actions with the response
//                     setIsSubmitting(false);
//                     console.log("Complaint submitted successfully:", res.data);
//                     setSuccessMessage('Complaint submitted successfully!');

//                 })
//                 .catch(err => {
//                     console.error('Error running ML model:', err);
//                     setIsSubmitting(false);
//                 });
//         }
//     }, [isFileUploaded]);

//     return (
//         <div className="container ">
//             <div className="row justify-content-center text-start">
//                 <div className="col-md-8">
//                     <h1 className="card-title mb-1 text-center" style={{ fontSize: '3rem' }}>File a Complaint</h1>
//                     <div className="card shadow-lg border-0 rounded-3" style={{ background: '#f0f7ff' }}>
//                         <div className="card-body p-5">
//                             <p className="text-muted">
//                                 We're here to help resolve your issue. Follow the steps below to submit your complaint.
//                             </p>
//                             <form onSubmit={handleSubmit}>

//                                 <div className="mb-3">
//                                     <label htmlFor="media" className="form-label">Attach Media (optional)</label>
//                                     <div className="input-group">
//                                         <input
//                                             type="file"
//                                             id="media"
//                                             className="form-control"
//                                             style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                             onChange={handleFileChange}
//                                         />
//                                         <button
//                                             className="btn btn-outline-secondary"
//                                             type="button"
//                                             style={{ border: 'none' }}
//                                         >
//                                             <i className="bi bi-upload"></i>
//                                         </button>
//                                     </div>
//                                     <small className="text-muted">
//                                         The AI will analyze your media and suggest the appropriate category.
//                                     </small>
//                                 </div>

//                                 <div className="mb-3">
//                                     <label className="form-label">Journey Details</label>
//                                     <div className="row">
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor="trainNumber" className="form-label">Train Number</label>
//                                                 <input
//                                                     type="text"
//                                                     id="trainNumber"
//                                                     className="form-control"
//                                                     placeholder="Enter train number"
//                                                     style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                                     value={trainNo}
//                                                     onChange={(e) => setTrainNo(e.target.value)}
//                                                     required
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor="pnr" className="form-label">PNR</label>
//                                                 <input
//                                                     type="text"
//                                                     id="pnr"
//                                                     className="form-control"
//                                                     placeholder="Enter PNR"
//                                                     style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                                     value={pnrNo}
//                                                     onChange={(e) => setPnrNo(e.target.value)}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor="CoachNumber" className="form-label">Coach Number</label>
//                                                 <input
//                                                     type="text"
//                                                     id="CoachNumber"
//                                                     className="form-control"
//                                                     placeholder="Enter Coach Number"
//                                                     style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                                     value={coachNo}
//                                                     onChange={(e) => setCoachNo(e.target.value)}
//                                                     required
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor="SeatNumber" className="form-label">Seat Number</label>
//                                                 <input
//                                                     type="text"
//                                                     id="SeatNumber"
//                                                     className="form-control"
//                                                     placeholder="Enter Seat Number"
//                                                     style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                                     value={seatNo}
//                                                     onChange={(e) => setSeatNo(e.target.value)}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="mb-4">
//                                     <label htmlFor="description" className="form-label">Describe the issue</label>
//                                     <textarea
//                                         id="description"
//                                         className="form-control"
//                                         rows="5"
//                                         placeholder="Provide details about your complaint..."
//                                         style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                         value={description}
//                                         onChange={(e) => setDescription(e.target.value)}
//                                     ></textarea>
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className="btn w-100 text-black"
//                                     style={{ background: '#71b0f4', border: 'none' }}
//                                     disabled={isSubmitting || !isFileUploaded}
//                                 >
//                                     Submit Complaint
//                                 </button>
//                                 {successMessage && (
//                                     <div className="alert alert-success mt-3" role="alert" style={{ color: 'green' }}>
//                                         {successMessage}
//                                     </div>
//                                 )}
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ComplaintForm;





















//  multilingual










 import React, {useState } from 'react';
 import axios from 'axios';
 import { useTranslation } from 'react-i18next';
 import { Alert } from 'react-bootstrap';

 function ComplaintForm() {
     const { t } = useTranslation();
  const [formData, setFormData] = useState({
    trainNo: '',
    pnrNo: '',
    seatNo: '',
    coachNo: '',
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('trainNo', formData.trainNo);
    form.append('pnrNo', formData.pnrNo);
    form.append('seatNo', formData.seatNo);
    form.append('coachNo', formData.coachNo);
    form.append('file', file);

    try {
      const response = await axios.post('http://localhost:8001/upload-media', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Success response
      setMessage(`Complaint submitted successfully! File URL: ${response.data.url}`);
      setError('');
    } catch (err) {
      // Handle error
      setError('An error occurred while submitting the complaint. Please try again.');
      setMessage('');
    }
  };
     return (
         <div className="container">
             <div className="row justify-content-center text-start">
                 <div className="col-md-8">
                     <h1 className="card-title mb-1 text-center" style={{ fontSize: '3rem' }}>
                         {t('complaint.file_complaint')}
                     </h1>
                     <div className="card shadow-lg border-0 rounded-3" style={{ background: '#f0f7ff' }}>
                         <div className="card-body p-5">
                             <p className="text-muted">
                                 {t('complaint.help_resolve')}
                             </p>
                             {message && <Alert variant="success">{message}</Alert>}
                             {error && <Alert variant="danger">{error}</Alert>}
                             <form onSubmit={handleSubmit}>

                                 <div className="mb-3">
                                     <label htmlFor="media" className="form-label">{t('complaint.attach_media')}</label>
                                     <div className="input-group">
                                         <input
                                             type="file"
                                             name="file"
                                             id="media"
                                             className="form-control"
                                             style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                             onChange={handleFileChange}
                                             required
                                         />
                                         <button
                                             className="btn btn-outline-secondary"
                                             type="button"
                                             style={{ border: 'none' }}
                                         >
                                             <i className="bi bi-upload"></i>
                                         </button>
                                     </div>
                                     <small className="text-muted">
                                         {t('complaint.ai_analysis')}
                                     </small>
                                 </div>

                                 <div className="mb-3">
                                     <label className="form-label">{t('complaint.journey_details')}</label>
                                     <div className="row">
                                         <div className="col-md-6">
                                             <div className="mb-3">
                                                 <label htmlFor="trainNumber" className="form-label">{t('complaint.train_number')}</label>
                                                 <input
                                                     type="text"
                                                     id="trainNumber"
                                                     name='trainNo'
                                                     className="form-control"
                                                     placeholder={t('complaint.enter_train_number')}
                                                     style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                                     value={formData.trainNo}
                                                     onChange={handleChange}
                                                    required
                                                 />
                                             </div>
                                         </div>
                                         <div className="col-md-6">
                                             <div className="mb-3">
                                                 <label htmlFor="pnr" className="form-label">{t('complaint.pnr')}</label>
                                                 <input
                                                     type="text"
                                                     id="pnr"
                                                     name='pnrNo'
                                                     className="form-control"
                                                     placeholder={t('complaint.enter_pnr')}
                                                     style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                                     value={formData.pnrNo}
                                                     onChange={handleChange}
                                                />
                                             </div>
                                         </div>
                                         <div className="col-md-6">
                                             <div className="mb-3">
                                                 <label htmlFor="CoachNumber" className="form-label">{t('complaint.coach_number')}</label>
                                                 <input
                                                     type="text"
                                                     id="CoachNumber"
                                                     name='coachNo'
                                                     className="form-control"
                                                     placeholder={t('complaint.enter_coach_number')}
                                                     style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                                     value={formData.coachNo}
                                                     onChange={handleChange}
                                                     required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="SeatNumber" className="form-label">{t('complaint.seat_number')}</label>
                                                <input
                                                    type="text"
                                                    id="SeatNumber"
                                                    name='seatNo'
                                                    className="form-control"
                                                    placeholder={t('complaint.enter_seat_number')}
                                                    style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                                    value={formData.seatNo}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                

                                <button
                                    type="submit"
                                    className="btn w-100 text-black"
                                    style={{ background: '#71b0f4', border: 'none' }}
                                    
                                >
                                    {t('complaint.submit')}
                                 </button>
                                 
                             </form>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     );
 }

 export default ComplaintForm;









// import React, { useState } from 'react';
// import { Form, Button, Container, Alert } from 'react-bootstrap';
// import axios from 'axios';

// const ComplaintForm = () => {
//   const [formData, setFormData] = useState({
//     trainNo: '',
//     pnrNo: '',
//     seatNo: '',
//     coachNo: '',
//   });
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   // Handle form input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append('trainNo', formData.trainNo);
//     form.append('pnrNo', formData.pnrNo);
//     form.append('seatNo', formData.seatNo);
//     form.append('coachNo', formData.coachNo);
//     form.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:8001/upload-media', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Success response
//       setMessage(`Complaint submitted successfully! File URL: ${response.data.url}`);
//       setError('');
//     } catch (err) {
//       // Handle error
//       setError('An error occurred while submitting the complaint. Please try again.');
//       setMessage('');
//     }
//   };

//   return (
//     <Container>
//       <h1 className="my-4">Submit a Complaint</h1>

//       {message && <Alert variant="success">{message}</Alert>}
//       {error && <Alert variant="danger">{error}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="trainNo">
//           <Form.Label>Train Number</Form.Label>
//           <Form.Control
//             type="text"
//             name="trainNo"
//             placeholder="Enter train number"
//             value={formData.trainNo}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="pnrNo" className="mt-3">
//           <Form.Label>PNR Number</Form.Label>
//           <Form.Control
//             type="text"
//             name="pnrNo"
//             placeholder="Enter PNR number"
//             value={formData.pnrNo}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="seatNo" className="mt-3">
//           <Form.Label>Seat Number</Form.Label>
//           <Form.Control
//             type="text"
//             name="seatNo"
//             placeholder="Enter seat number"
//             value={formData.seatNo}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="coachNo" className="mt-3">
//           <Form.Label>Coach Number</Form.Label>
//           <Form.Control
//             type="text"
//             name="coachNo"
//             placeholder="Enter coach number"
//             value={formData.coachNo}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="file" className="mt-3">
//           <Form.Label>Upload File</Form.Label>
//           <Form.Control type="file" name="file" onChange={handleFileChange} required />
//         </Form.Group>

//         <Button variant="primary" type="submit" className="mt-4">
//           Submit Complaint
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default ComplaintForm;
