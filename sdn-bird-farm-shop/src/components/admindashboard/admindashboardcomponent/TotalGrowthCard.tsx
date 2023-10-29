import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import CountUp from 'react-countup';

interface DataItem {
    fullname: string;
    phonenumber: number;
}

interface DataItemMonth {
    name: string;
    avatar: string;
    id: number;
    age: number
}

const TotalGrowthCard: React.FC = () => {
    const [values, setValue] = useState<string>("today");
    const [category, setCategory] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);
    const [data2, setData2] = useState<number[]>([]);

    const status = [
        {
            value: 'today',
            label: 'Today'
        },
        {
            value: 'month',
            label: 'This Month'
        },
        {
            value: 'year',
            label: 'This Year'
        }
    ];

    console.log(values);
    console.log(data);
    console.log(data2);

    //Today chart get data
    useEffect(() => {
        if (values == "today") {
            const name: string[] = [];
            const age: number[] = [];
            const age2: number[] = [];
            const apiUrl = 'https://641140292e340b45b13fd8d5.mockapi.io/api/v1/hello';
            fetch(apiUrl)
                .then(response => response.json())
                .then((data: DataItem[]) => {
                    setData(data.map(item => item.phonenumber));
                    data.forEach((item) => {
                        console.log("item", item)
                        name.push(item.fullname);
                        age.push(item.phonenumber);
                        age2.push(item.phonenumber);
                    });
                    setCategory(name);
                    setData(age);
                    setData2(age2);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [values]);

    // Month Chart Get DATA
    useEffect(() => {
        if (values == "month") {
            const name: string[] = [];
            const avatar: string[] = [];
            const age: number[] = [];
            const ids: number[] = [];
            const apiUrl = 'https://65346e8ee1b6f4c59046ba19.mockapi.io/itmebebe';
            fetch(apiUrl)
                .then(response => response.json())
                .then((data: DataItemMonth[]) => {
                    setData(data.map(item => item.id));
                    data.forEach((item) => {
                        console.log("item", item)
                        name.push(item.name);
                        avatar.push(item.avatar);
                        age.push(item.age);
                        ids.push(item.id);
                    });
                    setCategory(name);
                    setData(age);
                    setData2(ids);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [values]);

    // Year Chart Get DATA
    useEffect(() => {
        if (values === "year") {
            const name: string[] = [];
            const age: number[] = [];
            const age2: number[] = [];
            const apiUrl = 'https://641140292e340b45b13fd8d5.mockapi.io/api/v1/hello';
            fetch(apiUrl)
                .then(response => response.json())
                .then((data: DataItem[]) => {
                    setData(data.map(item => item.phonenumber));
                    data.forEach((item) => {
                        console.log("item", item)
                        name.push(item.fullname);
                        age.push(item.phonenumber);
                        age2.push(item.phonenumber);
                    });
                    setCategory(name);
                    setData(age);
                    setData2(age2);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [values]);


    return (
        <Card>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1} style={{ marginLeft: "1rem", marginTop: "4rem" }}>
                                <Grid item>
                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>Total Growth</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4"> $<CountUp end={2324.00} duration={2} style={{ fontWeight: "bold" }} /></Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{ marginRight: "2rem" }}>
                            <TextField
                                id="standard-select-currency"
                                select
                                value={values}
                                onChange={(e) => setValue(e.target.value as string)}
                            >
                                {status.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{ marginTop: "2.2rem" }}>
                {<Chart options={{
                    chart: {
                        id: 'bar-chart',
                        stacked: true,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: true
                        }
                    },
                    fill: {
                        type: 'solid'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    grid: {
                        show: true
                    },
                    legend: {
                        show: true,
                        fontSize: '14px',
                        fontFamily: `'Roboto', sans-serif`,
                        position: 'bottom',
                        offsetX: 20,
                        labels: {
                            useSeriesColors: false
                        },
                        markers: {
                            width: 16,
                            height: 16,
                            radius: 5
                        },
                        itemMargin: {
                            horizontal: 15,
                            vertical: 8
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '50%'
                        }
                    },
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                legend: {
                                    position: 'bottom',
                                    offsetX: -10,
                                    offsetY: 0
                                }
                            }
                        }
                    ],
                    xaxis: {
                        categories: category
                    }
                }}
                    series={[
                        {
                            name: data.toString(),
                            data: data
                        },
                        {
                            name: data2.toString(),
                            data: data2
                        }
                    ]}
                    type="bar" width={800} height={500} />}
            </div>
        </Card>
    );
}

export default TotalGrowthCard;
