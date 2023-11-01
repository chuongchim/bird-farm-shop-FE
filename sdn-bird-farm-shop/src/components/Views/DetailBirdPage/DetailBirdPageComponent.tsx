import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { BirdInterface, TypeOfBirdInterface } from '../../../models/Bird';
import HeaderComponent from '../../Common/Header/HeaderComponent';
import { CardActions, Chip, Divider, IconButton, List, ListItem, ListItemText } from '@mui/material';
import FooterComponent from '../../Common/Footer/FooterComponent';
import bird1 from '../../../assets/img/Các loài chim/Chim Khướu/Chim Khướu (1).jpg'
import bird2 from '../../../assets/img/Các loài chim/Chim Khướu/Chim Khướu (2).jpg'

import bird3 from '../../../assets/img/Các loài chim/Chim Khướu/Chim Khướu (3).jpg'
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import './DetailBirdPageComponent.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MessageIcon from '@mui/icons-material/Message';
import { emphasize, styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import imagae from '../../../assets/img/Các loài chim/Chim Bạc Má/Chim Bạc Má (1).jpg'
import { basePonitUrl } from '../../../api/ApiConfig';
import { useParams } from 'react-router-dom';
import ApiService from '../../../utils/ApiService';


// or

const APISERVICE = new ApiService
const img: string[] = [imagae]

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        fontSize: '15px',
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
}) as typeof Chip;

interface DetailBirdSelectProps {
    birdId: string
}

