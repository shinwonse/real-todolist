const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PW, MONGO_URI } = require('./config/mongo');
const routes = require('./routes');

dotenv.config();

const app = express();
app.use(cors());
app.use('/', routes);

app.listen(3000, () => {
  console.log('✅ Connected to port 3000');
});

mongoose
  .set('strictQuery', false)
  .connect(`mongodb+srv://${MONGO_ID}:${MONGO_PW}@${MONGO_URI}`)
  .then(() => console.log(`✅ Connected to DB`))
  .catch((e) => console.log(`❌ Error on DB connection: ${e}`));
