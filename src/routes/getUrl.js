const express = require('express');
const { shortenUrl, getURL, customUrl } = require('../controllers/urlController');


const router = express.Router();

router.route('/').get( (req, res) => {
    res.send('Welcome to Ocee\'s URL shortener')
});

router.route('/short')
.post(shortenUrl)
.get(getURL);

router.post('/custom', customUrl)

module.exports = router;