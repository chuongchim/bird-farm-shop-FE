import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CountUp from 'react-countup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import "./Admin.css"

const TotalEarningCard: React.FC = () => {
    return (
        <Card style={{ backgroundColor: "rgb(193, 118, 31)", height: "12rem", marginTop: "3rem" }}>
            <CardContent style={{ display: "flex" }}>
                <div>
                    <PhotoCameraFrontIcon style={{ backgroundColor: "#B36115", borderRadius: "20%", padding: "5px", color: "#FFFF" }} />
                    <h1 style={{ color: "#FFFF" }}>
                        $<CountUp end={500} duration={2} style={{ fontWeight: "bold" }} /> <ArrowUpwardIcon style={{ color: "#C1761F", backgroundColor: "#E3BF91", transform: "rotate3d(1, 1, 1, 45deg)", transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;", borderRadius: "50%" }} />
                    </h1>
                    <p style={{ color: "#DDBF91", fontWeight: "bold" }}>Total Earning</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default TotalEarningCard;
