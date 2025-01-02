// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./router/authRoutes');
const productRoutes = require('./router/productRoutes');
const dates = require('./router/dateRoutes');
const auth=require('./router/userRoutes');
const commande=require('./router/commandeRoutes');
const media = require('./router/mediaRoutes');
const path = require('path');
const {upload} = require('./middle/lol');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files
app.get('/', (req, res) => {
  res.send('Hello');
});
app.post("/ok", upload.single("picture"),(req, res) => {
  res.status(200).json({ message: 'Picture uploaded successfully', filePath: req.file.path });

})
// Routes
app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/',dates);
app.use('/',auth);
app.use("/",commande);
app.use("/",media);

// Connect to MongoDB (deprecated options removed)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
