import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface EditFormProps {
    fid: {
        id: number;
        fullname: string;
        email: string;
        dob: string;
    };
    editClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ fid, editClose }) => {
    const [fullname, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setAddress] = useState("");

    useEffect(() => {
        setName(fid.fullname);
        setEmail(fid.email);
        setAddress(fid.dob);
    }, [fid]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    const handleSubmit = () => {
        const obj = { fullname, email, dob };
        fetch(`https://641140292e340b45b13fd8d5.mockapi.io/api/v1/hello/${fid.id}`, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": 'http://localhost:3000/employee',
                "Accept": "*/*",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify(obj),
            mode: 'cors'
        }).then((res) => {
            sessionStorage.setItem("obj", JSON.stringify(obj));
            Swal.fire(
                'Edit Bird Success!',
                'Your bird have been updated yet!!!',
                'success'
            );
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <Box>
            <Typography variant="h5" align="center">
                Edit Bird
            </Typography>
            <IconButton
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={editClose}
            >
                <CloseIcon />
            </IconButton>
            <Box height={50} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outline-basic" label="Name" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={fullname} onChange={handleNameChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outline-basic" label="Age" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={email} onChange={handleEmailChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outline-basic" label="Address" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={dob} onChange={handleAddressChange} />
                </Grid>
            </Grid>
            <div onClick={editClose} style={{ textAlign: "center", alignItems: "center", marginTop: "3rem" }}>
                <Button onClick={handleSubmit} style={{ color: "#C77E23" }}>Submit</Button>
            </div>
        </Box>
    );
}

export default EditForm;
