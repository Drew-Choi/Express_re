/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable spaced-comment */
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://drc920630:drew1234@cluster0.ikcoamt.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, deleteResult) => {
    //첫인자로 조건, 두번째로 콜백인자(에러, 결과값)
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);
    test.insertOne(
      {
        name: 'pororo',
        age: 5,
      },
      (insertErr, insertResult) => {
        console.log(insertResult);
        const findCursor = test.find({});
        findCursor.toArray((err, data) => {
          console.log(data);
        });
      },
    );
  });
});
