import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
// import axios from 'axios';



<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
const DataDisplay = () => {
  const [data, setData] = useState([]);

  
  
  // const fetchData = (receivedData) => {

  //   $.ajax({
  //     url: 'http://localhost:3000/', // Replace with your JSON endpoint or file path
  //     type: 'GET',
  //     dataType: 'json',
  //     success: function(receivedData) {
  //       // Clear the existing table data
  //       $('#dataTable').DataTable().clear().destroy();
  //       console.log(receivedData);
  //       // Iterate over the JSON data and add rows to the table
  //       $.each(receivedData, function(index, item) {
  //         console.log(index);
  //         console.log(item);
  //         var row = $('<tr>');
  //         row.append($('<td>').text(item.askPrice));
  //         row.append($('<td>').text(item.askQuantity));
  //         row.append($('<td>').text(item.bidPrice));
  //         row.append($('<td>').text(item.bidQuantity));
  //         row.append($('<td>').text(item.lastTradedPrice));
  //         row.append($('<td>').text(item.lastTradedQuantity));
  //         row.append($('<td>').text(item.openInterest));
  //         row.append($('<td>').text(item.packetLength));
  //         row.append($('<td>').text(item.previousClosePrice));
  //         row.append($('<td>').text(item.sequenceNumber));
  //         row.append($('<td>').text(item.timestamp));
  //         row.append($('<td>').text(item.tradingSymbol));
  //         row.append($('<td>').text(item.volume));
  //         // Add more columns as needed
  
  //         $('#dataTable').append(row);
  //       });
  
  //       // Initialize DataTables plugin to make the table interactive
  //       $('#dataTable').DataTable();
  //     },
  //     error: function(jqXHR, textStatus, errorThrown) {
  //       console.log('Error loading JSON data');
  //       console.log('AJAX Error:', textStatus, errorThrown);
  //     }
  //   });
  // };


  const fetchData = (receivedData) => {
    const tableBody = $('#dataTable tbody');
    receivedData.forEach((item) => {
    const row = $('<tr>');
    // Add code to create and append table cells for each property in the received data
    // For example:
    row.append($('<td>').text(item.askPrice));
    row.append($('<td>').text(item.askQuantity));
      row.append($('<td>').text(item.bidPrice));
          row.append($('<td>').text(item.bidQuantity));
          row.append($('<td>').text(item.lastTradedPrice));
          row.append($('<td>').text(item.lastTradedQuantity));
          row.append($('<td>').text(item.openInterest));
          row.append($('<td>').text(item.packetLength));
          row.append($('<td>').text(item.previousClosePrice));
          row.append($('<td>').text(item.sequenceNumber));
          row.append($('<td>').text(item.timestamp));
          row.append($('<td>').text(item.tradingSymbol));
          row.append($('<td>').text(item.volume));
    // Append the row to the table body
    tableBody.append(row);
  });
    // Clear the existing table data
    // $('#dataTable').DataTable().clear().destroy();
  
    // receivedData.forEach((item) => {
    //   var row = $('<tr>');
    //   // Add code to create and append table cells for each property in the received data
    //   // For example:
    //   console.log(receivedData);
    //   row.append($('<td>').text(item.askPrice));
    //   row.append($('<td>').text(item.askQuantity));
    //   row.append($('<td>').text(item.bidPrice));
    //       row.append($('<td>').text(item.bidQuantity));
    //       row.append($('<td>').text(item.lastTradedPrice));
    //       row.append($('<td>').text(item.lastTradedQuantity));
    //       row.append($('<td>').text(item.openInterest));
    //       row.append($('<td>').text(item.packetLength));
    //       row.append($('<td>').text(item.previousClosePrice));
    //       row.append($('<td>').text(item.sequenceNumber));
    //       row.append($('<td>').text(item.timestamp));
    //       row.append($('<td>').text(item.tradingSymbol));
    //       row.append($('<td>').text(item.volume));
      
    //   // Add more cells for other properties as needed
  
    //   $('#dataTable').append(row);
    // });


    // Iterate over the received data and add rows to the table
    // $.each(receivedData, function (index, item) {
    //   var row = $('<tr>');
    //   // Add code to create and append table cells for each property in the received data
    //   // For example:
    //   console.log(receivedData);
    //   row.append($('<td>').text(item.askPrice));
    //   row.append($('<td>').text(item.askQuantity));
    //   row.append($('<td>').text(item.bidPrice));
    //       row.append($('<td>').text(item.bidQuantity));
    //       row.append($('<td>').text(item.lastTradedPrice));
    //       row.append($('<td>').text(item.lastTradedQuantity));
    //       row.append($('<td>').text(item.openInterest));
    //       row.append($('<td>').text(item.packetLength));
    //       row.append($('<td>').text(item.previousClosePrice));
    //       row.append($('<td>').text(item.sequenceNumber));
    //       row.append($('<td>').text(item.timestamp));
    //       row.append($('<td>').text(item.tradingSymbol));
    //       row.append($('<td>').text(item.volume));
    //   // Add more columns as needed
    //   $('#dataTable').append(row);
    // });
  
    // Initialize DataTables plugin to make the table interactive
    $('#dataTable').DataTable();
  };
  

  useEffect(() => {
    
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
        console.log('WebSocket connection establisheds');
    };

    

    socket.onmessage = (event) => { 
        const newData = event.data;
        // setData(newData);
        const receivedData = JSON.parse(newData)
       
        //console.log(receivedData);
        
        fetchData(receivedData);
        
        
       
        setData((prevData) => [...prevData, receivedData]);
        // console.log("updated!~", event);
    };

    
    
    // Handle WebSocket close event
    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return () => {
        socket.close();
    };
    // const fetchData = async () => {
    //   try {
    //     console.log("request sent");
    //     const response = await axios.get('http://localhost:8000/fetch-data'); // Replace with the backend API endpoint URL
    //     console.log("request recvd"); 
    //     console.log(response.data);
    //     setData(response.data);
    //   } catch (error) {
    //     console.error('Error(s) fetching data:', error);
    //   }
    // };

    // fetchData();
  }, []);

  return (
    <div>
      <h1>Data Display</h1>
      <div>
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
      
      {/* <!-- Add more columns as needed --> */}
    </tr>
  </thead>
  <tbody></tbody>
</table>}
    </div>
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
