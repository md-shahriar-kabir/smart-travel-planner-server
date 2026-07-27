const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const agentRoutes = require('./routes/agentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/agents', agentRoutes);

app.get('/', (req, res) => {
  res.send('MongoDB Express API Server Running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});