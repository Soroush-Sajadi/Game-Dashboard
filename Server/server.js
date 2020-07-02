const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();
const categories = require('./DB/categories.json');
const generalQuestions = require('./DB/quiz.json');
const images = require('./DB/images.json');
const accounts = require('./DB/accounts.json')
const readyImages = require('./DB/readyImages.json')
const threeInRow = require('./DB/threeInRow.json')
const dir = path.join(__dirname, '/Images/');
imagesName=['game', 'generalknowledge', 'mathematic'];
const { varifyAccount } = require( './Helper_Functions/varify' )
const { logIn } = require( './Helper_Functions/login' )
const { randomQuestions } = require( './Helper_Functions/randomQuestions' )
const { updateScore } = require( './Helper_Functions/updatingScore' );
const { generatorImage } = require( './Helper_Functions/imageGenerator' )
const { addId } = require('./Helper_Functions/addingId')


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
  if (varifyAccount(accounts, req.params.username, req.params.email )) {
    res.json(false);
  } else {
    const score = logIn(accounts, req.params.username, req.params.email)
    console.log(score)
    res.json([true, score])
  }
})

app.get('/generalknowledge', (req, res) => {
  const questions = randomQuestions(generalQuestions.results);
  res.json(questions);
})

app.get('/memory', async ( req, res ) => {
  await generatorImage(images.images);
  res.json(addId(readyImages));
})

app.get('/threeInRow', ( req, res ) => {
  res.json(threeInRow);
})

app.get('/score/:username/:score', (req, res) => {
  updateScore( accounts, req.params.username, req.params.score );
})

app.post('/accounts', async(req, res) => {
  if ( varifyAccount(accounts, req.body.userName, req.body.email)) {
    await accounts.push({ "user_name": `${req.body.userName}`, "email": `${req.body.email}`, score: 0 })
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