const DetailBirdPageComponent: React.FC<DetailBirdSelectProps> = ({ birdId }) => {

    const { productID } = useParams();
    // const bird = sampleBird
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [bird, setBird] = React.useState<BirdInterface>();
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [dataTOB, setDataTOB] = useState<TypeOfBirdInterface[]>([]);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handlePreviousImage = () => {
        if (bird) {

            if (selectedImageIndex > 0) {
                setSelectedImageIndex(selectedImageIndex - 1);
                setSelectedImage(bird.images[selectedImageIndex - 1]);
            }
        }
    };

    const handleNextImage = () => {
        if (bird) {
            if (selectedImageIndex < bird.images.length - 1) {
                setSelectedImageIndex(selectedImageIndex + 1);
                setSelectedImage(bird.images[selectedImageIndex + 1]);
            }
        }
    };

    const changeToDetail = (id: string) => {
        window.location.href = '/bird/detail/' + `${id}`;
    }




    React.useEffect(() => {
        APISERVICE.getData(basePonitUrl.birds + '/getBirdByID/' + productID)
            .then((data: BirdInterface) => {
                setBird(data);
                console.log(data);
                setSelectedImage(data.images[0]);
            });

    }, [birdId]);

    React.useEffect(() => {
        APISERVICE.getData('typeOfBird/getAllTypeOfBird')
            .then((data: TypeOfBirdInterface[]) => {
                setDataTOB(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [])

    return (
        <div className='detail-bird-page-component'>
            <HeaderComponent></HeaderComponent>
            <Container className='detail-bird-page-component-containter' sx={{ marginTop: '250px' }}>
                <Grid className='detail-bird-page-component-detail' container spacing={2}>
                    {bird && bird.productID ? (
                        <>
                            <Grid item xs={12} md={9} sx={{ paddingTop: '100px' }}>
                                <div className="bird-page-component--show-chip-filter">
                                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                                        {/* {generateBreadcrumbs()} */}
                                    </Breadcrumbs>
                                </div>
                                <Typography variant='h5'>{bird.productName}</Typography>
                                <Paper elevation={3} className="selected-image-container">
                                    <IconButton className='icon-prev-img' onClick={handlePreviousImage}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <img
                                        src={selectedImage}
                                        alt="Bird"
                                        className="selected-image"
                                    />
                                    <IconButton className='icon-next-img' onClick={handleNextImage}>
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </Paper>
                                <div className="image-slider">
                                    {bird.images.map((image, index) => (
                                        <Paper
                                            key={index}
                                            elevation={2}
                                            className={`slider-image ${selectedImage === image ? 'selected' : ''
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`Bird ${index}`}
                                                onClick={() => handleImageClick(image)}
                                            />
                                        </Paper>
                                    ))}
                                </div>
                                <div>
                                    <Typography variant="h4">{bird.productName}</Typography>
                                    <Divider />
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <span role="img" aria-label="Type">
                                                    🦜
                                                </span>
                                            </ListItemIcon>
                                            <ListItemText primary={`Type: ${bird.typeOfBirdID}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <span role="img" aria-label="Age">
                                                    🕒
                                                </span>
                                            </ListItemIcon>
                                            <ListItemText primary={`Age: ${bird.age} years`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <span role="img" aria-label="Gender">
                                                    {bird.gender ? '♂️' : '♀️'}
                                                </span>
                                            </ListItemIcon>
                                            <ListItemText primary={`Gender: ${bird.gender ? 'Male' : 'Female'}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <span role="img" aria-label="Price">
                                                    💰
                                                </span>
                                            </ListItemIcon>
                                            <ListItemText primary={`Price: $${bird.price}`} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <Typography>Description: </Typography>
                                            <div>
                                                <ListItemText primary={bird.description} />
                                            </div>
                                        </ListItem>
                                    </List>

                                </div>
                                <Divider />
                                <Typography variant='h6' style={{ fontWeight: 'bold' }}>Suggest bird</Typography>
                                <div className="detail-bird-component--card-container">
                                    <Grid style={{ width: '2000px' }} container spacing={3}>
                                        {bird && bird.productID && (
                                            <Grid item xs={12} sm={6} md={3} >
                                                <Card className='detail-bird-component--card'>
                                                    <div onClick={() => changeToDetail(bird.productID)} style={{ display: 'flex', flexDirection: 'row', fontSize: '11px' }}>
                                                        <CardContent>
                                                            <CardMedia
                                                                component="img"
                                                                height="100"
                                                                image={bird.images[0]}
                                                                style={{ flex: '0 0 auto', width: '100%' }}
                                                            />
                                                        </CardContent>
                                                        <CardContent style={{ flex: '1 1 auto', padding: '0px' }}>
                                                            <Typography variant="h6" style={{ fontSize: '15px', fontWeight: 'bold' }} gutterBottom>
                                                                {bird.productName}
                                                            </Typography>
                                                            <div style={{ display: 'inline-block', width: '70px', textAlign: 'center', backgroundColor: 'black' }}>
                                                                <Typography variant="h5" style={{ display: 'inline', fontSize: '11px', color: 'white' }}>
                                                                    ${bird.price}
                                                                </Typography>
                                                            </div>
                                                            <Typography variant="body2" style={{ fontSize: '11px' }} color="textSecondary">
                                                                Type: {

                                                                    dataTOB.map((item: TypeOfBirdInterface) => {
                                                                        if (item.typeID === bird.typeOfBirdID) {
                                                                            return (
                                                                                item.typeName
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </Typography>
                                                            <Typography variant="body2" style={{ fontSize: '11px' }} color="textSecondary">
                                                                Age: {bird.age}
                                                            </Typography>
                                                            <Typography variant="body2" style={{ fontSize: '11px' }} color="textSecondary">
                                                                Gender: {bird.gender ? 'Male' : 'Female'}
                                                            </Typography>
                                                        </CardContent>
                                                    </div>
                                                </Card>

                                            </Grid>
                                        )}

                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <div className='price-container'>
                                    <div className='price-container--sub1'>

                                    </div>
                                    <div className='price-container--sub2'>
                                        <Typography variant='h5' >{bird.price}$</Typography>
                                    </div>
                                </div>
                                <div>
                                    <Button className='button-add-to-card' variant="contained" color="primary">
                                        <AddShoppingCartIcon style={{ marginRight: '10px' }}></AddShoppingCartIcon>
                                        Add to Cart
                                    </Button>
                                    <Button className='button-add-to-card' variant="contained" color="primary">
                                        <MessageIcon style={{ marginRight: '10px' }}></MessageIcon>
                                        Message
                                    </Button>
                                    <Button className='button-add-to-card' variant="contained" color="primary">
                                        <FavoriteIcon style={{ marginRight: '10px' }}></FavoriteIcon>
                                        Matching
                                    </Button>

                                </div>
                                <div style={{ marginTop: '50px' }}>
                                    <Card className='detail-bird-page--banner'>
                                        <CardContent>

                                        </CardContent>
                                    </Card>
                                </div>
                                <div style={{ marginTop: '50px' }}>
                                    <Card className='detail-bird-page--banner'>
                                        <CardContent>

                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>
                        </>
                    ) : (
                        <Typography>
                            Product is empty!
                        </Typography>

                    )}
                </Grid>
            </Container>
            <FooterComponent></FooterComponent>
        </div>
    );
};

export default DetailBirdPageComponent;