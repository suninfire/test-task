const {statusCodes} = require('../constants');
const {carService, userService} = require("../services");


module.exports = {

    createCar: async (req, res, next) => {
        try {
            const {_id, cars} = req.user;

            const car = await carService.createCar({...req.body, user: _id});

            await userService.updateUserById(_id,{cars: [...cars, car._id]})

            res.status(statusCodes.CREATE).json(car);
        } catch (e) {
            next(e);
        }

    },

    getCarById: async (req, res, next) => {
        try {
            const {car} = req;

            res.json(car);
        } catch (e) {
            next(e);
        }

    },

    updateCarById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await carService.updateUserById(userId, req.body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteCarById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await carService.deleteCarById(userId);

            res.sendStatus(statusCodes.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
}