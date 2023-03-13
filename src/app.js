const express = require('express');
const connectDB = require('./db/connec');
require('dotenv').config();

const app = express();


const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        .then(() => {console.log('DB connected successfully')})
        app.listen(PORT, () => {
            console.log(`Server started on port {PORT}`)
        })
    } catch (error) {
        console.log('error')
    }
}
start();
