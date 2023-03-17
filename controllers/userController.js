const connection = require('./dbConnect');

const userDB = {
  userCheck: (userID, cb) => {
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${userID}';`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },

  userRegister: (userID, userPW, cb) => {
    connection.query(
      `INSERT INTO user (USERID, PASSWORD) VALUES ('${userID}', '${userPW}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = userDB;
