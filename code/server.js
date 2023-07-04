// import { stock, row } from './classes.js';
const { stock } = require('./stock.js');
// const row = require('./row');
const { row } = require('./row.js');



const express = require('express');
const net = require('net');
const WebSocket = require('ws');
 
const cors = require('cors');
const { timeStamp } = require('console');
 
let stocks = [];
let rows = [];
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

// Start the server
const port1 = 8000; // Choose a port number for backend - frontend connection
const port2 = 9011; //should match with server port number - port number for server-backend connection


function compareStocks(a, b) {
  if (a.underlying < b.underlying) {
    return -1;
  } 
  else{
    return 1;
  }
}
function compareRows(a, b) {
  if (a.underlying < b.underlying) {
    return -1;
  } 
  else if(a.underlying > b.underlying){
    return 1;
  }

  if(a.strikePrice < b.strikePrice){
    return -1;
  }
  else if(a.strikePrice > b.strikePrice){
    return 1;
  }

  const dateA = new Date(a.expiry);
  const dateB = new Date(b.expiry);
  if(dateA.getTime() < dateB.getTime()){
    return -1;
  }
  else if(dateA.getTime() > dateB.getTime()){
    return 1;
  }
 
  return 0;
}


    // Establish a TCP/IP connection with the Java server
const serverClient = net.createConnection({ port: port2 }, () => {

  console.log('Connected to Java server!');

  // Send a single byte packet for handshake 
  // from backend to server
  serverClient.write(Buffer.from([1]));
});
  
    // Handle data received from the Java server
 
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
 
  packetStructure.forEach(field => {
    const { name, type, offset, length } = field; 
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
 
  symb = result["tradingSymbol"];
  if(/\d/.test(symb)){
    temp = symb.search(/\d/);
    ul = symb.slice(0, temp);
    expiry = symb.slice(temp, temp+7);
    strikeP = symb.slice(temp+7, -2); 
    if(symb.slice(-2) === "CE"){
      found = false;
      for(s of rows){
        if(s.underlying === ul && s.expiry === expiry && s.strikePrice === strikeP){
          
          s.update(result["timestamp"], s.putTimestamp, result["lastTradedPrice"], 
            s.putLtp, result["lastTradedQuantity"], s.putLtq, result["volume"], 
            s.putVol, result["askPrice"], result["askQuantity"], s.putAskQ, 
            s.putAskP, result["bidPrice"], result["bidQuantity"], s.putBidQ, 
            s.putBidP, result["openInterest"], s.putOI, result["previousClosePrice"], s.putPCP, 
            result["previousOpenInterest"], s.putPOI);
          found = true;
        }
      }
      if(!found){
        rows.push(new row(symb, ul, expiry, result["timestamp"], 0, strikeP,
        result["lastTradedPrice"], 0, result["lastTradedQuantity"], 0, result["volume"], 0, 
        result["askPrice"], result["askQuantity"], 0, 0, result["bidPrice"], result["bidQuantity"], 
        0, 0, result["openInterest"], 0, result["previousClosePrice"], 0, result["previousOpenInterest"], 
        0))
        rows.sort(compareRows);
      }
    }
    else if(symb.slice(-2) === "PE"){
      found = false;
      for(s of rows){
        if(s.underlying === ul && s.expiry === expiry && s.strikePrice === strikeP){
          
          s.update(s.callTimestamp, result["timestamp"],   
            s.callLtp, result["lastTradedPrice"], s.callLtq, result["lastTradedQuantity"],  
            s.callVol, result["volume"], s.callAskP, s.callAskQ, result["askQuantity"],
            result["askPrice"], s.callBidP, s.callBidQ, result["bidQuantity"],
            result["bidPrice"],  s.callOI, result["openInterest"],  s.callPCP, result["previousClosePrice"],
            s.callPOI, result["previousOpenInterest"]);
          found = true;
        }
      }
      if(!found){
        rows.push(new row(symb, ul, expiry, 0, result["timestamp"], strikeP,
        0, result["lastTradedPrice"], 0, result["lastTradedQuantity"], 0, result["volume"],
        0, 0, result["askPrice"], result["askQuantity"], 0, 0, result["bidPrice"], result["bidQuantity"], 
        0, result["openInterest"], 0, result["previousClosePrice"], 0, result["previousOpenInterest"]))
        rows.sort(compareRows);
      }
    }
  }
  else{
    found = false;
    for(s of stocks){
      if(s.symbol === symb){
        s.update(result["timestamp"], result["lastTradedPrice"]);
        found = true;
      }
    }
    if(!found){
      stocks.push(new stock(result["tradingSymbol"], result["tradingSymbol"], result["timestamp"], result["lastTradedPrice"]))
      stocks.sort(compareStocks);
    }
  }
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
    
  }

    // Send the processed data to the connected WebSocket clients
    broadcastData();
});
     
 
// Handle the end of data transmission
serverClient.on('end', () => {
  console.log('Data transmission completed');
});

 
  
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
        
        temp = "";
        stocks.forEach((entry) => {
          
          temp = temp.concat(JSON.stringify(entry));
          temp = temp.concat('-');
    
        });
        rows.forEach((entry) => {
          
          temp = temp.concat(JSON.stringify(entry));
          temp = temp.concat('-');
    
      
        });
        temp = temp.slice(0, -1)
        client.send(temp);
        
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