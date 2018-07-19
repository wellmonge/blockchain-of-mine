const Blockchain = require('../dev/blockchain');

const mongecoin = new Blockchain(); 

mongecoin.createNewBlock(123456,'SAIHJDASOJIDS','JDJAIODSJAODJSA');

mongecoin.createNewTransaction(100,'MONGESADASFDSADF','ALBERTPTKROPYHRTK');

mongecoin.createNewBlock(213123,'VEVREFDVSADSFSFS','JDJAIODSJAODJSA');


mongecoin.createNewTransaction(50,'MONGESADASFDSADF','ALBERTPTKROPYHRTK');

mongecoin.createNewTransaction(300,'MONGESADASFDSADF','ALBERTPTKROPYHRTK');

mongecoin.createNewTransaction(2000,'MONGESADASFDSADF','ALBERTPTKROPYHRTK');

mongecoin.createNewBlock(2131232,'DASFASWFGSDAGFSD','ÇLOIÇLIOÇIOÇOI');


console.log(mongecoin.chain[2]);