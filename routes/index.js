var express = require('express');
var router = express.Router();
var stanupCtrl = require('../controllers/standup.server.controller');

/* GET home page. */
router.get('/', function(req, res) {
  return stanupCtrl.fetchAllNotes(req,res);
});

router.post('/', function(req, res) {
  return stanupCtrl.filterByUserName(req,res);
});

router.get('/newnote', function(req,resp){
  return stanupCtrl.getNote(req,resp);
});

router.post('/newnote', function(req,resp){
  return stanupCtrl.create(req,resp);
});

module.exports = router;
