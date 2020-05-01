// const HDWalletProvider = require('truffle-hdwallet-provider');//HDWallet says which account we wnat to unlock and which account to use as source of ether and which account to be unlockedfor deploying our constract and what outside node we are gng to connect to
// const Web3=require('web3');
// const{interface,bytecode}=require('./compile');
// const provider=new HDWalletProvider(
// 'uniform parrot race entry worry saddle during buyer source wait invest slight','https://rinkeby.infura.io/v3/de97edd91145471199555841549fb3bc'
// );
// const web3=new Web3(provider);//we can use web3 instance to interact with test network we can send eth,deploy contract etcv
//
// // reason we are writing function so that we can avoid promises and use async await
// const deploy=async ()=>{
// const accounts= await web3.eth.getAccounts();
// console.log('attempting to deploy from account',accounts[0]);
// const result=await new web3.eth.Contract(JSON.parse(interface))
// .deploy({data: bytecode })
// .send({gas:'1000000',from:accounts[0]});
//
// console.log(interface);
// console.log('contract deployed at',result.options.address);//to know where our contract is deployed
//
// };
// deploy();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');


const provider = new HDWalletProvider(
  'swear nest debris screen song success chicken negative thrive cradle install brick',
  'https://rinkeby.infura.io/v3/de97edd91145471199555841549fb3bc'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attemting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode})
  .send({gas : '2000000', from: accounts[0] });
  console.log(interface);
  console.log('Contract deployed to ', result.options.address);
};

deploy();
