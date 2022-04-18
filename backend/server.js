// npm i express
const express = require('express');
const connectDB = require('./config/mongoDB');
const app = express();
// npm i cors
const cors = require('cors');

// Connect to DB
connectDB();

// Init middleware -- bodyParser
app.use(express.json({ extended: false }));

// configure cors
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/carts', require('./routes/api/carts'));
app.use('/api/avatars', require('./routes/api/avatars'));

app.get('/', (req, res) => res.send('API is running'));

// run on port 8000 locally]
// "process.env.PORT" is for deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
