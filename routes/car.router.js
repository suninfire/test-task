const {Router} = require('express');

const {carController} = require('../controllers');
const {carMdlwr,commonMdlwr,authMdlwr} = require('../middlewares');
const {updateCarValidator, newCarValidator} = require('../validators/car.validators');


const carRouter = Router();
carRouter.post(
  '/',
  commonMdlwr.checkIsBodyValid(newCarValidator),
  authMdlwr.checkIsAccessToken,
  carController.createCar
);

carRouter.get(
  '/:carId',
  commonMdlwr.checkIsIdValid('carId' ),
  carMdlwr.isCarPresent,
  carController.getCarById
);

carRouter.put('/:carId',
  commonMdlwr.checkIsBodyValid(updateCarValidator),
  authMdlwr.checkIsAccessToken,
  carMdlwr.isCarPresent,
  carController.updateCarById
);

carRouter.delete(
  '/:carId',
  commonMdlwr.checkIsIdValid('carId' ),
  authMdlwr.checkIsAccessToken,
  carMdlwr.isCarPresent,
  carController.deleteCarById
);

module.exports = carRouter;
