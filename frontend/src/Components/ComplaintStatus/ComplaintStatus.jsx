// import React from "react";
// import './complaintStatus.css'; // Make sure to include your CSS file

// export default function ComplaintStatus() {
//   const currentStatus = "Resolved"; // This should be dynamically determined

//   // Define status segments
//   const statusSegments = [
//     { label: "Under Review", color: "bg-warning", description: "Your complaint is currently under review." },
//     { label: "Assigned", color: "bg-primary", description: "Your complaint has been assigned to a responsible official." },
//     { label: "Resolved", color: "bg-success", description: "Your complaint has been resolved." },
//   ];


  


//   // Determine if the segment is completed
//   const isCompleted = (segmentLabel) => {
//     const labels = statusSegments.map(seg => seg.label);
//     return labels.indexOf(segmentLabel) <= labels.indexOf(currentStatus);
//   };

//   return (
//     <div className="container py-5">
//       <div className="row p-5" style={{ background: '#f0f7ff' }}>
//         <div className="col-md-8 mx-auto">
//           <h1 className="display-4 heading pb-2">Complaint Status</h1>
//           <p className="text-muted" style={{fontSize:'3vh'}}>
//             Check the status of your complaint and get in touch with the responsible department.
//           </p>

//           <form>
//             <div className="mb-3 text-start my-5" style={{fontSize:'2.5vh'}}>
//               <label htmlFor="complaint-id" className="form-label">
//                 Complaint ID
//               </label>
//               <input
//                 type="text"
//                 id="complaint-id"
//                 className="form-control"
//                 placeholder="Enter your complaint ID"
//               />
//             </div>

//             <div className="mb-3 text-start">
//               <label htmlFor="status" className="form-label" style={{fontSize:'2.5vh'}}>
//                 Complaint Status
//               </label>
//               <div className="position-relative my-2 py-2 pb-3">
//                 <div className="timeline">
//                   {statusSegments.map((segment, index) => (
//                     <div key={index} className="timeline-item d-flex align-items-start">
//                       <div
//                         className={`timeline-icon ${isCompleted(segment.label) ? segment.color : 'bg-secondary'} me-3`}
//                       ></div>
//                       <div className="timeline-content">
//                         <h5 className="font-weight-bold">{segment.label}</h5>
//                         <p>{segment.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-3 mt-3 py-3 rounded-4" style={{border:'2px solid gray '}}>
//               <label htmlFor="contact" className="form-label">
//                 Contact Details
//               </label>
//               <p>
//                 <strong>Responsible Official:</strong> John Doe, Customer Service Manager
//               </p>
//               <p>
//                 <strong>Phone:</strong> +1 (555) 123-4567
//               </p>
//               <p>
//                 <strong>Email:</strong> john.doe@company.com
//               </p>
//             </div>

//             <div className="mb-3 mt-3">
//               <label htmlFor="feedback" className="form-label">
//                 Feedback
//               </label>
//               <textarea
//                 id="feedback"
//                 className="form-control"
//                 rows="4"
//                 placeholder="Share your feedback on the complaint resolution process..."
//               ></textarea>
//             </div>

//             <button type="submit" className="btn btn-primary w-100" style={{ background: '#71b0f4', border: 'none' ,color:'black'}}>
//               Submit Feedback
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import axios from "axios"; // Import axios
// import './complaintStatus.css'; // Make sure to include your CSS file

// export default function ComplaintStatus() {
//   const [complaintId, setComplaintId] = useState("");
//   const [complaintData, setComplaintData] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const statusSegments = [
//     { label: "Under Review", color: "bg-warning", description: "Your complaint is currently under review." },
//     { label: "Assigned", color: "bg-primary", description: "Your complaint has been assigned to a responsible official." },
//     { label: "Resolved", color: "bg-success", description: "Your complaint has been resolved." },
//   ];

//   const isCompleted = (segmentLabel) => {
//     const labels = statusSegments.map(seg => seg.label);
//     return labels.indexOf(segmentLabel) <= labels.indexOf(complaintData?.status);
//   };

//   const fetchComplaintStatus = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.get(`http://localhost:8001/complaintstatus/${complaintId}`);

//       setComplaintData(response.data);
//     } catch (error) {
//       setError(error.response ? error.response.data.message : error.message);
//       setComplaintData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="row p-5" style={{ background: '#f0f7ff' }}>
//         <div className="col-md-8 mx-auto">
//           <h1 className="display-4 heading pb-2">Complaint Status</h1>
//           <p className="text-muted" style={{ fontSize: '3vh' }}>
//             Check the status of your complaint and get in touch with the responsible department.
//           </p>

//           <form onSubmit={fetchComplaintStatus}>
//             <div className="mb-3 text-start my-5" style={{ fontSize: '2.5vh' }}>
//               <label htmlFor="complaint-id" className="form-label">
//                 Complaint ID
//               </label>
//               <input
//                 type="text"
//                 id="complaint-id"
//                 className="form-control"
//                 placeholder="Enter your complaint ID"
//                 value={complaintId}
//                 onChange={(e) => setComplaintId(e.target.value)}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary w-100" disabled={loading} style={{ background: '#71b0f4', border: 'none', color: 'black' }}>
//               {loading ? 'Loading...' : 'Check Status'}
//             </button>
//           </form>

