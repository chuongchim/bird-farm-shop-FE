import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CountUp from 'react-countup';

const TotalIncomeLightCard: React.FC = () => {
    return (
        <Card style={{ backgroundColor: "rgb(193, 118, 31)", height: "5.5rem" }}>
            <CardContent>
                <div style={{ display: "flex" }}>
                    <ViewTimelineIcon style={{ backgroundColor: "#B36115", borderRadius: "20%", padding: "5px", color: "#FFFF" }} />
                    <div style={{ marginTop: "0.5rem", marginLeft: "2rem" }}>
                        <h4 style={{ color: "#FFFF" }}>
                            $<CountUp end={2324.00} duration={2} style={{ fontWeight: "bold" }} /> <ArrowDownwardIcon style={{ color: "#C1761F", backgroundColor: "#E3BF91", transform: "rotate3d(1, 1, 1, 45deg)", transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;", borderRadius: "50%" }} />
                        </h4>
                        <h6 style={{ color: "#DDBF91", fontWeight: "bold" }}>Total Income</h6>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default TotalIncomeLightCard;
