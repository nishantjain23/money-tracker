const express = require('express');

const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/transaction.js');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
  res.json('Hello!');
});

app.post('/api/transaction', async (req, res) => {
  //await mongoose.connect(process.env.MONGO_URL);
  // console.log(process.env.MONGO_URL);
  const { name, description, datetime, price } = req.body;
  const trans = await Transaction.create({
    name,
    description,
    datetime,
    price,
  });
  res.json(trans);
});

app.get('/api/transactions', async (req, res) => {
  //await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions)
});
// better practice
mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("connection succesfull");
}).catch((e)=>{
  console.log(e)
})
app.listen(4000, () => {
  console.log(`Server is running on port ${4000}`);
});