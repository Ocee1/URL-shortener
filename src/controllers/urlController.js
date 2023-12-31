const URL = require('../models/URL');
const isValid = require('valid-url');

const shortURL = require('../services/shortid');
const { findOne } = require('../models/URL');

const shortenUrl = async (req, res) => {
    const { longURL } = req.body;
    const baseUrl = process.env.BASE_URL;
    const validUrl = isValid.isUri(long_url);
    if(!validUrl) return res.status(400).json({'message': 'The URL is invalid'});
    try {
        let urls = await URL.findOne({longURL});
        if(urls) return res.status(400).json({'message': 'URL already exists'})
        const shortID = shortURL(8);
        const shortenedURL = baseUrl + '/' + shortID;
        const url = {
            longURL,
            shortenedURL,
            'URLcode': shortID
        };

        const newUrl = await new URL(url).save();
        return res.status(201).json({'data': newUrl})
        
    } catch (error) {
        return res.status(500).json({'message': error.message});
    }

};

const customUrl = async (req, res) => {
    const { longUrl, customRoute } = req.body;
    const baseUrl = procee.env.BASE_URL;
    const validUrl = isValid.isUri(longUrl);
    if(!validUrl) return res.status(400).json({'message': 'The URL is invalid'});
    try {
        let urls = await findOne({longURl});
        let custRoute = await findOne({customRoute});
        if(urls || custRoute) return res.status(400).json({'message': 'The Url already or route already exists'});
        const shortenedURL = `${baseUrl}/${customRoute}`;
        const url = {
            longURL,
            shortenedURL,
            'URLcode': customRoute
        };
        const newUrl = await new URL(url).save();
        return res.status(201).json({'data': newUrl})
    } catch (error) {
        return res.status(500).json({'message': error.message})
    }
};

const getURL = async (req, res) => {
    const route = req.params.route;
    try {
        const urlData = await URL.findOne({'URLcode': route});
        if(!urlData) return res.status(404).json({'message': 'Resource not found'});

        return res.redirect(urlData.longURL);
    } catch (error) {
        return res.status(500).json({'message': error.message});
    }
};

module.exports = { shortenUrl, getURL, customUrl };