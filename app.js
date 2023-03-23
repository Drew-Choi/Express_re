/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable quotes */
/* eslint-disable spaced-comment */
// @ts-check

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
//오류코드 설치
// const { STATUS_CODES } = require('http');

const app = express();
const { PORT } = process.env;

// @ts-ignore
app.use(cookieParser('cookieSecret'));
app.use(
  // @ts-ignore
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    //아래 쿠키 설정은 브라우저 종료가 되어도 쿠키를 유지해 준다.
    //그래서 세션을 브라우저 끄면 지우고 싶으면, 아래 옵션은 지워주어야 한다.
    // cookie: {
    //   maxAge: 1000 * 60 * 60,
    // },
  }),
);
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
//사진 저장한 폴더 설정 잡아주기
app.use('/uploads', express.static('uploads'));
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
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);
app.use('/db', dbRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/cookie', cookieRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
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
