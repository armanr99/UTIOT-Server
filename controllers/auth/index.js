var auth = require('../../utils/auth');

exports.validateToken = async function (req, res) {
    try {
        let token = req.body.token;
        let validated = await auth.validateToken(token);
        
        if(token == null || !validated) {
            return res.status(401).send();
        }
        else {
            return res.status(200).send();
        }
    }
    catch (err) {
        console.log(err);
    }
}