const mongoose = require('mongoose')

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  enterprise_id: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('point', PointSchema);