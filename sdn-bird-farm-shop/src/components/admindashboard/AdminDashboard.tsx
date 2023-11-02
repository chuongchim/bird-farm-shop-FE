import React, { FC } from 'react';
import { Box, Card } from "@mui/material";
import TotalEarningCard from "./admindashboardcomponent/TotalEarningCard";
import TotalIncomeDarkCard from "./admindashboardcomponent/TotalIncomeDarkCard";
import TotalIncomeLightCard from "./admindashboardcomponent/TotalIncomeLightCard";
import TotalOrderCard from "./admindashboardcomponent/TotalOrderCard";
import TotalGrowthCard from "./admindashboardcomponent/TotalGrowthCard";
import PopularStockCard from "./admindashboardcomponent/PopularStockCard";
import Grid from '@mui/material/Grid';
import MenuAdmin from "../page/menu/Menu";

export const AdminDashBoard: FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 0, p: 1 }}>
                <MenuAdmin />
            </Box>
            <Card style={{ backgroundColor: "#EEF2F6", paddingLeft: "1rem", paddingTop: "2rem", marginRight: "1rem", marginTop: "5rem" }} sx={{ flexGrow: 12, p: 1 }}>
                <Grid container spacing={2}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalEarningCard />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderCard />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "2rem" }}>
                    <Grid item lg={8} md={6} sm={6} xs={12}>
                        <TotalGrowthCard />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <PopularStockCard />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};
