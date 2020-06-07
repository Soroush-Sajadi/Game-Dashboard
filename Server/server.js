const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/' , (req, res) => {
    res.json('Hello there')
})


const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))