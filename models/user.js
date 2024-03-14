const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    answers: []
})

const userCollection = mongoose.model("user", schema)
module.exports = userCollection