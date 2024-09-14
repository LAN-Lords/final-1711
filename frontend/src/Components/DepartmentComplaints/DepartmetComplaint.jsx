// import { useState } from 'react';
// import { Button, Card, Modal, Form, Badge, Pagination, Spinner, Image } from 'react-bootstrap';

// const departments = [
//   { id: 1, name: "Cleanliness Department" },
//   { id: 2, name: "Maintenance and Infrastructure Department" },
//   { id: 3, name: "Security and Safety Department" },
//   { id: 4, name: "Signage and Communication Department" },
//   { id: 5, name: "General/Miscellaneous Department" },
// ];

// export default function DepartmentPage() {
//   const [selectedDepartment, setSelectedDepartment] = useState(departments[0].name);
//   const [complaints, setComplaints] = useState([]);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [resolutionText, setResolutionText] = useState('');
//   const [resolutionImage, setResolutionImage] = useState(null);
//   const [transferDepartment, setTransferDepartment] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const complaintsPerPage = 5;
//   const [showResolveModal, setShowResolveModal] = useState(false);
//   const [showTransferModal, setShowTransferModal] = useState(false);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const filteredComplaints = complaints.filter(complaint => complaint.category === selectedDepartment);
//   const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
//   const indexOfLastComplaint = currentPage * complaintsPerPage;
//   const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
//   const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

//   const handleResolve = () => {
//     console.log(`Resolving complaint ${selectedComplaint.id} with text: ${resolutionText} and image: ${resolutionImage}`);
//     // Here you would typically send this data to your backend
//     setShowResolveModal(false);
//     setSelectedComplaint(null);
//   }

//   const handleTransfer = () => {
//     console.log(`Transferring complaint ${selectedComplaint.id} to department: ${transferDepartment}`);
//     // Here you would typically send this data to your backend
//     setShowTransferModal(false);
//     setSelectedComplaint(null);
//   }

//   const handleReportIrrelevance = () => {
//     console.log(`Reporting complaint ${selectedComplaint.id} as irrelevant`);
//     // Here you would typically send this data to your backend
//     setShowReportModal(false);
//     setSelectedComplaint(null);
//   }

//   return (
//     <div className="container mt-4">
//       <header className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
//         <h1 className="h3 font-weight-bold">Indian Railways Complaint Management</h1>
//         <div className="d-flex align-items-center gap-3">
//           <Badge pill variant="outline-dark" className="d-flex align-items-center py-2">
//             <i className="fas fa-train mr-2"></i> Complaint Dashboard
//           </Badge>
//           <Form.Control as="select" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
//             {departments.map((dept) => (
//               <option key={dept.id} value={dept.name}>
//                 {dept.name}
//               </option>
//             ))}
//           </Form.Control>
//         </div>
//       </header>
      
//       <div className="row">
//         <div className="col-md-6">
//           <Card>
//             <Card.Header>
//               <Card.Title>Complaints List</Card.Title>
//               <Card.Subtitle>All complaints for {selectedDepartment} department</Card.Subtitle>
//             </Card.Header>
//             <Card.Body>
//               <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
//                 {currentComplaints.map((complaint) => (
//                   <Card key={complaint.id} className="mb-3">
//                     <Card.Header>
//                       <Card.Title className="h5">{complaint.title}</Card.Title>
//                       <Card.Subtitle>{complaint.description}</Card.Subtitle>
//                     </Card.Header>
//                     <Card.Body>
//                       <Badge variant={complaint.status === 'Open' ? 'danger' : 'secondary'}>
//                         {complaint.status}
//                       </Badge>
//                     </Card.Body>
//                     <Card.Footer>
//                       <Button variant="outline-dark" onClick={() => setSelectedComplaint(complaint)}>
//                         <i className="fas fa-eye mr-2"></i> View Details
//                       </Button>
//                     </Card.Footer>
//                   </Card>
//                 ))}
//               </div>
//             </Card.Body>
//             <Card.Footer>
//               <Pagination>
//                 <Pagination.Prev
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                 />
//                 {[...Array(totalPages)].map((_, i) => (
//                   <Pagination.Item key={i} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
//                     {i + 1}
//                   </Pagination.Item>
//                 ))}
//                 <Pagination.Next
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                 />
//               </Pagination>
//             </Card.Footer>
//           </Card>
//         </div>

