require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(cors());

const web3 = new Web3(process.env.INFURA_URL);
const contractABI = JSON.parse(fs.readFileSync('./SupplyChainABI.json'));
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

app.post('/createBatch', async (req, res) => {
    const { product } = req.body;
    const tx = contract.methods.createBatch(product);
    const gas = await tx.estimateGas({ from: account.address });
    const data = tx.encodeABI();
    const txData = {
        from: account.address,
        to: process.env.CONTRACT_ADDRESS,
        data,
        gas
    };
    const signed = await web3.eth.accounts.signTransaction(txData, process.env.PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    res.json(receipt);
});

app.post('/transferOwnership', async (req, res) => {
    const { batchId, newOwner } = req.body;
    const tx = contract.methods.transferOwnership(batchId, newOwner);
    const gas = await tx.estimateGas({ from: account.address });
    const data = tx.encodeABI();
    const txData = {
        from: account.address,
        to: process.env.CONTRACT_ADDRESS,
        data,
        gas
    };
    const signed = await web3.eth.accounts.signTransaction(txData, process.env.PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    res.json(receipt);
});

app.post('/updateState', async (req, res) => {
    const { batchId, state } = req.body;
    const tx = contract.methods.updateState(batchId, state);
    const gas = await tx.estimateGas({ from: account.address });
    const data = tx.encodeABI();
    const txData = {
        from: account.address,
        to: process.env.CONTRACT_ADDRESS,
        data,
        gas
    };
    const signed = await web3.eth.accounts.signTransaction(txData, process.env.PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    res.json(receipt);
});

app.get('/getBatch/:id', async (req, res) => {
    const batch = await contract.methods.getBatch(req.params.id).call();
    res.json(batch);
});

app.listen(4000, () => console.log('API running on port 4000'));
