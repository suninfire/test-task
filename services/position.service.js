const {Position} = require('../dataBase');

module.exports = {
  getAll: (filter = {}) => Position.find(filter),

  getById: (positionId) => Position.findById({_id:positionId}),

  createPosition: (positionObject) => Position.create(positionObject),

  updatePosition: (positionId,newPositionBody) => Position.findOneAndUpdate({_id: positionId},newPositionBody,{new: true}),

  deletePosition: (positionId) => Position.deleteOne({_id:positionId})
};
