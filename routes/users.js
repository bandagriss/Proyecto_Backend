var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users', (req, res) => {
  res.send('aqui llega al post');
});


module.exports = router;
