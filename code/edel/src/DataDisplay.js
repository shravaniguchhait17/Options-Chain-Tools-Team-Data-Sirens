import React, { useEffect, useState } from 'react';
import Table from './Table'; 
import { parse, format, toDate } from 'date-fns'; 
import './styles.css';

const iv = require("./implied-volatility");
const bs = require("./black-scholes");
 

const DataDisplay = () => { 
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('ALLBANKS');
  const [selectedExpiry, setSelectedExpiry] = useState('ALL');
  const [stockPrices, setStockPrices] = useState(new Map());
  const [expiry, setExpiry] = useState(new Map());

  const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const formattedDate = dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  
    const [datePart, timePart] = formattedDate.split(', ');
    const [month, day, year] = datePart.split('/');
    const [time, period] = timePart.split(' ');
  
    const hour = period === 'PM' ? Number(time.split(':')[0]) + 12 : Number(time.split(':')[0]);
  
    return `${year}-${month}-${day}T${hour}:${time.split(':')[1]}:${time.split(':')[2]}`;
  };

  const handleDropdownChange = (event) => { 
    setSelectedValue(event.target.value);
    const filtered = fullData.filter(item => item.underlying === event.target.value);
    setData(filtered);
  };
  const handleDropdownChangeExp = (event) => { 
    const allstr = "ALL";
    setSelectedExpiry(event.target.value);
   
    if(event.target.value === allstr){ 
      const filtered = fullData.filter(item => item.underlying === selectedValue); 
      setData(filtered);
    }
    else{
      const filtered = fullData.filter(item => item.underlying === selectedValue && item.expiry === event.target.value); 
      setData(filtered);
    }
  };

  const fetchData = (receivedData) => {
    receivedData.forEach((item) => {

      const dateStr = item.expiry;
      const timeStr = '15:30:00';
      const interestRate = 0.05;
      
      const parsedDate = parse(dateStr, 'ddMMMyy', new Date());
      const parsedTime = parse(timeStr, 'HH:mm:ss', new Date(), { awareOfUnicodeTokens: true });
   
      const formattedDateTime = format(parsedDate, 'M/d/yyyy') + ', ' + format(toDate(parsedTime), 'h:mm:ss a'); 


      const currentDateTime = new Date(); //sets current DnT
      const futureDate = new Date(formattedDateTime);
      const timeDifference = futureDate.getTime() - currentDateTime.getTime(); 
      var TTM = timeDifference / (1000 * 60 * 60 * 24);

      let impliedVolatilityCall = iv.getImpliedVolatility(parseInt(item.callLtp)/100, parseInt(stockPrices.get(item.underlying))/100, parseInt(item.strikePrice), TTM/365, interestRate, 'call');
      let impliedVolatilityPut = iv.getImpliedVolatility(parseInt(item.putLtp)/100, parseInt(stockPrices.get(item.underlying))/100, parseInt(item.strikePrice), TTM/365, interestRate, 'put');

      // Add impliedVolatilityCall and impliedVolatilityPut as fields to the item

      item.impliedVolatilityCall = ((impliedVolatilityCall*100 < 1e-7) || (impliedVolatilityCall*100 > 1e7)) ? '-' : impliedVolatilityCall*100;
      item.impliedVolatilityPut = ((impliedVolatilityPut*100 > 1e7) || (impliedVolatilityPut*100 < 1e-7)) ? '-' : impliedVolatilityPut*100;


    });
  };

  useEffect(() => {
    
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    

    socket.onmessage = (event) => { 
        const newData = event.data; 
        const dataArray = newData.split('-');
        const allstr = "ALL";
        
        let receivedData = dataArray.map((item) => JSON.parse(item));
        let newStockPrices = new Map(stockPrices);
        let newExpiry = new Map(expiry);
        for(const data of receivedData){
          if(data.underlying === data.symbol){
            if(data.underlying === "MIDCAPS"){
              newStockPrices.set("MIDCAP", data.ltp);
            }
            else newStockPrices.set(data.underlying, data.ltp);
          }
          else{
            let existingValues = newExpiry.get(data.underlying) || new Set();
            existingValues = existingValues.add(data.expiry);
            
            newExpiry.set(data.underlying, existingValues);
          }
        }
        setExpiry(newExpiry);
        setStockPrices(newStockPrices);

        receivedData = receivedData.slice(4);
        fetchData(receivedData);  
        setFullData(receivedData);
        if(selectedExpiry === allstr){ 
          const filtered = receivedData.filter(item => item.underlying === selectedValue); 
          setData(filtered);
        }
        else{
          const filtered = receivedData.filter(item => item.underlying === selectedValue && item.expiry === selectedExpiry); 
          setData(filtered);
        }
      
        
 
       
    };

    
     
    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return () => {
        socket.close();
    };
    
    
  }, [selectedValue, selectedExpiry]);
  
  return (
    <div> 
    
      <h1>NSE Option Chain - Team Data-Sirens</h1>

      Select Symbol:
      <select value={selectedValue} onChange={handleDropdownChange}>
        {[...stockPrices.keys()].map((value) => (
          <option value={value}>
            {value}
          </option>
        ))}
      </select>
      Select Expiry:
      {expiry.get(selectedValue) && (
      <select value={selectedExpiry} onChange={handleDropdownChangeExp}>
        <option value ="ALL">All Expiries</option>
        {Array.from(expiry.get(selectedValue)).map((value) => (
          <option value={value}>
            {value}
          </option>
        ))}
      </select>
      )}

      <div className="table-container">
      <table className="table">
      <Table data={data} strikeThreshold={stockPrices.get(selectedValue)} /> 
      </table>
      </div>
     
    </div>
  );
};

export default DataDisplay;
