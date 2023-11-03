import React, { useState, MouseEvent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CountUp from 'react-countup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import { Typography, Button } from '@mui/material';
import Chart from 'react-apexcharts';
import chartDataMonth from './ChartDataMonth';
import chartDataYear from './ChartDataYear';
import ReactApexChart from 'react-apexcharts';

const TotalOrderCard: React.FC = () => {
    const [timeValue, setTimeValue] = useState<boolean>(false);

    const handleChangeTime = (event: MouseEvent<HTMLButtonElement>, newValue: boolean) => {
        setTimeValue(newValue);
    };

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


    const chartDataProfit2 = [
        {
            // Define your chart data here
            data: [1, 23, 13, 40, 70, 30, 25]
        }
    ]

    const chartOptions2 = {
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
        <Card style={{ backgroundColor: "#135152", height: "12rem", marginTop: "3rem" }}>
            <CardContent>
                <div style={{ display: "flex" }}>
                    <ViewTimelineIcon style={{ backgroundColor: "#0C3E3F", borderRadius: "20%", padding: "5px", color: "#FFFF" }} />
                    <div style={{ marginLeft: "10rem" }}>
                        <Button
                            disableElevation
                            // variant={timeValue ? '#16595A' : 'text'}
                            size="medium"
                            sx={{ color: '#FFFF' }}
                            onClick={(e) => handleChangeTime(e, true)}
                        >
                            Month
                        </Button>
                        <Button
                            disableElevation
                            // variant={!timeValue ? '#16595A' : 'text'}
                            size="medium"
                            sx={{ color: '#FFFF' }}
                            onClick={(e) => handleChangeTime(e, false)}
                        >
                            Year
                        </Button>
                    </div>
                </div>
                <div style={{ display: "flex", height: "7rem" }}>
                    <div style={{ width: "50%" }}>
                        <h1 style={{ color: "#FFFF" }}>
                            {timeValue ? (
                                <Typography
                                    sx={{
                                        fontSize: '2rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    $<CountUp end={108} duration={2} style={{ fontWeight: "bold" }} /> <ArrowUpwardIcon style={{ color: "#215C5D", backgroundColor: "#8BACAD", transform: "rotate3d(1, 1, 1, 45deg)", borderRadius: "50%" }} />
                                </Typography>
                            ) : (
                                <Typography
                                    sx={{
                                        fontSize: '2rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    $<CountUp end={961} duration={2} style={{ fontWeight: "bold" }} /> <ArrowUpwardIcon style={{ color: "#215C5D", backgroundColor: "#8BACAD", transform: "rotate3d(1, 1, 1, 45deg)", borderRadius: "50%" }} />
                                </Typography>
                            )}
                        </h1>
                        <p style={{ color: "#8BACAD", fontWeight: "bold" }}>Total Order</p>
                    </div>
                    <div>
                        {
                            timeValue ? (
                                <ReactApexChart options={chartOptions} series={chartDataProfit} type="area" height={95} />
                            ) : (
                                <ReactApexChart options={chartOptions2} series={chartDataProfit2} type="area" height={95} />
                            )
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default TotalOrderCard;
