const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

connectDb();
app.use('/api/contact', require('./routes/contactRouts'));
app.use('/api/user', require('./routes/userRouts'));
app.use(errorHandler);
// app.use(connectDb)



// Ping the server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});