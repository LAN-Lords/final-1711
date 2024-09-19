// import React, { useState } from 'react';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';
// import { Alert } from 'react-bootstrap';

// function ComplaintForm() {
//   const { t } = useTranslation();
//   const [formData, setFormData] = useState({
//     trainNo: '',
//     pnrNo: '',
//     seatNo: '',
//     coachNo: '',
//   });
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [ticketImage, setTicketImage] = useState(null);
//   const [ocrData, setOcrData] = useState({ pnrNo: '', trainNo: '', coachNo: '', seatNo: '' });

//   const handleTicketImageChange = (e) => {
//     setTicketImage(e.target.files[0]);
//   };

//   const handleUploadTicket = async () => {
//     if (!ticketImage) {
//       setMessage('Please upload a ticket image.');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('ticketImage', ticketImage);

//       const response = await fetch('http://localhost:8000/ocr-image', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setOcrData({
//           pnrNo: data.pnrNo || '',
//           trainNo: data.trainNo || '',
//           coachNo: data.coachNo || '',
//           seatNo: data.seatNo || '',
//         });
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             pnrNo: data.pnrNo || '',
//             trainNo: data.trainNo || '',
//             coachNo: data.coachNo || '',
//             seatNo: data.seatNo || '',  // Set this in case the seat number is extracted
//           }));
//         setMessage('Ticket data extracted successfully!');
//       } else {
//         setMessage('Failed to process ticket image. Please enter details manually.');
//       }
//     } catch (error) {
//       setMessage('Error while uploading the image. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append('trainNo', ocrData.trainNo || formData.trainNo);
//     form.append('pnrNo', ocrData.pnrNo || formData.pnrNo);
//     form.append('seatNo', ocrData.seatNo || formData.seatNo);
//     form.append('coachNo', ocrData.coachNo || formData.coachNo);
//     form.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:8001/upload-media', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setMessage(`Complaint submitted successfully! File URL: ${response.data.url}`);
//       setError('');
//     } catch (err) {
//       setError('An error occurred while submitting the complaint. Please try again.');
//       setMessage('');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center text-start">
//         <div className="col-md-8">
//           <h1 className="card-title mb-1 text-center" style={{ fontSize: '3rem' }}>
//             {t('complaint.file_complaint')}
//           </h1>
//           <div className="card shadow-lg border-0 rounded-3" style={{ background: '#f0f7ff' }}>
//             <div className="card-body p-5">
//               <p className="text-muted">{t('complaint.help_resolve')}</p>
//               {message && <Alert variant="success">{message}</Alert>}
//               {error && <Alert variant="danger">{error}</Alert>}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="ticketImage" className="form-label">{t('complaint.upload_ticket_image')}</label>
//                   <div className="input-group">
//                     <input
//                       type="file"
//                       name="ticketImage"
//                       id="ticketImage"
//                       className="form-control"
//                       style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                       onChange={handleTicketImageChange}
                      
//                     />
//                     <button
//                       className="btn btn-outline-secondary"
//                       type="button"
//                       style={{ border: 'none' }}
//                       onClick={handleUploadTicket}
//                     >
//                       <i className="bi bi-upload"></i>
//                     </button>
//                   </div>
//                   <small className="text-muted">{t('complaint.ai_analysis')}</small>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="media" className="form-label">{t('complaint.attach_media')}</label>
//                   <div className="input-group">
//                     <input
//                       type="file"
//                       name="file"
//                       id="media"
//                       className="form-control"
//                       style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                       onChange={handleFileChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">{t('complaint.journey_details')}</label>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="trainNumber" className="form-label">{t('complaint.train_number')}</label>
//                         <input
//                           type="text"
//                           id="trainNumber"
//                           name="trainNo"
//                           className="form-control"
//                           placeholder={t('complaint.enter_train_number')}
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                           value={formData.trainNo}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="pnr" className="form-label">{t('complaint.pnr')}</label>
//                         <input
//                           type="text"
//                           id="pnr"
//                           name="pnrNo"
//                           className="form-control"
//                           placeholder={t('complaint.enter_pnr')}
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                           value={formData.pnrNo}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="CoachNumber" className="form-label">{t('class')}</label>
//                         <input
//                           type="text"
//                           id="CoachNumber"
//                           name="coachNo"
//                           className="form-control"
//                           placeholder={t('complaint.enter_coach_number')}
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                           value={formData.coachNo}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="SeatNumber" className="form-label">{t('complaint.seat_number')}</label>
//                         <input
//                           type="text"
//                           id="SeatNumber"
//                           name="seatNo"
//                           className="form-control"
//                           placeholder={t('complaint.enter_seat_number')}
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                           value={formData.seatNo}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn w-100 text-black"
//                   style={{ background: '#71b0f4', border: 'none' }}
//                 >
//                   {t('complaint.submit')}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ComplaintForm;













