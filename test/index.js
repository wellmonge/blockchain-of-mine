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
const nonce = 122;

const hash = mongecoin.hashBlock(previousBlockHash, currentBlockData, nonce);

mongecoin.createNewBlock(123456,previousBlockHash, hash);

mongecoin.createNewTransaction(100,'MONGESADASFDSADF','ALBERTPTKROPYHRTK');

mongecoin.createNewBlock(213123,'VEVREFDVSADSFSFS','JDJAIODSJAODJSA');


mongecoin.createNewTransaction(50,'MONGESADASFDSADF','ALBERTPTKROPYHRTK');

mongecoin.createNewTransaction(300,'MONGESADASFDSADF','ALBERTPTKROPYHRTK');

mongecoin.createNewTransaction(2000,'MONGESADASFDSADF','ALBERTPTKROPYHRTK');

mongecoin.createNewBlock(2131232,'DASFASWFGSDAGFSD','ÇLOIÇLIOÇIOÇOI');


console.log(mongecoin.chain[2]);