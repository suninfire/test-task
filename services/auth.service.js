const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require("../errors");
const {statusCodes} = require("../constants");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password,10),    //бібліотека хешує пароль і повертає захешований
    comparePasswords: async (password, hashPassword) => {     // приймаємо пароль у відкритому вигляді і захешований пароль і бібліотека їх порівнює
        const isPasswordSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordSame) {
            throw  new ApiError('Wrong email or password',statusCodes.BAD_REQUEST)
        }
    },

    createAuthToken: (payload) => {      // payload це ані які будуть зашифровані, по дефолту пустий обєкт
        const access_token = jwt.sign(payload,'ACCESS_WORD', {expiresIn:'15m'});   //payload зашифрується з допомогою слова ACCESS_WORD
        const refresh_token = jwt.sign(payload,'REFRESH_WORD', {expiresIn:'30d'});   //payload зашифрується з допомогою слова REFRESH_WORD

        return {
            access_token,
            refresh_token
        }
    }

}