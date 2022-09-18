const {authService,tokenService, emailService, actionTokenService, userService, previousPasswordService} = require('../services');
const {statusCodes, emailActionEnum, tokenTypeEnum, constant} = require('../constants');
const {FRONTEND_URL} = require('../сonfigs/config');

module.exports = {

  login: async (req,res,next) => {
    try {
      const { password, email } = req.body;


      const { password: hashPassword, _id, name } = req.user;

      await tokenService.comparePasswords(password,hashPassword);

      const authToken = tokenService.createAuthToken({_id});

      await authService.saveTokens({...authToken, user: _id});

      await emailService.sendEmail(email, emailActionEnum.WELCOME, { userName: name} );

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
  },

  forgotPassword: async (req,res,next) => {
    try {
      const { email, _id } = req.user;

      const actionToken = tokenService.createActionToken(tokenTypeEnum.FORGOT_PASSWORD,{ _id });
      const url = `${FRONTEND_URL}/password/forgot-pass-page?token=${actionToken}`;

      await emailService.sendEmail(email,emailActionEnum.FORGOT_PASSWORD,{ url });
      await actionTokenService.createActionToken({
        token: actionToken,
        tokenType: tokenTypeEnum.FORGOT_PASSWORD,
        user: _id,

      });

      res.json({actionToken});
    } catch (e) {
      next(e);
    }
  },

  setNewPasswordForgot: async (req,res,next) => {
    try {
      const { user } = req.tokenInfo;
      const { password } = req.body;
      const token = req.get(constant.AUTHORISATION);

      await previousPasswordService.savePassword({ password: user.password, user: user._id});

      await authService.deleteMany({ user: user._id});
      await actionTokenService.deleteOne({ token });

      const hashPassword = await tokenService.hashPassword(password);
      await userService.updateUserById( user._id, {password: hashPassword});

      res.json('your password has been changed');

    } catch (e) {
      next(e);
    }
  }
};
