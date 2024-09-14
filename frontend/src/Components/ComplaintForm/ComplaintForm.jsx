import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ComplaintForm() {
    const [trainNo, setTrainNo] = useState('');
    const [pnrNo, setPnrNo] = useState('');
    const [media, setMedia] = useState(null);
    const [coachNo, setCoachNo] = useState('');
    const [seatNo, setSeatNo] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mediaUrl, setMediaUrl] = useState(''); // Track single media URL
    const [isFileUploaded, setIsFileUploaded] = useState(true); // Track file upload status
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (e) => {
        setMedia(e.target.files[0]); // Expecting a single file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        // Step 1: Upload media file to S3 via Node.js backend
        let mediaUrl = '';
        if (media) {
            const formData = new FormData();
            formData.append('file', media);
    
            try {
                const response = await axios.post('http://localhost:8001/upload-media', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                mediaUrl = response.data.url;
            } catch (error) {
                console.error('Error uploading file:', error);
                setIsSubmitting(false);
                return; // Stop further processing
            }
        }
    
        // Step 2: Send complaint details to the backend for ML model analysis and MongoDB storage
        const complaintData = { trainNo, pnrNo, mediaUrl, coachNo, seatNo, description };
    
        try {
            const res = await axios.post('http://localhost:8001/submit-complaint', complaintData);
            const { complaint_description, category } = res.data;
            console.log('ML model analysis result:', complaint_description);
            console.log('ML model category:', category);
    
            // Show success message
            setSuccessMessage('Complaint submitted successfully!');
        } catch (err) {
            console.error('Error submitting complaint:', err);
        } finally {
            setIsSubmitting(false);
        }
    };
    

    useEffect(() => {
        if (isFileUploaded && isSubmitting) {
            // Step 2: Send complaint details to the backend for ML model analysis and MongoDB storage
            const complaintData = { trainNo, pnrNo, mediaUrl, coachNo, seatNo, description };

            axios.post('http://localhost:8001/submit-complaint', complaintData)
                .then((res) => {
                    const { complaint_description, category } = res.data;
                    console.log('ML model analysis result:', complaint_description);
                    console.log('ML model category:', category);

                    // Show success or take further actions with the response
                    setIsSubmitting(false);
                    console.log("Complaint submitted successfully:", res.data);
                    setSuccessMessage('Complaint submitted successfully!');

                })
                .catch(err => {
                    console.error('Error running ML model:', err);
                    setIsSubmitting(false);
                });
        }
    }, [isFileUploaded]);

    return (
        <div className="container ">
            <div className="row justify-content-center text-start">
                <div className="col-md-8">
                    <h1 className="card-title mb-1 text-center" style={{ fontSize: '3rem' }}>File a Complaint</h1>
                    <div className="card shadow-lg border-0 rounded-3" style={{ background: '#f0f7ff' }}>
                        <div className="card-body p-5">
                            <p className="text-muted">
                                We're here to help resolve your issue. Follow the steps below to submit your complaint.
                            </p>
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="media" className="form-label">Attach Media (optional)</label>
                                    <div className="input-group">
                                        <input
                                            type="file"
                                            id="media"
                                            className="form-control"
                                            style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                            onChange={handleFileChange}
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
                                        The AI will analyze your media and suggest the appropriate category.
                                    </small>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Journey Details</label>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="trainNumber" className="form-label">Train Number</label>
                                                <input
                                                    type="text"
                                                    id="trainNumber"
                                                    className="form-control"
                                                    placeholder="Enter train number"
                                                    style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                                    value={trainNo}
                                                    onChange={(e) => setTrainNo(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="pnr" className="form-label">PNR</label>
                                                <input
                                                    type="text"
                                                    id="pnr"
                                                    className="form-control"
                                                    placeholder="Enter PNR"
                                                    style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                                    value={pnrNo}
                                                    onChange={(e) => setPnrNo(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="CoachNumber" className="form-label">Coach Number</label>
                                                <input
                                                    type="text"
                                                    id="CoachNumber"
                                                    className="form-control"
                                                    placeholder="Enter Coach Number"
                                                    style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                                    value={coachNo}
                                                    onChange={(e) => setCoachNo(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="SeatNumber" className="form-label">Seat Number</label>
                                                <input
                                                    type="text"
                                                    id="SeatNumber"
                                                    className="form-control"
                                                    placeholder="Enter Seat Number"
                                                    style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                                    value={seatNo}
                                                    onChange={(e) => setSeatNo(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="description" className="form-label">Describe the issue</label>
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        rows="5"
                                        placeholder="Provide details about your complaint..."
                                        style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100 text-black"
                                    style={{ background: '#71b0f4', border: 'none' }}
                                    disabled={isSubmitting || !isFileUploaded}
                                >
                                    Submit Complaint
                                </button>
                                {successMessage && (
                                    <div className="alert alert-success mt-3" role="alert" style={{ color: 'green' }}>
                                        {successMessage}
                                    </div>
                                )}
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
// import axios from 'axios';

// function ComplaintForm() {
//     const [trainNo, setTrainNo] = useState('');
//     const [pnrNo, setPnrNo] = useState('');
//     const [media, setMedia] = useState(null);
//     const [coachNo, setCoachNo] = useState('');
//     const [seatNo, setSeatNo] = useState('');
//     const [description, setDescription] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleFileChange = (e) => {
//         setMedia(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setErrorMessage('');
//         setSuccessMessage('');

//         try {
//             // Step 1: Upload media if file exists
//             let mediaUrl = '';
//             if (media) {
//                 const formData = new FormData();
//                 formData.append('file', media);

//                 const response = await axios.post('http://localhost:8001/upload-media', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//                 mediaUrl = response.data.url; // Get the URL from the response
//             }

//             // Step 2: Submit the complaint form
//             const complaintData = {
//                 trainNo,
//                 pnrNo,
//                 mediaUrl,
//                 coachNo,
//                 seatNo,
//                 description
//             };

//             const res = await axios.post('http://localhost:8001/submit-complaint', complaintData);
//             setSuccessMessage('Complaint submitted successfully!');
//         } catch (error) {
//             setErrorMessage('Error submitting the complaint. Please try again.');
//             console.error('Error:', error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-8">
//                     <h1 className="text-center">File a Complaint</h1>
//                     <form onSubmit={handleSubmit} className="card p-4 shadow-lg border-0 rounded-3">
//                         <div className="mb-3">
//                             <label htmlFor="trainNo" className="form-label">Train Number</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="trainNo"
//                                 value={trainNo}
//                                 onChange={(e) => setTrainNo(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="pnrNo" className="form-label">PNR Number (optional)</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="pnrNo"
//                                 value={pnrNo}
//                                 onChange={(e) => setPnrNo(e.target.value)}
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="coachNo" className="form-label">Coach Number</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="coachNo"
//                                 value={coachNo}
//                                 onChange={(e) => setCoachNo(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="seatNo" className="form-label">Seat Number (optional)</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="seatNo"
//                                 value={seatNo}
//                                 onChange={(e) => setSeatNo(e.target.value)}
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="media" className="form-label">Attach Media (optional)</label>
//                             <input
//                                 type="file"
//                                 className="form-control"
//                                 id="media"
//                                 onChange={handleFileChange}
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="description" className="form-label">Describe the issue</label>
//                             <textarea
//                                 className="form-control"
//                                 id="description"
//                                 rows="4"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 required
//                             ></textarea>
//                         </div>

//                         {errorMessage && <p className="text-danger">{errorMessage}</p>}
//                         {successMessage && <p className="text-success">{successMessage}</p>}

//                         <button
//                             type="submit"
//                             className="btn btn-primary w-100"
//                             disabled={isSubmitting}
//                         >
//                             {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ComplaintForm;
