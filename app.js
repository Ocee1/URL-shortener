const express = require('express');
const app = express();
const connectDB = require('./src/db/connec');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyAuth = require('./src/middlewares/VerifyJWT')
const signup = require('./src/routes/signupRoute');
const refresh = require('./src/routes/refresh');
const logout = require('./src/routes/logout');
const login = require('./src/routes/loginRoute');
const getroute = require('./src/routes/getroute');


const PORT = process.env.PORT || 4000;

// app.use(cors);



// app.use(cookieParser);

//routes

app.use('/try', getroute);
app.use('/api/v1', signup);
app.use('/api/v1/refresh', refresh);
app.use('/api/v1/logout', logout);
app.use('/api/v1/login', login);


// app.use(verifyAuth);





// app.listen(PORT, (err) => {
//     if(err) console.log(err);
//     console.log(`Server started on port ${PORT}`)
// })

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
