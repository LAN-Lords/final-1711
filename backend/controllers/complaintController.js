const Complaint = require('../models/Complaint'); 

const getZoneFromTrainNo = (trainNo) => {
    const prefix = trainNo.substring(0, 1);
    if (prefix >= 0 && prefix <= 1) return 'Northern Railway Zone';
    if (prefix >= 2 && prefix <= 3) return 'Eastern Railway Zone';
    if (prefix >= 4 && prefix <= 5) return 'Western Railway Zone';
    if (prefix >= 6 && prefix <= 7) return 'Southern Railway Zone';
    if (prefix >= 8 && prefix <= 9) return 'Central Railway Zone';
    return 'Unknown Zone';
};

const getDashboardData = async (req, res) => {
    try {
        const complaints = await Complaint.find();

        // Zone data
        const zoneData = complaints.reduce((acc, complaint) => {
            const zone = getZoneFromTrainNo(complaint.trainNo);
            if (!acc[zone]) {
                acc[zone] = { zone, total: 0, resolved: 0, avgTime: 0 };
            }
            acc[zone].total += 1;
            if (complaint.status === 'Resolved') acc[zone].resolved += 1;
            acc[zone].avgTime += (complaint.resolvedAt ? (complaint.resolvedAt - complaint.createdAt) / (1000 * 60 * 60) : 0);
            return acc;
        }, {});

        const formattedZoneData = Object.values(zoneData).map(zone => ({
            ...zone,
            avgTime: zone.total ? zone.avgTime / zone.total : 0
        }));

        // Category data
        const categoryData = complaints.reduce((acc, complaint) => {
            const category = complaint.category || 'Miscellaneous';
            if (!acc[category]) {
                acc[category] = { name: category, value: 0 };
            }
            acc[category].value += 1;
            return acc;
        }, {});

        const formattedCategoryData = Object.values(categoryData);

        // Performance data by department
        const departmentData = complaints.reduce((acc, complaint) => {
            const department = complaint.department || 'General/Miscellaneous Department';
            if (!acc[department]) {
                acc[department] = { department, responseTime: 0, resolved: 0, count: 0 };
            }
            if (complaint.status === 'Resolved') {
                acc[department].resolved += 1;
                acc[department].responseTime += (complaint.resolvedAt - complaint.createdAt) / (1000 * 60 * 60); // response time in hours
            }
            acc[department].count += 1;
            return acc;
        }, {});

        const formattedPerformanceData = Object.values(departmentData).map(department => ({
            ...department,
            responseTime: department.count ? department.responseTime / department.count : 0,
            satisfactionRate: department.resolved ? (department.resolved / department.count) * 100 : 0
        }));

        res.json({
            complaintData: formattedZoneData,
            categoryData: formattedCategoryData,
            performanceData: formattedPerformanceData
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
};

module.exports = { getDashboardData };
