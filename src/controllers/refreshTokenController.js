const Users = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);

   

    const refreshToken = cookies.jwt;
    const user = await Users.find({refreshToken})
    if(!user) return res.sendStatus(403);

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || user.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {'id': decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({ accessToken })

        }
    )
       
};

module.exports = handleRefreshToken;