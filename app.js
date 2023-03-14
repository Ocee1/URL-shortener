const express = require('express');
const connectDB = require('./src/db/connec');
require('dotenv').config();
const cors = require('cors');
const useRouter = require('./src/routes/signup');

const app = express();

app.use(cors);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/v1', useRouter);



const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        .then(() => {console.log('DB connected successfully')})
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (error) {
        console.log('error')
    }
}
start();
