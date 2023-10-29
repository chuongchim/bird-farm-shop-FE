import React, { useEffect, useState } from 'react';
import VoucherSelect from './VoucherSelectComponent';
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
import VoucherSelectComponent from './VoucherSelectComponent';
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
    const [cartData, setCartData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingFee] = useState(10); // You can set your own shipping fee value
    const [voucher, setVoucher] = useState();
    const [selectedVoucher, setSelectedVoucher] = useState(0);
    const [showVoucherDialog, setShowVoucherDialog] = useState(false); // State to control the visibility of the voucher selection component
    const [selectedItems, setSelectedItems] = useState([]);
    const [voucherList, setVoucherList] = useState([]);
    const [numberOfProduct, setNumberOfProduct] = useState(0);
    const [listProduct, setListProduct] = useState<string[]>([]);
    const [listVoucher, setListVoucher] = useState<number[]>([]);
    const [selectedVoucherList, setSelectedVoucherList] = useState<Object[]>([]);
    const [mergedCartList, setMergedCartList] = useState<Object[]>([])
    const arrayProduct: string[] = []

    const handleSelectVoucher = () => {
        setShowVoucherDialog(true); // Show the voucher selection component
    };

    const handleCloseVoucherDialog = () => {
        setShowVoucherDialog(false); // Close the voucher selection component
    };


    // Load cart data from local storage on component mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartData(JSON.parse(storedCart));
        }
    }, []);

    // Create a new array with merged items by productID
    const mergedCart = cartData.reduce((acc: any, item: any) => {
        const existingItem = acc.find((accItem: any) => {
            if (accItem.typeOfProduct != 'bird' && accItem.productID === item.productID)
                return true
        });
        if (existingItem) {
            console.log("existingItem: ", existingItem);
            // Item with the same productID already exists; update its quantity
            existingItem.quantity += 1;
            // setCartData(...existingItem, existingItem.quantity)
        } else {
            // Item doesn't exist in the merged cart; add it
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

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
        for (const product of mergedCart) {
            total += product.price * product.quantity;
        }
        return total;
    };

    const handleCheckboxChange = (productId: string) => {
        // Find the selected item by productId
        const selectedItem = cartData.find((item: any) => item.productID === productId);
        if (selectedItem) {

            if (selectedItems.includes(selectedItem)) {
                // If it's already selected, remove it
                setSelectedItems((prevSelectedItems) =>
                    prevSelectedItems.filter((item) => item !== selectedItem)
                );
            } else {
                // If it's not selected, add it
                listProduct.push(productId)
                setSelectedItems((prevSelectedItems) => [...prevSelectedItems, selectedItem]);
            }
        };

        console.log(selectedItem);

    }


    useEffect(() => {
        const newTotalPrice = selectedItems.reduce(
            (total, selectedItem: any) => total + selectedItem.price,
            0
        );
        setTotalPrice(newTotalPrice);
    }, [selectedItems]);

    useEffect(() => {
        APISERVICE.getData('voucher/getAllVoucher')
            .then(data => {
                setVoucherList(data)
            })

        console.log("mergedCart: ", typeof (mergedCart));
    }, [])

    const SetVoucherSelected = (item: any) => {
        selectedVoucherList.push(item)
        setSelectedVoucher(item.voucherID)
        listVoucher.push(item.voucherID)
        console.log(listVoucher);
        console.log(selectedVoucherList);

    }

    useEffect(() => {
        console.log(listProduct);

    }, [selectedItems])

    const handleCheckOut = () => {
        sessionStorage.setItem("listProduct", JSON.stringify(listProduct))
        sessionStorage.setItem("listVoucher", JSON.stringify(listVoucher))
        Swal.fire(
            'Check out  Success!',
            'Your product has been Order !!!',
            'success'
        );
        setTimeout (() => {

            window.location.href = '/order-page'
        }, 1000)
    }

    return (
        <div className='cart-component'>
            <HeaderComponent></HeaderComponent>
            <Container sx={{ marginTop: '250px' }}>
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
                                        {mergedCart.length > 0 ? mergedCart.map((item: any, index: number) => (

                                            <>
                                                <Grid container spacing={4} alignItems="center">
                                                    <Grid item xs={12} sm={1}>
                                                        <Checkbox
                                                            // checked={selectedItems.includes(item)}
                                                            onChange={() => handleCheckboxChange(item.productID)}
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
                                                            {item.productName}
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
                                        <Typography variant="subtitle1" style={{ textTransform: "uppercase", marginBottom: "0.5rem" }}>
                                            Vouchers
                                        </Typography>
                                        <div style={{ marginBottom: "1rem" }}>
                                            <Select
                                                value={selectedVoucher}
                                                label="Select Voucher"
                                                sx={{ width: '100%' }}
                                            >
                                                {voucherList.map((item: any, index) => (
                                                    <MenuItem onClick={() => { SetVoucherSelected(item) }} key={index} value={item.voucherName}>
                                                        <Card

                                                            style={{
                                                                width: '100%',
                                                                border: '1px solid #ccc',
                                                                padding: '10px',
                                                                marginBottom: '10px',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                            }}
                                                        >
                                                            <CardHeader>
                                                                <Typography style={{ fontSize: '15px', fontWeight: 'bold' }} variant="subtitle1">{item.voucherName}</Typography>
                                                            </CardHeader>

                                                            <span style={{ fontSize: '12px' }}>Value: {item.value}</span>
                                                            <span style={{ fontSize: '12px' }}>
                                                                Start Date: {item.startDate}
                                                            </span>
                                                            <span style={{ fontSize: '12px' }}>
                                                                End Date: {item.endDate}
                                                            </span>
                                                        </Card>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                        <hr style={{ margin: "1rem 0" }} />
                                        {selectedVoucherList.length > 0 ?
                                            selectedVoucherList.map((item: any, index) => (
                                                <Card

                                                    style={{
                                                        width: '100%',
                                                        border: '1px solid #ccc',
                                                        padding: '10px',
                                                        marginBottom: '10px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    <CardHeader>
                                                        <Typography style={{ fontSize: '15px', fontWeight: 'bold' }} variant="subtitle1">{item.voucherName}</Typography>
                                                    </CardHeader>

                                                    <span style={{ fontSize: '12px' }}>Value: {item.value}</span>

                                                </Card>
                                            )) : (<></>)}
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

