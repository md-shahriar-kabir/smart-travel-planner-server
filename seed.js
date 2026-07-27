// seed.js
const mongoose = require('mongoose');
require('dotenv').config();

// Agent Schema
const agentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    features: [String],
    rating: { type: Number, default: 5.0 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Collection Name will automatically be 'agents' (Plural of Agent)
const Agent = mongoose.model('Agent', agentSchema);

const sampleAgents = [
  {
    title: 'DocuMind AI Parser',
    tagline: 'Autonomous document parser for key data extraction',
    description: 'Extracts structured JSON data from PDFs, invoices, and receipts automatically.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    category: 'Document Intelligence',
    price: 29,
    features: ['PDF OCR Processing', 'JSON Export', 'Batch Processing'],
    rating: 4.8,
    totalReviews: 12,
  },
  {
    title: 'SmartRecom Engine',
    tagline: 'Personalized product recommendation workflow',
    description: 'Analyzes user browsing history to recommend real-time contextual items.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    category: 'Recommendation',
    price: 49,
    features: ['Real-time Tracking', 'User Segmentation', 'API Integration'],
    rating: 4.9,
    totalReviews: 8,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas...');

    // Clear existing data (optional)
    await Agent.deleteMany({});
    console.log('Old records cleared.');

    // Insert Initial Collection Data
    await Agent.insertMany(sampleAgents);
    console.log('Database & "agents" collection created successfully with sample data!');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();