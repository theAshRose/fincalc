let chart;

function calculateSavings() {
    const initialDeposit = parseFloat(document.getElementById('initial-deposit').value);
    const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value);
    const annualInterestRate = parseFloat(document.getElementById('annual-interest-rate').value);
    const years = parseFloat(document.getElementById('years').value);

        // Validate inputs
        let valid = true;

        if (isNaN(initialDeposit)) {
            validateInput('initial-deposit', 'Enter a number');
            valid = false;
        }
    
        if (isNaN(monthlyContribution)) {
            validateInput('monthly-contribution', 'Enter a number');
            valid = false;
        }
    
        if (isNaN(annualInterestRate)) {
            validateInput('annual-interest-rate', 'Enter a number');
            valid = false;
        }
    
        if (isNaN(years)) {
            validateInput('years', 'Enter a number');
            valid = false;
        }
    

        if (!valid) return;

    let totalAmount = initialDeposit;
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const monthlyData = [];

    for (let i = 0; i < years * 12; i++) {
        totalAmount += monthlyContribution;
        totalAmount *= (1 + monthlyInterestRate);
        monthlyData.push(totalAmount);
    }

    document.getElementById('total-savings').textContent = `Total Savings: $${totalAmount.toFixed(2)}`;

    const breakdownList = document.getElementById('breakdown');
    breakdownList.innerHTML = `
        <li>Initial Deposit: $${initialDeposit.toFixed(2)}</li>
        <li>Total Contributions: $${(monthlyContribution * years * 12).toFixed(2)}</li>
        <li>Total Interest Earned: $${(totalAmount - initialDeposit - monthlyContribution * years * 12).toFixed(2)}</li>
    `;

    if (chart) {
        chart.destroy();
    }

    // Display the chart
    const ctx = document.getElementById('savingsChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: years * 12 }, (_, i) => `Month ${i + 1}`),
            datasets: [{
                label: 'Savings Over Time',
                data: monthlyData,
                borderColor: 'rgba(0, 123, 255, 1)',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Amount ($)'
                    }
                }
            }
        }
    });
}

function validateInput(inputId, message) {
    const input = document.getElementById(inputId);
    input.value = ''; 
    input.placeholder = message; 
    input.style.borderColor = 'red'; 
}