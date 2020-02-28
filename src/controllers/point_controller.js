const PointModel = require('../models/points_model')

module.exports = {
  async index(req, res) {
    const { user_id } = req.query
    try{
      const points = await PointModel.aggregate([
        {
          $match : { $or: [{ user_id }]}
        },
        {
          $group: {
            _id : "$day",
            point: { $push: "$$ROOT" }
          }
        }
      ])
      return res.status('200').json({ points });
    }catch( err ){
      return res.status('500').json(err);
    }
  },
  async store(req, res) {
    try{
      const point = await PointModel.create(req.body);

      req.io.emit('NewPoint', point)
      return res.status('200').json({ point });
    }catch( err ){
      return res.status('500').json(err);
    }
  }
}