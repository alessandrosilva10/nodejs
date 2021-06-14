const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const speeches = require('./routes/speaking');
var cors = require('cors');

require('dotenv/config')
const api = process.env.API_URL || ''

connectDB();

//middleware
app.use(cors());
app.use(bodyParser.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'));
}
app.disable('etag');

app.use(`${api}/speeches`, speeches);


const server = app.listen(
    process.env.PORT || 5000, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
});

// handle unhandled Rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});