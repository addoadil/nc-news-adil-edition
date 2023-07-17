const { selectAllUsers, selectUserByUsername } = require("../models/users.models")

exports.getAllUsers = (req, res, next) => {
    selectAllUsers()
        .then((users) => {
            res.status(200).send({ users })
        })
        .catch((err) => {
            next(err)
        });
};

exports.getUserByUsername = (req, res, next) => {
    const { username } = req.params;
    selectUserByUsername(username)
        .then((userObj) => {
        res.status(200).send(userObj);
    }).catch((err) => {
        next(err)
    });
};
