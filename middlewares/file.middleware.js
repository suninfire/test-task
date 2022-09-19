const {ApiError} = require('../errors');
const {statusCodes, fileConstants} = require('../constants');
module.exports = {
  checkUploadedAvatar: (req,res,next) => {
    try {
      if (!req.files || !req.files.avatar) {
        return next(new ApiError('No avatar', statusCodes.BAD_REQUEST));
      }

      const {avatar} = req.files;

      if (avatar.size > fileConstants.IMAGE_MAX_SIZE) {
        return next(new ApiError('File is too big', statusCodes.BAD_REQUEST));
      }

      if (!fileConstants.IMAGES_MIMETYPES.includes(avatar.mimetype)) {
        return next(new ApiError('Wrong file type', statusCodes.BAD_REQUEST));
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
