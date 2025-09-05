const express = require('express');
const Issue = require('../models/Issue');

const router = express.Router();

// Landing page: show pending and resolved issues
router.get('/', async (req, res) => {
    try {
        const [pendingIssues, resolvedIssues] = await Promise.all([
            Issue.find({ issue_resolved: false }).sort({ createdAt: -1 }).lean(),
            Issue.find({ issue_resolved: true }).sort({ updatedAt: -1 }).lean(),
        ]);

        res.render('index', { pendingIssues, resolvedIssues });
    } catch (err) {
        res.status(500).send('Error fetching issues');
    }
});

// Resolve an issue (set issue_resolved = true)
router.post('/issues/:id/resolve', async (req, res) => {
    const { id } = req.params;
    try {
        await Issue.findByIdAndUpdate(id, { issue_resolved: true }, { new: true });
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error resolving issue');
    }
});

module.exports = router;


