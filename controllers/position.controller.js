const {statusCodes,emailActionEnum} = require('../constants');
const {positionService,emailService} = require('../services');

module.exports = {
  getAllPositions: async (req, res, next) => {
    try {
      const positions = await positionService.getAll(req.query);
      res.json(positions);
    } catch (e) {
      next(e);
    }
  },

  getById: async (req, res, next) => {
    try {
      const {positionId} = req.params;
      const positionById = await positionService.getById(positionId);

      res.json(positionById);
    } catch (e) {
      next(e);
    }
  },

  createNewPosition: async (req, res, next) => {
    try {
      const position = await positionService.createPosition(req.body);

      await emailService.sendEmail(emailActionEnum.ADDED,req.body);

      res.status(statusCodes.CREATE).json(position);
    } catch (e) {
      next(e);
    }
  },

  updatePositionById: async (req, res, next) => {
    try {
      const {positionId} = req.params;

      const position = await positionService.updatePosition(positionId, req.body);

      res.json(position);
    } catch (e) {
      next(e);
    }
  },

  deletePositionById: async (req, res, next) => {
    try {
      const {positionId} = req.params;

      const body = await positionService.getById(positionId);

      await emailService.sendEmail(emailActionEnum.REMOVED,body);

      await positionService.deletePosition(positionId);

      res.sendStatus(statusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },
};
