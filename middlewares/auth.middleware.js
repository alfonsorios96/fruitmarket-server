const jwt = require('jsonwebtoken');
const fs = require('fs');

const publicKey = fs.readFileSync('middlewares/private.key.pub', 'utf8');

const userModel = require('../models/User.model');

exports.verify = async function (req, res, next) {
    const verifyOptions = {
        expiresIn: '60d',
        algorithm: ['RS256']
    };

    let response = {};

    try {
        if (!req.headers.authorization) {
            response.message_detail = 'Auth token no presente en la cabecera';
            res.status(403).json(response);
            return 0;
        }

        const token = req.headers.authorization;

        let correct;
        try {
            correct = jwt.verify(token[1], publicKey, verifyOptions);
        } catch (e) {
            response.message_detail = 'Token inexistente';
            res.status(403).json(response);
            return 0;
        }

        req.user = await userModel.findById(correct._id);
    } catch (err) {
        response.error = err;
        res.status(403).json(response);
    }

}

exports.decode = function (token) {
    return jwt.decode(token, {complete: true});
}
