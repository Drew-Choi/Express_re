//@ts-check

const express = require('express');
const router = express.Router();
const userDB = require('../controllers/userController');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const duplicatedUser = await userDB.userCheck(req.body.id);
  if (!duplicatedUser) {
    const registerResult = await userDB.userRegister(req.body);
    if (registerResult) {
      res.status(200);
      res.send('회원가입 성공! <br><a href="/login">로그인으로 이동</a>');
    } else {
      res.status(500);
      res.send(
        "회원가입 실패! 알 수 없는 문제 발생 <br><a href='/register'>회원가입 다시 하기</a>",
      );
    }
  } else {
    res.status(400);
    res.send(
      "동일한 ID를 가진 회원이 존재 합니다. <br><a href='/register'>회원가입 다시 하기</a>",
    );
  }
});

module.exports = router;
