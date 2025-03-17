const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imageDetailSchema = new Schema({
    image: String

})


module.exports = mongoose.model("imaages", imageDetailSchema)