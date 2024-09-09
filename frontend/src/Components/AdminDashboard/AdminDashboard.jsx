// import { useState } from 'react'
// import { AlertCircle, Clock, MessageSquare, ThumbsUp,Download } from "lucide-react"
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// // Mock data for demonstration
// const complaintData = [
//   { zone: 'Northern', total: 1200, resolved: 1000, avgTime: 24 },
//   { zone: 'Southern', total: 800, resolved: 750, avgTime: 18 },
//   { zone: 'Eastern', total: 1000, resolved: 900, avgTime: 20 },
//   { zone: 'Western', total: 1100, resolved: 1050, avgTime: 22 },
//   { zone: 'Central', total: 950, resolved: 900, avgTime: 19 },
// ]

// const categoryData = [
//   { name: 'Sanitation', value: 30 },
//   { name: 'Staff Behavior', value: 25 },
//   { name: 'Security', value: 20 },
//   { name: 'Food Quality', value: 15 },
//   { name: 'Punctuality', value: 10 },
// ]

// const performanceData = [
//     { department: 'Cleaning', efficiency: 85, responseTime: 30, satisfactionRate: 92 },
//     { department: 'Maintenance', efficiency: 78, responseTime: 45, satisfactionRate: 88 },
//     { department: 'Security', efficiency: 90, responseTime: 15, satisfactionRate: 95 },
//     { department: 'Customer Service', efficiency: 82, responseTime: 20, satisfactionRate: 89 },
//   ]
  
//   const complaintTrends = [
//     { month: 'Jan', total: 120, resolved: 100 },
//     { month: 'Feb', total: 150, resolved: 130 },
//     { month: 'Mar', total: 140, resolved: 125 },
//     { month: 'Apr', total: 160, resolved: 150 },
//     { month: 'May', total: 130, resolved: 120 },
//     { month: 'Jun', total: 170, resolved: 160 },
//   ]
  
//   const resourceUtilization = [
//     { name: 'Active', value: 70 },
//     { name: 'Idle', value: 20 },
//     { name: 'On Leave', value: 10 },
//   ]
  
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// export default function AdminDashboard() {
//   const [selectedZone, setSelectedZone] = useState('All')
//   const [selectedDepartment, setSelectedDepartment] = useState('All')

//   const totalComplaints = complaintData.reduce((sum, zone) => sum + zone.total, 0)
//   const totalResolved = complaintData.reduce((sum, zone) => sum + zone.resolved, 0)
//   const averageResolutionTime = complaintData.reduce((sum, zone) => sum + zone.avgTime, 0) / complaintData.length

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <header className="px-4 py-2 bg-light border-bottom d-flex align-items-center">
//         <h1 className="h5 font-weight-bold">Indian Railways Admin Dashboard</h1>
//         <nav className="ml-auto">
//           <select
//             value={selectedZone}
//             onChange={(e) => setSelectedZone(e.target.value)}
//             className="form-control"
//           >
//             <option value="All">All Zones</option>
//             <option value="Northern">Northern</option>
//             <option value="Southern">Southern</option>
//             <option value="Eastern">Eastern</option>
//             <option value="Western">Western</option>
//             <option value="Central">Central</option>
//           </select>
//         </nav>
//       </header>
//       <main className="flex-grow-1 p-5 my-3 mt-5  rounded-4  " style={{maxWidth:'90vw',background: '#f0f7ff',marginLeft:'5vw'}}>
//         <div className="row my-5">
//           <div className="col-md-1 col-lg-3 mb-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between">
//                   <h2 className="h6">Total Complaints</h2>
//                   <AlertCircle className="text-muted" />
//                 </div>
//                 <div className="display-4">{totalComplaints}</div>
//                 <p className="text-muted small">+20.1% from last month</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-1 col-lg-3 mb-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between">
//                   <h2 className="h6">Resolved Complaints</h2>
//                   <ThumbsUp className="text-muted" />
//                 </div>
//                 <div className="display-4">{totalResolved}</div>
//                 <p className="text-muted small">+15% from last month</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-1 col-lg-3 mb-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between">
//                   <h2 className="h6">Avg. Resolution Time</h2>
//                   <Clock className="text-muted" />
//                 </div>
//                 <div className="display-4">{averageResolutionTime.toFixed(1)} hours</div>
//                 <p className="text-muted small">-2.5 hours from last month</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-1 col-lg-3 mb-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between">
//                   <h2 className="h6">Most Common Category</h2>
//                   <MessageSquare className="text-muted" />
//                 </div>
//                 <div className="display-4">{categoryData[0].name}</div>
//                 <p className="text-muted small">{categoryData[0].value}% of total complaints</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card shadow-sm mb-4 mt-5 py-5">
//           <div className="card-body">
//             <h2 className="h5 font-weight-bold">Complaints by Zone</h2>
//             <div className="chart-container" style={{ height: '350px' }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={complaintData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="zone" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="total" fill="#8884d8" name="Total Complaints" />
//                   <Bar dataKey="resolved" fill="#82ca9d" name="Resolved Complaints" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         <div className="card shadow-sm mb-4 my-5 pt-3">
//           <div className="card-body">
//             <h2 className="h5 font-weight-bold">Complaint Categories</h2>
//             <div className="chart-container" style={{ height: '350px' }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={categoryData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#8884d8" name="Percentage" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         <div className="card shadow-sm mb-4">
//           <div className="card-body">
//             <h2 className="h5 font-weight-bold">Complaint Heatmap</h2>
//             <p className="text-center text-muted">
//               Heatmap visualization would be implemented here, showing complaint hotspots across stations.
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Performance and Resource Monitoring</h1>

