import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import Swal from "sweetalert2";
import Grid from '@mui/material/Grid';
import { ChangeEvent, MouseEvent } from 'react';
import ApiService from '../../../../utils/ApiService';
import { basePonitUrl, crossUrl, url } from '../../../../api/ApiConfig';
import { Typography } from '@mui/material';
import UploadImgWidget from '../../../../utils/UploadImgWidget';
import axios from 'axios';




const APISERVICE = new ApiService
interface addFormProps {
    closeCard: () => void;
}

const AddFormTypeOfBird: React.FC<addFormProps> = ({ closeCard }) => {
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


    const handleSubmit = async () => {

        APISERVICE.postData('typeOfBird/addTypeOfBird', formData)
            .then((res: any) => {
                console.log('asasasasasas: ', res);
                if (res.message === 'Success') {
                    sessionStorage.setItem('obj', JSON.stringify(formData));
                    Swal.fire(
                        'Add Type Of Bird Success!',
                        'Your Type has been updated!',
                        'success'
                    );
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                }
            })

            .catch((err) => {
                console.error('Error:', err);
            });

    };



    return (
        <Box>
            <Typography variant="h5" align="center">
                Add Type Of Bird
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
                    <TextField
                        id="outline-basic"
                        label="Type Name"
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: "100%" }}
                        name="typeName"
                        value={formData.typeName}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outline-basic"
                        label="Quantity"
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: "100%" }}
                        name="quantity"
                        value={0}
                        onChange={handleFormChange}
                    />
                </Grid>


            </Grid>
            <div onClick={closeCard} style={{ textAlign: "center", alignItems: "center", marginTop: "3rem" }}>
                <Button onClick={handleSubmit} style={{ color: "#C77E23" }}>Submit</Button>
            </div>
        </Box>
    );
}

export default AddFormTypeOfBird;
