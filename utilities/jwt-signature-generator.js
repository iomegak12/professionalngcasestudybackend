let jwt = require('jsonwebtoken');

const INVALID_ARGUMENTS = 'Invalid Argument(s) Specified!';
const TEN_MINUTES = '10m';

class JwtSignatureGenerator {
    static sign(payload, globalSecretKey) {
        let validation = payload && globalSecretKey;

        if (!validation)
            throw new Error(INVALID_ARGUMENTS);

        let signature = jwt.sign(payload, globalSecretKey, {
            expiresIn: TEN_MINUTES
        });

        return signature;
    }
}

module.exports = JwtSignatureGenerator;
