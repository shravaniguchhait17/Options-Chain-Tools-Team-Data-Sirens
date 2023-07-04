class stock {
    constructor(symbol, ul, ts, ltp) {
        // console.log("constructed stock for symbol: ", symbol);
      this.symbol = symbol;
      this.underlying = ul;
      this.timestamp = ts;
      this.ltp = ltp;
    }
  
    update(ts,ltp) {
        
        if(BigInt(this.timestamp) < BigInt(ts)){
            console.log("updAted stock for symbol: ", this.symbol);
            this.timestamp = ts;
            this.ltp = ltp;
        }
    }
  }
  
  module.exports = { stock };
//   module.exports = stock;
  