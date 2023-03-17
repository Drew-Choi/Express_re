const connection = require('./dbConnect');

const userDB = {
  //중복회원 찾기
  userCheck: (userID, cb) => {
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${userID}';`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },

  //중복 아니면 회원 새롭게 등록하기
  userRegister: (newUser, cb) => {
    connection.query(
      `INSERT INTO mydb.user (USERID, PASSWORD) VALUES ('${newUser.id}', '${newUser.password}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = userDB;
