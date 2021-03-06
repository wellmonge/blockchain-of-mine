const Blockchain = require('../dev/blockchain');

const mongecoin = new Blockchain(); 
const previousBlockHash = '9E21CDEF480B30ACAE5FD96CFDDDA696F2A2067331CAA5EB2BF9F697F9D45642';
const currentBlockData = [{
    amount: 10,
    sender: '67A90A5D92C6FDA60C32886C04DF3D229FADB02C063DCBAB06364057862C0B19',
    recipient: '67A90A5D92C6FDA60C32886C04DF3D229FADB02C063DCBAB06364057862C0B19',
    
},{
    amount: 222,
    sender: '67A90A5D92C6FDA60C32886C04DF3D229FADB02C063DCBAB06364057862C0B19',
    recipient: '67A90A5D92C6FDA60C32886C04DF3D229FADB02C063DCBAB06364057862C0B19',
    
},{
    amount: 3333,
    sender: '67A90A5D92C6FDA60C32886C04DF3D229FADB02C063DCBAB06364057862C0B19',
    recipient: '67A90A5D92C6FDA60C32886C04DF3D229FADB02C063DCBAB06364057862C0B19',
    
}];

console.log(mongecoin.proofOfWork(previousBlockHash, currentBlockData));