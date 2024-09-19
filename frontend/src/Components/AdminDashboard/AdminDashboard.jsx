// import { useState } from 'react'
// import { Link } from 'react-router-dom';
// import { AlertCircle, Clock, MessageSquare, ThumbsUp, Download } from "lucide-react"
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
//   LineChart, Line, Legend, PieChart, Pie, Cell 
// } from 'recharts'
// import axios from 'axios';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// export default function AdminDashboard() {
//   const [data, setData] = useState({ complaintData: [], categoryData: [], performanceData: [] });
//   const [selectedZone, setSelectedZone] = useState('All')
//   const [selectedDepartment, setSelectedDepartment] = useState('All')
//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8001/complaints/dashboard');
//             console.log(response.data);
//             setData(response.data);
//         } catch (error) {
//             console.error('Error fetching dashboard data:', error);
//         }
//     };

//     fetchData();
// }, []);


//   const totalComplaints = complaintData.reduce((sum, zone) => sum + zone.total, 0)
//   const totalResolved = complaintData.reduce((sum, zone) => sum + zone.resolved, 0)
//   const averageResolutionTime = complaintData.reduce((sum, zone) => sum + zone.avgTime, 0) / complaintData.length

//   const generateReport = () => {
//     // Implement your report generation logic here
//   }

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <header className="px-4 py-2 bg-light border-bottom d-flex align-items-center">
//         <h1 className="h5 font-weight-bold">Indian Railways Admin Dashboard</h1>
//         <nav className="ml-auto">
//          <Link to='/complainlogs'> <button>Complain Logs</button></Link>
//         </nav>
//       </header>
//       <main className="flex-grow-1 p-5 my-3 mt-5 rounded-4" style={{ maxWidth: '90vw', background: '#f0f7ff', marginLeft: '5vw' }}>
//         <div className="row my-5">
//           <div className="col-lg-3 mb-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between">
//                   <h2 className="h6">Total Complaints</h2>
//                   <AlertCircle className="text-muted" />
//                 </div>
//                 <div className="display-4">{data.complaintData.reduce((total, zone) => total + zone.total, 0)}</div>
//                 <p className="text-muted small">Complaints</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-3 mb-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between">
//                   <h2 className="h6">Resolved Complaints</h2>
//                   <ThumbsUp className="text-muted" />
//                 </div>
//                 <div className="display-4">{data.complaintData.reduce((total, zone) => total + zone.resolved, 0)}</div>
//                 <p className="text-muted small">Resolved Complaints</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-3 mb-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between">
//                   <h2 className="h6">Avg. Resolution Time</h2>
//                   <Clock className="text-muted" />
//                 </div>
//                 <div className="display-4">{data.complaintData.length > 0 ? (data.complaintData.reduce((total, zone) => total + zone.avgTime, 0) / data.complaintData.length).toFixed(2) : '0'} hours</div>
//                 <p className="text-muted small">Avg</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-3 mb-4">
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

//         <div className="card shadow-sm mb-4 py-5 my-5">
//           <div className="card-body">
//             <h2 className="h5 font-weight-bold">Performance Data</h2>
//             <div className="table-responsive">
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>Department</th>
//                     <th>Response Time (min)</th>
//                     <th>Satisfaction Rate (%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {performanceData.map((performance, index) => (
//                     <tr key={index}>
//                       <td>{performance.department}</td>
//                       <td>{performance.responseTime} min</td>
//                       <td>
//                         <span className="badge bg-success">{performance.satisfactionRate}%</span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         <div className='row justify-center'>
        
// <div className="col-md-6">
// <div className="card shadow-sm mb-4 py-5 my-5">
//           <div className="card-body">
//             <h2 className="h5 font-weight-bold">Complaint Trends Over Time</h2>
//             <div className="chart-container" style={{ height: '350px' }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={complaintTrends}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Complaints" />
//                   <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved Complaints" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
// </div>
//         </div>

        
//         <div className="d-flex justify-content-center">
//           <button onClick={generateReport} className="btn btn-primary">
//             <Download className="mr-2" /> Download Report
//           </button>
//         </div>
//       </main>
//     </div>
//   )
// }



import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Clock, MessageSquare, ThumbsUp, Download } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, PieChart, Pie, Cell 
} from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AdminDashboard() {
  const [data, setData] = useState({ complaintData: [], categoryData: [], performanceData: [] , timeData: []});
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/complaints/dashboard');
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const { complaintData, categoryData, performanceData ,timeData} = data;

  const totalComplaints = complaintData.reduce((sum, zone) => sum + zone.total, 0);
  const totalResolved = complaintData.reduce((sum, zone) => sum + zone.resolved, 0);
  const averageResolutionTime = complaintData.length > 0 ? (complaintData.reduce((sum, zone) => sum + zone.avgTime, 0) / complaintData.length).toFixed(2) : '0';



  const totalCategoryValue = categoryData.reduce((sum, category) => sum + category.value, 0); 
  console.log(totalCategoryValue)
const getMostCommonCategory=()=>{
  if(categoryData.length===0)return {name:'N/A',value:'0'}
  const categoryCounts = categoryData.reduce((acc, { name, value }) => {
    acc[name] = (acc[name] || 0) + value;
    return acc;
  },{});
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  const [mostCommonCategory] = sortedCategories[0] || [];

  return {
    name: mostCommonCategory || 'N/A',
    value: categoryCounts[mostCommonCategory] || 0
  };

}
const mostCommonCategory = getMostCommonCategory();
  

const percentage = totalCategoryValue > 0 ? ((mostCommonCategory.value / totalCategoryValue) * 100).toFixed(4) : '0';  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="px-4 py-2 bg-light border-bottom d-flex align-items-center">
        <h1 className="h5 font-weight-bold">Indian Railways Admin Dashboard</h1>
        <nav className="ml-auto">
          <Link to='/complainlogs'><button className='btn btn-outline-dark'>Complain Logs</button></Link>
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
                <p className="text-muted small">Complaints</p>
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
                <p className="text-muted small">Resolved Complaints</p>
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
                <div className="display-4">{averageResolutionTime} hours</div>
                <p className="text-muted small">Avg</p>
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
                <div className="display-4">{mostCommonCategory.name}</div>
                <p className="text-muted small">{percentage}% of total complaints</p>
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
                    <th>Response Time (min)</th>
                    <th>Satisfaction Rate (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((performance, index) => (
                    <tr key={index}>
                      <td>{performance.department}</td>
                      <td>{parseFloat(performance.responseTime).toFixed(2)} min</td>
                      <td>
                        <span className="badge bg-success">{parseFloat(performance.satisfactionRate).toFixed(2)}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='row justify-center'>
    <div className="col-md-6">
        <div className="card shadow-sm mb-4 py-5 my-5">
            <div className="card-body">
                <h2 className="h5 font-weight-bold">Complaint Trends Over Time</h2>
                <div className="chart-container" style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeData}>  {/* Use the backend data */}
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" /> {/* X-axis with days */}
                            <YAxis /> {/* Y-axis for the number of complaints */}
                            <Tooltip /> {/* Tooltip for showing details on hover */}
                            <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Complaints" />
                            <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved Complaints" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
</div>


        
      </main>
    </div>
  );
}
