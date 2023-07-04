var bs = require("./black-scholes");

function getImpliedVolatility(expectedCost, s, k, t, r, callPut, estimate)
{
  // console.log(expectedCost);
  estimate = estimate || .1;
  var low = 0;
  var high = Infinity;
  // perform 100 iterations max
  for(var i = 0; i < 100; i++)
  {
    var actualCost = bs.blackScholes(s, k, t, estimate, r, callPut);
    // compare the price down to the cent
    if(expectedCost * 100 == Math.floor(actualCost * 100))
    {
      break;
    }
    else if(actualCost > expectedCost)
    {
      high = estimate;
      estimate = (estimate - low) / 2 + low
    }
    else
    {
      low = estimate;
      estimate = (high - estimate) / 2 + estimate;
      if(!isFinite(estimate)) estimate = low * 2;
    }
  }
  return estimate;
}

module.exports = {
  getImpliedVolatility: getImpliedVolatility
}