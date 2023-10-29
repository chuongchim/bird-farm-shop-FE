import React from 'react';
import { Button, Card, CardActions, CardContent, Divider } from "@mui/material";
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import chartDataProfit from "./ChartDataProfit";
import CountUp from 'react-countup';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import chartDataMonth from './ChartDataMonth';


const PopularStockCard: React.FC = () => {
    const chartDataProfit = [
        {
            // Define your chart data here
            data: [0, 15, 10, 50, 30, 40, 25]
        }
    ]

    const chartOptions = {
        chart: {
            id: 'support-chart',
            sparkline: {
                enabled: true
            }
        },
        colors: ['#FF5733'],
        tooltip: {
            theme: 'light',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },

            marker: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {

            colors: ['#FF5733'],
            width: 2
        },
        fill: {
            colors: ['#FF5733']
        },
    };

    return (
        <Card>
            <h6 style={{ marginLeft: "2rem", fontWeight: "bolder", marginTop: "2rem" }}>Popular Stocks</h6>
            <Card style={{ backgroundColor: "#F8F0E5", width: "90%", marginLeft: "2rem", marginTop: "2.4rem" }}>
                <CardContent>
                    <div style={{ display: "flex" }}>
                        <h6 style={{ color: "#C1761F" }}>Finance</h6>
                        <h6 style={{ marginLeft: "70%" }}>$<CountUp end={1839} duration={2} /></h6>
                    </div>
                    <h6 style={{ color: "#424242" }}>10% profit</h6>
                </CardContent>
                <ReactApexChart options={chartOptions} series={chartDataProfit} type="area" height={95} />
            </Card>
            <CardContent style={{ display: "flex" }}>
                <div style={{ marginLeft: "7%" }}>
                    <h6 style={{ fontWeight: "bold" }}>It me Bebe</h6>
                    <h6 style={{ marginTop: "1rem", color: "#00C879" }}>10% profit</h6>
                </div>
                <div style={{ display: "flex", marginLeft: "45%" }}>
                    <h6>$<CountUp end={1839} duration={2} /></h6>
                    <KeyboardArrowUpIcon style={{ color: "#00C853", padding: "1px 1px 1px 1px", backgroundColor: "#B9F6CA", borderRadius: "20%", marginLeft: "10px" }} />
                </div>
            </CardContent>
            <Divider />
            <CardContent style={{ display: "flex" }}>
                <div style={{ marginLeft: "7%" }}>
                    <h6 style={{ fontWeight: "bold" }}>It me Bebe</h6>
                    <h6 style={{ marginTop: "1rem", color: "#D8438E" }}>10% profit</h6>
                </div>
                <div style={{ display: "flex", marginLeft: "45%" }}>
                    <h6>$<CountUp end={1839} duration={2} /></h6>
                    <KeyboardArrowDownIcon style={{ color: "#D9471A", padding: "1px 1px 1px 1px", backgroundColor: "#FBE9E7", borderRadius: "20%", marginLeft: "10px" }} />
                </div>
            </CardContent>
            <Divider />
            <CardContent style={{ display: "flex" }}>
                <div style={{ marginLeft: "7%" }}>
                    <h6 style={{ fontWeight: "bold" }}>It me Bebe</h6>
                    <h6 style={{ marginTop: "1rem", color: "#D8438E" }}>10% profit</h6>
                </div>
                <div style={{ display: "flex", marginLeft: "45%" }}>
                    <h6>$<CountUp end={1839} duration={2} /></h6>
                    <KeyboardArrowDownIcon style={{ color: "#D9471A", padding: "1px 1px 1px 1px", backgroundColor: "#FBE9E7", borderRadius: "20%", marginLeft: "10px" }} />
                </div>
            </CardContent>
            <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                <Button size="large" disableElevation style={{ color: "#7F595A" }}>
                    View All
                    <ChevronRightOutlinedIcon />
                </Button>
            </CardActions>
        </Card>
    );
}

export default PopularStockCard;
