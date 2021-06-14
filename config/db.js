const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: process.env.DATABASE_NAME
    })
    console.log(`Database connection is ready: ${conn.connection.host}`);
}

module.exports = connectDB;
