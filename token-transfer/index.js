const express = require('express');
const Web3 = require('web3');
require('dotenv').config();

const app = express();
app.use(express.json());

// Load environment variables
const walletAddress = process.env.WALLET_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const providerUrl = process.env.RPC_URL;

// Create Web3 instance for BSC Testnet
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// Function to send Test BNB
const sendTestBNB = async (toWalletAddress, amount) => {
  try {
    // Get the nonce (transaction count for the sender wallet)
    const nonce = await web3.eth.getTransactionCount(walletAddress, 'latest');

    // Get the current gas price
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 21000;

    const tx = {
      from: walletAddress,
      to: toWalletAddress,
      value: web3.utils.toWei(amount, 'ether'),
      gas: gasLimit,
      gasPrice: gasPrice,
      nonce: nonce,
    };

    // Sign the transaction with the private key
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Transaction successful:', receipt);
  } catch (error) {
    console.error('Error sending Test BNB:', error);
    throw error;
  }
};

sendTestBNB("0x8e52828bBd87AD01519C3FBDbA8518a51CeE8653", "0.01");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});