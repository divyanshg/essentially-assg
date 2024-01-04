const axios = require("axios")
const { updateStocks, getStocks } = require("./stocks")

const API_KEY = process.env.POLYGON_API_KEY

//function to get the stocks from the polygon api
async function getTickers() {
    const response = await axios.get(`https://api.polygon.io/v3/reference/tickers?active=true&limit=20&apiKey=${API_KEY}`)

    //saving the stocks in the file
    const fetchedStocks = response.data.results;

    //adding a random refresh interval to each stock
    fetchedStocks.forEach(stock => {
        //random between 1-5
        stock.refreshInterval = Math.floor(Math.random() * 5) + 1
    })

    await updateStocks(fetchedStocks)
    // await getOpenPrices()
}

async function getOpenPrices() {
    const savedStocks = await getStocks()

    savedStocks.forEach(async ({ ticker }) => {
        const response = await axios.get(`https://api.polygon.io/v1/open-close/${ticker}/2023-01-09?adjusted=true&apiKey=${API_KEY}`)
        const openPrice = response.data.open
        const stockIndex = savedStocks.findIndex(stock => stock.ticker === ticker)
        savedStocks[stockIndex].open = openPrice
    })

    await updateStocks(savedStocks)
}

module.exports = { getTickers, getOpenPrices }