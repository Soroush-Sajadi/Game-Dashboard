const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
require('dotenv').config();
const categories = require('./DB/categories.json')
const dir = path.join(__dirname, '/Images/');
imagesName=['game', 'general', 'mathematic'];
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/' , (req, res) => {
    res.json(categories);
})
imagesName.map(item => app.get(`/images/${item}`, (req, res) => {
    res.sendFile(`${dir}/${item}.jpg`);
    }));

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))