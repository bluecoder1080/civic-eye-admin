const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Issue = require('./models/Issue');

dotenv.config();

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Issue.deleteMany({});

        const sample = [
            {
                title: 'Pothole on Main St',
                description: 'Large pothole near the crosswalk causing traffic issues.',
                photoUrl: 'https://images.unsplash.com/photo-1591284232309-7c5cf9ac8a64?q=80&w=1200&auto=format&fit=crop',
                issue_resolved: false,
            },
            {
                title: 'Streetlight not working',
                description: 'Streetlight at 5th Ave and Pine is out.',
                photoUrl: 'https://images.unsplash.com/photo-1473444916021-74c35f9b6ad7?q=80&w=1200&auto=format&fit=crop',
                issue_resolved: false,
            },
            {
                title: 'Park bench repaired',
                description: 'Broken bench in Central Park has been fixed.',
                photoUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1200&auto=format&fit=crop',
                issue_resolved: true,
            },
        ];

        await Issue.insertMany(sample);
        // eslint-disable-next-line no-console
        console.log('Seeded sample issues.');
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

run();


