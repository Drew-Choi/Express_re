const express = require('express');
const router = express.Router();
const userDB = require('../controllers/userController');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 1) {
      if (data[0].PASSWORD === req.body.password) {
        req.session.login = true;
        req.session.userID = req.body.id;
        res.status(200);
        res.redirect('/dbBoard');
      } else {
        res.status(400);
        res.send(
          '비밀번호가 다릅니다. <br><a href="/login">로그인으로 이동</a>',
        );
      }
    } else {
      res.status(400);
      res.send(
        '해당 ID가 존재하지 않습니다. <br><a href="/register">회원가입으로 이동</a><br><br><a href="/login">다시 로그인하기</a>',
      );
    }
  });
});

module.exports = router;
