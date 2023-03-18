const express = require('express');


const router = express.Router();

router.route('/').get( (req, res) => {
    console.log('this went thru')
    res.send('abeg na')
});


module.exports = router;