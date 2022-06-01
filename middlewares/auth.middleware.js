const jwt = require('jsonwebtoken');
const fs = require('fs');

const publicKey = fs.readFileSync('middlewares/private.key.pub', 'utf8');

exports.verify = async function (req, res, next) {
    const verifyOptions = {
        expiresIn: '60d',
        algorithm: ['RS256']
    };

    let response = {};

    try {
        if (!req.headers.authorization) {
            response.message_detail = 'Token de autorización no presente en la cabecera [Authorization]';
            res.status(403).json(response);
            return 0;
        }

        const token = req.headers.authorization;

        let correct;
        try {
            const tokenSplit = token.split(' ');
            correct = jwt.verify(tokenSplit[1], publicKey, verifyOptions);
            if(correct){
                next();
            }
        } catch (e) {
            response.error = e;
            res.status(403).json(response);
            return 0;
        }
    } catch (err) {
        response.error = err;
        res.status(403).json(response);
        return 0;
    }

}

exports.decode = function (token) {
    return jwt.decode(token, {complete: true});
}
