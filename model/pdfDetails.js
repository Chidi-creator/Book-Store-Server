const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pdfDetailsSchema = new Schema({
  pdf: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("pdfDetails", pdfDetailsSchema)

