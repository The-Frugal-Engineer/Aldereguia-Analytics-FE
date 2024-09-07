// Define the ticker options
const tickers = [
    { value: "", text: "Select a ticker..." },
    { value: "^GSPC", text: "^GSPC - S&P 500 Index (Index)" },
    { value: "^DJI", text: "^DJI - Dow Jones Industrial Average (Index)" },
    { value: "^IXIC", text: "^IXIC - Nasdaq Composite Index (Index)" },
    { value: "^RUT", text: "^RUT - Russell 2000 Index (Index)" },
    { value: "^FTSE", text: "^FTSE - FTSE 100 Index (Index)" },
    { value: "^N225", text: "^N225 - Nikkei 225 Index (Index)" },
    { value: "SPY", text: "SPY - SPDR S&P 500 ETF Trust (ETF)" },
    { value: "QQQ", text: "QQQ - Invesco QQQ Trust (ETF)" },
    { value: "VTI", text: "VTI - Vanguard Total Stock Market ETF (ETF)" },
    { value: "EEM", text: "EEM - iShares MSCI Emerging Markets ETF (ETF)" },
    { value: "IWM", text: "IWM - iShares Russell 2000 ETF (ETF)" },
    { value: "URTH", text: "URTH - iShares MSCI World ETF (ETF)" },
    { value: "AAPL", text: "AAPL - Apple Inc. (Stock)" },
    { value: "MSFT", text: "MSFT - Microsoft Corporation (Stock)" },
    { value: "AMZN", text: "AMZN - Amazon.com, Inc. (Stock)" },
    { value: "GOOGL", text: "GOOGL - Alphabet Inc. (Stock)" },
    { value: "META", text: "META - Meta Platforms, Inc. (Stock)" },
    { value: "TSLA", text: "TSLA - Tesla, Inc. (Stock)" },
    { value: "BRK-B", text: "BRK-B - Berkshire Hathaway Inc. (Stock)" },
    { value: "JNJ", text: "JNJ - Johnson & Johnson (Stock)" },
    { value: "JPM", text: "JPM - JPMorgan Chase & Co. (Stock)" },
    { value: "NVDA", text: "NVDA - NVIDIA Corporation (Stock)" },
    { value: "GC=F", text: "GC=F - Gold Futures (Commodity)" },
    { value: "SI=F", text: "SI=F - Silver Futures (Commodity)" },
    { value: "CL=F", text: "CL=F - Crude Oil (WTI) Futures (Commodity)" },
    { value: "NG=F", text: "NG=F - Natural Gas Futures (Commodity)" },
    { value: "EURUSD=X", text: "EURUSD=X - Euro to US Dollar (Currency)" },
    { value: "GBPUSD=X", text: "GBPUSD=X - British Pound to US Dollar (Currency)" },
    { value: "JPY=X", text: "JPY=X - US Dollar to Japanese Yen (Currency)" },
    { value: "BTC-USD", text: "BTC-USD - Bitcoin to US Dollar (Cryptocurrency)" },
    { value: "^TNX", text: "^TNX - US 10-Year Treasury Yield (Bond)" },
    { value: "^TYX", text: "^TYX - US 30-Year Treasury Yield (Bond)" }
];

// Function to populate a dropdown with ticker options
function populateDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return; // Exit if dropdown element is not found

    // Clear existing options
    dropdown.innerHTML = "";

    // Add each ticker as an option
    tickers.forEach(ticker => {
        const option = document.createElement("option");
        option.value = ticker.value;
        option.text = ticker.text;
        dropdown.appendChild(option);
    });
}

// Populate dropdowns with specified IDs
populateDropdown("ticker");
populateDropdown("ticker_future");
