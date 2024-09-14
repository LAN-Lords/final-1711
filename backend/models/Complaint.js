// const mongoose = require('mongoose');

// const complaintSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     trainNo: { type: String, default: null },
//     pnrNo: { type: String, default: null },
//     coachNo: { type: String, default: null },
//     seatNo: { type: String, default: null },
//     complaint_description: { type: String, default: null },
//     file: { type: String, default: null },
//     category: { type: String, default: null },
//     status: { type: String, enum: ['Under Review', 'Assigned', 'Resolved'], default: 'Under Review' },
//     department: { type: String, default: null },
//     resolutionImageUrl: { type: String, default: null },
//     assignedAt: { type: Date, default: null },
//     resolvedAt: { type: Date, default: null },
//     resolutionText: String,
//     createdAt: { type: Date, default: Date.now },
//     createdMonth: { type: String, default: null },
//     resolvedMonth: { type: String, default: null },
//     isArchived: { type: Boolean, default: false }
// });

// // Define the mapping between categories and departments
// const categoryToDepartment = {
//     "Cleanliness": "Cleanliness Department",
//     "Maintenance": "Maintenance and Infrastructure Department",
//     "Crowd Control": "Security and Safety Department",
//     "Safety": "Security and Safety Department",
//     "Facilities": "Maintenance and Infrastructure Department",
//     "Lighting": "Maintenance and Infrastructure Department",
//     "Signage": "Signage and Communication Department",
//     "miscellaneous": "General/Miscellaneous Department"
// };
// complaintSchema.pre('save', function (next) {
//     const currentMonth = (date) => {
//         const month = date.getMonth() + 1;
//         const year = date.getFullYear();
//         return `${year}-${month < 10 ? '0' + month : month}`;
//     };

//     console.log('Middleware triggered');
//     console.log('Initial category:', this.category);
//     console.log('Initial createdAt:', this.createdAt);

//     if (this.isModified('category') && this.category) {
//         this.department = categoryToDepartment[this.category] || 'General/Miscellaneous Department';
//         console.log('Assigned department:', this.department);
//     }

//     if (!this.createdMonth && this.createdAt) {
//         this.createdMonth = currentMonth(this.createdAt);
//         console.log('Assigned createdMonth:', this.createdMonth);
//     }

//     if (this.isModified('status')) {
//         if (this.status === 'Assigned') {
//             this.assignedAt = new Date();
//         } else if (this.status === 'Resolved') {
//             this.resolvedAt = new Date();
//             this.resolvedMonth = currentMonth(this.resolvedAt);
//             console.log('Assigned resolvedMonth:', this.resolvedMonth);
//         }
//     }

//     next();
// });

// module.exports = mongoose.model('Complaint', complaintSchema);






const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trainNo: { type: String, default: null },
    pnrNo: { type: String, default: null },
    coachNo: { type: String, default: null },
    seatNo: { type: String, default: null },
    complaint_description: { type: String, default: null },
    file: { type: String, default: null },
    category: { type: String, default: null },
    status: { type: String, enum: ['Under Review', 'Assigned', 'Resolved'], default: 'Under Review' },
    department: { type: String, default: null },
    resolutionImageUrl: { type: String, default: null },
    assignedAt: { type: Date, default: null },
    resolvedAt: { type: Date, default: null },
    resolutionText: String,
    createdAt: { type: Date, default: Date.now },
    createdMonth: { type: String, default: null },
    resolvedMonth: { type: String, default: null },
    isArchived: { type: Boolean, default: false }
});

// Define the mapping between categories and departments
const categoryToDepartment = {
    "Cleanliness": "Cleanliness Department",
    "Maintenance": "Maintenance and Infrastructure Department",
    "Crowd Control": "Security and Safety Department",
    "Safety": "Security and Safety Department",
    "Facilities": "Maintenance and Infrastructure Department",
    "Lighting": "Maintenance and Infrastructure Department",
    "Signage": "Signage and Communication Department",
    "Miscellaneous": "General/Miscellaneous Department"
};

const getZoneFromTrainNo = (trainNo) => {
    const prefix = trainNo.substring(0, 1);
    console.log('Train No:', trainNo);
    console.log('Prefix:', prefix);
    if (prefix >= 0 && prefix <= 1) return 'Northern Railway Zone';
    if (prefix >= 2 && prefix <= 3) return 'Eastern Railway Zone';
    if (prefix >= 4 && prefix <= 5) return 'Western Railway Zone';
    if (prefix >= 6 && prefix <= 7) return 'Southern Railway Zone';
    if (prefix >= 8 && prefix <= 9) return 'Central Railway Zone';
    return 'Unknown Zone';
};

complaintSchema.pre('save', function (next) {
    const currentMonth = (date) => {
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month < 10 ? '0' + month : month}`;
    };

    console.log('Middleware triggered');
    console.log('Initial category:', this.category);
    console.log('Initial createdAt:', this.createdAt);

    if (this.isModified('category') && this.category) {
        this.department = categoryToDepartment[this.category] || 'General/Miscellaneous Department';
        console.log('Assigned department:', this.department);
    }

    if (!this.createdMonth && this.createdAt) {
        this.createdMonth = currentMonth(this.createdAt);
        console.log('Assigned createdMonth:', this.createdMonth);
    }

    if (this.isModified('status')) {
        if (this.status === 'Assigned') {
            this.assignedAt = new Date();
        } else if (this.status === 'Resolved') {
            this.resolvedAt = new Date();
            this.resolvedMonth = currentMonth(this.resolvedAt);
            console.log('Assigned resolvedMonth:', this.resolvedMonth);
        }
    }

    if (this.isModified('trainNo')) {
        this.zone = getZoneFromTrainNo(this.trainNo);
        console.log('Assigned zone:', this.zone);
    }

    next();
});

module.exports = mongoose.model('Complaint', complaintSchema);
