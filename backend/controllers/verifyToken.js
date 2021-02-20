const { verifyToken } = require('../middleware/jwt');

exports.verify = (req, res, next) => {
    //Only successful response set up
    res
        .status(200)
        .json(verifyToken(req.body.token));
};