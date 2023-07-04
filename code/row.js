class row {
    constructor(symbol, ul, expiry, callTs, putTs, sp, callLtp, putLtp, callLtq, putLtq, callVol, putVol, callAskP, callAskQ, putAskQ, putAskP, callBidP, callBidQ, putBidQ, putBidP, callOI, putOI, callPCP, putPCP, callPOI, putPOI) {
        // console.log("constructed row for option: ", symbol);
            this.symbol = symbol;
            this.underlying = ul;
            this.expiry = expiry;
            this.callTimestamp = callTs;
            this.putTimestamp = putTs;
            this.strikePrice = sp;
            this.callLtp = callLtp;
            this.putLtp = putLtp;
            this.callLtq = callLtq;
            this.putLtq = putLtq;
            this.callVol = callVol;
            this.putVol = putVol;
            this.callAskP = callAskP;
            this.putAskP = putAskP;
            this.callAskQ = callAskQ;
            this.putAskQ = putAskQ;
            this.callBidP = callBidP;
            this.callBidQ = callBidQ;
            this.putBidQ = putBidQ;
            this.putBidP = putBidP;
            this.callOI = callOI;
            this.putOI = putOI;
            this.callPCP = callPCP;
            this.putPCP = putPCP;
            this.callPOI = callPOI;
            this.putPOI = putPOI;
    }
    update(callTs, putTs, callLtp, putLtp, callLtq, putLtq, callVol, putVol, callAskP, callAskQ, putAskQ, putAskP, callBidP, callBidQ, putBidQ, putBidP, callOI, putOI, callPCP, putPCP, callPOI, putPOI) {
        
        if(BigInt(this.callTimestamp) <= BigInt(callTs) && BigInt(this.putTimestamp) <= BigInt(putTs)){
            // console.log("updated option: ", this.symbol);
            this.callTimestamp = callTs;
            this.putTimestamp = putTs;
            this.callLtp = callLtp;
            this.putLtp = putLtp;
            this.callLtq = callLtq;
            this.putLtq = putLtq;
            this.callVol = callVol;
            this.putVol = putVol;
            this.callAskP = callAskP;
            this.putAskP = putAskP;
            this.callAskQ = callAskQ;
            this.putAskQ = putAskQ;
            this.callBidP = callBidP;
            this.callBidQ = callBidQ;
            this.putBidQ = putBidQ;
            this.putBidP = putBidP;
            this.callOI = callOI;
            this.putOI = putOI;
            this.callPCP = callPCP;
            this.putPCP = putPCP;
            this.callPOI = callPOI;
            this.putPOI = putPOI;
        }
    }
      
  }

  module.exports = { row };