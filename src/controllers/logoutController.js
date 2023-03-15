const Users = require('../models/User');




const logout = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;
    const user = Users.find({refreshToken})
    if(!user) {
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204);
    }
    
    // delete refresh token from db
    const logoutuser = Users.findOneAndUpdate({email: user.email}, {refreshToken: ''});
};

module.exports = logout;