// import React, { useState , useEffect} from 'react';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';
// import { Alert } from 'react-bootstrap';

// function ComplaintForm() {
//   const { t } = useTranslation();
//   const [formData, setFormData] = useState({
//     trainNo: '',
//     pnrNo: '',
//     seatNo: '',
//     coachNo: '',
//   });
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [ticketImage, setTicketImage] = useState(null);
//   const [ocrData, setOcrData] = useState({ pnrNo: '', trainNo: '', coachNo: '', seatNo: '' });


//   // useEffect(() => {
//   //   if (formData.trainNo) {
//   //     const fetchTrainData = async () => {
//   //       try {
//   //         const response = await axios.get('https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus', {
//   //           params: { trainNo: formData.trainNo, startDay: '1' },
//   //           headers: {
//   //             'x-rapidapi-key': '80840dddb4msh154b63bd278a1efp1bc3d9jsn868bd3d3bdee',
//   //             'x-rapidapi-host': 'irctc1.p.rapidapi.com'
//   //           }
//   //         });

//   //         if (response.data) {
//   //           const { trainName, currentLocation } = response.data;
//   //           setFormData((prevFormData) => ({
//   //             ...prevFormData,
//   //             trainName: trainName || '',
//   //             currentLocation: currentLocation || 'Unknown Location',
//   //           }));
//   //         }
//   //       } catch (error) {
//   //         console.error('Error fetching train details:', error);
//   //       }
//   //     };

//   //     fetchTrainData();
//   //   }
//   // }, [formData.trainNo]);





//   useEffect(() => {
//     // Automatically set train name and location when train number is filled
//     if (formData.trainNo === '12345') { // Use your specific train number here
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         trainName: 'New Delhi Rajdhani Express',
//         currentLocation: 'Kathua',
//       }));
//     }
//   }, [formData.trainNo]);



//   const handleTicketImageChange = (e) => {
//     setTicketImage(e.target.files[0]);
//   };

//   const handleUploadTicket = async () => {
//     if (!ticketImage) {
//       setMessage('Please upload a ticket image.');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('ticketImage', ticketImage);

//       const response = await fetch('http://localhost:8000/ocr-image', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setOcrData({
//           pnrNo: data.pnrNo || '',
//           trainNo: data.trainNo || '',
//           coachNo: data.coachNo || '',
//           seatNo: data.seatNo || '',
//         });
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             pnrNo: data.pnrNo || '',
//             trainNo: data.trainNo || '',
//             coachNo: data.coachNo || '',
//             seatNo: data.seatNo || '',  // Set this in case the seat number is extracted
//           }));
//         setMessage('Ticket data extracted successfully!');
//       } else {
//         setMessage('Failed to process ticket image. Please enter details manually.');
//       }
//     } catch (error) {
//       setMessage('Error while uploading the image. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append('trainNo', ocrData.trainNo || formData.trainNo);
//     form.append('pnrNo', ocrData.pnrNo || formData.pnrNo);
//     form.append('seatNo', ocrData.seatNo || formData.seatNo);
//     form.append('coachNo', ocrData.coachNo || formData.coachNo);
//     form.append('trainName', formData.trainName);
//     form.append('currentLocation', formData.currentLocation);
//     form.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:8001/upload-media', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setMessage(`Complaint submitted successfully! File URL: ${response.data.url}`);
//       setError('');
//     } catch (err) {
//       setError('An error occurred while submitting the complaint. Please try again.');
//       setMessage('');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center text-start">
//         <div className="col-md-8">
//           <h1 className="card-title mb-1 text-center" style={{ fontSize: '3rem' }}>
//             {t('complaint.file_complaint')}
//           </h1>
//           <div className="card shadow-lg border-0 rounded-3" style={{ background: '#f0f7ff' }}>
//             <div className="card-body p-5">
//               <p className="text-muted">{t('complaint.help_resolve')}</p>
//               {message && <Alert variant="success">{message}</Alert>}
//               {error && <Alert variant="danger">{error}</Alert>}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="ticketImage" className="form-label">{t('complaint.upload_ticket_image')}</label>
//                   <div className="input-group">
//                     <input
//                       type="file"
//                       name="ticketImage"
//                       id="ticketImage"
//                       className="form-control"
//                       style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                       onChange={handleTicketImageChange}
                      
