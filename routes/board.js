/* eslint-disable spaced-comment */
/* eslint-disable import/newline-after-import */
const express = require('express');
const router = express.Router();

const ARTICLE = [
  {
    title: 'title1',
    content: '안녕하세요!!!!!!!!!!',
  },
  {
    title: 'title2',
    content: '오오오오오오오오오오오오!!!!!!!!!!',
  },
];

//글목록 보여주기
router.get('/', (req, res) => {
  res.render('board', { ARTICLE, articleCounts: ARTICLE.length });
});

//글쓰기
//글쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('board_write');
});

//글 추가 기능
router.post('/write', (req, res) => {
  // console.log(Object.keys(req.body).length);
  // console.log(req.body.title);
  // console.log(req.body.content);
  if (req.body.title && req.body.content) {
    const newWrite = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newWrite);
    res.redirect('/board');
  } else {
    const err = new Error('모든 정보를 입력해주세요.');
    err.statusCode = 400;
    throw err;
  }
});

//-------------------------

//글 수정
//글 수정 모드로 이동
router.get('/modify/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => req.params.title === article.title,
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify', { selectedArticle });
});

//글 수정 후 추가
router.post('/modify/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => req.params.title === article.title,
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('모든 정보를 입력해주세요.');
    err.statusCode = 400;
    throw err;
  }
});

//--------------------------

//글삭제
router.delete('/delete/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title,
  );
  ARTICLE.splice(arrIndex, 1);
  res.send('삭제완료!');
});

module.exports = router;
