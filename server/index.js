const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
// import dotenv from 'cors';

const userRoutes = require('./userRoute');

const app = express();
// dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://Kshitij:<myPassword>@cluster0.xctvxhj.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch(error => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

// app.listen(8091, ()=>{
//     console.log(`Server running on port: ${8091}`)
// })
