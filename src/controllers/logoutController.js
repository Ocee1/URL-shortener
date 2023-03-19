const Users = require('../models/User');

const logout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;
    const user = await Users.findOne({refreshToken})
    if(!user) {
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204);
    }
    
    // delete refresh token from db
    const logoutuser = await Users.findOneAndUpdate({email: user.email}, {refreshToken: ''});
    if (logoutuser) return res.status(204).json({"msg": "User successfully logged out"})
};

module.exports = logout;