//         <div className="col-md-6">
//           <Card>
//             <Card.Header>
//               <Card.Title>Complaint Details</Card.Title>
//               <Card.Subtitle>
//                 {selectedComplaint ? `Details for complaint: ${selectedComplaint.title}` : 'Select a complaint to view details'}
//               </Card.Subtitle>
//             </Card.Header>
//             <Card.Body>
//               {selectedComplaint ? (
//                 <div className="space-y-4">
//                   <div>
//                     <h5>Description:</h5>
//                     <p>{selectedComplaint.description}</p>
//                   </div>
//                   <div>
//                     <h5>AI Summary:</h5>
//                     <p>{selectedComplaint.aiSummary}</p>
//                   </div>
//                   <div className="row">
//                     <div className="col-6">
//                       <h5>Train No:</h5>
//                       <p>{selectedComplaint.trainNo}</p>
//                     </div>
//                     <div className="col-6">
//                       <h5>PNR:</h5>
//                       <p>{selectedComplaint.pnr}</p>
//                     </div>
//                     <div className="col-6">
//                       <h5>Coach No:</h5>
//                       <p>{selectedComplaint.coachNo}</p>
//                     </div>
//                     <div className="col-6">
//                       <h5>Status:</h5>
//                       <Badge variant={selectedComplaint.status === 'Open' ? 'danger' : 'secondary'}>
//                         {selectedComplaint.status}
//                       </Badge>
//                     </div>
//                   </div>
//                   <div>
//                     <h5>Complaint Image:</h5>
//                     <Image 
//                       src={selectedComplaint.image} 
//                       alt="Complaint Image" 
//                       thumbnail 
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <p>No complaint selected. Please choose a complaint from the list to view its details.</p>
//               )}
//             </Card.Body>
//             {selectedComplaint && (
//               <Card.Footer className="d-flex justify-content-between">
//                 <Button variant="outline-success" onClick={() => setShowResolveModal(true)}>
//                   <i className="fas fa-upload mr-2"></i> Resolve
//                 </Button>
//                 <Button variant="outline-secondary" onClick={() => setShowTransferModal(true)}>
//                   <i className="fas fa-paper-plane mr-2"></i> Transfer
//                 </Button>
//                 <Button variant="outline-danger" onClick={() => setShowReportModal(true)}>
//                   <i className="fas fa-exclamation-triangle mr-2"></i> Report Irrelevance
//                 </Button>
//               </Card.Footer>
//             )}
//           </Card>
//         </div>
//       </div>

//       <Modal show={showResolveModal} onHide={() => setShowResolveModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Resolve Complaint</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="resolution">
//               <Form.Label>Resolution Text</Form.Label>
//               <Form.Control 
//                 as="textarea" 
//                 rows={3} 
//                 value={resolutionText} 
//                 onChange={(e) => setResolutionText(e.target.value)} 
//               />
//             </Form.Group>
//             <Form.Group controlId="resolutionImage">
//               <Form.Label>Resolution Image</Form.Label>
//               <Form.Control 
//                 type="file" 
//                 onChange={(e) => setResolutionImage(e.target.files[0])} 
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowResolveModal(false)}>
//             Close
//           </Button>
//           <Button variant="success" onClick={handleResolve}>
//             Resolve
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showTransferModal} onHide={() => setShowTransferModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Transfer Complaint</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="transferDepartment">
//               <Form.Label>Transfer To Department</Form.Label>
//               <Form.Control 
//                 as="select" 
//                 value={transferDepartment} 
//                 onChange={(e) => setTransferDepartment(e.target.value)}
//               >
//                 {departments.map((dept) => (
//                   <option key={dept.id} value={dept.name}>
//                     {dept.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowTransferModal(false)}>
//             Close
//           </Button>
//           <Button variant="secondary" onClick={handleTransfer}>
//             Transfer
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Report Complaint Irrelevance</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Are you sure you want to report this complaint as irrelevant? This action cannot be undone.</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowReportModal(false)}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={handleReportIrrelevance}>
//             Report
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }










// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Card, Modal, Form, Badge, Pagination, Spinner, Image } from 'react-bootstrap';

// const departments = [
//   { id: 1, name: "Cleanliness Department" },
//   { id: 2, name: "Maintenance and Infrastructure Department" },
//   { id: 3, name: "Security and Safety Department" },
//   { id: 4, name: "Signage and Communication Department" },
//   { id: 5, name: "General/Miscellaneous Department" },
// ];

// export default function DepartmentPage() {
//   const [selectedDepartment, setSelectedDepartment] = useState(departments[0].name);
//   const [complaints, setComplaints] = useState([]);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [resolutionText, setResolutionText] = useState('');
//   const [resolutionImage, setResolutionImage] = useState(null);
//   const [transferDepartment, setTransferDepartment] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const complaintsPerPage = 5;
//   const [showResolveModal, setShowResolveModal] = useState(false);
//   const [showTransferModal, setShowTransferModal] = useState(false);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [loading, setLoading] = useState(true);
  
