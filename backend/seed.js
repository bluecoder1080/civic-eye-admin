const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Issue = require('./models/Issue');

dotenv.config();

// Sample issues data for Jharkhand
const sampleIssues = [
    {
        title: "Pothole on Main Road near Ranchi Railway Station",
        description: "Large pothole causing traffic disruption and vehicle damage. Located on the main road connecting to Ranchi Railway Station. Immediate attention required as it's affecting daily commuters.",
        photoUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
        location: "Main Road, Ranchi Railway Station",
        category: "Roads",
        priority: "High",
        issue_resolved: false
    },
    {
        title: "Water Supply Disruption in Dhurwa Area",
        description: "No water supply for the past 3 days in Dhurwa residential area. Affecting approximately 200 households. Residents are facing severe inconvenience.",
        photoUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&h=300&fit=crop",
        location: "Dhurwa, Ranchi",
        category: "Water Supply",
        priority: "Critical",
        issue_resolved: false
    },
    {
        title: "Street Light Not Working - Circular Road",
        description: "Multiple street lights are not functioning on Circular Road, creating safety concerns for pedestrians and vehicles during night hours.",
        photoUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&h=300&fit=crop",
        location: "Circular Road, Ranchi",
        category: "Electricity",
        priority: "Medium",
        issue_resolved: true
    },
    {
        title: "Garbage Collection Issue in Bariatu",
        description: "Garbage has not been collected for over a week in Bariatu area. The accumulated waste is causing health hazards and bad odor.",
        photoUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&h=300&fit=crop",
        location: "Bariatu, Ranchi",
        category: "Sanitation",
        priority: "High",
        issue_resolved: false
    },
    {
        title: "Broken Footpath near Firayalal Chowk",
        description: "Damaged footpath creating difficulty for pedestrians. Several tiles are broken and pose risk of injury.",
        photoUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop",
        location: "Firayalal Chowk, Ranchi",
        category: "Roads",
        priority: "Medium",
        issue_resolved: true
    },
    {
        title: "Public Toilet Maintenance Required",
        description: "Public toilet facility near Bus Stand requires immediate cleaning and maintenance. Current condition is unhygienic.",
        photoUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=300&fit=crop",
        location: "Bus Stand, Ranchi",
        category: "Sanitation",
        priority: "High",
        issue_resolved: false
    },
    {
        title: "Traffic Signal Malfunction at Albert Ekka Chowk",
        description: "Traffic signal not working properly causing traffic congestion during peak hours. Manual traffic management is required.",
        photoUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop",
        location: "Albert Ekka Chowk, Ranchi",
        category: "Public Safety",
        priority: "Critical",
        issue_resolved: true
    },
    {
        title: "Drainage Blockage in Kanke Road",
        description: "Blocked drainage system causing waterlogging during rains. Needs immediate cleaning to prevent flooding.",
        photoUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=300&fit=crop",
        location: "Kanke Road, Ranchi",
        category: "Sanitation",
        priority: "High",
        issue_resolved: false
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/jharkhand-municipal';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB');

        // Clear existing issues
        await Issue.deleteMany({});
        console.log('🗑️  Cleared existing issues');

        // Insert sample issues
        const insertedIssues = await Issue.insertMany(sampleIssues);
        console.log(`✅ Inserted ${insertedIssues.length} sample issues`);

        // Display summary
        const totalIssues = await Issue.countDocuments();
        const pendingIssues = await Issue.countDocuments({ issue_resolved: false });
        const resolvedIssues = await Issue.countDocuments({ issue_resolved: true });

        console.log('\n📊 Database Summary:');
        console.log(`Total Issues: ${totalIssues}`);
        console.log(`Pending Issues: ${pendingIssues}`);
        console.log(`Resolved Issues: ${resolvedIssues}`);

        console.log('\n🎉 Database seeded successfully!');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
    }
}

// Run the seed function
seedDatabase();
