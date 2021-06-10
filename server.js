const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.disable('etag');

require('dotenv/config')
const api = process.env.API_URL || ''

app.get(`${api}/products`, (req, res) => {
    const products = {
        id: 1,
        name: "hair dresser",
        image: 'some_url'
    }
    res.send(products)
})

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body;
    res.json(newProduct)
})

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME
})
.then(() => {
    console.log('Database connection is ready');
}).catch(err => {
    console.log(err);
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
});