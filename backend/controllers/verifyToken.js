const { verifyToken } = require('../middleware/jwt');

exports.verify = (req, res, next) => {
    res
        .status(200)
        .json(verifyToken(req.body.token));
};