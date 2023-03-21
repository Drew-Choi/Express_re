const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://drc920630:drew1234@cluster0.ikcoamt.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
