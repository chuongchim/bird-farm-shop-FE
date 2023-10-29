import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ApiService from '../../../utils/ApiService';
import { Grid, TextField, Typography } from '@mui/material';

const APISERVICE = new ApiService


const VoucherSelectComponent = () => {
  const [open, setOpen] = useState(true); // State variable to control the dialog
  const [voucherList, setVoucherList] = useState([])


  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleVoucherSelect = (event: any) => {
    // Handle the selected voucher
    console.log(`Selected Voucher: ${event.target.value}`);
  };

  useEffect(() => {
    APISERVICE.getData('voucher/getAllVoucher')
      .then(data => {
        setVoucherList(data)
      })
  }, [])

  return (
    <>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Select a Voucher</DialogTitle>
        <DialogContent>
          {voucherList.map((item: any) => (
            <MenuItem disabled={item.voucherStatus !== 'AVAILABLE' && true} value="voucher1" onClick={handleVoucherSelect}>
              <Typography>{item.voucherName}</Typography> 
              <span>Value: {item.value}</span>
              <span>Start Date: {item.startDate} - {item.endDate}</span>
            </MenuItem>
          ))}

          {/* Add more vouchers as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VoucherSelectComponent;
