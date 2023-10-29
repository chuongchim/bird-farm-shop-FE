import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BirdInterface, TypeOfBirdInterface } from "../../../../models/Bird";
import ApiService from "../../../../utils/ApiService";

const APISERVICE = new ApiService
interface EditFormProps {
    productId: TypeOfBirdInterface
    editClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ productId, editClose }) => {
    const [formData, setFormData] = useState({
        typeName: '',
        quantity: 0,
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = (id: string) => {
        APISERVICE.putData('typeOfBird/updateTypeOfBird/' + id, JSON.stringify(formData))              
            .then((data) => {
                if (data)
                Swal.fire(
                    'Edit Bird Success!',
                    'Your bird has been updated!',
                    'success'
                );
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            })
            .catch((err) => {
                Swal.fire(
                    'Error',
                    'Update fail',
                    'error'
                );
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
                    <TextField
                        id="outline-basic"
                        label="Name"
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: "100%" }}
                        name="productName"
                        value={formData.typeName}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outline-basic"
                        label="Age"
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: "100%" }}
                        name="age"
                        value={formData.quantity}
                        onChange={handleFormChange}
                    />
                </Grid>

            </Grid>
            <div onClick={editClose} style={{ textAlign: "center", alignItems: "center", marginTop: "3rem" }}>
                <Button onClick={()=>handleSubmit(productId.typeID)} style={{ color: "#C77E23" }}>Submit</Button>
            </div>
        </Box>
    );
}

export default EditForm;
