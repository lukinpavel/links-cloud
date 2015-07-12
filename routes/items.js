exports.get = function(req, res) {
    res.render('items', {
        user : res.locals
    });


};
