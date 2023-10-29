import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

interface OrderDetailProps {
  orderData: {
    orderID: number;
    customerID: number;
    customerPhone: string;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    note: string;
    orderAmount: number;
    orderDate: Date | null;
    productList: {
      productID: string;
      productName: string;
      price: number;
      description: string;
      typeOfProduct: string;
      images: string[];
      feedback: string;
      productStatus: string;
      rating: number;
      quantity: number;
    }[];
  };
}

const OrderdetailComponent: React.FC<OrderDetailProps> = ({ orderData }) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Order Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Order ID" secondary={orderData.orderID} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Customer Name" secondary={orderData.customerName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Customer Phone" secondary={orderData.customerPhone} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Customer Email" secondary={orderData.customerEmail} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Customer Address" secondary={orderData.customerAddress} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Order Amount" secondary={`$${orderData.orderAmount}`} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Order Date"
                  secondary={orderData.orderDate ? orderData.orderDate.toDateString() : 'N/A'}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Note" secondary={orderData.note} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Product List
          </Typography>
          {orderData.productList.map((product, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.images[0]} // Display the first image
                alt={`Product ${index + 1} Image`}
              />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText primary="Product Name" secondary={product.productName} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Price" secondary={`$${product.price}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Description" secondary={product.description} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Type of Product" secondary={product.typeOfProduct} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Product Status" secondary={product.productStatus} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Rating" secondary={`${product.rating} stars`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Quantity" secondary={product.quantity} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderdetailComponent;
