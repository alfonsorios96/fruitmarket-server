const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('middlewares/private.key', 'utf8');

const model_ = require('../models/User.model');

const actions = {
    login: async (username, password) => {
        let response = {};

        try {
            const user = await model_
                .findOne({
                    username
                });

            if (!user) {
                response.error = {
                    message: 'The username does not exist'
                };
                return response;
            }

            const bcryptValid = await bcrypt.compareSync(password, user.password);

            if (!bcryptValid) {
                response.error = {
                    message: 'The password is invalid. Try again'
                };
                return response;
            }

            const signOptions = {
                expiresIn: '60d',
                algorithm: 'RS256'
            };

            response.data = {
                token: jwt.sign({
                    username: user.username
                }, privateKey , signOptions, null)
            };
        } catch (error) {
            response.error = error;
        }

        return response;
    }
}

module.exports = actions;