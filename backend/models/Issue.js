const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true, 
            trim: true,
            maxlength: 200
        },
        description: { 
            type: String, 
            required: true, 
            trim: true,
            maxlength: 1000
        },
        photoUrl: { 
            type: String, 
            required: true, 
            trim: true
        },
        issue_resolved: { 
            type: Boolean, 
            default: false 
        },
        location: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            enum: ['Roads', 'Water Supply', 'Electricity', 'Sanitation', 'Public Safety', 'Other'],
            default: 'Other'
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Critical'],
            default: 'Medium'
        }
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual for formatted creation date
IssueSchema.virtual('formattedCreatedAt').get(function() {
    return this.createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

// Index for better query performance
IssueSchema.index({ issue_resolved: 1, createdAt: -1 });
IssueSchema.index({ category: 1 });
IssueSchema.index({ priority: 1 });

module.exports = mongoose.model('Issue', IssueSchema);
