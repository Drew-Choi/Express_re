const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://drc920630:drew1234@cluster0.ikcoamt.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  //await 뒤는 프로미스 반환될때까지 기다린다
  await client.connect();
  //await가 붙은 클라이언트가 해결되면 바로 다음으로 이동
  const test = client.db('kdt5').collection('test');

  const deleteManyResult = await test.deleteMany({});
  if (!deleteManyResult.acknowledged) return '삭제 에러 발생';

  const inertOneResult = await test.insertOne({ name: 'pororo', age: 5 });
  if (!inertOneResult.acknowledged) return '데이터 추가 에러';

  const inertManyResult = await test.insertMany([
    { name: 'pororo0', age: 5 },
    { name: 'pororo1', age: 6 },
    { name: 'pororo2', age: 7 },
    { name: 'pororo3', age: 8 },
  ]);
  if (!inertManyResult.acknowledged) return '데이터 추가 에러';
}

main();

// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     //첫인자로 조건, 두번째로 콜백인자(에러, 결과값)
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//     test.insertOne(
//       {
//         name: 'pororo',
//         age: 5,
//       },
//       (insertErr, insertResult) => {
//         console.log(insertResult);
//         const findCursor = test.find({});
//         findCursor.toArray((err, data) => {
//           console.log(data);
//         });
//       },
//     );
//   });
// });
