const UserModel = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth_config');

module.exports = {
  async auth (req, res) {
    try{
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email }).select('+password')

      if(!user)
        return res.status('404').json({ error: 'Usuário não encontrado' });
      
      if(!await bcrypt.compare(password, user.password))
      return res.status('404').json({ error: 'Senha Inválida' });
      
      user.password = undefined;

      const token = jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: '7d',
      });
  
      return res.status('200').json({ user, token });
    }catch(err){
      return res.status('500').send(err);
    }
  },
  async store (req, res) {
    const { email, username } = req.body
    
    try{
      if(await UserModel.findOne({ email }) || await UserModel.findOne({ username }) )
        return res.status(400).json({ error: 'Usario já existente' });

      const user = await UserModel.create(req.body);

      const token = jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: 86400,
      });

      return res.status('200').json({ user, token });
    }catch( err ){
      return res.status('500').json(err);
    }
  },
  async update (req, res) {
    try{
      const user = await UserModel.findByIdAndUpdate(req.params._id, req.body)

      return res.status('200').json({ user });
    }catch( err ){
      return res.status(500).send({ error: err })
    }
  }
}