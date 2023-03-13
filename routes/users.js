const express = require('express');
const router = express.Router();

//app.js에서 /users 를 기본으로 하므로 아래 미들웨이는
//http:localhost:4005/users가 됨
router.get('/', (req, res) => {
  res.render('users', { user: '최두루입니다.' });
});

module.exports = router;
