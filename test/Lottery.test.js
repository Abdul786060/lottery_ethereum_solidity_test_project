const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
accounts = await web3.eth.getAccounts();

lottery = await new web3.eth.Contract(JSON.parse(interface))
.deploy({ data: bytecode })
.send({ from: accounts[0], gas: '1000000' })
});

describe('Lottery Contract', () => {

it('deploys a contract', () => {
assert.ok(lottery.options.address);
});
it('allows one account to enter', async () => {
await lottery.methods.enter().send({
  from: accounts[0],
  value: web3.utils.toWei('0.02', 'ether')
});
//methods enter end.

const players = await lottery.methods.getPlayers().call({
  from: accounts[0]
});
//get player methods end.
   assert.equal(accounts[0], players[0]);
   assert.equal(1, players.length);
});
// allows one account to enter end.


// start 2nd one.
it('allows multiple accounts to enter', async () => {
await lottery.methods.enter().send({
  from: accounts[0],
  value: web3.utils.toWei('0.02', 'ether')
});
//methods enter end.
await lottery.methods.enter().send({
  from: accounts[1],
  value: web3.utils.toWei('0.02', 'ether')
});
//methods enter end.
await lottery.methods.enter().send({
  from: accounts[2],
  value: web3.utils.toWei('0.02', 'ether')
});
//methods enter end.

const players = await lottery.methods.getPlayers().call({
  from: accounts[0]
});
//get player methods end.

   assert.equal(accounts[0], players[0]);
   assert.equal(accounts[1], players[1]);
   assert.equal(accounts[2], players[2]);
   assert.equal(3, players.length);

});
// allows second account to enter end.

// minimum amount of ether.

it('requires a minimum amount of ether to enter.', async () =>
{
  // try start.
  try{
  await lottery.methods.enter().send({
from: accounts[0],
value: 0
  });
  assert(false);
} catch (err) {
  assert(err);
}
// try end.
});
// end of minimum amount error function.
//only manager can call pick winner.
it('only manager can pick winner', async () => {
  // try start.
  try{
  await lottery.methods.pickWinner().send({
from: accounts[1],
  });
  assert(false);  // automatically fail the fails the test no matter what...
} catch (err) {
  assert(err);
}
// try end.
});
// end of only manager can pick winner.

// send money to the winner.
it('sends money to the winner and reset players array.', async () => {
await lottery.methods.enter().send({
  from: accounts[0],
  value: web3.utils.toWei('2', 'ether')
});
//end of enter method.
const initialBalance = await web3.eth.getBalance(accounts[0]);
await lottery.methods.pickWinner().send({ from: accounts[0] });


const finalBalance = await web3.eth.getBalance(accounts[0]);

const diffrence = finalBalance - initialBalance;
// console.log(finalBalance - initialBalance);
assert(diffrence > web3.utils.toWei('1.8', 'ether'));
});

// end of send money test block.
});
