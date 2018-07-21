const sha256 = require('sha256');

function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];

    this.createNewBlock(0,'9E21CDEF480B30ACAE5FD96CFDDDA696F2A2067331CAA5EB2BF9F697F9D45642','FE8715382551436625D700541BE3C203F8DF1D5DBD6061157AAD111477C99FE9');

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
    const datAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(datAsString);
    return hash;
}


Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash,currentBlockData, nonce);
    while (hash.substring(0, 4) !== 'm4g5'){
        nonce++;
        hash = this.hashBlock(previousBlockHash,currentBlockData, nonce);
        console.log(hash)
    }
    return nonce;
}

module.exports = Blockchain;