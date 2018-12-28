const Group = require('../../models/Group');
const bcrypt = require('bcrypt');
const config = require('../../utils/config');

exports.signup = async function (req, res) {
    try {
        let newGroup = req.body;
        let password = newGroup.password;
        newGroup.password = await bcrypt.hash(password, config.saltRounds);
        await Group.create(newGroup);
        return res.status(200).send();
    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}