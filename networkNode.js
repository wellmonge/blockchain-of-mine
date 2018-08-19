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
    const newTransaction = req.body;
    const blockIndex = mongecoin.addTransactionToPendingTransactions(newTransaction);
         
    res.json({
        note: `Transaction will be add in block ${blockIndex}.`
    });
});

app.post('/transaction/broadcast', function (req, res) {
    const newTransaction = mongecoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
    mongecoin.addTransactionToPendingTransactions(newTransaction);

    const requestPromises = [];
    mongecoin.networkNodes.forEach(networkNodeUrl =>{
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises)
        .then(data => {
            res.json({
                note: `Transaction created and broadcast successfully.`
            });
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

    Promise.all(registerNodesPromises)
        .then(data => {
            const bulkRegistraterOptions = {
                uri: `${newNodeUrl}/register-nodes-bulk`,
                method: 'POST',
                body: { allNetworkNodes: [ ...mongecoin.networkNodes, mongecoin.currentNodeUrl ] },
                json: true
            }

            return rp(bulkRegistraterOptions);

        })
        .then(data => {
            res.json({note : 'New node registered with network   successfully.'});
        });
});

//register a node with the network
app.post('/register-node',function(req,res){
    const newNodeUrl = req.body.newNodeUrl
    const nodeNotAlreadyPresent = mongecoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = mongecoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) mongecoin.networkNodes.push(newNodeUrl);
    res.json({
        note: `New node registered successfully.`
    });
});

//register a multiple nodes at once
app.post('/register-nodes-bulk',function(req,res){
    const allNetworkNodes = req.body.allNetworkNodes
    
    allNetworkNodes.forEach(networkNodeUrl =>
        {
            const notCurrentNode = mongecoin.currentNodeUrl !== networkNodeUrl;
            const nodeNotAlreadyPresent = mongecoin.networkNodes.indexOf(networkNodeUrl) == -1;
            if (nodeNotAlreadyPresent && notCurrentNode) mongecoin.networkNodes.push(networkNodeUrl)
        });

    res.json({
        note: `Bulk registration successful.`
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

    const requestPromises = [];

    mongecoin.networkNodes.forEach(newtworkNodeUrl => {
        const requestOptions = {
            uri: newtworkNodeUrl + '/receive-new-block',
            method: 'POST',
            data: { newBlock: newBlock },
            json: true
        }

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises)
    .then(data => {
        const requestOptions = {

            uri: mongecoin.currentNodeUrl + '/transaction/broadcast',
            method: 'POST',
            body: {
                amount: 12.5,
                sender:"00",
                recipient: nodeAddress
            },
            json: true
        };

        return rp(requestOptions)
    })
    .then(data => {
        res.json({
            note:'New block mined and broadcast successfully',
            block: newBlock
        }); 
    });
});

app.post('receive-new-block', function (req, res) {
    const newBlock = req.body.newNodeUrl;
    const lastBlock = mongecoin.getLastBlock();
    const correctBlock = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock["index"] + 1 === newBlock["index"];

    if (correctBlock && correctIndex) {
        mongecoin.chain.push(newBlock);
        mongecoin.pendingTransactions = [];

        res.json({
            note:'New block received and accepted',
            newBlock: newBlock
        }); 
    }



    
})

app.listen(port, function () {
    console.log(`up and running on port ${port}...`);    
});