//   // Fetch complaints from backend
//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const response = await axios.get('http://localhost:8001/complaintslogs/all'); // Update the URL to match your API endpoint
//         setComplaints(response.data);
//         console.log(response.data);
//         console.log(complaints);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching complaints:', error);
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   const filteredComplaints = complaints.filter(complaint => complaint.department === selectedDepartment);
//   const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
//   const indexOfLastComplaint = currentPage * complaintsPerPage;
//   const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
//   const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

//   const handleResolve = async () => {
//     try {
//       console.log(`Resolving complaint ${selectedComplaint.id} with text: ${resolutionText} and image: ${resolutionImage}`);
//       // Send resolution data to backend
//       const formData = new FormData();
//       formData.append('resolutionText', resolutionText);
//       if (resolutionImage) {
//         formData.append('file', resolutionImage);
//       }
//       await axios.post(`http://localhost:8001/resolve-complaint/${selectedComplaint.id}`, formData,{
//         headers: {
//         'Content-Type': 'multipart/form-data',  // Required for file uploads
//       },
//       });
//       setShowResolveModal(false);
//       setSelectedComplaint(null);
//     } catch (error) {
//       console.error('Error resolving complaint:', error);
//     }
//   };

//   const handleTransfer = async () => {
//     try {
//       console.log(`Transferring complaint ${selectedComplaint.id} to department: ${transferDepartment}`);
//       // Send transfer data to backend
//       await axios.post(`/complaints/${selectedComplaint.id}/transfer`, { department: transferDepartment });
//       setShowTransferModal(false);
//       setSelectedComplaint(null);
//     } catch (error) {
//       console.error('Error transferring complaint:', error);
//     }
//   };

//   const handleReportIrrelevance = async () => {
//     try {
//       console.log(`Reporting complaint ${selectedComplaint.id} as irrelevant`);
//       // Send report data to backend
//       await axios.post(`/complaints/${selectedComplaint.id}/report`);
//       setShowReportModal(false);
//       setSelectedComplaint(null);
//     } catch (error) {
//       console.error('Error reporting complaint:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <header className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
//         <h1 className="h3 font-weight-bold">Indian Railways Complaint Management</h1>
//         <div className="d-flex align-items-center gap-3">
//           <Badge pill variant="outline-dark" className="d-flex align-items-center py-2">
//             <i className="fas fa-train mr-2"></i> Complaint Dashboard
//           </Badge>
//           <Form.Control as="select" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
//             {departments.map((dept) => (
//               <option key={dept.id} value={dept.name}>
//                 {dept.name}
//               </option>
//             ))}
//           </Form.Control>
//         </div>
//       </header>
      
//       <div className="row">
//         <div className="col-md-6">
//           <Card>
//             <Card.Header>
//               <Card.Title>Complaints List</Card.Title>
//               <Card.Subtitle>All complaints for {selectedDepartment} department</Card.Subtitle>
//             </Card.Header>
//             <Card.Body>
//               {loading ? (
//                 <Spinner animation="border" />
//               ) : (
//                 <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
//                   {currentComplaints.map((complaint) => (
//                     <Card key={complaint.id} className="mb-3">
//                       <Card.Header>
//                         <Card.Title className="h5">{complaint.title}</Card.Title>
//                         <Card.Subtitle>{complaint.description}</Card.Subtitle>
//                       </Card.Header>
//                       <Card.Body>
//                         <Badge variant={complaint.status === 'Open' ? 'danger' : 'secondary'}>
//                           {complaint.status}
//                         </Badge>
//                       </Card.Body>
//                       <Card.Footer>
//                         <Button variant="outline-dark" onClick={() => setSelectedComplaint(complaint)}>
//                           <i className="fas fa-eye mr-2"></i> View Details
//                         </Button>
//                       </Card.Footer>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </Card.Body>
//             <Card.Footer>
//               <Pagination>
//                 <Pagination.Prev
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                 />
//                 {[...Array(totalPages)].map((_, i) => (
//                   <Pagination.Item key={i} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
//                     {i + 1}
//                   </Pagination.Item>
//                 ))}
//                 <Pagination.Next
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                 />
//               </Pagination>
//             </Card.Footer>
//           </Card>
//         </div>

