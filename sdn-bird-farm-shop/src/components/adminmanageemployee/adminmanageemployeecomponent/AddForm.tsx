import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";

interface AddFormProps {
    closeCard: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ closeCard }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    const handleSubmit = async () => {
        const newUser = { name, email, address };
        try {
            const response = await fetch('https://641140292e340b45b13fd8d5.mockapi.io/api/v1/hello', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) {
                throw new Error('Error creating user');
            }
            Swal.fire(
                'Created Success!',
                'You has been created a new employee!!!',
                'success'
            );
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire(
                'Created Fail!',
                'Can not created a new employee.',
                'error'
            );
        }
    };

    return (
        <Box>
            <Typography variant="h5" align="center">
                ADD Employee
            </Typography>
            <IconButton
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={closeCard}
            >
                <CloseIcon />
            </IconButton>
            <Box height={50} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outline-basic" label="Name" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={name} onChange={handleNameChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outline-basic" label="Age" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={email} onChange={handleEmailChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outline-basic" label="Address" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={address} onChange={handleAddressChange} />
                </Grid>
            </Grid>
            <div onClick={closeCard} style={{ textAlign: "center", alignItems: "center", marginTop: "3rem" }}>
                <Button onClick={handleSubmit} style={{ color: "#C77E23" }}>ADD Employee</Button>
            </div>
        </Box>
    );
}

export default AddForm;