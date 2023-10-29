import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    TextField,
    Grid,
    Typography,
    RadioGroup,
    Radio,
    FormControlLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    TextareaAutosize
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import UploadImgWidget from '../../../utils/UploadImgWidget';
import ApiService from '../../../utils/ApiService';
import { BirdInterface, TypeOfBirdInterface } from '../../../models/Bird';
import { basePonitUrl } from '../../../api/ApiConfig';
import { Label } from '@mui/icons-material';
import { Container } from '@mui/system';
import '../ManageBirdList.css'

const APISERVICE = new ApiService;

    // RED,
    // BLUE,
    // GREEN,
    // BLACK,
    // WHITE,
    // ORANGE,
    // SILVER,
    // PURPLE,
    // BROWN,
    // YELLOW

interface AddFormProps {
    closeCard: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ closeCard }) => {
    const [formData, setFormData] = useState({
        productName: "",
        age: 0,
        typeOfBirdID: 'B001',
        images: [] as string[],
        gender: true, // Default gender value (you can change this)
        Status: true,
        description: "",
        fertility: true,
        feedback: "",
        rating: 5,
        price: 0, // Default price value (you can change this)
        typeOfProduct: 'BIRD',
        quantity: 1,
        healthcareProfessionalID: 2,
        birdColor: "Yellow",
        breedingTimes: 0
    });

    const [uploadedImageUrls, setUploadedImageUrls] = useState<string>();
    const [imgArray, setImgArray] = useState<string[]>([]);
    const [dataTOB, setDataTOB] = useState<TypeOfBirdInterface[]>([]);
    const [dataHealthCare, setDataHealthCare] = useState<[]>([]);

    const handleImagesUpload = (imageUrls: string) => {
        imgArray.push(imageUrls);
        setImgArray(imgArray);

        setUploadedImageUrls(imageUrls);
        if (imageUrls) {
            setFormData({
                ...formData,
                images: imgArray,
            });
        };
    };

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormTypeOfBirdChange = (event: SelectChangeEvent<unknown>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormHealthCare = (event: SelectChangeEvent<unknown>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        console.log('Form Data:', JSON.stringify(formData));
        APISERVICE.postData(basePonitUrl.birds + '/addBird', formData)
            .then((res: any) => {
                console.log("âsasasas ", res);
                if (res.message === 'Success') {
                    sessionStorage.setItem('obj', JSON.stringify(formData));
                    Swal.fire(
                        'Add  Bird Success!',
                        'Your Bird has been updated!',
                        'success'
                    );
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                }
            })
    };

    useEffect(() => {
        APISERVICE.getData('typeOfBird/getAllTypeOfBird')
            .then((data: TypeOfBirdInterface[]) => {
                setDataTOB(data);
            })
            .catch((error) => console.error('Error fetching data:', error));

        APISERVICE.getData('admin/getAllHealthcares')
            .then((data) => {
                setDataHealthCare(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (

        <div className='add-from-bird-list' style={{ height: '500px', overflowY: 'auto' }}>
            <div>
                <Typography variant="h5" align="center">
                    Add Bird
                </Typography>
                <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={closeCard}>
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
                            sx={{ minWidth: '100%' }}
                            name="productName"
                            value={formData.productName}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outline-basic"
                            label="Age"
                            type="number"
                            minRows={0}
                            maxRows={15}
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: '100%' }}
                            name="age"
                            value={formData.age}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Gender</Typography>
                        <RadioGroup name="gender" value={formData.gender} onChange={handleFormChange}>
                            <FormControlLabel
                                value={true}
                                control={<Radio />}
                                label="Male"
                                sx={{ float: 'left' }}
                            />
                            <FormControlLabel
                                value={false}
                                control={<Radio />}
                                label="Female"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            id="typeOfBird-select"
                            placeholder='TypeOfBird'
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: '100%' }}
                            name="typeOfBirdID"
                            value={formData.typeOfBirdID}
                            onChange={handleFormTypeOfBirdChange}
                        >
                            {dataTOB.map((item) => (
                                <MenuItem key={item.typeID} value={item.typeID}>
                                    {item.typeName}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outline-basic"
                            label="Price"
                            variant="outlined"
                            type="number"
                            size="small"
                            sx={{ minWidth: '100%' }}
                            name="price"
                            minRows={100000}
                            maxRows={25000000}
                            value={formData.price}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            id="description"
                            aria-label="Description"
                            name="description"
                            placeholder='Description'
                            value={formData.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFormChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UploadImgWidget onImagesUpload={handleImagesUpload} />
                        {imgArray.length > 0 && (
                            <div>
                                <Grid item xs={12}>
                                    <Typography>Uploaded Image URLs:</Typography>
                                </Grid>
                                {imgArray.map((url, index) => (
                                    <img
                                        style={{ width: '50px', height: '50px', float: 'left', marginRight: '5px' }}
                                        src={url}
                                        alt={`Uploaded Image ${index}`}
                                    />
                                ))
                                }
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            id="healthcareProfessionalID"
                            label="Healthcare Professional"
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: '100%' }}
                            name="healthcareProfessionalID"
                            value={formData.healthcareProfessionalID}
                            onChange={handleFormHealthCare}
                        >
                            {dataHealthCare.map((item: any) => (
                                <MenuItem key={item.userID} value={item.userID}>
                                    {item.firstName + ' ' + item.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <div
                    onClick={closeCard}
                    style={{ textAlign: 'center', alignItems: 'center', marginTop: '3rem' }}
                >
                    <Button onClick={handleSubmit} style={{ color: '#C77E23' }}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddForm;
