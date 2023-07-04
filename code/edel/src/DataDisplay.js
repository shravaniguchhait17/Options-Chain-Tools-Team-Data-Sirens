import React, { useEffect, useState } from 'react';
import Table from './Table';
import $ from 'jquery';
// import './styles.css';
import 'datatables.net';
// import axios from 'axios';



<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
const DataDisplay = () => { 
  const [data, setData] = useState([]);

   
  

  useEffect(() => {
    
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
        console.log('WebSocket connection establisheds');
    };

    

    socket.onmessage = (event) => { 
        const newData = event.data;
        // console.log(newData);
        const dataArray = newData.split('-');
        const receivedData = dataArray.map((item) => JSON.parse(item));
      
        console.log(receivedData);
          
          
          // fetchData(receivedData);  
          setData(receivedData);
          // console.log("updated!~", event);
        
       
    };

    
    
    // Handle WebSocket close event
    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return () => {
        socket.close();
    };
    
    
  }, []);

  return (
    <div>
      <h1>Data Display</h1>
      <table className="table">
      <Table data={data} /> 
      </table>
      {/* <div>
      {<table id="dataTable">
  <thead>
    <tr>
      <th>askPrice</th>
      <th>askQuantity</th>
      <th>bidPrice</th>
      <th>bidQuantity</th>
      <th>lastTradedPrice</th>
      <th>lastTradedQuantity</th>
      <th>openInterest</th>
      <th>packetLength</th>
      <th>previousClosePrice</th>
      <th>sequenceNumber</th>
      <th>timestamp</th>
      <th>tradingSymbol</th>
      <th>volume</th>
      
    </tr>
  </thead>
  <tbody></tbody>
</table>}
    </div> */}
      {/* <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))} 
      </ul> */}
       {/* <ul>
      {data.map((str, index) => (
        <li key={index}>{str}</li>  
      ))}
    </ul> */}
    </div>
  );
};

export default DataDisplay;
