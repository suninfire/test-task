const {statusCodes,emailActionEnum} = require('../constants');
const {Position} = require('../dataBase');
const {emailService} = require('../services');

module.exports = {
  getAllPositions: async (req, res, next) => {
    try {
      const positions = await Position.find(req.body);

      res.json(positions);
    } catch (e) {
      next(e);
    }
  },

  getPositionsByParams: async (req, res, next) => {
    try {
      const {category} = req.params;
      const {level} = req.params;

      if (category === undefined) {
        const positionsByParams = await Position.find({level});
        res.json(positionsByParams);
      } else {
        const positionsByParams = await Position.find({category, level});
        res.json(positionsByParams);
      }
    } catch (e) {
      next(e);
    }
  },

  getById: async (req, res, next) => {
    try {
      const {positionId} = req.params;
      const positionById = await Position.findById({_id:positionId});

      res.json(positionById);
    } catch (e) {
      next(e);
    }
  },

  createPosition: async (req, res, next) => {
    try {
      const position = await Position.create(req.body);

      await emailService.sendEmail(emailActionEnum.ADDED,req.body);

      res.status(statusCodes.CREATE).json(position);
    } catch (e) {
      next(e);
    }
  },

  updatePositionById: async (req, res, next) => {
    try {
      const {positionId} = req.params;

      const position = await Position.findOneAndUpdate({_id: positionId}, req.body, {new: true});

      res.json(position);
    } catch (e) {
      next(e);
    }
  },

  deletePositionById: async (req, res, next) => {
    try {
      const {positionId} = req.params;

      await Position.deleteOne({positionId});

      res.sendStatus(statusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },

};
