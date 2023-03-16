// @ts-check

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//오류코드 설치
// const { STATUS_CODES } = require('http');

const app = express();
const PORT = 4005;

app.use(cookieParser());
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
//바디-파서 세팅 (항상 라우터 위에 세팅되어야 함)
//바디-파서 express 내장되어 있음, express로 사용해도 됨
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRouter = require('./routes');
//index는 생략가능
const usersRouter = require('./routes/users');
//JS파일 연결
const boardRouter = require('./routes/board');
const dbRouter = require('./routes/db');
const dbBoardRouter = require('./routes/dbBoard');
const cookieRouter = require('./routes/cookie');

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);
app.use('/db', dbRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/cookie', cookieRouter);
//user모듈에 /users를 기본으로 깔고 간다.

//라우터 연결 했으므로 생략
// app.get('/', (req, res) => {
//   res.send('어서와 Express는 처음이지?');
// });

//오류코드
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message + `<a href="/board/write">되돌아가기</a>`);
});

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중 입니다.`);
});
