const sha256 = require('sha256');

function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];

    this.createNewBlock(5963,'59630','596326');

}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transaction: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash,
    };
    this.pendingTransactions = [];
    this.chain.push(newBlock);
    
    return newBlock;
}

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
    const newTransactions = {
        amount: amount,
        sender: sender,
        recipient: recipient   
    }

    this.pendingTransactions.push(newTransactions);
    return this.getLastBlock()['index'] + 1;

}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    const datAsString = previousBlockHash + nonce.toString + JSON.stringify(currentBlockData);
    const hash = sha256(datAsString);
    return hash;
}


Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash,currentBlockData, nonce);
    while (hash.substring(0, 4) !== '0'){
        nonce++;
        hash = this.hashBlock(previousBlockHash,currentBlockData, nonce);
    }
    return nonce;
}

module.exports = Blockchain;