const {authService} = require("../services");
module.exports = {

    login: async (req,res,next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword, _id } = req.user;

            await authService.comparePasswords(password,hashPassword);

           const authToken = authService.createAuthToken({_id});



            res.json({
                ...authToken,
                user: req.user
            });
        } catch (e) {
            next(e);
        }
    }
}