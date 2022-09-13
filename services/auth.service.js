const { Auth } = require('../dataBase');

module.exports = {
    saveTokens(tokens) {
        return Auth.create(tokens);
    },

    getOneWithUser(filter) {
        return Auth.findOne(filter).populate('user');  //.populate дістає щось що має звязки з полем user
    },

    getOneByParams(filter) {
        return Auth.findOne(filter);
    },

    deleteOneByParams(filter) {
        return Auth.deleteOne(filter)
    }


}