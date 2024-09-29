import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

export default function Prediction() {
  const [predictedMaintenance, setPredictedMaintenance] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/maintenance'); // Adjust the URL to match your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPredictedMaintenance(data); // Assuming the backend returns an array of predicted maintenance objects
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMaintenanceData();
  }, []);

  // Filter data based on selected location
  const filteredMaintenance = selectedLocation === 'All' 
    ? predictedMaintenance 
    : predictedMaintenance.filter(item => item.location === selectedLocation);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Simplified Predictive Maintenance Dashboard</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <Form.Select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="All">All Locations</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Bangalore">Bangalore</option>
          </Form.Select>
        </Col>
      </Row>

      <Card>
        <Card.Header>
          <Card.Title>Predicted Maintenance Needs</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Location</th>
                <th>Train Number</th>
                <th>Issue Category</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaintenance.map((item) => (
                <tr key={item.id}>
                  <td>
                    <i className="bi bi-geo-alt me-2"></i>
                    {item.location}
                  </td>
                  <td>
                    <i className="bi bi-train-front me-2"></i>
                    {item.trainNo}
                  </td>
                  <td>{item.issueCategory}</td>
                  <td>
                    <i className="bi bi-calendar me-2"></i>
                    {item.dueDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
