class ChartManager {
    constructor() {
        this.myChart = null;  // Declare the chart variable
        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('fetchDataButton').addEventListener('click', () => this.fetchData());
    }

    fetchData() {
        const amount = document.getElementById('amount').value;
        const year = document.getElementById('year').value;
        const ticker = document.getElementById('ticker').value;
		const simulation_type = document.getElementById('simulation_type').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const credentials = btoa(`${username}:${password}`);
		const initial_investment = document.getElementById('initial_investment').value;
        const jsonbody = {
            amount: amount,
            year: year,
            ticker: ticker,
			simulation_type: simulation_type,
			initial_investment: initial_investment
        };
        
        const url = `http://127.0.0.1:8080/calculations`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonbody)
        })
        .then(response => response.json())
        .then(data => this.updateChart(data));
    }

    updateChart(data) {
        const labels = Object.values(data.Date).map(date => new Date(date).toLocaleDateString());
        const parsedLabels = labels.map(label => {
            const [day, month, year] = label.split('/').map(Number);
            return new Date(year, month - 1, day);
        });

        const values = Object.values(data.TotalPosition);
        const values2 = Object.values(data.TotalInvested);

        // Check if a chart already exists
        if (this.myChart) {
            this.myChart.destroy(); // Destroy the existing chart instance
        }

        // Create a new chart
        const ctx = document.getElementById('myChart').getContext('2d');
        this.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: parsedLabels,
                datasets: [{
                    label: 'Total Position with Dividends',
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Money invested',
                    data: values2,
                    borderColor: 'rgba(255, 0, 0, 1)',        
                    backgroundColor: 'rgba(255, 0, 0, 0.2)', 
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'month'
                        }
                    },
                    y: {
                        beginAtZero: false
                    }
                },
				responsive: true, /* Ensure the chart resizes with the grid */
				maintainAspectRatio: false /* Allow the chart to resize freely */
            }
        });
		
		/*CALCULATE KPIs*/
		var lastPosition = values[values.length - 1];
		var totalInvested = values2[values2.length - 1];
		var benefit=lastPosition-totalInvested;
		var benefitPercentage = benefit/totalInvested *100;
		// Set the last element in the HTML
		lastPosition = parseFloat(lastPosition).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		totalInvested = parseFloat(totalInvested).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		benefit = parseFloat(benefit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		benefitPercentage = benefitPercentage.toFixed(2);

		document.getElementById('last-value').textContent = `Total Position: ${lastPosition}`;
		document.getElementById('invested').textContent = `Total Invested: ${totalInvested}`;
		document.getElementById('benefit').textContent = `Total gains: ${benefit}`;
		document.getElementById('benefitPercentage').textContent = `Percentage total gains: ${benefitPercentage} %`;
		
    }
}

// Instantiate the class once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChartManager();
});
