const jwt = require('jsonwebtoken');

exports.createToken = (email) => {
    return jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
};