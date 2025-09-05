const express = require('express');
const Issue = require('../models/Issue');

const router = express.Router();

// Get all issues
router.get('/issues', async (req, res) => {
    try {
        const { status, category, priority, limit = 50 } = req.query;
        
        // Build query
        let query = {};
        
        if (status === 'pending') {
            query.issue_resolved = false;
        } else if (status === 'resolved') {
            query.issue_resolved = true;
        }
        
        if (category) {
            query.category = category;
        }
        
        if (priority) {
            query.priority = priority;
        }

        const issues = await Issue.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .lean();

        res.json(issues);
    } catch (error) {
        console.error('Error fetching issues:', error);
        res.status(500).json({ 
            error: 'Failed to fetch issues',
            message: error.message 
        });
    }
});

// Get pending issues only
router.get('/issues/pending', async (req, res) => {
    try {
        const pendingIssues = await Issue.find({ issue_resolved: false })
            .sort({ createdAt: -1 })
            .lean();

        res.json(pendingIssues);
    } catch (error) {
        console.error('Error fetching pending issues:', error);
        res.status(500).json({ 
            error: 'Failed to fetch pending issues',
            message: error.message 
        });
    }
});

// Get resolved issues only
router.get('/issues/resolved', async (req, res) => {
    try {
        const resolvedIssues = await Issue.find({ issue_resolved: true })
            .sort({ updatedAt: -1 })
            .lean();

        res.json(resolvedIssues);
    } catch (error) {
        console.error('Error fetching resolved issues:', error);
        res.status(500).json({ 
            error: 'Failed to fetch resolved issues',
            message: error.message 
        });
    }
});

// Get single issue by ID
router.get('/issues/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const issue = await Issue.findById(id);
        
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        res.json(issue);
    } catch (error) {
        console.error('Error fetching issue:', error);
        res.status(500).json({ 
            error: 'Failed to fetch issue',
            message: error.message 
        });
    }
});

// Resolve an issue (set issue_resolved = true)
router.patch('/issues/:id/resolve', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Attempting to resolve issue with ID: ${id}`);
        
        const issue = await Issue.findByIdAndUpdate(
            id, 
            { 
                issue_resolved: true,
                updatedAt: new Date()
            }, 
            { new: true }
        );
        
        if (!issue) {
            console.log(`Issue with ID ${id} not found`);
            return res.status(404).json({ error: 'Issue not found' });
        }

        console.log(`Issue ${id} resolved successfully`);
        res.json({ 
            message: 'Issue resolved successfully',
            issue: issue 
        });
    } catch (error) {
        console.error('Error resolving issue:', error);
        res.status(500).json({ 
            error: 'Failed to resolve issue',
            message: error.message 
        });
    }
});

// Reopen an issue (set issue_resolved = false)
router.post('/issues/:id/reopen', async (req, res) => {
    try {
        const { id } = req.params;
        
        const issue = await Issue.findByIdAndUpdate(
            id, 
            { issue_resolved: false }, 
            { new: true }
        );
        
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        res.json({ 
            message: 'Issue reopened successfully',
            issue: issue 
        });
    } catch (error) {
        console.error('Error reopening issue:', error);
        res.status(500).json({ 
            error: 'Failed to reopen issue',
            message: error.message 
        });
    }
});

// Create a new issue (for testing purposes)
router.post('/issues', async (req, res) => {
    try {
        const { title, description, photoUrl, location, category, priority } = req.body;
        
        const newIssue = new Issue({
            title,
            description,
            photoUrl,
            location,
            category,
            priority
        });

        const savedIssue = await newIssue.save();
        
        res.status(201).json({ 
            message: 'Issue created successfully',
            issue: savedIssue 
        });
    } catch (error) {
        console.error('Error creating issue:', error);
        res.status(500).json({ 
            error: 'Failed to create issue',
            message: error.message 
        });
    }
});

// Get statistics
router.get('/stats', async (req, res) => {
    try {
        const [totalCount, pendingCount, resolvedCount] = await Promise.all([
            Issue.countDocuments(),
            Issue.countDocuments({ issue_resolved: false }),
            Issue.countDocuments({ issue_resolved: true })
        ]);

        const stats = {
            total: totalCount,
            pending: pendingCount,
            resolved: resolvedCount,
            resolutionRate: totalCount > 0 ? ((resolvedCount / totalCount) * 100).toFixed(1) : 0
        };

        res.json(stats);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ 
            error: 'Failed to fetch statistics',
            message: error.message 
        });
    }
});

module.exports = router;
