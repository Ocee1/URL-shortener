const Users = require('../models/User');
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
    const { email, psw } = req.body;
    if(!email || !psw) return res.status(400).json({'message': 'Username and password are required'})
    const user = Users.find(email)
    if(!user) return res.status(400).json({ 'message': 'User does not exist' })

    const match = await bcrypt.compare(psw, user.hashedpsw);
    if (match) {
        //create JWT tokens
    }
}