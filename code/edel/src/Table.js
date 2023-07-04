import React from 'react';
// import { impliedVolatility } from './DataDisplay.js';
const Table = ({ data }) => {

if (!data || data.length == 0) {
    return null; // If data is undefined, return null to not render anything
}   
  return (
    <table>
      <thead>
        <tr>
          <th class="text-center" id ="calls" colspan ="8">CALLS</th>
          {/* <th></th> */}
          <th class="text-center" id ="calls" colspan ="11">PUTS</th>
        </tr>
        <tr>
          <th>Symbol</th>
          <th>Volume</th>
          <th>IV</th>
          <th>LTP</th>
          <th>BidQty</th>
          <th>BID</th>
          <th>ASK</th>
          <th>AskQty</th>
          <th>STRIKE</th>
          <th>BidQty</th>
          <th>BID</th>
          <th>ASK</th>
          <th>AskQty</th>
          <th>LTP</th>
          <th>IV</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td class ="bg-yellow">{item.symbol}</td>
            <td class ="bg-yellow">{item.callVol}</td>
            <td class ="bg-yellow">0</td>
            <td class ="bg-yellow">{item.callLtp}</td>
            <td class ="bg-yellow">{item.callBidQ}</td>
            <td class ="bg-yellow">{item.callBidP}</td>
            <td class ="bg-yellow">{item.callAskP}</td>
            <td class ="bg-yellow">{item.callAskQ}</td>
            <td>{item.strikePrice}</td>
            <td>{item.putBidQ}</td>
            <td>{item.putBidP}</td>
            <td>{item.putAskP}</td>
            <td>{item.putAskQ}</td>
            <td>{item.putLtp}</td>
            <td>0</td>
            <td>{item.putVol}</td> 
          </tr>
        )
        
        )}
      </tbody>
    </table>
  );
};

export default Table;
