const db = require('../db');
const { verifyToken } = require('../middleware/jwt');

exports.createWatchlist = (req, res, next) => {
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;

    if (db.getDb().db().collection('watchlist').findOne({email: email})) {
        res
            .status(400)
            .json({ message: "Watchlist already created for this user."});
    } else {
        db.getDb()
            .db()
            .collection('watchlist')
            .insertOne({
                email: email,
                coins: []
            })
        res
            .status(200)
            .json({ message: "Successfully created a watchlist." });
    };
};

exports.add = {
//add coin to watchlist req.headers.Authorization
//could try const user = verifyToken(token)
};

exports.remove = {
//remove coin from watchlist
};

exports.watchlist = {
//get watchlist
};