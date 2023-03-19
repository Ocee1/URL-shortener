const Users = require('../models/User');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const {firstname, lastname, email, password, phoneNum} = req.body;
    console.log(req.body)
    if(!email || !password) return res.status(400).json({ 'messsage': 'email and password required' })

    let existingUser = await Users.findOne({email: email});
    if(existingUser) return res.status(403).json({"message": "User already exists"})

    try {
        const hashedpsw = await bcrypt.hash(password, 10)
        const newUser = {
            firstname, 
            lastname,
            email,
            phoneNum,
            password: hashedpsw
        }

        await Users.create(newUser)
        console.log(newUser)
        return res.json({ "message": "Account created successfully"})
    } catch (error) {
        return res.status(500).json({'message': error.message})
    }
}

module.exports = { signup }