//           {error && <p className="text-danger mt-3">{error}</p>}

//           {complaintData && (
//             <div>
//               <div className="mb-3 text-start mt-4">
//                 <label htmlFor="status" className="form-label" style={{ fontSize: '2.5vh' }}>
//                   Complaint Status
//                 </label>
//                 <div className="position-relative my-2 py-2 pb-3">
//                   <div className="timeline">
//                     {statusSegments.map((segment, index) => (
//                       <div key={index} className="timeline-item d-flex align-items-start">
//                         <div
//                           className={`timeline-icon ${isCompleted(segment.label) ? segment.color : 'bg-secondary'} me-3`}
//                         ></div>
//                         <div className="timeline-content">
//                           <h5 className="font-weight-bold">{segment.label}</h5>
//                           <p>{segment.description}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-3 mt-3 py-3 rounded-4" style={{ border: '2px solid gray ' }}>
//                 <label htmlFor="contact" className="form-label">
//                   Contact Details
//                 </label>
//                 <p>
//                   <strong>Responsible Official:</strong> {complaintData.responsibleOfficial.name}
//                 </p>
//                 <p>
//                   <strong>Phone:</strong> {complaintData.responsibleOfficial.phone}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {complaintData.responsibleOfficial.email}
//                 </p>
//               </div>

//               <div className="mb-3 mt-3">
//                 <label htmlFor="feedback" className="form-label">
//                   Feedback
//                 </label>
//                 <textarea
//                   id="feedback"
//                   className="form-control"
//                   rows="4"
//                   placeholder="Share your feedback on the complaint resolution process..."
//                 ></textarea>
//               </div>

//               <button type="submit" className="btn btn-primary w-100" style={{ background: '#71b0f4', border: 'none', color: 'black' }}>
//                 Submit Feedback
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import axios from "axios"; // Import axios
import './complaintStatus.css'; // Make sure to include your CSS file

export default function ComplaintStatus() {
  const [complaintId, setComplaintId] = useState("");
  const [complaintData, setComplaintData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const statusSegments = [
    { label: "Under Review", color: "bg-warning", description: "Your complaint is currently under review." },
    { label: "Assigned", color: "bg-primary", description: "Your complaint has been assigned to a responsible official." },
    { label: "Resolved", color: "bg-success", description: "Your complaint has been resolved." },
  ];

  const isCompleted = (segmentLabel) => {
    const labels = statusSegments.map(seg => seg.label);
    return labels.indexOf(segmentLabel) <= labels.indexOf(complaintData?.status);
  };

  const fetchComplaintStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:8001/complaintstatus/${complaintId}`);
      setComplaintData(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      setComplaintData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row p-5" style={{ background: '#f0f7ff' }}>
        <div className="col-md-8 mx-auto">
          <h1 className="display-4 heading pb-2">Complaint Status</h1>
          <p className="text-muted" style={{ fontSize: '3vh' }}>
            Check the status of your complaint and get in touch with the responsible department.
          </p>

          <form onSubmit={fetchComplaintStatus}>
            <div className="mb-3 text-start my-5" style={{ fontSize: '2.5vh' }}>
              <label htmlFor="complaint-id" className="form-label">
                Complaint ID
              </label>
              <input
                type="text"
                id="complaint-id"
                className="form-control"
                placeholder="Enter your complaint ID"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading} style={{ background: '#71b0f4', border: 'none', color: 'black' }}>
              {loading ? 'Loading...' : 'Check Status'}
            </button>
          </form>

          {error && <p className="text-danger mt-3">{error}</p>}

          {complaintData && (
            <div>
              <div className="mb-3 text-start mt-4">
                <label htmlFor="status" className="form-label" style={{ fontSize: '2.5vh' }}>
                  Complaint Status
                </label>
                <div className="position-relative my-2 py-2 pb-3">
                  <div className="timeline">
                    {statusSegments.map((segment, index) => (
                      <div key={index} className="timeline-item d-flex align-items-start">
                        <div
                          className={`timeline-icon ${isCompleted(segment.label) ? segment.color : 'bg-secondary'} me-3`}
                        ></div>
                        <div className="timeline-content">
                          <h5 className="font-weight-bold">{segment.label}</h5>
                          <p>{segment.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-3 mt-3 py-3 rounded-4" style={{ border: '2px solid gray ' }}>
                <label htmlFor="complaint-details" className="form-label">
                  Complaint Details
                </label>
                <p>
                  <strong>Train No:</strong> {complaintData.trainNo}
                </p>
                <p>
                  <strong>PNR No:</strong> {complaintData.pnrNo}
                </p>
                <p>
                  <strong>Coach No:</strong> {complaintData.coachNo}
                </p>
                <p>
                  <strong>Seat No:</strong> {complaintData.seatNo}
                </p>
                <p>
                  <strong>Department:</strong> {complaintData.department}
                </p>
              </div>

              <div className="mb-3 mt-3">
                <label htmlFor="feedback" className="form-label">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  className="form-control"
                  rows="4"
                  placeholder="Share your feedback on the complaint resolution process..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100" style={{ background: '#71b0f4', border: 'none', color: 'black' }}>
                Submit Feedback
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