//         <div className="col-md-6">
//           <Card>
//             <Card.Header>
//               <Card.Title>Complaint Details</Card.Title>
//               <Card.Subtitle>
//                 {selectedComplaint ? `Details for complaint: ${selectedComplaint.title}` : 'Select a complaint to view details'}
//               </Card.Subtitle>
//             </Card.Header>
//             <Card.Body>
//               {selectedComplaint ? (
//                 <div className="space-y-4">
//                   <div>
//                     <h5>Description:</h5>
//                     <p>{selectedComplaint.description}</p>
//                   </div>
//                   <div>
//                     <h5>AI Summary:</h5>
//                     <p>{selectedComplaint.aiSummary}</p>
//                   </div>
//                   <div className="row">
//                     <div className="col-6">
//                       <h5>Train No:</h5>
//                       <p>{selectedComplaint.trainNo}</p>
//                     </div>
//                     <div className="col-6">
//                       <h5>PNR:</h5>
//                       <p>{selectedComplaint.pnr}</p>
//                     </div>
//                     <div className="col-6">
//                       <h5>Coach No:</h5>
//                       <p>{selectedComplaint.coachNo}</p>
//                     </div>
//                     <div className="col-6">
//                       <h5>Status:</h5>
//                       <Badge variant={selectedComplaint.status === 'Open' ? 'danger' : 'secondary'}>
//                         {selectedComplaint.status}
//                       </Badge>
//                     </div>
//                   </div>
//                   <div>
//                     <h5>Complaint Image:</h5>
//                     <Image 
//                       src={selectedComplaint.image} 
//                       alt="Complaint Image" 
//                       thumbnail 
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <p>No complaint selected. Please choose a complaint from the list to view its details.</p>
//               )}
//             </Card.Body>
//             {selectedComplaint && (
//               <Card.Footer className="d-flex justify-content-between">
//                 <Button variant="outline-success" onClick={() => setShowResolveModal(true)}>
//                   <i className="fas fa-upload mr-2"></i> Resolve
//                 </Button>
//                 <Button variant="outline-secondary" onClick={() => setShowTransferModal(true)}>
//                   <i className="fas fa-paper-plane mr-2"></i> Transfer
//                 </Button>
//                 <Button variant="outline-danger" onClick={() => setShowReportModal(true)}>
//                   <i className="fas fa-flag mr-2"></i> Report Irrelevance
//                 </Button>
//               </Card.Footer>
//             )}
//           </Card>
//         </div>
//       </div>

//       {/* Resolve Modal */}
//       <Modal show={showResolveModal} onHide={() => setShowResolveModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Resolve Complaint</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formResolutionText">
//               <Form.Label>Resolution Text</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={resolutionText}
//                 onChange={(e) => setResolutionText(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="formResolutionImage">
//               <Form.Label>Upload Resolution Image (Optional)</Form.Label>
//               <Form.Control
//                 type="file"
//                 onChange={(e) => setResolutionImage(e.target.files[0])}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowResolveModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleResolve}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Transfer Modal */}
//       <Modal show={showTransferModal} onHide={() => setShowTransferModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Transfer Complaint</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formTransferDepartment">
//               <Form.Label>Select Department</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={transferDepartment}
//                 onChange={(e) => setTransferDepartment(e.target.value)}
//               >
//                 {departments.map((dept) => (
//                   <option key={dept.id} value={dept.name}>
//                     {dept.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowTransferModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleTransfer}>
//             Transfer
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Report Modal */}
//       <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Report Complaint as Irrelevant</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Are you sure you want to report this complaint as irrelevant?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowReportModal(false)}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={handleReportIrrelevance}>
//             Report
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }





import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Modal, Form, Badge, Pagination, Spinner, Image } from 'react-bootstrap';

const departments = [
  { id: 1, name: "Cleanliness Department" },
  { id: 2, name: "Maintenance and Infrastructure Department" },
  { id: 3, name: "Security and Safety Department" },
  { id: 4, name: "Signage and Communication Department" },
  { id: 5, name: "General/Miscellaneous Department" },
];

