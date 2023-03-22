/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable import/newline-after-import */
const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/userController');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', loginUser);
// 로그인 미들웨어

//레거시 코드
// router.post('/', (req, res) => {
//   userDB.userCheck(req.body.id, (data) => {
//     if (data.length === 1) {
//       if (data[0].PASSWORD === req.body.password) {
//         // 로그인 세션 발행
//         req.session.login = true;
//         req.session.userID = req.body.id;

//         // // 로그인 쿠키 발행
//         res.cookie('user', req.body.id, {
//           maxAge: 1000 * 30,
//           httpOnly: true,
//           signed: true,
//         });

//         res.status(200);
//         res.redirect('/dbBoard');
//       } else {
//         res.status(400);
//         res.send(
//           '비밀번호가 다릅니다. <br><a href="/login">로그인으로 이동</a>',
//         );
//       }
//     } else {
//       res.status(400);
//       res.send(
//         '해당 ID가 존재하지 않습니다. <br><a href="/register">회원가입으로 이동</a><br><br><a href="/login">다시 로그인하기</a>',
//       );
//     }
//   });
// });

// router.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) throw err;
//     res.clearCookie('user');
//     res.redirect('/');
//   });
// });

module.exports = router;
