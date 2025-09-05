const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        photoUrl: { type: String, required: true, trim: true },
        issue_resolved: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Issue', IssueSchema);


