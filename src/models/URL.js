const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const URLSchema = new Schema({
    URl: String,
    shortenedURL: String,
    userID: {
        type: Schema.Types.ObjectId,
        ref: user,
    }
});

module.exports = model(URL, URLSchema);