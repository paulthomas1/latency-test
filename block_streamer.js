require('dotenv').config();
const { ethers } = require('ethers');

const provider = new ethers.WebSocketProvider(
  //Add websocket endpoint here
);

console.log('🌐 Listening for new blocks...\n');

provider.on('block', async (blockNumber) => {
  try {
    const block = await provider.getBlock(blockNumber);

    // Block timestamp (from blockchain)
     const timestamp = new Date(block.timestamp * 1000);
    const blockTime = timestamp.toLocaleTimeString('en-GB', { hour12: false }) + '.' + timestamp.getMilliseconds().toString().padStart(3, '0');

    // Local timestamp (with milliseconds). This is needed as block timestamps don't have milliseconds
    const localTime = new Date();
    const formattedLocalTime = localTime.toLocaleTimeString('en-GB', { hour12: false }) +
      '.' + localTime.getMilliseconds().toString().padStart(3, '0');

    console.log(`⛏️  New Block: #${block.number}`);
    console.log(`🕒 Block Timestamp: ${blockTime}`);
    console.log(`🖥️ Local Timestamp: ${formattedLocalTime}`);
    console.log(`🔗 Hash: ${block.hash}`);
    console.log(`📦 Transactions: ${block.transactions.length}`);
    console.log('-'.repeat(50));
  } catch (error) {
    console.error('Error fetching block:', error);
  }
});

provider.websocket.on('close', (code, reason) => {
  console.error(`WebSocket connection closed (code: ${code}, reason: ${reason}).`);
  process.exit(1);
});

provider.websocket.on('error', (error) => {
  console.error('WebSocket encountered an error:', error);
  process.exit(1);
});
