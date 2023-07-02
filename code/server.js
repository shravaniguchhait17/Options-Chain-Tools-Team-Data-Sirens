const express = require('express');
const net = require('net');
const WebSocket = require('ws');
 
const cors = require('cors');

// for allowing cors 
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

// Start the server
const port1 = 8000; // Choose a port number for backend - frontend connection
const port2 = 9011; //should match with server port number - port number for server-backend connection


 
    // Establish a TCP/IP connection with the Java server
const serverClient = net.createConnection({ port: port2 }, () => {

  console.log('Connected to Java server!');

  // Send a single byte packet for handshake 
  // from backend to server
  serverClient.write(Buffer.from([1]));
});
  
    // Handle data received from the Java server
// let dataBuffer = Buffer.alloc(0);
 
// const packetSize = 130;
const packetStructure = [
  { name: 'packetLength', type: 'Int32', offset: 0, length: 4 },
  { name: 'tradingSymbol', type: 'String', offset: 4, length: 30 },
  { name: 'sequenceNumber', type: 'Int64', offset: 34, length: 8 },
  { name: 'timestamp', type: 'Int64', offset: 42, length: 8 },
  { name: 'lastTradedPrice', type: 'Int64', offset: 50, length: 8 },
  { name: 'lastTradedQuantity', type: 'Int64', offset: 58, length: 8 },
  { name: 'volume', type: 'Int64', offset: 66, length: 8 },
  { name: 'bidPrice', type: 'Int64', offset: 74, length: 8 },
  { name: 'bidQuantity', type: 'Int64', offset: 82, length: 8 },
  { name: 'askPrice', type: 'Int64', offset: 90, length: 8 },
  { name: 'askQuantity', type: 'Int64', offset: 98, length: 8 },
  { name: 'openInterest', type: 'Int64', offset: 106, length: 8 },
  { name: 'previousClosePrice', type: 'Int64', offset: 114, length: 8 },
  { name: 'previousOpenInterest', type: 'Int64', offset: 122, length: 8 }
];    

function parsePacket(buffer , packetStructure) { 
  const result = {};

  // console.log("here in parse packet");
  packetStructure.forEach(field => {
    const { name, type, offset, length } = field;
      // console.log(name, type, offset, length);
    let value;
    switch (type) {
      case 'Int32':
        value = (buffer.readInt32LE(offset)).toString();
        break;
      case 'String':
        value = buffer.toString('utf8', offset, offset + length).replace(/\0/g, '');
        break;
      case 'Int64':
        value = (buffer.readBigInt64LE(offset)).toString();
        break;
      default:
        value = null;
        break;
    }

    result[name] = value;
  });

  // console.log(result);

  return result;
}


let receivedData = Buffer.alloc(0);
const chunkSize = 130;
serverClient.on('data', (data) => {

  packets = []; //array to store the packets from buffer
  receivedData = Buffer.concat([receivedData, data]);

  while (receivedData.length >= chunkSize) {
    const chunk = receivedData.subarray(0, chunkSize);
    receivedData = receivedData.subarray(chunkSize);
    parseData = parsePacket(chunk, packetStructure);
    console.log(parseData);
    console.log("-----------------------------------");
    packets.push(parseData);
    
  }

    // Send the processed data to the connected WebSocket clients
    broadcastData(packets);
});
     
 
// Handle the end of data transmission
serverClient.on('end', () => {
  console.log('Data transmission completed');
});

// res.on('finish', () => {
//     // Close the TCP/IP connection when the response is finished
//     serverClient.end();
//   });
  
    // Handle errors
serverClient.on('error', (error) => {
  console.error(`Error with TCP/IP connection: ${error.message}`);
  const processedData = error.message;
  broadcastData(processedData); 
});
 
function broadcastData(data) {
    // Send the data to all connected WebSocket clients 
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        // console.log("sending data to client");
        (Object.entries(data)).forEach((entry) => {
          client.send(JSON.stringify(entry));
        });
        // client.send(JSON.stringify(data));
      }
    }
}
 

const server = app.listen(port1, () => {
  console.log(`Server running on port ${port1}`);
});

const clients = new Set();

// just for sanity checks
app.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws);
    });
});
  
// Create a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('WebSocket connection between frontend-backend established');

    // Add the new client to the set
    clients.add(ws);

    // Handle WebSocket close event
    ws.on('close', () => {
        console.log('WebSocket between frontend- backend connection closed');
        // Remove the client from the set
        clients.delete(ws);
    });
});
 
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws);
    });
});