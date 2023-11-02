interface chartDataProfit {
    type: 'area',
    height: 95,
    options: {
        chart: {
            id: 'support-chart',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#FF5733'],
        stroke: {
            curve: 'smooth',
            colors: ['#FF5733'],
            width: 2
        },
        fill: {
            colors: ['#FF5733']
        },
        tooltip: {
            theme: 'light',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: 'Ticket '
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            data: [0, 15, 10, 50, 30, 40, 25]
        }
    ]
};

export default chartDataProfit;
