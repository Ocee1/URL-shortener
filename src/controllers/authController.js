const Users = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const userLogin = async (req, res) => {
    const { email, psw } = req.body;
    if(!email || !psw) return res.status(400).json({'message': 'Username and password are required'})
    const user = Users.find({email})
    if(!user) return res.status(400).json({ 'message': 'User does not exist' })

    const match = await bcrypt.compare(psw, user.hashedpsw);
    if (match) {
        //create JWT tokens
        const accessToken = jswt.sign(
            {'username': user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'}
        )
        const refreshToken = jswt.sign(
            {'username': user.email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'}
        )
        Users.findOneAndUpdate({email}, {refreshToken})
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24*60*60*1000
        });

        res.json({accessToken})
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = userLogin;