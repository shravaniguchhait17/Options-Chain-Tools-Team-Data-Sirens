import React from 'react';

const Table = ({ data, strikeThreshold }) => {


if (!data || data.length === 0) {
    return null; // If data is undefined, return null to not render anything
}   
const getCellClassNameCalls= (strikePrice) => {
  if (parseInt(strikePrice)*100 < parseInt(strikeThreshold)) {
    return 'left-color'; // Apply left color for strike price less than the threshold
  } else {
    return '';  
  }
};
const getCellClassNamePuts= (strikePrice) => {
  if (parseInt(strikePrice)*100 > parseInt(strikeThreshold)) {
    return 'left-color'; 
  } else {
    return '';  
  }
};
  return (
    <table>
      <thead>
        <tr>
          <th class="text-center" id ="calls" colspan ="2"></th>
          <th class="text-center" id ="calls" colspan ="7">CALLS</th>
          <th class="text-center" id ="calls" colspan ="1"></th>
          <th class="text-center" id ="calls" colspan ="10">PUTS</th>
        </tr>
        <tr>
          <th>Underlying</th>
          <th>Expiry</th>
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
            <td>{item.underlying}</td>
            <td>{item.expiry}</td>
            <td className={getCellClassNameCalls(item.strikePrice)}>{item.callVol}</td>
            <td className={getCellClassNameCalls(item.strikePrice)}>{item.impliedVolatilityCall}</td>
            <td className={getCellClassNameCalls(item.strikePrice)}>{parseInt(item.callLtp)/100}</td>
            <td className={getCellClassNameCalls(item.strikePrice)}>{item.callBidQ}</td>
            <td className={getCellClassNameCalls(item.strikePrice)}>{parseInt(item.callBidP)/100}</td>
            <td className={getCellClassNameCalls(item.strikePrice)}>{parseInt(item.callAskP)/100}</td>
            <td className={getCellClassNameCalls(item.strikePrice)}>{item.callAskQ}</td>
            <td>{item.strikePrice}</td>
            <td className={getCellClassNamePuts(item.strikePrice)}>{item.putBidQ}</td>
            <td className={getCellClassNamePuts(item.strikePrice)}>{parseInt(item.putBidP)/100}</td>
            <td className={getCellClassNamePuts(item.strikePrice)}>{parseInt(item.putAskP)/100}</td>
            <td className={getCellClassNamePuts(item.strikePrice)}>{item.putAskQ}</td>
            <td className={getCellClassNamePuts(item.strikePrice)}>{parseInt(item.putLtp)/100}</td>
            <td className={getCellClassNamePuts(item.strikePrice)}>{item.impliedVolatilityPut}</td>
            <td className={getCellClassNamePuts(item.strikePrice)}>{item.putVol}</td> 
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
