const {Router} = require('express');

const {positionController} = require('../controllers');
const {commonMdlwr} = require('../middlewares');
const {newPositionValidator,updatePositionValidator} = require('../validators/position.validator');
const {queryParamsValidator} = require('../validators/query.validator');

const positionRouter = Router();

positionRouter.get(
  '/',
  commonMdlwr.checkIsQueryValid(queryParamsValidator, 'query'),
  positionController.getAllPositions
);

positionRouter.get(
  '/:positionId',
  commonMdlwr.checkIsIdValid('positionId' ),
  positionController.getById
);

positionRouter.post(
  '/',
  commonMdlwr.checkIsBodyValid(newPositionValidator),
  positionController.createNewPosition
);

positionRouter.patch(
  '/:positionId',
  commonMdlwr.checkIsIdValid('positionId' ),
  commonMdlwr.checkIsBodyValid(updatePositionValidator),
  positionController.updatePositionById
);

positionRouter.delete(
  '/:positionId',
  commonMdlwr.checkIsIdValid('positionId' ),
  positionController.deletePositionById
);

module.exports = positionRouter;
