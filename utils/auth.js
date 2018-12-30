const jwt = require('jsonwebtoken');
const config = require('./config');

exports.createToken = async function (group) {
    let token = await jwt.sign(
        {
            name: group.name
        },
        config.secret,
        { expiresIn: config.tokenExpiretime}
    );
    return token;
}

exports.validateToken = async function (token) {
    try {
        await jwt.verify(token, config.secret);
        return true;
    }
    catch(err)
    {
        console.log('token invalid');
        return false;
    }
};