const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE YOUR OWN MODEL
// BELOW IS A SKELETON MEANT TO BE CHANGED

const TestingSchema = new Schema ({
    name: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Testing = mongoose.model('testing', TestingSchema);