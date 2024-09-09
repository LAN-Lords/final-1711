// import React from "react";
// import "./complaintStatus.css"
// export default function ComplaintStatus() {
//   const status = "Assigned"; // This should be dynamically determined

//   // Define status segments
//   const statusSegments = [
//     { label: "Under Review", color: "bg-warning", description: "Your complaint is currently under review." },
//     { label: "Assigned", color: "bg-primary", description: "Your complaint has been assigned to a responsible official." },
//     { label: "Resolved", color: "bg-success", description: "Your complaint has been resolved." },
//   ];

//   return (
//     <div className="container py-5">
//       <div className="row">
//         <div className="col-md-8 mx-auto ">
//           <h1 className="display-4">Complaint Status</h1>
//           <p className="text-muted">
//             Check the status of your complaint and get in touch with the responsible department.
//           </p>

//           <form>
//             <div className="mb-3">
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

//             <div className="mb-3">
//               <label htmlFor="status" className="form-label">
//                 Complaint Status
//               </label>
//               <div className="position-relative text-start">
//                 <div className="timeline">
//                   {statusSegments.map((segment, index) => (
//                     <div key={index} className="timeline-item d-flex align-items-start">
//                       <div className={`timeline-icon ${segment.color} me-3`}></div>
//                       <div className="timeline-content">
//                         <h5 className="font-weight-bold">{segment.label}</h5>
//                         <p>{segment.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-3">
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

//             <div className="mb-3">
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

//             <div className="mb-3">
//               <label htmlFor="rating" className="form-label">Rating:</label>
//               <div className="d-flex align-items-center">
//                 {[1, 2, 3].map((star) => (
//                   <svg key={star} className="bi bi-star-fill text-primary me-1" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M3.612 15.443l.288 1.7-1.6-1.042-1.518 1.26L0 14.016 3.612 15.443zm4.386-1.742L12 10.9l4.002 2.801 1.283.35-2.102 1.79 1.102 3.651L12 15.292l-3.485 2.242 1.102-3.651L7.998 12.7zm.283-.282-1.519-1.26 1.617 1.038-.098.224z"/>
//                   </svg>
//                 ))}
//                 {[1, 2].map((star) => (
//                   <svg key={star} className="bi bi-star text-muted me-1" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M3.612 15.443l.288 1.7-1.6-1.042-1.518 1.26L0 14.016 3.612 15.443zm4.386-1.742L12 10.9l4.002 2.801 1.283.35-2.102 1.79 1.102 3.651L12 15.292l-3.485 2.242 1.102-3.651L7.998 12.7zm.283-.282-1.519-1.26 1.617 1.038-.098.224z"/>
//                   </svg>
//                 ))}
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-100">
//               Submit Feedback
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";
import './complaintStatus.css'; // Make sure to include your CSS file

export default function ComplaintStatus() {
  const currentStatus = "Resolved"; // This should be dynamically determined

  // Define status segments
  const statusSegments = [
    { label: "Under Review", color: "bg-warning", description: "Your complaint is currently under review." },
    { label: "Assigned", color: "bg-primary", description: "Your complaint has been assigned to a responsible official." },
    { label: "Resolved", color: "bg-success", description: "Your complaint has been resolved." },
  ];

  // Determine if the segment is completed
  const isCompleted = (segmentLabel) => {
    const labels = statusSegments.map(seg => seg.label);
    return labels.indexOf(segmentLabel) <= labels.indexOf(currentStatus);
  };

  return (
    <div className="container py-5">
      <div className="row p-5" style={{ background: '#f0f7ff' }}>
        <div className="col-md-8 mx-auto">
          <h1 className="display-4 heading pb-2">Complaint Status</h1>
          <p className="text-muted" style={{fontSize:'3vh'}}>
            Check the status of your complaint and get in touch with the responsible department.
          </p>

          <form>
            <div className="mb-3 text-start my-5" style={{fontSize:'2.5vh'}}>
              <label htmlFor="complaint-id" className="form-label">
                Complaint ID
              </label>
              <input
                type="text"
                id="complaint-id"
                className="form-control"
                placeholder="Enter your complaint ID"
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="status" className="form-label" style={{fontSize:'2.5vh'}}>
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

            <div className="mb-3 mt-3 py-3 rounded-4" style={{border:'2px solid gray '}}>
              <label htmlFor="contact" className="form-label">
                Contact Details
              </label>
              <p>
                <strong>Responsible Official:</strong> John Doe, Customer Service Manager
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Email:</strong> john.doe@company.com
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

            <button type="submit" className="btn btn-primary w-100" style={{ background: '#71b0f4', border: 'none' ,color:'black'}}>
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
