//Worker to handle price updates of stocks

const { getStocks, updateStocks } = require('./src/utils/stocks');

async function startUpdatingPrices() {
    console.log("Started updating prices")

    //get all the stocks from the file
    const stocks = await getStocks()

    //for each stock, update the price
    stocks.map(async stock => {
        setInterval(async () => {
            stock.currPrice = (Math.random() * 1000).toFixed(2);
            await updateStocks(stocks);
        }, stock.refreshInterval * 1000);
    });
}

//listen for messages from the main process
process.on('message', (msg) => {
    //if the message is START, start updating the prices
    //else send an error message
    if (msg === "START")
        startUpdatingPrices();
    else
        process.send("Unknown Message");
});