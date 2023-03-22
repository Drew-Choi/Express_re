/* eslint-disable spaced-comment */
const express = require('express');
const { getAllArticles } = require('../controllers/boardController');

const router = express.Router();

//로그인 확인용 미들웨어
function isLogin(req, res, next) {
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.status(400);
    res.send(
      '로그인이 필요한 서비스입니다. <br><a href="/login">로그인 페이지로 이동</a>',
    );
  }
}

//게시판 페이지 호출
router.get('/', isLogin, getAllArticles);

//레거시
// router.get('/', isLogin, (req, res) => {
//   boardDB.getAllArticles((data) => {
//     const ARTICLE = data;
//     const articleCounts = ARTICLE.length;
//     const { userID } = req.session;
//     res.render('db_board', { ARTICLE, articleCounts, userID });
//   });
// });

//레거시
// //글쓰기 페이지 호출 미들웨어
// router.get('/write', isLogin, (req, res) => {
//   const { userID } = req.session;
//   res.render('db_board_write', { userID });
// });

// //글쓰고 데이터베이스로 보내기 미들웨어
// router.post('/write', isLogin, (req, res) => {
//   if (req.body.title && req.body.content) {
//     // const { userID } = req.session;
//     //아래 수업시간코드
//     const newArticle = {
//       userID: req.session.userID,
//       title: req.body.title,
//       content: req.body.content,
//     };
//     boardDB.writeArticle(newArticle, (data) => {
//       if (data.affectedRows >= 1) {
//         res.redirect('/dbBoard');
//       } else {
//         const err = new Error('글 쓰기 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다.');
//     err.statusCode = 400;
//     throw err;
//   }
// });

// //글 수정 모드로 이동
// router.get('/modify/:id', isLogin, (req, res) => {
//   boardDB.getArticle(req.params.id, (data) => {
//     if (data.length > 0) {
//       res.render('db_board_modify', { selectedArticle: data[0] });
//     } else {
//       const err = new Error('해당 ID 값을 가지는 게시글이 없습니다.');
//       err.statusCode = 500;
//       throw err;
//     }
//   });
// });

// //글 수정한 것 db에 날리기
// router.post('/modify/:id', isLogin, (req, res) => {
//   if (req.body.title && req.body.content) {
//     boardDB.modifyArticle(req.params.id, req.body, (data) => {
//       if (data.affectedRows >= 1) {
//         res.redirect('/dbBoard');
//       } else {
//         const err = new Error('글 수정 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다.');
//     err.statusCode = 400;
//     throw err;
//   }
// });

// //지우기
// router.delete('/delete/:id', isLogin, (req, res) => {
//   boardDB.deleteArticle(req.params.id, (data) => {
//     if (data.affectedRows >= 1) {
//       res.status(200).send('삭제완료!');
//     } else {
//       const err = new Error('삭제 오류');
//       err.statusCode = 500;
//       throw err;
//     }
//   });
// });

// router.get('/getAll', isLogin, (req, res) => {
//   boardDB.getAllArticles((data) => {
//     res.send(data);
//   });
// });

module.exports = router;
