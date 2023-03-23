/* eslint-disable import/newline-after-import */
/* eslint-disable spaced-comment */

//라우터와 컨트롤러 합친 코드
const mongoClient = require('./mongoConnect');
const UNEXPECTED_MSG =
  "알 수 없는 문제 발생 <br><a href='/register'>회원가입으로 이동</a>";
const DUPLICATED_MSG =
  "동일한 ID를 가진 회원이 존재합니다. <br><a href='/register'>회원가입으로 이동</a>";
const SUCCESS_MSG = "회원가입 완료! <br><a href='/login'>로그인으로 이동</a>";

const LOGIN_UNEXPECTED_MSG =
  "알 수 없는 문제 발생 <br><a href='/login'>로그인으로 이동</a>";
const LOGIN_PASSWORD_MISS =
  "비밀번호가 틀렸습니다. <br><a href='/login'>다시 로그인하기</a>";
const LOGIN_ID_MISS =
  "회원정보가 없습니다. <br><a href='/register'>회원가입으로 이동</a>";

const registerUser = async (req, res) => {
  try {
    //디비서버연결
    const client = await mongoClient.connect();
    //디비서버 컬렉션 접근
    const user = client.db('kdt5').collection('user');

    //폼에서 뿌린 아이디 값을 디비에서 찾기
    const duplicatedUser = await user.findOne({ id: req.body.id });
    //중복값있는지 확인
    //중복되면 바로 스테이터코드와 메시지 보내기
    if (duplicatedUser) return res.status(400).send(DUPLICATED_MSG);
    //중복이 아니라면 디비에 등록
    await user.insertOne(req.body);
    res.status(200).send(SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};

const loginUser = async (req, res) => {
  try {
    //디비서버연결
    const client = await mongoClient.connect();
    //디비서버 컬렉션 접근
    const user = client.db('kdt5').collection('user');

    //폼에서 뿌린 아이디 값을 디비에서 찾기
    const findeUser = await user.findOne({ id: req.body.id });
    //아이디 일치하는지 보고 없음 에러메시지 보내기
    if (!findeUser) return res.status(400).send(LOGIN_ID_MISS);

    if (findeUser.password !== req.body.password)
      return res.status(400).send(LOGIN_PASSWORD_MISS);

    // 세션 쿠키 구워~~
    req.session.login = true;
    req.session.userID = req.body.id;

    // 로그인 쿠키 구워~~~
    res.cookie('user', req.body.id, {
      maxAge: 1000 * 30,
      httpOnly: true,
      signed: true,
    });

    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(LOGIN_UNEXPECTED_MSG);
  }
};

module.exports = { registerUser, loginUser };

//라우터와 컨트롤러 분리한 코드
// const userDB = {
//   //중복회원 찾기
//   userCheck: async (userID) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');
//       const findUser = await user.findOne({ id: userID });
//       return findUser;
//     } catch (err) {
//       console.error(err);
//     }
//   },

//   //중복 아니면 회원 새롭게 등록하기
//   userRegister: async (newUser) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');
//       await user.insertOne(newUser);
//       return true;
//     } catch (err) {
//       console.error(err);
//     }
//   },
// };

// module.exports = userDB;
