const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const URLSchema = new Schema({
    URLcode: String,
    longURl: String,
    shortenedURL: String,
    userID: {
        type: Schema.Types.ObjectId,
        ref: user,
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = model(URL, URLSchema);