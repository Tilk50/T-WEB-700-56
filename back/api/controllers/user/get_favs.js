'use strict';


const getFavs = function (req, res, next) {
    res.json({ favs: req.currentUser.favs});
};

module.exports = getFavs;
