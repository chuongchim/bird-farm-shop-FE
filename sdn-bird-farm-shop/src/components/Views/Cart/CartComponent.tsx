import React, { useEffect, useState } from 'react';
import { BirdInterface } from '../../../models/Bird';
import { ProductInterface } from '../../../models/Products';
import HeaderComponent from '../../Common/Header/HeaderComponent';
import { Button, Card, CardContent, Grid, Input, Link } from '@mui/material';
import FooterComponent from '../../Common/Footer/FooterComponent';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { CardHeader } from 'react-bootstrap';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ApiService from '../../../utils/ApiService';
import {
    Remove as RemoveIcon,
    Add as AddIcon,
    Close as CloseIcon,
    KeyboardArrowLeft as BackIcon,
} from "@mui/icons-material";

import {
    FormControl,
    InputAdornment,
    Container

} from "@mui/material";
import OrderPageComponent from '../../Order/OrderPage/OrderPageComponent';
import Swal from 'sweetalert2';


const APISERVICE = new ApiService

const CartComponent = () => {
    const [cartData, setCartData] = useState<BirdInterface[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingFee] = useState(1000); // You can set your own shipping fee value
    const [selectedItems, setSelectedItems] = useState<BirdInterface[]>([]);
    const [numberOfProduct, setNumberOfProduct] = useState(0);
    const [listProduct, setListProduct] = useState<string[]>([]);
    const [mergedCartList, setMergedCartList] = useState<Object[]>([])
    const arrayProduct: string[] = []
    const [checked, setChecked] = useState(false);

    // Load cart data from local storage on component mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            console.log(JSON.parse(storedCart));
            setCartData(JSON.parse(storedCart));
        }
    }, []);

    // Create a new array with merged items by productID


    const handleCheckout = () => {
        alert('Checkout functionality will be implemented here.');
    };

    const clickRemoveItem = (id: string) => {
        const updatedCart = cartData.filter((item: any) => item.productID !== id);
        console.log(updatedCart);
        setCartData(updatedCart);
        // Save the updated cartData to localStorage if needed
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const openRemoveDialog = () => {
        setOpenDialog(true);
    };

    const closeRemoveDialog = () => {
        setItemToRemove(null);
        setOpenDialog(false);
    };

    // Calculate the total price of products
    const calculateTotalPrice = () => {
        let total = 0;
        selectedItems.map((item: BirdInterface) => {
            total += item.price
        })

        return total;
    };

    const handleCheckboxChange = (productID: string) => {
        const isChecked = selectedItems.some(item => item._id === productID)

        const itemIndex = cartData.findIndex((item: BirdInterface) => item._id === productID);

        if (itemIndex !== -1) {
            const updatedSelectedItems: BirdInterface[] = [...selectedItems];

            if (updatedSelectedItems.includes(cartData[itemIndex])) {

                // Uncheck: Remove the item from selectedItems
                updatedSelectedItems.splice(updatedSelectedItems.indexOf(cartData[itemIndex]), 1);

                console.log("Remove: ", productID);
            } else {
                updatedSelectedItems.push(cartData[itemIndex]);

            }

            setSelectedItems(updatedSelectedItems);

        }
    };

    useEffect(() => {
        const totalPrice = calculateTotalPrice() + shippingFee;
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        // if (selectedItems.length === 1) {
        //     selectedItems.splice(selectedItems.indexOf(selectedItems[0]), 1);
        // }
        selectedItems.map((bird: BirdInterface, index: number) => {
            const updatedCart = [...selectedItems, bird];
            // setListProduct(updatedCart);
            console.log(updatedCart);

            const updateListId = [...listProduct, bird._id];
            setListProduct(updateListId);

        })

    }, [selectedItems]);


    // useEffect(() => {
    //     const newTotalPrice = selectedItems.reduce(
    //         (total, selectedItem: any) => total + selectedItem.price,
    //         0
    //     );
    //     setTotalPrice(newTotalPrice);
    // }, [selectedItems]);


    const handleCheckOut = () => {

        try {

            console.log(listProduct);
            sessionStorage.setItem("listProduct", JSON.stringify(listProduct))
            Swal.fire(
                'Check out  Success!',
                'Your product has been Order !!!',
                'success'
            );
            setTimeout(() => {

                window.location.href = '/order-page'
            }, 1000)
        }
        catch {
            Swal.fire(
                'Somthing wrong!',
                'Please check your products !!!',
                'error'
            );
            setTimeout(() => {

                window.location.href = '/order-page'
            }, 1000)
        }


    }

    return (
        <div className='cart-component'>
            <HeaderComponent></HeaderComponent>
            <Container sx={{ marginTop: '100' }}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className="h-100"
                >
                    <Grid item xs={12}>

                        <CardContent className="p-0">
                            <Grid container spacing={2}>
                                <Grid item lg={8}>
                                    <Box sx={{ p: 5 }}>
                                        <Grid
                                            container
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb={5}
                                        >
                                            <Typography variant="h4" fontWeight="bold">
                                                Shopping Cart
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary">
                                                {cartData.length} items
                                            </Typography>
                                        </Grid>
                                        <hr style={{ margin: "1rem 0" }} />
                                        {cartData.length > 0 ? cartData.map((item: any, index: number) => (

                                            <>
                                                <Grid container spacing={4} alignItems="center">
                                                    <Grid item xs={12} sm={1}>
                                                        <Checkbox
                                                            // checked={selectedItems.includes(item)}
                                                            onChange={() => handleCheckboxChange(item._id)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={2}>
                                                        <Card>
                                                            <img
                                                                src={item.images[0]}
                                                                alt="Cotton T-shirt"
                                                                style={{ width: "100%" }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <Typography variant="subtitle1" >
                                                            {item.birdName}
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {item.gender ? "Male" : "Female"}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={2} alignItems="center">
                                                        {
                                                            item.typeOfProduct != 'bird' ?
                                                                (
                                                                    <TextField
                                                                        id="filled-number"
                                                                        type="number"
                                                                        value={item.quantity}
                                                                        sx={{ width: '100px' }}
                                                                        InputProps={{
                                                                            inputProps: { min: 0 },
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                    <AddIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                        }}
                                                                    />
                                                                )
                                                                :
                                                                (
                                                                    <TextField
                                                                        disabled
                                                                        value={1}
                                                                        sx={{ width: '100px' }}
                                                                    ></TextField>
                                                                )
                                                        }


                                                    </Grid>
                                                    <Grid item xs={12} sm={2} sx={{ textAlign: "end" }}>
                                                        <Typography variant="subtitle1">{item.price}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={1} sx={{ textAlign: "end" }}>
                                                        <IconButton onClick={() => openRemoveDialog()}>
                                                            <DeleteIcon style={{ color: '#E9034F' }}></DeleteIcon>
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                                <Dialog
                                                    open={openDialog}
                                                    onClose={closeRemoveDialog}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">{"Remove Item from Cart"}</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Are you sure you want to remove this item from your cart?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={closeRemoveDialog} color="primary">
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                clickRemoveItem(item.productID);
                                                                closeRemoveDialog();
                                                            }}
                                                            color="primary"
                                                        >
                                                            Yes
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <hr style={{ margin: "1rem 0" }} />
                                            </>
                                        )) : (
                                            <Typography sx={{ textAlign: 'center' }}>Empty item.</Typography>
                                        )}

                                        {/* <hr style={{ margin: "1rem 0" }} /> */}
                                        <div className="pt-5">
                                            <Typography variant="subtitle1" className="mb-0">
                                                <a href="/" style={{ textDecoration: "none" }}>
                                                    <BackIcon />
                                                    Back to shop
                                                </a>
                                            </Typography>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item lg={4} className="bg-grey">
                                    <Box sx={{ p: 5 }}>
                                        <Typography variant="h4" fontWeight="bold" mb={5} mt={2}>
                                            Summary
                                        </Typography>
                                        <hr style={{ margin: "1rem 0" }} />
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                            <Typography variant="subtitle1" style={{ textTransform: "uppercase" }}>
                                                items
                                            </Typography>
                                            <Typography variant="h6">{calculateTotalPrice()} VND</Typography>
                                        </div>
                                        <Typography variant="subtitle1" style={{ textTransform: "uppercase", marginBottom: "0.5rem" }}>
                                            Shipping
                                        </Typography>
                                        <div style={{ marginBottom: "1rem" }}>
                                            <FormControl fullWidth variant="outlined" size="small">
                                                <TextField
                                                    style={{ width: "100%" }}
                                                    defaultValue={`${shippingFee}` + ' VND'}
                                                    disabled
                                                >
                                                </TextField>
                                            </FormControl>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
                                            <Typography variant="subtitle1" style={{ textTransform: "uppercase" }}>
                                                Total price
                                            </Typography>
                                            <Typography variant="h6">{calculateTotalPrice() + shippingFee} VND</Typography>
                                        </div>
                                        <Button onClick={handleCheckOut} sx={{ backgroundColor: '#E9034F' }} variant="contained" fullWidth>
                                            Check out
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>

                    </Grid>
                </Grid >
            </Container >


            <FooterComponent></FooterComponent>
        </div >
    );
};

export default CartComponent;

