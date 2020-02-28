const mongoose = require('mongoose')

const EnterpriseSchema = new mongoose.Schema({
  enterprise_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('enterprise', EnterpriseSchema);