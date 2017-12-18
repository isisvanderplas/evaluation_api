const mongoose = require('../config/database')
const { Schema } = mongoose


const evaluationSchema = new Schema({
  colorCode: { type: String, required: true},
  evaluationDate: { type: String, required: true},
  remark: { type: String, required: false}

})

const studentsSchema = new Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  evaluation: [evaluationSchema]

})


const batchSchema = new Schema({
  number: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  students: [studentsSchema]
})


module.exports = mongoose.model('batch', batchSchema);
