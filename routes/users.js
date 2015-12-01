var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/new/:user/:pw', function(req, res) {
  console.log(req.params.user, req.params.pw);
  res.end();
});

module.exports = router;
