const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
        longitude: {type: String, required: true},
        latitude: {type: String, required: true},
        address: { type: String, required: true },
        category: { type: String, required: true },
        houseType: { type: String, require: true },
        state: { type: String, require: true },
        lga: { type: String, require: true },
        ownership: { type: String, require: true },
        // images: {type: Array, require: true}
});

module.exports = mongoose.model('House', HouseSchema);