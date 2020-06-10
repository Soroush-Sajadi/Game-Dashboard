const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();
const categories = require('./DB/categories.json')
const accounts = require('./DB/accounts.json')
const dir = path.join(__dirname, '/Images/');
imagesName=['game', 'general', 'mathematic'];
const { varifyAccount } = require('./Helper_Functions/varify')
const { logIn } = require('./Helper_Functions/login')






app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/' , (req, res) => {
    res.json(categories);
})

app.get('accounts', (req, res) => {
  res.json(accounts);
})

app.get('/accounts/:username/:email', async (req, res) => {
  if (varifyAccount(accounts[0].accounts, req.params.username, req.params.email )) {
    res.json(false);
  } else {
    const score = logIn(accounts[0].accounts, req.params.username, req.params.email)
    console.log(score)
    res.json([true, score])
  }
})

app.post('/accounts', async(req, res) => {
  if ( varifyAccount(accounts[0].accounts, req.body.userName, req.body.email)) {
    await accounts[0].accounts.push({ "user_name": `${req.body.userName}`, "email": `${req.body.email}`, score: "0" })
    fs.writeFile(`${__dirname}/DB/accounts.json`,JSON.stringify(accounts), (err, result) => {
    if(err) console.log('error', err);
  });
    res.json('Your account is succesesfully made!')
  } else {
      res.json('Email or user name is already taken');
  }
})

imagesName.map(item => app.get(`/images/${item}`, (req, res) => {
    res.sendFile(`${dir}/${item}.jpg`);
    }));

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))