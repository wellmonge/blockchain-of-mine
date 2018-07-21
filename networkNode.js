const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./dev/blockchain');
const uuid = require('uuid/v1');
const rp = require('request-promise');
const port = process.argv[2];

const nodeAddress = uuid().split('-').join('');

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

//register a node and broadcast it the network
app.post('/register-and-broadcast-node',function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
    if (mongecoin.networkNodes.indexOf(newNodeUrl) == -1) mongecoin.networkNodes.push(newNodeUrl);

    const registerNodesPromises = [];
    mongecoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: `${networkNodeUrl}/register-node`,
            method: 'POST',
            body: { newNodeUrl: newNodeUrl },
            json: true
        }

        registerNodesPromises.push(rp(requestOptions));
    });


    
    
    res.json({
        note: `Transaction will be add in block .`
    });
});

//register a node with the network
app.post('/register-node',function(req,res){
    const newNodeUrl = req.body.newNodeUrl
    
    
    res.json({
        note: `Transaction will be add in block .`
    });
});

//register a node with the network
app.post('/register-nodes-bulk',function(req,res){
    const newNodeUrl = req.body.newNodeUrl
    
    
    res.json({
        note: `Transaction will be add in block .`
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

app.listen(port, function () {
    console.log(`up and running on port ${port}...`);    
});