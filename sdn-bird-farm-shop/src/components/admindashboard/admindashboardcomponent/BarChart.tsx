// const fetchChartData = () => {
//     const name = [];
//     const apiUrl = 'https://641140292e340b45b13fd8d5.mockapi.io/api/v1/hello'; // Replace with your API endpoint
//     return fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             return {
//                 height: 480,
//                 type: 'bar',
//                 options: {
//                     chart: {
//                         id: 'bar-chart',
//                         stacked: true,
//                         toolbar: {
//                             show: false
//                         },
//                         zoom: {
//                             enabled: true
//                         }
//                     },
//                     color: [
//                         "#FFFF", '#C1761F', '#E3BF91'
//                     ],
//                     responsive: [
//                         {
//                             breakpoint: 480,
//                             options: {
//                                 legend: {
//                                     position: 'bottom',
//                                     offsetX: -10,
//                                     offsetY: 0
//                                 }
//                             }
//                         }
//                     ],
//                     plotOptions: {
//                         bar: {
//                             horizontal: false,
//                             columnWidth: '50%'
//                         }
//                     },
//                     xaxis: {
//                         type: 'category',
//                         // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//                         categories: data.fullname.map(item => item.name)
//                     },
//                     legend: {
//                         show: true,
//                         fontSize: '14px',
//                         fontFamily: `'Roboto', sans-serif`,
//                         position: 'bottom',
//                         offsetX: 20,
//                         labels: {
//                             useSeriesColors: false
//                         },
//                         markers: {
//                             width: 16,
//                             height: 16,
//                             radius: 5
//                         },
//                         itemMargin: {
//                             horizontal: 15,
//                             vertical: 8
//                         }
//                     },
//                     fill: {
//                         type: 'solid'
//                     },
//                     dataLabels: {
//                         enabled: false
//                     },
//                     grid: {
//                         show: true
//                     }
//                 },
//                 series: data.fullname.map(item => item.name),
//                 // Assuming the API returns data in the same format as your series property
//             };
//         }).catch(error => console.error('Error fetching data:', error));
// }

// export default fetchChartData;