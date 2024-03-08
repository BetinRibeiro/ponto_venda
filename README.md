Cryptocurrency Portfolio Tracker

This project is a simple cryptocurrency portfolio tracker implemented in JavaScript. It retrieves current cryptocurrency prices from the Binance API and calculates the total value and profit/loss of each cryptocurrency holding.
Features

    Display Cryptocurrency Holdings: The table displays the cryptocurrency symbol, purchase price, quantity held, total purchase value, current price, total current value, and profit/loss for each cryptocurrency.
    Total Summary: It calculates the total purchase value, total current value, and overall profit/loss in both USD and BRL (Brazilian Real).
    Currency Formatting: Functions dolar() and real() format currency values in USD and BRL respectively.

How It Works

    The script initializes an array cryptocurrencies containing cryptocurrency holdings data.
    The fetchCryptoPrice() function asynchronously fetches current cryptocurrency prices from the Binance API using the fetch API.
    The updateTable() function dynamically updates the HTML table with the latest cryptocurrency data.
    Within the updateTable() function, it iterates over each cryptocurrency, calculates its total purchase value, total current value, and profit/loss, and updates the table accordingly.
    It calculates the total purchase value, total current value, and overall profit/loss, and updates the footer of the table.
    Finally, it listens for the load event on the window and triggers the updateTable() function.

Dependencies

    This project depends on the Binance API for fetching cryptocurrency prices.
    It uses the fetch API for making HTTP requests.

Usage

To use this project:

    Ensure you have an internet connection to fetch the latest cryptocurrency prices.
    Open the HTML file in a web browser.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to contribute or use this project as a base for your cryptocurrency portfolio tracking needs! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.
