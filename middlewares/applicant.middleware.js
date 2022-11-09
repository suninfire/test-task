const {ApiError} = require('../errors');
const {statusCodes} = require('../constants');

module.exports = {
  // eslint-disable-next-line require-await
  checkIsApplicantBodyValid: async (req, res, next) => {
    try {
      const {level,categories} = req.body;
      
      const result = await categories.includes('react')
          || categories.includes('nodejs')
          || categories.includes('angular')
          || categories.includes('javascript');

      if (result === false) {
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
};

