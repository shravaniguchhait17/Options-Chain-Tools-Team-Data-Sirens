import React, { useEffect, useState } from 'react';
import Table from './Table';
import $ from 'jquery';
import './styles.css';
import 'datatables.net';
// import axios from 'axios';
import { parse, format } from 'date-fns';
import { toDate } from 'date-fns';



<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
const DataDisplay = () => { 
  const [data, setData] = useState([]);

  var stockPrice_mainIdx = 0;
  var stockPrice_Financials = 0;
  var stockPrice_Allbanks = 0;
  var stockPrice_midcaps = 0;


  const iv = require("./implied-volatility");
  const bs = require("./black-scholes");

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

  const fetchData = (receivedData) => {
    receivedData.forEach((item) => {
    // const row = $('<tr>');
    // var IV = 0;
    console.log(item);
    console.log(item.symbol);  
    var underlying;
    var expiryDate;
    var strikePrice;
    var call_put;
    var TTM;
    const interestRate = 0.05;

   
    if (!(item.symbol)) {
      return null; // or handle the error case as per your requirements
    }
  
    if((item.symbol).length<=10)
    {
      underlying = item.symbol;
      console.log("underlying: " + underlying);  
    }

    else
    {
      call_put = item.symbol.substring(item.symbol.length - 2, item.symbol.length).trim();
      console.log(call_put);
      if(call_put === 'CE')
      {
        call_put = 'call';
      }

      if(call_put === 'PE')
      {
        call_put = 'put';
      }
      
      if(call_put == 'XX')
      {
        strikePrice = 0;
        underlying = item.symbol.substring(0, item.symbol.length - 9).trim();
        expiryDate = item.symbol.substring(item.symbol.length - 9, item.symbol.length - 2).trim();
      }
      else{
        underlying = item.symbol.substring(0, item.symbol.length - 14).trim();
        
        if(underlying === 'ALLBANKS' || underlying === 'MAINIDX' || underlying === 'FINANCIALS' || underlying === 'MIDCAPS')
        {
          expiryDate = item.symbol.substring(item.symbol.length - 14, item.symbol.length - 7).trim();
        strikePrice = item.symbol.substring(item.symbol.length - 7, item.symbol.length-2).trim();
          

        }

        else
        {
          underlying = 'MIDCAPS';
          expiryDate = item.symbol.substring(item.symbol.length - 13, item.symbol.length - 6).trim();
          strikePrice = item.symbol.substring(item.symbol.length - 6, item.symbol.length-2).trim();
        }
      
      
      }
      console.log("underlying: " + underlying);  
      console.log("expiryDate: " + expiryDate);  
      console.log("strikePrice: " + strikePrice); 
      console.log("call_put: " + call_put);

      const dateStr = expiryDate;
    const timeStr = '15:30:00';

// Parse the date and time strings into Date objects
const parsedDate = parse(dateStr, 'ddMMMyy', new Date());
const parsedTime = parse(timeStr, 'HH:mm:ss', new Date(), { awareOfUnicodeTokens: true });


// Format the parsed date and time into the desired format
const formattedDateTime = format(parsedDate, 'M/d/yyyy') + ', ' + format(toDate(parsedTime), 'h:mm:ss a');
  console.log("formattedDateTime: " + formatDate(formattedDateTime));

  const currentDateTime = new Date();
  const futureDate = new Date(formattedDateTime);
  const timeDifference = futureDate.getTime() - currentDateTime.getTime();
  console.log("timeDifference: ", timeDifference);
  TTM = timeDifference / (1000 * 60 * 60 * 24);

  
  console.log("TTM: " + TTM);
  console.log("current Date Time: "+currentDateTime);
  if(call_put === 'call')
  {
  console.log("LTP: ", item.callLtp);
  }
  else if (call_put === 'put') 
  {
    console.log("LTP: ", item.putLtp);
  }

  // const equation = (volatility) => {
  //   const d1 = calculateD1(stockPrice, strikePrice, TTM, volatility);
  //   const d2 = d1 - volatility * Math.sqrt(TTM);



  //   const callPrice = calculateCallPrice(stockPrice, strikePrice, TTM, d1, d2, interestRate);
  //   return callPrice - item.lastTradedPrice;
  // };

 
  

  // const derivativeEquation = (volatility) => {
  //   const d1 = calculateD1(stockPrice, strikePrice, TTM, volatility);
  //   return normpdf(d1) * stockPrice * Math.sqrt(TTM);
  // };
  

    // Perform the Newton-Raphson iteration to find the implied volatility
    // const initialGuess = 0.3; // Initial guess for implied volatility
    // const maxIterations = 100;
    // const tolerance = 0.0001;

 

    // let volatility = initialGuess;
    // let iteration = 0;
    // let error = Infinity;

 

    // while (error > tolerance && iteration < maxIterations) {
    //   const f = equation(volatility);
    //   const fPrime = derivativeEquation(volatility);
    //   const nextVolatility = volatility - f / fPrime;

 

    //   error = Math.abs(nextVolatility - volatility);
    //   volatility = nextVolatility;
    //   iteration++;
    // }

    // IV = volatility;
    }
    
        
    
      if(item.symbol === 'MAINIDX')
      {
        stockPrice_mainIdx = item.ltp;
      }
      if(item.symbol === 'FINANCIALS')
      {
        stockPrice_Financials = item.ltp;
      }
      if(item.symbol === 'ALLBANKS')
      {
        stockPrice_Allbanks = item.ltp;
      }
      if(item.symbol === '	MIDCAPS')
      {
        stockPrice_midcaps = item.ltp;
      }

      let stockPrice;
      if(underlying === 'MAINIDX')
      {
        stockPrice = stockPrice_mainIdx;
        console.log("Stock price: " , stockPrice_mainIdx);
        
      }

      if(underlying === 'FINANCIALS')
      {
        console.log("Stock price: " , stockPrice_Financials);
        stockPrice = stockPrice_Financials;
      }

      if(underlying === 'ALLBANKS')
      {
        console.log("Stock price: " , stockPrice_Allbanks);
        stockPrice = stockPrice_Allbanks;
      }

      if(underlying === 'MIDCAPS')
      {
        console.log("Stock price: " , stockPrice_midcaps);
        stockPrice = stockPrice_midcaps;
      }

      if(call_put === 'call')
      {
        const impliedVolatility = iv.getImpliedVolatility(item.callLtp/100, stockPrice/100, strikePrice, TTM/365, interestRate, call_put);
        // console.log(stockPrice);
        // console.log(strikePrice);
        console.log("Implied Volatility:", impliedVolatility);
        item.callImpliedVolatility = impliedVolatility
      }
      else if (call_put === 'put') 
      {
        const impliedVolatility = iv.getImpliedVolatility(item.putLtp/100, stockPrice/100, strikePrice, TTM/365, interestRate, call_put);
        // console.log(stockPrice);
        // console.log(strikePrice);
        console.log("Implied Volatility:", impliedVolatility);
        item.putImpliedVolatility = impliedVolatility
      }
      

      // const calculatedOptionPrice = bs.blackScholes(stockPrice, strikePrice, TTM, impliedVolatility, interestRate, call_put);
      // console.log("Calculated Option Price:", calculatedOptionPrice);

    });
  };

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
      
        // console.log(receivedData);
          fetchData(receivedData); 
          setData(receivedData);

          // const receivedData1 = JSON.parse(event.data);
          
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

// export { impliedVolatility };
export default DataDisplay;

