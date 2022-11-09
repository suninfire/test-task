const {ApiError} = require('../errors');
const {statusCodes} = require('../constants');


module.exports = {

  // eslint-disable-next-line require-await
  checkIsPositionBodyValid: async (req, res, next) => {
    try {
      const {level, category} = req.body;

      if (category !== 'nodejs' && category !== 'angular' && category !== 'javascript' && category !== 'react') {
        throw new ApiError('Wrong categories,available categories: nodejs, angular, javascript, react ', statusCodes.BAD_REQUEST);
      }

      if (level !== 'junior' && level !== 'middle' && level !== 'senior') {
        throw new ApiError('Wrong level,available levels: junior,middle, senior', statusCodes.BAD_REQUEST);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  // eslint-disable-next-line require-await
  checkIsLevelValid: (fieldName,from='params') => async (req, res, next) => {
    const params = (req[from][fieldName]);
    try {
      if (params !== 'junior' && params !== 'middle' && params !== 'senior') {
        return next(new ApiError('Not valid params(level)', statusCodes.BAD_REQUEST));
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  // eslint-disable-next-line require-await
  checkIsCategoryValid: (fieldName,from='params') => async (req, res, next) => {
    const params = (req[from][fieldName]);
    try {
      if (params !== 'nodejs' && params !== 'angular' && params !== 'javascript' && params !== 'react') {
        return next(new ApiError('Not valid params(category)', statusCodes.BAD_REQUEST));
      }
      next();
    } catch (e) {
      next(e);
    }
  },

};

