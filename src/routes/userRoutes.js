const express = require('express');
const {signup} = require('../controllers/signupController');
const userLogin = require('../controllers/authController')

const useRouter = express.Router();

useRouter.post('/', signup);

useRouter.post('/login', userLogin);

module.exports = useRouter;