//       <div className="row mb-6">
//         <div className="col-md-6 mb-4">
//           <Card>
//             <Card.Header>Complaint Resolution Trends</Card.Header>
//             <Card.Body>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={complaintTrends}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Complaints" />
//                   <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved Complaints" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Card.Body>
//           </Card>
//         </div>
        
//         <div className="col-md-6 mb-4">
//           <Card>
//             <Card.Header>Resource Utilization</Card.Header>
//             <Card.Body>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={resourceUtilization}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   >
//                     {resourceUtilization.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>

//       <Card>
//         <Card.Header className="d-flex justify-content-between align-items-center">
//           <span>Departmental Performance Metrics</span>
//           <div className="d-flex gap-2">
//             <select
//               className="form-select"
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//             >
//               <option value="All">All Departments</option>
//               <option value="Cleaning">Cleaning</option>
//               <option value="Maintenance">Maintenance</option>
//               <option value="Security">Security</option>
//               <option value="Customer Service">Customer Service</option>
//             </select>
//             <Button variant="outline-primary" onClick={generateReport}>
//               <Download className="me-2 h-4 w-4" />
//               Generate Report
//             </Button>
//           </div>
//         </Card.Header>
//         <Card.Body>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Department</th>
//                 <th>Efficiency (%)</th>
//                 <th>Avg. Response Time (min)</th>
//                 <th>Satisfaction Rate (%)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {performanceData
//                 .filter(data => selectedDepartment === 'All' || data.department === selectedDepartment)
//                 .map((data) => (
//                   <tr key={data.department}>
//                     <td>{data.department}</td>
//                     <td>
//                       <Badge bg={data.efficiency >= 85 ? 'success' : 'secondary'}>
//                         {data.efficiency}%
//                       </Badge>
//                     </td>
//                     <td>{data.responseTime}</td>
//                     <td>
//                       <Badge bg={data.satisfactionRate >= 90 ? 'success' : 'secondary'}>
//                         {data.satisfactionRate}%
//                       </Badge>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </div>
//   )
// }



import { useState } from 'react'
import { AlertCircle, Clock, MessageSquare, ThumbsUp, Download } from "lucide-react"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, PieChart, Pie, Cell 
} from 'recharts'

// Mock data for demonstration
const complaintData = [
  { zone: 'Northern', total: 1200, resolved: 1000, avgTime: 24 },
  { zone: 'Southern', total: 800, resolved: 750, avgTime: 18 },
  { zone: 'Eastern', total: 1000, resolved: 900, avgTime: 20 },
  { zone: 'Western', total: 1100, resolved: 1050, avgTime: 22 },
  { zone: 'Central', total: 950, resolved: 900, avgTime: 19 },
]

const categoryData = [
  { name: 'Sanitation', value: 30 },
  { name: 'Staff Behavior', value: 25 },
  { name: 'Security', value: 20 },
  { name: 'Food Quality', value: 15 },
  { name: 'Punctuality', value: 10 },
]

const performanceData = [
  { department: 'Cleaning', efficiency: 85, responseTime: 30, satisfactionRate: 92 },
  { department: 'Maintenance', efficiency: 78, responseTime: 45, satisfactionRate: 88 },
  { department: 'Security', efficiency: 90, responseTime: 15, satisfactionRate: 95 },
  { department: 'Customer Service', efficiency: 82, responseTime: 20, satisfactionRate: 89 },
]

