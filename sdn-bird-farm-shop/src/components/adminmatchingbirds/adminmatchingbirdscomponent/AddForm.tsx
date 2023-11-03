import React, { useState, ChangeEvent, FormEvent } from 'react';
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

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
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
                'You have created a new matching record!!!',
                'success'
            );
            // Wait for 3 seconds (3000 milliseconds) and then reload the page
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire(
                'Created Fail!',
                'Cannot create a new matching record.',
                'error'
            );
        }
    };

    return (
        <Box>
            <Typography variant="h5" align="center">
                Add Matching Record
            </Typography>
            <IconButton
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={closeCard}
            >
                <CloseIcon />
            </IconButton>
            <Box height={50} />
            <form onSubmit={handleSubmit}>
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
                    <Button type="submit" style={{ color: "#C77E23" }}>Add Matching Record</Button>
                </div>
            </form>
        </Box>
    );
}

export default AddForm;
