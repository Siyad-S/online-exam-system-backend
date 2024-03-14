const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const userCollection = mongoose.Model("user", schema)
module.exports = userCollection