const express = require('express');

const refreshToken = require('../controllers/refreshTokenController')

const useRouter = express.Router();

useRouter.post('/', signup);

useRouter.post('/login', userLogin);

module.exports = useRouter;