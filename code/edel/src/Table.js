import React from 'react';

const Table = ({ data }) => {

if (!data || data.length == 0) {
    return null; // If data is undefined, return null to not render anything
}   
  return (
    <table>
      <thead>
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
            <td>{item.symbol}</td>
            <td>{item.callVol}</td>
            <td>0</td>
            <td>{item.callLtp}</td>
            <td>{item.callBidQ}</td>
            <td>{item.callBidP}</td>
            <td>{item.callAskP}</td>
            <td>{item.callAskQ}</td>
            <td>{item.strikePrice}</td>
            <td>{item.putBidQ}</td>
            <td>{item.putBidP}</td>
            <td>{item.putAskP}</td>
            <td>{item.putAskQ}</td>
            <td>{item.putLtp}</td>
            <td>0</td>
            <td>{item.putVol}</td> 
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
