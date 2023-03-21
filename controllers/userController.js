const mongoClient = require('./mongoConnect');

const userDB = {
  //중복회원 찾기
  userCheck: async (userID) => {
    try {
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');
      const findUser = await user.findOne({ id: userID });
      return findUser;
    } catch (err) {
      console.error(err);
    }
  },

  //중복 아니면 회원 새롭게 등록하기
  userRegister: async (newUser) => {
    try {
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');
      await user.insertOne(newUser);
      return true;
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = userDB;
