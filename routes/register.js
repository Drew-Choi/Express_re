const express = require('express');
const router = express.Router();
const userDB = require('../controllers/userController');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 0) {
      userDB.userRegister(req.body.id, req.body.password, (data) => {
        if (data.affectedRows >= 1) {
          res.redirect('/');
        } else {
          const err = new Error('등록에러');
          err.statusCode = 500;
          throw err;
        }
      });
    } else {
      const err = new Error('등록된 ID입니다.');
      err.statusCode = 200;
      throw err;
    }
  });
});

module.exports = router;
