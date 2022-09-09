const {ApiError} = require("../errors");
const {statusCodes} = require("../constants");
const {carService} = require("../services");

module.exports = {
    checkIsCarBodyValid: async (req,res,next) => {
        try {
            next();
        } catch (e) {
            next(e);
        }
    },


    isCarPresent: async (req,res,next) => {
        try {
            const {carId} = req.params;

            const car = await carService.getOneById(carId);

            if (!car) {
                return next(new ApiError('car not found, check id',statusCodes.NOT_FOUND)) ;
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    }

}