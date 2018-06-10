function Blockchain(params) {
    this.chain = [];
    this.newTransaction = [];
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transaction: this.newTransaction,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash,
    };

}