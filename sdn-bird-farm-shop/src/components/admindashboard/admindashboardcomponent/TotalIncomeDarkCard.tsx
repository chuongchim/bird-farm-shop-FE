import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CountUp from 'react-countup';

const TotalIncomeDarkCard: React.FC = () => {
    return (
        <Card style={{ backgroundColor: "#135152", height: "5.5rem", marginTop: "3rem" }}>
            <CardContent>
                <div style={{ display: "flex" }}>
                    <ViewTimelineIcon style={{ backgroundColor: "#0C3E3F", borderRadius: "20%", padding: "5px", color: "#FFFF" }} />
                    <div style={{ marginTop: "0.5rem", marginLeft: "2rem" }}>
                        <h4 style={{ color: "#FFFF" }}>
                            $<CountUp end={5000} duration={2} style={{ fontWeight: "bold" }} /> <ArrowDownwardIcon style={{ color: "#215C5D", backgroundColor: "#8BACAD", transform: "rotate3d(1, 1, 1, 45deg)", transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;", borderRadius: "50%" }} />
                        </h4>
                        <h6 style={{ color: "#8BACAD", fontWeight: "bold" }}>Total Income</h6>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default TotalIncomeDarkCard;
