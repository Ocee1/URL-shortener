const Users = require('../models/User');

const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const {email, psw} = req.body;
    if(!email || !psw) return res.status(400).json({ 'messsage': 'Username and password required' })

    let existingUser = Users.findOne({email});
    if(existingUser) return res.status(403).json({"message": "User already exists"})

    try {
        const hashedpsw = await bcrypt.hash(psw, 10)
        const newUser = {
            firstname, 
            lastname,
            email,
            'password': hashedpsw
        }

        Users.create(newUser)
    } catch (error) {
        res.stats(500).json({'message': err.message})
    }
    

    Users.create({firstname, lastname, email, })
}

module.exports = { signup }