const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./dev/blockchain');
const uuid = require('uuid/v1');

const nodeAddress = uuid().split('-').join('');
console.log(nodeAddress);
const mongecoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain',function(req,res){
    res.send(mongecoin);
});


app.post('/transaction',function(req,res){
    const blockIndex = mongecoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);

    res.json({
        note: `Transaction will be add in block ${blockIndex}.`
    });
});

app.get('/mine',function(req,res){
    const lastBlock = mongecoin.getLastBlock();
    const previousBlockHash =  lastBlock['hash'];
    const currentBlockData = {
        transactions:mongecoin.pendingTransactions,
        index: lastBlock['index'] + 1
    }

    const nonce = mongecoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = mongecoin.hashBlock(previousBlockHash, currentBlockData,nonce);

    mongecoin.createNewTransaction(12.5,`00`,nodeAddress);

    const newBlock = mongecoin.createNewBlock(nonce, previousBlockHash, blockHash);
    res.json({
        note:'New block mined successfully',
        block: newBlock
    });  
});

app.listen(3000, function () {
console.log('up and running');    
});