var Standup = require('../models/standup.server.model');

exports.create = function (req, res) {
    var entry = new Standup({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment
    });
    entry.save(function(err){
        if (err){
            var errMsg = 'Sorry, there was an error while saving ' + err;
            res.render('newnote',{title: 'Standup - New note (error)', message: errMsg});
        }
    });
    console.log('Saved successfully');
    res.redirect(301, '/');
}

exports.getNote = function (req, res) {
    res.render('newnote', { title: 'Standup - New notes' });
}

exports.fetchAllNotes = function (req, resp) {
    var list = Standup.find();
    list.sort({ createdOn: 'desc' }).limit(12)
        .exec(function (err, results) {
            resp.render('index', { title: 'Stanup _Notes', notes: results });
        });
}

exports.filterByUserName = function (req, resp) {
    var list = Standup.find();
    var name = req.body.memberName;
    if (name.length > 0) {
        list.where({ memberName: name })
    }
    // list.where({ memberName: name });
    list.sort({ createdOn: 'desc' })
        .exec(function (err, results) {
            resp.render('index', { title: 'Stanup _Notes', notes: results });
        });
}