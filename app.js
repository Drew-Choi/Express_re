// @ts-check

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4005;

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

const mainRouter = require('./routes');
//index는 생략가능
const usersRouter = require('./routes/users');
//JS파일 연결

app.use('/', mainRouter);
app.use('/users', usersRouter);
//user모듈에 /users를 기본으로 깔고 간다.

//라우터 연결 했으므로 생략
// app.get('/', (req, res) => {
//   res.send('어서와 Express는 처음이지?');
// });

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중 입니다.`);
});
