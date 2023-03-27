const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./src/db/connec');
require('dotenv').config();


const cors = require('cors');
const cookieParser = require('cookie-parser');
const signup = require('./src/routes/signupRoute');
const refresh = require('./src/routes/refresh');
const logout = require('./src/routes/logout');
const login = require('./src/routes/loginRoute');
const verify = require('./src/middlewares/VerifyJWT');
const urlRoute = require('./src/routes/getUrl');


const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors);



app.use(cookieParser());

//routes


app.use('/api/v1', signup);
app.use('/api/v1', urlRoute);
app.use('/api/v1/refresh', refresh);
app.use('/api/v1/login', login);

app.use(verify)
app.use('/api/v1/logout', logout);


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
