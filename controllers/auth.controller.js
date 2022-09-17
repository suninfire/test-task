const {authService,tokenService, emailService} = require('../services');
const {statusCodes, emailActionEnum} = require('../constants');

module.exports = {

  login: async (req,res,next) => {
    try {
      const { password } = req.body;


      const { password: hashPassword, _id, name } = req.user;

      await tokenService.comparePasswords(password,hashPassword);

      const authToken = tokenService.createAuthToken({_id});

      await authService.saveTokens({...authToken, user: _id});

      await emailService.sendEmail('shabl.sergey@gmail.com', emailActionEnum.WELCOME, { userName: name} );

      res.json({
        ...authToken,
        user: req.user
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const {user, access_token} = req.tokenInfo;

      await authService.deleteOneByParams({user: user._id, access_token});

      // Auth.deleteMany({user: _id});

      res.sendStatus(statusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req,res,next) => {
    try {

      const { user, refresh_token } = req.tokenInfo;

      await authService.deleteOneByParams({refresh_token});


      const authToken = tokenService.createAuthToken({_id: user});

      const newTokens = await authService.saveTokens({...authToken, user});

      res.json(newTokens);
    } catch (e) {
      next(e);
    }
  }
};
