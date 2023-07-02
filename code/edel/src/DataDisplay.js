import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
        console.log('WebSocket connection establisheds');
    };

    socket.onmessage = (event) => { 
        const newData = event.data;
        // setData(newData);
        const receivedData = JSON.parse(newData)
        console.log(receivedData);
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
