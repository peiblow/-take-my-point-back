const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profile_pic: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  enterprise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: '_enterprise_'
  },
  user_role: {
    type: String,
    required: true
  },
  language: {
    type: String,
    lowercase: true,
    required: true
  }
})

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash( this.password, 10 );
  this.password = hash;

  next();
})

const Users = mongoose.model('Users', UserSchema)
module.exports = Users;