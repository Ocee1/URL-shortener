const express = require('express');
const {signup} = require('../controllers/signupController');

const useRouter = express.Router();

useRouter.post('/', signup);

useRouter.post('/login', signup);

module.exports = useRouter;