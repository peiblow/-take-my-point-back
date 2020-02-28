const EnterpriseModel = require('../models/enterprise_model')

module.exports = {
  async store(req, res) {
    const { enterprise_name, email } = req.body
    
    try{
      if(await EnterpriseModel.findOne({ email }) || await EnterpriseModel.findOne({ enterprise_name }) )
        return res.status(400).json({ error: 'Esta empresa já existe' });

      const enterprise = await EnterpriseModel.create(req.body);

      return res.status('200').json({ enterprise });
    }catch( err ){
      return res.status('500').json(err);
    }
  },

  async show(req, res) {
    try {
      const enterprise = await EnterpriseModel.findById(req.params.id)
      return res.json(enterprise);
    } catch (err) {
      return res.status('500').json(err)
    }
  }
}