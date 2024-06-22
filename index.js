const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./router/authRoutes');
const productRoutes = require('./router/productRoutes');
const path = require('path');

dotenv.config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello');
});
// Routes
app.use('/', authRoutes);
app.use('/',productRoutes)
// Connect to MongoDB (deprecated options removed)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// user render to deploy 