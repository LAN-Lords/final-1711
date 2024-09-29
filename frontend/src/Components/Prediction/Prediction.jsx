import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

const predictedMaintenance = [
  { id: 1, location: 'Delhi', trainNo: '12425', issueCategory: 'Crowd Control', dueDate: '2024-08-15' },
  { id: 2, location: 'Mumbai Central', trainNo: '12951', issueCategory: 'Cleanliness', dueDate: '2024-08-18' },
  { id: 3, location: 'Chennai Egmore', trainNo: '12301', issueCategory: 'Maintenance', dueDate: '2024-08-20' },
  { id: 4, location: 'Howrah Junction', trainNo: '12270', issueCategory: 'Comfort', dueDate: '2024-08-22' },
  { id: 5, location: 'Yesvantpur Junction', trainNo: '22692', issueCategory: 'Cleanliness', dueDate: '2024-08-25' },
];

export default function Prection() {
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredMaintenance = selectedLocation === 'All' 
    ? predictedMaintenance 
    : predictedMaintenance.filter(item => item.location === selectedLocation);

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