//                     />
//                     <button
//                       className="btn btn-outline-secondary"
//                       type="button"
//                       style={{ border: 'none' }}
//                       onClick={handleUploadTicket}
//                     >
//                       <i className="bi bi-upload"></i>
//                     </button>
//                   </div>
//                   <small className="text-muted">{t('complaint.ai_analysis')}</small>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="media" className="form-label">{t('complaint.attach_media')}</label>
//                   <div className="input-group">
//                     <input
//                       type="file"
//                       name="file"
//                       id="media"
//                       className="form-control"
//                       style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                       onChange={handleFileChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">{t('complaint.journey_details')}</label>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="trainNumber" className="form-label">{t('complaint.train_number')}</label>
//                         <input
//                           type="text"
//                           id="trainNumber"
//                           name="trainNo"
//                           className="form-control"
//                           placeholder={t('complaint.enter_train_number')}
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                           value={formData.trainNo}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="pnr" className="form-label">{t('complaint.pnr')}</label>
//                         <input
//                           type="text"
//                           id="pnr"
//                           name="pnrNo"
//                           className="form-control"
//                           placeholder={t('complaint.enter_pnr')}
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                           value={formData.pnrNo}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="CoachNumber" className="form-label">{t('class')}</label>
//                         <input
//                           type="text"
//                           id="CoachNumber"
//                           name="coachNo"
//                           className="form-control"
//                           placeholder={t('complaint.enter_coach_number')}
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                           value={formData.coachNo}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="SeatNumber" className="form-label">{t('complaint.seat_number')}</label>
//                         <input
//                           type="text"
//                           id="SeatNumber"
//                           name="seatNo"
//                           className="form-control"
//                           placeholder={t('complaint.enter_seat_number')}
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                           value={formData.seatNo}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                           <label htmlFor="trainName" className="form-label">{t('complaint.train_name')}</label>
//                           <input
//                             type="text"
//                             id="trainName"
//                             name="trainName"
//                             className="form-control"
//                             value={formData.trainName}
//                             onChange={handleChange}
//                             readOnly
//                           />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="currentLocation" className="form-label">{t('complaint.current_location')}</label>
//                         <input
//                           type="text"
//                           id="currentLocation"
//                           name="currentLocation"
//                           className="form-control"
//                           value={formData.currentLocation}
//                           onChange={handleChange}
//                           readOnly
//                         />
//                       </div>
//                     </div>




//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn w-100 text-black"
//                   style={{ background: '#71b0f4', border: 'none' }}
//                 >
//                   {t('complaint.submit')}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ComplaintForm;







import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-bootstrap';

function ComplaintForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    trainNo: '',
    pnrNo: '',
    seatNo: '',
    coachNo: '',
    trainName: '',
    currentLocation: '',
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [ticketImage, setTicketImage] = useState(null);
  const [ocrData, setOcrData] = useState({ pnrNo: '', trainNo: '', coachNo: '', seatNo: '' });

  useEffect(() => {
    // Automatically set train name and location when train number is filled
    if (formData.trainNo === '12426') { // Use your specific train number here
      setFormData((prevFormData) => ({
        ...prevFormData,
        trainName: 'New Delhi Rajdhani Express',
        currentLocation: 'Kathua',
      }));
    }
  }, [formData.trainNo]);

  const handleTicketImageChange = (e) => {
    setTicketImage(e.target.files[0]);
  };

  const handleUploadTicket = async () => {
    if (!ticketImage) {
      setMessage('Please upload a ticket image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('ticketImage', ticketImage);

      const response = await fetch('http://localhost:8000/ocr-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setOcrData({
          pnrNo: data.pnrNo || '',
          trainNo: data.trainNo || '',
          coachNo: data.coachNo || '',
          seatNo: data.seatNo || '',
        });
        setFormData((prevFormData) => ({
          ...prevFormData,
          pnrNo: data.pnrNo || '',
          trainNo: data.trainNo || '',
          coachNo: data.coachNo || '',
          seatNo: data.seatNo || '',
        }));
        setMessage('Ticket data extracted successfully!');
      } else {
        setMessage('Failed to process ticket image. Please enter details manually.');
      }
    } catch (error) {
      setMessage('Error while uploading the image. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('trainNo', ocrData.trainNo || formData.trainNo);
    form.append('pnrNo', ocrData.pnrNo || formData.pnrNo);
    form.append('seatNo', ocrData.seatNo || formData.seatNo);
    form.append('coachNo', ocrData.coachNo || formData.coachNo);
    form.append('trainName', formData.trainName || formData.trainName); 
    form.append('currentLocation', formData.currentLocation || formData.currentLocation);
    form.append('file', file);

    try {
      const response = await fetch('http://localhost:8001/upload-media', {
        method: 'POST',
        body: form,
       
      });
      if (response.ok) {
        const responseData = await response.json();
        setMessage(`Complaint submitted successfully! File URL: ${responseData.url}`);
        setError('');
      } else {
        const errorData = await response.json();  // Check for more details from the server
        setError(`An error occurred: ${errorData.message || 'Unknown error'}`);
        setMessage('');
      }
    } catch (err) {
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
              <p className="text-muted">{t('complaint.help_resolve')}</p>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="ticketImage" className="form-label">
                    {t('complaint.upload_ticket_image')}
                  </label>
                  <div className="input-group">
                    <input
                      type="file"
                      name="ticketImage"
                      id="ticketImage"
                      className="form-control"
                      style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                      onChange={handleTicketImageChange}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      style={{ border: 'none' }}
                      onClick={handleUploadTicket}
                    >
                      <i className="bi bi-upload"></i>
                    </button>
                  </div>
                  <small className="text-muted">{t('complaint.ai_analysis')}</small>
                </div>

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
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">{t('complaint.journey_details')}</label>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="trainNumber" className="form-label">
                          {t('complaint.train_number')}
                        </label>
                        <input
                          type="text"
                          id="trainNumber"
                          name="trainNo"
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
                        <label htmlFor="pnr" className="form-label">
                          {t('complaint.pnr')}
                        </label>
                        <input
                          type="text"
                          id="pnr"
                          name="pnrNo"
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
                        <label htmlFor="CoachNumber" className="form-label">
                          {t('class')}
                        </label>
                        <input
                          type="text"
                          id="CoachNumber"
                          name="coachNo"
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
                        <label htmlFor="SeatNumber" className="form-label">
                          {t('complaint.seat_number')}
                        </label>
                        <input
                          type="text"
                          id="SeatNumber"
                          name="seatNo"
                          className="form-control"
                          placeholder={t('complaint.enter_seat_number')}
                          style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                          value={formData.seatNo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="trainName" className="form-label">
                          {t('complaint.train_name')}
                        </label>
                        <input
                          type="text"
                          id="trainName"
                          name="trainName"
                          className="form-control"
                          placeholder={t('complaint.enter_train_name')}
                          style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                          value={formData.trainName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="location" className="form-label">
                          {t('complaint.current_location')}
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="currentLocation"
                          className="form-control"
                          placeholder={t('complaint.enter_current_location')}
                          style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                          value={formData.currentLocation}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2 mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ backgroundColor: '#71b0f4', borderColor: '#71b0f4' }}
                  >
                    {t('complaint.submit')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;