const complaintTrends = [
  { month: 'Jan', total: 120, resolved: 100 },
  { month: 'Feb', total: 150, resolved: 130 },
  { month: 'Mar', total: 140, resolved: 125 },
  { month: 'Apr', total: 160, resolved: 150 },
  { month: 'May', total: 130, resolved: 120 },
  { month: 'Jun', total: 170, resolved: 160 },
]

const resourceUtilization = [
  { name: 'Active', value: 70 },
  { name: 'Idle', value: 20 },
  { name: 'On Leave', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function AdminDashboard() {
  const [selectedZone, setSelectedZone] = useState('All')
  const [selectedDepartment, setSelectedDepartment] = useState('All')

  const totalComplaints = complaintData.reduce((sum, zone) => sum + zone.total, 0)
  const totalResolved = complaintData.reduce((sum, zone) => sum + zone.resolved, 0)
  const averageResolutionTime = complaintData.reduce((sum, zone) => sum + zone.avgTime, 0) / complaintData.length

  const generateReport = () => {
    // Implement your report generation logic here
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="px-4 py-2 bg-light border-bottom d-flex align-items-center">
        <h1 className="h5 font-weight-bold">Indian Railways Admin Dashboard</h1>
        <nav className="ml-auto">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="form-control"
          >
            <option value="All">All Zones</option>
            <option value="Northern">Northern</option>
            <option value="Southern">Southern</option>
            <option value="Eastern">Eastern</option>
            <option value="Western">Western</option>
            <option value="Central">Central</option>
          </select>
        </nav>
      </header>
      <main className="flex-grow-1 p-5 my-3 mt-5 rounded-4" style={{ maxWidth: '90vw', background: '#f0f7ff', marginLeft: '5vw' }}>
        <div className="row my-5">
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h2 className="h6">Total Complaints</h2>
                  <AlertCircle className="text-muted" />
                </div>
                <div className="display-4">{totalComplaints}</div>
                <p className="text-muted small">+20.1% from last month</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h2 className="h6">Resolved Complaints</h2>
                  <ThumbsUp className="text-muted" />
                </div>
                <div className="display-4">{totalResolved}</div>
                <p className="text-muted small">+15% from last month</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h2 className="h6">Avg. Resolution Time</h2>
                  <Clock className="text-muted" />
                </div>
                <div className="display-4">{averageResolutionTime.toFixed(1)} hours</div>
                <p className="text-muted small">-2.5 hours from last month</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h2 className="h6">Most Common Category</h2>
                  <MessageSquare className="text-muted" />
                </div>
                <div className="display-4">{categoryData[0].name}</div>
                <p className="text-muted small">{categoryData[0].value}% of total complaints</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-4 mt-5 py-5">
          <div className="card-body">
            <h2 className="h5 font-weight-bold">Complaints by Zone</h2>
            <div className="chart-container" style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complaintData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#8884d8" name="Total Complaints" />
                  <Bar dataKey="resolved" fill="#82ca9d" name="Resolved Complaints" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-4 my-5 pt-3">
          <div className="card-body">
            <h2 className="h5 font-weight-bold">Complaint Categories</h2>
            <div className="chart-container" style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Percentage" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-4 py-5 my-5">
          <div className="card-body">
            <h2 className="h5 font-weight-bold">Performance Data</h2>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Efficiency (%)</th>
                    <th>Response Time (min)</th>
                    <th>Satisfaction Rate (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((performance, index) => (
                    <tr key={index}>
                      <td>{performance.department}</td>
                      <td>{performance.efficiency}%</td>
                      <td>{performance.responseTime} min</td>
                      <td>
                        <span className="badge bg-success">{performance.satisfactionRate}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='row justify-between'>
        <div className="col-md-6 mb-4"><div className="card shadow-sm mb-4 py-5 my-5">
          <div className="card-body">
            <h2 className="h5 font-weight-bold">Resource Utilization</h2>
            <div className="chart-container" style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resourceUtilization}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {resourceUtilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

         

        </div>
       
        
</div>
<div className="col-md-6">
<div className="card shadow-sm mb-4 py-5 my-5">
          <div className="card-body">
            <h2 className="h5 font-weight-bold">Complaint Trends Over Time</h2>
            <div className="chart-container" style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complaintTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Complaints" />
                  <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved Complaints" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
</div>
        </div>

        
        <div className="d-flex justify-content-center">
          <button onClick={generateReport} className="btn btn-primary">
            <Download className="mr-2" /> Download Report
          </button>
        </div>
      </main>
    </div>
  )
}
