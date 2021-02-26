const db = require('../db');
const { verifyToken } = require('../middleware/jwt');

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
                    .json({ message: "Error creating watchlist." });
            });
};

exports.add = (req, res, next) => {
    const newCoin = req.body.newCoin;
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;

    db.getDb()
        .db()
        .collection('watchlist')
        .updateOne(
            {email: email}, 
            {$push: {coins: {coin: newCoin}}}
        )
        .then(() => {
            res
                .status(200)
                .json({ message: `Successfully added ${newCoin} to watchlist.` });
        })
        .catch(() => {
            res
                .status(401)
                .json({ message: `Error adding ${newCoin} to watchlist.` });
        });
};

exports.remove = (req, res, next) => {
    const deletedCoin = req.body.deletedCoin;
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    const { email } = payload;

    db.getDb()
        .db()
        .collection('watchlist')
        .updateOne(
            {email: email},
            {$pull: {coins: {coin: deletedCoin}}}
        )
        .then(() => {
            res
                .status(200)
                .json({ message: `Successfully deleted ${deletedCoin} from watchlist.` });
        })
        .catch(() => {
            res
                .status(401)
                .json({ message: `Error deleting ${deletedCoin} from watchlist.` });
        });
};

exports.watchlist = {
//get watchlist
};