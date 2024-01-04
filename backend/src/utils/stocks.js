const { readFile, writeFile } = require("fs/promises");
const path = require("path");

async function getStocks(numberOfStocks) {
    if (!await checkIfFileExists()) {
        throw new Error("The stocks file doesn't exist");
    }
    const data = await readFile("./data.json", "utf8");
    return numberOfStocks ? JSON.parse(data).slice(0, numberOfStocks) : JSON.parse(data)
}

async function updateStocks(stocks) {
    try {
        await writeFile("./data.json", JSON.stringify(stocks));
    } catch (err) {
        console.error("Error updating stocks:", err.message);
        throw err;
    }
}

async function checkIfFileExists() {
    try {
        const file_path = "./data.json"
        const file = await readFile(file_path, "utf8");

        // //check if the file is empty
        // if (file.length === 0) {
        //     return false;
        // }

        // //check if file has valid json
        // JSON.parse(file);

        // //check if file has an array
        // if (!Array.isArray(JSON.parse(file))) {
        //     return false;
        // }

        if (file)
            return true;
        else
            return false;
    } catch (err) {
        console.error("Error checking if file exists:", err.message);
        return false;
    }
}

module.exports = { getStocks, updateStocks, checkIfFileExists }