const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require("../errors");
const {config} = require('../сonfigs');
const {statusCodes, tokenTypeEnum} = require("../constants");


module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),    //бібліотека хешує пароль і повертає захешований
    comparePasswords: async (password, hashPassword) => {     // приймаємо пароль у відкритому вигляді і захешований пароль і бібліотека їх порівнює
        const isPasswordSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordSame) {
            throw  new ApiError('Wrong email or password', statusCodes.BAD_REQUEST)
        }
    },

    createAuthToken: (payload) => {      // payload це ані які будуть зашифровані, по дефолту пустий обєкт
        const access_token = jwt.sign(payload, config.ACCESS_SECRET_WORD, {expiresIn: config.ACCESS_TOKEN_LIFETIME});   //payload зашифрується з допомогою слова ACCESS_WORD
        const refresh_token = jwt.sign(payload, config.REFRESH_SECRET_WORD, {expiresIn: config.REFRESH_TOKEN_LIFETIME});   //payload зашифрується з допомогою слова REFRESH_WORD

        return {
            access_token,
            refresh_token
        }
    },

    checkToken: (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let word;

            if (tokenType === tokenTypeEnum.ACCESS) word = config.ACCESS_SECRET_WORD;
            if (tokenType === tokenTypeEnum.REFRESH) word = config.REFRESH_SECRET_WORD;

            return jwt.verify(token, word);
        } catch (e) {
            throw new ApiError('Token not valid', statusCodes.UNAUTHORIZED);
        }
    },
}