const Users = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password) return res.sendStatus(400).json({'message': 'Username and password are required'})
    const user = await Users.findOne({email: email})
    if(!user) {
        return res.status(400).json({ 'message': 'User does not exist' })
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        //create JWT tokens
        const accessToken = jwt.sign(
            {'id': user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'}
        )
        const refreshToken = jwt.sign(
            {'id': user.id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'}
        )
        const updatedUser = await Users.findOneAndUpdate({email}, {refreshToken: refreshToken})
        console.log(updatedUser)
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