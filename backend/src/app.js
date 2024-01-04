require("dotenv").config()
const express = require("express")
const child_process = require('child_process');
const { getStocks, checkIfFileExists } = require("./utils/stocks");
const { getTickers } = require("./utils/polygon");
const cors = require("cors")

const PORT = process.env.PORT || 3000

async function startServer() {
    const app = express()

    //cors middleware
    app.use(cors())

    //route to get the stock prices
    app.get("/api/stocks", async (req, res) => {
        try {
            //get the number of stocks to be fetched
            //limiting the number of stocks to be fetched to maximum of 20
            const numberOfStocks = Math.min(req.query.numberOfStocks || 20, 20);
            //get the stocks from the file
            const stocks = await getStocks(numberOfStocks)

            //send the stocks as response
            return res.json(stocks)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    })

    app.listen(PORT, () => {
        console.log(`Stocks Server is running on port ${PORT}`)
    })

    //forking a child process to handle price updates
    const priceUpdater = child_process.fork('./worker.js');

    //sending message to the child process
    //to start updating the prices
    if (await checkIfFileExists()) {
        priceUpdater.send('START');
    } else {
        getTickers().then(() => {
            priceUpdater.send('START');
        })
    }

    // Ensure the child process is killed when the main program exits
    process.on('exit', () => {
        console.log('Stopping price updater');
        priceUpdater.kill();
    });

    return app;
}

//start the server
startServer()