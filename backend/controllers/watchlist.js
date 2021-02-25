const db = require('../db');
const { verifyToken } = require('../middleware/jwt');
const router = require('../routes/watchlist');

exports.createWatchlist = (req, res, next) => {
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;
    
        db.getDb()
            .db()
            .collection('watchlist')
            .insertOne({
                email: email,
                coins: []
            })
            .then(() => {
                res
                    .status(200)
                    .json({ message: "Successfully created a watchlist." });
            })
            .catch((err) => {
                res
                    .status(400)
                    .json({ message: "Error adding coin to watchlist" });
            });
};

exports.add = (req, res, next) => {
    const newCoin = req.body.coin;
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;

    db.getDb()
        .db()
        .collection('watchlist')
        .updateOne(
            {email: email}, 
            {$push: {coins: newCoin}}
        );
    res
        .status(200)
        .json({ message: `Successfully added ${newCoin} to watchlist.` }) ;
};

exports.remove = {
//remove coin from watchlist
};

exports.watchlist = {
//get watchlist
};