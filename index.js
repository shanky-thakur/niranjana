const connect = require('./db');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

connect();

app.use('/user',require('./routes/user'));
app.use('/book',require('./routes/book'));
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
});

app.listen(4500);
