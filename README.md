# Options Chain Web App
The Options Chain web application aims to provide users with a convenient platform to access and analyze options data for different underlying assets, such as stocks, indices, or commodities. It displays option chains, offering a comprehensive list of available options contracts for the selected asset, along with essential details like strike prices and expiration dates.
## Tech Stack

**Front-end:**  ReactJS

**Back-end:** Node.js, Socket.io

**Market Data Stream:** TCP/IP

**Implied Volatility Calculation:** Black Scholes Formula

## Getting Started:
1. First go to Data-Sirens/code on command prompt.
2. Type this:
   java -classpath feed-play-1.0.jar hackathon.player.Main dataset.csv 9011
3. Open another command prompt and navigate to Data-Sirens/code.
4. Type this:
   node server.js
5. Then open the folder with the code on VSCode and navigate to Data-Sirens/code/edel/src on terminal and run this:
   npm start

## Features
- **Real-time Option Chain:** The website provides a live and up-to-date option chain screen, reflecting the latest market data for various financial instruments.

- **Implied Volatility Calculation:** It calculates the Implied Volatility for the displayed options based on the market data, aiding in option pricing and risk assessment.

- **Symbol Filtering:** Users can filter options based on specific symbols, allowing them to focus on particular financial instruments.

- **Expiry Date Filtering:** The website supports the filtering of options based on expiry dates, enabling users to narrow down their analysis to specific timeframes.

- **Highlighting In-the-Money and Out-of-the-Money Options:** In-the-money and out-of-the-money options are visually distinguished, enhancing user experience and providing quick insights.

- **Real-Time Refresh:** As the market data changes, the fields on the website are automatically recalculated and refreshed, ensuring users have access to the most current information without manual intervention.

- **User-Friendly Interface:** The website offers a user-friendly interface, making it easy for users to navigate, analyze, and interpret the options chain data efficiently.

## Screenshots
### Symbol Filtering:
<img alt="1" src="https://github.com/shravaniguchhait17/Data-Sirens/assets/74111792/de059cbb-92e8-4979-8dac-17289f890942">

### Expiry Filtering:
<img alt="1" src="https://github.com/shravaniguchhait17/Data-Sirens/assets/74111792/68749d13-9add-4568-8707-a1a6bd734206">

### Webpage:
<img alt="1" src="https://github.com/shravaniguchhait17/Data-Sirens/assets/74111792/5209ae82-8d94-4a2b-8bfd-13ae2ba2a6f7">
 
