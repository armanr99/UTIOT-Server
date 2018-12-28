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