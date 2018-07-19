const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./dev/blockchain');

const mongecoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain',function(req,res){
    res.send(mongecoin);
});


app.get('/transaction',function(req,res){
    res.send('teste');
});

app.get('/mine',function(req,res){
    res.send('teste');
});

app.listen(3000);