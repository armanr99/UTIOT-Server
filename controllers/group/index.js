const Group = require('../../models/Group');
const GroupMember = require('../../models/GroupMember');
const bcrypt = require('bcrypt');
const config = require('../../utils/config');
const auth = require('../../utils/auth');

exports.signup = async function (req, res) {
    try {
        let name = req.body.name;
        let password = req.body.password;
        let thingspeak = req.body.thingspeak;
        let members = req.body.members;

        password = await bcrypt.hash(password, config.saltRounds);

        let group = await Group.findOne({ name: name })
        if(group) {
            res.statusMessage = "Group name already exists!";
            return res.status(422).send();
        }
        else {
            let madeGroup = await Group.create({ name: name, password: password, thingspeak: thingspeak});
            await Promise.all(
                members.map(async function (member) {
                    await GroupMember.create( {group: madeGroup, name: member.value });
                })
            )
            return res.status(200).send();
        }
    }
    catch(err) {
        console.log(err);
        res.statusMessage = "Signup Failed!";
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
                res.statusMessage = "Wrong username or password!";
                return res.status(401).send();
            }
        }
        else {
            res.statusMessage = "Wrong username or password!";
            return res.status(401).send();
        }
    }
    catch(err) {
        console.log(err);
        res.statusMessage = "Login Failed!";
        return res.status(500).send();
    }
}

exports.getGroup = async function (req, res) {
    let name = req.params.name;

    try {
        let group = await Group.findOne({name: name});
        if(group) {
            let membersDocs = await GroupMember.find({ group: group });
            let members = await Promise.all(
                membersDocs.map(async function (member) {
                    return member.name;
                })
            )
            return res.status(200).send(
                JSON.stringify({
                    data: {
                        group: group.toJSON(),
                        members: members
                    }
                })
            )
        }
        else {
            return res.status(404).send();
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}