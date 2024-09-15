// //  multilingual
//  import React, {useState } from 'react';
//  import axios from 'axios';
//  import { useTranslation } from 'react-i18next';
//  import { Alert } from 'react-bootstrap';

//  function ComplaintForm() {
//      const { t } = useTranslation();
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
//      return (
//          <div className="container">
//              <div className="row justify-content-center text-start">
//                  <div className="col-md-8">
//                      <h1 className="card-title mb-1 text-center" style={{ fontSize: '3rem' }}>
//                          {t('complaint.file_complaint')}
//                      </h1>
//                      <div className="card shadow-lg border-0 rounded-3" style={{ background: '#f0f7ff' }}>
//                          <div className="card-body p-5">
//                              <p className="text-muted">
//                                  {t('complaint.help_resolve')}
//                              </p>
//                              {message && <Alert variant="success">{message}</Alert>}
//                              {error && <Alert variant="danger">{error}</Alert>}
//                              <form onSubmit={handleSubmit}>

//                                  <div className="mb-3">
//                                      <label htmlFor="media" className="form-label">{t('complaint.attach_media')}</label>
//                                      <div className="input-group">
//                                          <input
//                                              type="file"
//                                              name="file"
//                                              id="media"
//                                              className="form-control"
//                                              style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                              onChange={handleFileChange}
//                                              required
//                                          />
//                                          <button
//                                              className="btn btn-outline-secondary"
//                                              type="button"
//                                              style={{ border: 'none' }}
//                                          >
//                                              <i className="bi bi-upload"></i>
//                                          </button>
//                                      </div>
//                                      <small className="text-muted">
//                                          {t('complaint.ai_analysis')}
//                                      </small>
//                                  </div>

//                                  <div className="mb-3">
//                                      <label className="form-label">{t('complaint.journey_details')}</label>
//                                      <div className="row">
//                                          <div className="col-md-6">
//                                              <div className="mb-3">
//                                                  <label htmlFor="trainNumber" className="form-label">{t('complaint.train_number')}</label>
//                                                  <input
//                                                      type="text"
//                                                      id="trainNumber"
//                                                      name='trainNo'
//                                                      className="form-control"
//                                                      placeholder={t('complaint.enter_train_number')}
//                                                      style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                                      value={formData.trainNo}
//                                                      onChange={handleChange}
//                                                     required
//                                                  />
//                                              </div>
//                                          </div>
//                                          <div className="col-md-6">
//                                              <div className="mb-3">
//                                                  <label htmlFor="pnr" className="form-label">{t('complaint.pnr')}</label>
//                                                  <input
//                                                      type="text"
//                                                      id="pnr"
//                                                      name='pnrNo'
//                                                      className="form-control"
//                                                      placeholder={t('complaint.enter_pnr')}
//                                                      style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                                      value={formData.pnrNo}
//                                                      onChange={handleChange}
//                                                 />
//                                              </div>
//                                          </div>
//                                          <div className="col-md-6">
//                                              <div className="mb-3">
//                                                  <label htmlFor="CoachNumber" className="form-label">{t('complaint.coach_number')}</label>
//                                                  <input
//                                                      type="text"
//                                                      id="CoachNumber"
//                                                      name='coachNo'
//                                                      className="form-control"
//                                                      placeholder={t('complaint.enter_coach_number')}
//                                                      style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                                      value={formData.coachNo}
//                                                      onChange={handleChange}
//                                                      required
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor="SeatNumber" className="form-label">{t('complaint.seat_number')}</label>
//                                                 <input
//                                                     type="text"
//                                                     id="SeatNumber"
//                                                     name='seatNo'
//                                                     className="form-control"
//                                                     placeholder={t('complaint.enter_seat_number')}
//                                                     style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                                                     value={formData.seatNo}
//                                                     onChange={handleChange}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

                                

//                                 <button
//                                     type="submit"
//                                     className="btn w-100 text-black"
//                                     style={{ background: '#71b0f4', border: 'none' }}
                                    
//                                 >
//                                     {t('complaint.submit')}
//                                  </button>
                                 
//                              </form>
//                          </div>
//                      </div>
//                  </div>
//              </div>
//          </div>
//      );
//  }

//  export default ComplaintForm;






import React, { useState } from 'react';
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
  const [ticketImage, setTicketImage] = useState(null);
  const [ocrData, setOcrData] = useState({ pnrNo: '', trainNo: '', coachNo: '', seatNo: '' });

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
            seatNo: data.seatNo || '',  // Set this in case the seat number is extracted
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
    form.append('file', file);

    try {
      const response = await axios.post('http://localhost:8001/upload-media', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(`Complaint submitted successfully! File URL: ${response.data.url}`);
      setError('');
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
                  <label htmlFor="ticketImage" className="form-label">{t('complaint.upload_ticket_image')}</label>
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
                        <label htmlFor="trainNumber" className="form-label">{t('complaint.train_number')}</label>
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
                        <label htmlFor="pnr" className="form-label">{t('complaint.pnr')}</label>
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
                        <label htmlFor="CoachNumber" className="form-label">{t('class')}</label>
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
                        <label htmlFor="SeatNumber" className="form-label">{t('complaint.seat_number')}</label>
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
