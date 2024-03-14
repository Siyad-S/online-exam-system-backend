const mongoose = require('mongoose')
const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: []
})

const questionCollection = mongoose.model("question", questionSchema)
module.exports = questionCollection