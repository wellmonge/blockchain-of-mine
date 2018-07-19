const Blockchain = require('../dev/blockchain');

const mongecoin = new Blockchain(); 
const previousBlockHash = '23OJ2O3J4O32O5NMOJOJ432';
const currentBlockData = [{
    amount: 0,
    sender: '3o2ijhno32n3io2huih32'
},{
    amount: 0,
    sender: '3o2ijhno32n3io2huih32'
},{
    amount: 0,
    sender: '3o2ijhno32n3io2huih32'
}];

const nonce = mongecoin.proofOfWork(previousBlockHash, currentBlockData);

console.log(nonce);