export default function DepartmentPage() {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0].name);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [resolutionText, setResolutionText] = useState('');
  const [resolutionImage, setResolutionImage] = useState(null);
  const [transferDepartment, setTransferDepartment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 5;
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8001/complaintslogs/all'); 
        setComplaints(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter(complaint => complaint.department === selectedDepartment);
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  const handleResolve = async () => {
    try {
      const formData = new FormData();
      formData.append('resolutionText', resolutionText);
      if (resolutionImage) {
        formData.append('file', resolutionImage);
      }
      await axios.post(`http://localhost:8001/resolve-complaint/${selectedComplaint._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowResolveModal(false);
      setSelectedComplaint(null);
    } catch (error) {
      console.error('Error resolving complaint:', error);
    }
  };

  const handleTransfer = async () => {
    try {
      await axios.post(`http://localhost:8001/resolve/${selectedComplaint._id}/transfer`, { department: transferDepartment });
      setShowTransferModal(false);
      setSelectedComplaint(null);
    } catch (error) {
      console.error('Error transferring complaint:', error);
    }
  };

  const handleReportIrrelevance = async () => {
    try {
      await axios.post(`http://localhost:8001/complaints/${selectedComplaint._id}/report`);
      setShowReportModal(false);
      setSelectedComplaint(null);
    } catch (error) {
      console.error('Error reporting complaint:', error);
    }
  };

  return (
    <div className="container mt-4">
      <header className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
        <h1 className="h3 font-weight-bold">Indian Railways Complaint Management</h1>
        <div className="d-flex align-items-center gap-3">
          <Badge pill variant="outline-dark" className="d-flex align-items-center py-2">
            <i className="fas fa-train mr-2"></i> Complaint Dashboard
          </Badge>
          <Form.Control as="select" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </Form.Control>
        </div>
      </header>
      
      <div className="row">
        <div className="col-md-6">
          <Card>
            <Card.Header>
              <Card.Title>Complaints List</Card.Title>
              <Card.Subtitle>All complaints for {selectedDepartment} department</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  {currentComplaints.map((complaint) => (
                    <Card key={complaint.id} className="mb-3">
                      <Card.Header>
                        <Card.Title className="h5">{complaint.complaint_title}</Card.Title>
                        <Card.Subtitle>{complaint.complaint_description}</Card.Subtitle>
                      </Card.Header>
                      <Card.Body>
                        <Badge variant={complaint.status === 'Open' ? 'danger' : 'secondary'}>
                          {complaint.status}
                        </Badge>
                      </Card.Body>
                      <Card.Footer>
                        <Button variant="outline-dark" onClick={() => setSelectedComplaint(complaint)}>
                          <i className="fas fa-eye mr-2"></i> View Details
                        </Button>
                      </Card.Footer>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
            <Card.Footer>
              <Pagination>
                <Pagination.Prev
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item key={i} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </Card.Footer>
          </Card>
        </div>

        <div className="col-md-6">
          <Card>
            <Card.Header>
              <Card.Title>Complaint Details</Card.Title>
              <Card.Subtitle>
                {selectedComplaint ? `Details for complaint: ${selectedComplaint.complaint_title}` : 'Select a complaint to view details'}
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              {selectedComplaint ? (
                <div className="space-y-4">
                  <div>
                    <h5>Description:</h5>
                    <p>{selectedComplaint.complaint_description}</p>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h5>Train No:</h5>
                      <p>{selectedComplaint.trainNo}</p>
                    </div>
                    <div className="col-6">
                      <h5>Coach No:</h5>
                      <p>{selectedComplaint.coachNo}</p>
                    </div>
                    <div className="col-6">
                      <h5>Status:</h5>
                      <Badge variant={selectedComplaint.status === 'Open' ? 'danger' : 'secondary'}>
                        {selectedComplaint.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h5>Complaint Image:</h5>
                    <Image 
                      src={selectedComplaint.file} 
                      alt="Complaint Image" 
                      thumbnail 
                    />
                  </div>
                </div>
              ) : (
                <p>No complaint selected. Please choose a complaint from the list to view its details.</p>
              )}
            </Card.Body>
            {selectedComplaint && (
              <Card.Footer className="d-flex justify-content-between">
                <Button variant="outline-success" onClick={() => setShowResolveModal(true)}>
                  <i className="fas fa-upload mr-2"></i> Resolve
                </Button>
                <Button variant="outline-secondary" onClick={() => setShowTransferModal(true)}>
                  <i className="fas fa-paper-plane mr-2"></i> Transfer
                </Button>
                <Button variant="outline-danger" onClick={() => setShowReportModal(true)}>
                  <i className="fas fa-flag mr-2"></i> Report Irrelevance
                </Button>
              </Card.Footer>
            )}
          </Card>
        </div>
      </div>

      {/* Resolve Modal */}
      <Modal show={showResolveModal} onHide={() => setShowResolveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Resolve Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formResolutionText">
              <Form.Label>Resolution Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formResolutionImage">
              <Form.Label>Attach Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setResolutionImage(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResolveModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleResolve}>
            Submit Resolution
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Transfer Modal */}
      <Modal show={showTransferModal} onHide={() => setShowTransferModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTransferDepartment">
              <Form.Label>Select Department</Form.Label>
              <Form.Control
                as="select"
                value={transferDepartment}
                onChange={(e) => setTransferDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTransferModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTransfer}>
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Report Irrelevance Modal */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Report Complaint Irrelevance</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to report this complaint as irrelevant?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReportModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleReportIrrelevance}>
            Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
