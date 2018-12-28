const Group = require('../../models/Group');
const bcrypt = require('bcrypt');
const config = require('../../utils/config');
const auth = require('../../utils/auth');

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

exports.login = async function(req, res) {
    try {
        let name = req.body.name;
        let password = req.body.password;
        let group = await Group.findOne({name: name});

        if(group) {
            let isPasswordCorrect = await bcrypt.compare(password, group.password);
            if(isPasswordCorrect) {
                let token = await auth.createToken(group);
                return res.status(200).send(
                    JSON.stringify({
                        data: {
                            token: token
                        }
                    })
                )
            }
            else {
                return res.status(401).send();
            }
        }
        else {
            return res.status(401).send();
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}