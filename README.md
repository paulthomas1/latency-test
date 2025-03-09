## Setup

npm install ethers dotenv

Update block_streamer.js with the correct websocket address

const provider = new ethers.WebSocketProvider(
  // Add your websocket here
);

To get a Somnia websocket go to ankr -> https://www.ankr.com/rpc/somnia/


## Ruuning 

node block_streamer.js