exports.get = function(req, res) {
    res.render('frontpage', {
        user : res.locals
    });


};
