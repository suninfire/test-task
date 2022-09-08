const fileServices = require('../services/file.services');
const { statusCodes } = require('../constants');
const {ApiError} = require("../errors");
const {BAD_REQUEST, NOT_FOUND} = require("../constants/statusCode.enum");

module.exports = {
    getAllUsers: async (req, res,next) => {
        try {
            const usersFromService = await fileServices.getUsers();
            res.json(usersFromService);
        } catch (e) {
           next(e);
        }
    },

    createUser: async (req, res,next) => {
        try {
            const user = await fileServices.insertUser(req.body);

            res.status(statusCodes.CREATE).json(user);
        } catch (e) {
            next(e);
        }

    },

    getUserById: async (req, res,next) => {
        try {
            const {userId} = req.params

            if (Number.isNaN(+userId) || +userId < 0) {
                throw new ApiError('wrong user id',BAD_REQUEST);
            }

            const user = await fileServices.getOneUser(+userId);

            if (!user) {
                throw new ApiError('user not found',NOT_FOUND);
            }

            res.json(user);
        } catch (e) {
            next(e);
        }

    },

    updateUserById: async (req, res,next) => {
        try {
            const {userId} = req.params;
            const {name, age} = req.body;

            if (Number.isNaN(+userId) || +userId < 0) {
                throw new ApiError('wrong user id',BAD_REQUEST);
            }

            const userObject = {};
            if (age) userObject.age = age;
            if (name) userObject.name = name;

            const user = await fileServices.updateUser(+userId, userObject);

            if (!user) {
                throw new ApiError('user not found',NOT_FOUND);
            }

            res.status(statusCodes.CREATE).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res,next) => {
        try {
            const {userId} = req.params;

            if (Number.isNaN(+userId) || +userId < 0) {
                throw new ApiError('wrong user id',BAD_REQUEST);
            }

            const user = await fileServices.deleteOneUser(+userId);

            if (!user) {
                throw new ApiError('User not found',NOT_FOUND);
            }

            res.sendStatus(statusCodes.NO_CONTENT);
        } catch (e) {
            next(e);
        }

    }


}