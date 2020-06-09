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


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/' , (req, res) => {
    res.json(categories);
})

app.post('/accounts', async(req, res) => {
    await accounts[0].accounts.push({ "user_name": `${req.body.userName}`, "email": `${req.body.email}`, score: "0" })
    fs.writeFile(`${__dirname}/DB/accounts.json`,JSON.stringify(accounts), (err, result) => {
        if(err) console.log('error', err);
    });
    res.json(accounts)
})
app.get('/accounts', async(req, res) => {
    res.json(accounts)
})
imagesName.map(item => app.get(`/images/${item}`, (req, res) => {
    res.sendFile(`${dir}/${item}.jpg`);
    }));

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))