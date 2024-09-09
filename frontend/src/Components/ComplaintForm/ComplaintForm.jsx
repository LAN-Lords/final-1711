// import React, { useEffect, useState } from 'react';

// function ComplaintForm() {
//     cosnt [trainNumber,setTrainNumber]=useState('');
//     const [pnr,setPnr]=useState('');
//     cosnt [startStation,setStartStation]=useState('');
//     cosnt [endStation,setEndStation]=useState('');
//     cosnt [currentStation,setCurrentStation]=useState('');
//     const [error, setError] = useState('');

//     const handleFetchTrainDetails=async()=>{
//         try{
//              const response =await axios.get(`https://rappid.in/apis/train.php?train_no=${trainNumber}`);
//              if(response.success){
//                 const totalStations=response.totalStations.data.length();
//                 setStartStation(data[0].station_name)
//                 setEndStation(data[totalStations-1].station_name)
//                 for(let i=0; i<totalStations; i++){
//                     if(data[i].distance==='-' && data[i+1].distance!=='-'){
//                         setCurrentStation(data[i].station_name)
//                         break;
//                     }
//                 }
//              }else {
//                 setError('Train details not found.');
//               }
//             } catch (error) {
//               setError('Error fetching train details.');
//             }
//     }
//     useEffect(()=>{
//         if(trainNumber===5){
//             handleFetchTrainDetails();
//         }
//     },[trainNumber])
//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center text-start">
//         <div className="col-md-8">
//           <div className="card shadow-lg border-0 rounded-3" style={{ background: '#f0f7ff' }}>
//             <div className="card-body p-5">
//               <h1 className="card-title mb-4">File a Complaint</h1>
//               <p className="text-muted">
//                 We're here to help resolve your issue. Follow the steps below to submit your complaint.
//               </p>
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="issueType" className="form-label">What's the issue?</label>
//                   <select
//                     id="issueType"
//                     className="form-select"
//                     style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                   >
//                     <option>Select issue type</option>
//                     <option value="train-condition">Train Condition</option>
//                     <option value="catering">Catering</option>
//                     <option value="staff-behavior">Staff Behavior</option>
//                     <option value="ticket-booking">Ticket Booking</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="media" className="form-label">Attach Media (optional)</label>
//                   <div className="input-group">
//                     <input
//                       type="file"
//                       id="media"
//                       className="form-control"
//                       multiple
//                       style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                     />
//                     <button
//                       className="btn btn-outline-secondary"
//                       type="button"
//                       style={{ border: 'none' }}
//                     >
//                       <i className="bi bi-upload"></i>
//                     </button>
//                   </div>
//                   <small className="text-muted">
//                     The AI will analyze your media and suggest the appropriate category.
//                   </small>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Journey Details</label>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="trainNumber" className="form-label">Train Number</label>
//                         <input
//                           type="text"
//                           id="trainNumber"
//                           className="form-control"
//                           placeholder="Enter train number"
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="pnr" className="form-label">PNR</label>
//                         <input
//                           type="text"
//                           id="pnr"
//                           className="form-control"
//                           placeholder="Enter PNR"
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="startStation" className="form-label">Start Station</label>
//                         <input
//                           type="text"
//                           id="startStation"
//                           className="form-control"
//                           placeholder="Enter start station"
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="endStation" className="form-label">End Station</label>
//                         <input
//                           type="text"
//                           id="endStation"
//                           className="form-control"
//                           placeholder="Enter end station"
//                           style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <small className="text-muted">
//                     The AI will automatically fill in these details based on your IRCTC account.
//                   </small>
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="description" className="form-label">Describe the issue</label>
//                   <textarea
//                     id="description"
//                     className="form-control"
//                     rows="5"
//                     placeholder="Provide details about your complaint..."
//                     style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn w-100 text-black"
//                   style={{ background: '#71b0f4', border: 'none' }}
//                 >
//                   Submit Complaint
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ComplaintForm() {
    const [trainNumber, setTrainNumber] = useState('');
    const [pnr, setPnr] = useState('');
    const [startStation, setStartStation] = useState('');
    const [endStation, setEndStation] = useState('');
    const [currentStation, setCurrentStation] = useState('');
    const [error, setError] = useState('');

    const handleFetchTrainDetails = async () => {
        try {
            const response = await axios.get(`https://rappid.in/apis/train.php?train_no=${trainNumber}`);
            console.log('API Response:', response.data); // Log the API response
            
            if (response.data.success) {
                const data = response.data.totalStations.data;
                const totalStations = data.length;

                console.log('Train Data:', data); // Log the train data

                setStartStation(data[0].station_name);
                setEndStation(data[totalStations - 1].station_name);

                for (let i = 0; i < totalStations; i++) {
                    if (data[i].distance === '-' && data[i + 1].distance !== '-') {
                        setCurrentStation(data[i].station_name);
                        break;
                    }
                }
            } else {
                setError('Train details not found.');
            }
        } catch (error) {
            setError('Error fetching train details.');
            console.error('Fetch Error:', error); // Log any errors
        }
    }

    useEffect(() => {
        if (trainNumber.length === 5) {
            handleFetchTrainDetails();
        }
    }, [trainNumber]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center text-start">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-3" style={{ background: '#f0f7ff' }}>
                        <div className="card-body p-5">
                            <h1 className="card-title mb-4">File a Complaint</h1>
                            <p className="text-muted">
                                We're here to help resolve your issue. Follow the steps below to submit your complaint.
                            </p>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="issueType" className="form-label">What's the issue?</label>
                                    <select
                                        id="issueType"
                                        className="form-select"
                                        style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                    >
                                        <option>Select issue type</option>
                                        <option value="train-condition">Train Condition</option>
                                        <option value="catering">Catering</option>
                                        <option value="staff-behavior">Staff Behavior</option>
                                        <option value="ticket-booking">Ticket Booking</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="media" className="form-label">Attach Media (optional)</label>
                                    <div className="input-group">
                                        <input
                                            type="file"
                                            id="media"
                                            className="form-control"
                                            multiple
                                            style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
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
                                                    value={trainNumber}
                                                    onChange={(e) => setTrainNumber(e.target.value)}
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
                                                    value={pnr}
                                                    onChange={(e) => setPnr(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="startStation" className="form-label">Start Station</label>
                                                <input
                                                    type="text"
                                                    id="startStation"
                                                    className="form-control"
                                                    placeholder="Enter start station"
                                                    style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                                    value={startStation}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="endStation" className="form-label">End Station</label>
                                                <input
                                                    type="text"
                                                    id="endStation"
                                                    className="form-control"
                                                    placeholder="Enter end station"
                                                    style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                                    value={endStation}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <small className="text-muted">
                                        The AI will automatically fill in these details based on your IRCTC account.
                                    </small>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="description" className="form-label">Describe the issue</label>
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        rows="5"
                                        placeholder="Provide details about your complaint..."
                                        style={{ borderRadius: '10px', borderColor: '#71b0f4' }}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100 text-black"
                                    style={{ background: '#71b0f4', border: 'none' }}
                                >
                                    Submit Complaint
                                </button>
                            </form>
                            {error && <p className="text-danger mt-3">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComplaintForm;
