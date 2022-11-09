const {Router} = require('express');

const {positionController} = require('../controllers');
const {positionMdlwr,commonMdlwr} = require('../middlewares');


const positionRouter = Router();

positionRouter.get(
  '/',
  positionController.getAllPositions
);

positionRouter.get(
  '/position/:positionId',
  commonMdlwr.checkIsIdValid('positionId' ),
  positionController.getById
);

positionRouter.get(
  '/:level',
  positionMdlwr.checkIsLevelValid('level'),
  positionController.getPositionsByParams
);

positionRouter.get(
  '/:category/:level',
  positionMdlwr.checkIsLevelValid('level'),
  positionMdlwr.checkIsCategoryValid('category'),
  positionController.getPositionsByParams
);

positionRouter.post(
  '/',
  positionMdlwr.checkIsPositionBodyValid,
  positionController.createPosition
);

positionRouter.patch(
  '/:positionId',
  commonMdlwr.checkIsIdValid('positionId' ),
  positionController.updatePositionById
);

positionRouter.delete(
  '/:positionId',
  commonMdlwr.checkIsIdValid('positionId' ),
  positionController.deletePositionById
);


module.exports = positionRouter;
