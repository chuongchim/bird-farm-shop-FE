import React, { useState, useEffect } from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    Typography,
    Button,
    Link
} from '@mui/material';
import { NavLink } from 'react-router-dom';

interface userProps {
    userId: string
}

const OrderListComponent: React.FC<userProps> = ({ userId }) => {
    
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/v1/order/user/${userId}`)
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error('Error fetching orders: ', error));
    }, [userId]);

    return (
        <div>
            <Typography variant="h4">User Orders</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Customer Email</TableCell>
                            <TableCell>Order Amount</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Product List</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order: any) => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{order.customerEmail}</TableCell>
                                <TableCell>${order.amount}</TableCell>
                                <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                                <TableCell sx={{color: order.orderStatus === "Pending" ? '#C40000' : "#199308"}}>{order.orderStatus}</TableCell>
                                <TableCell>
                                    <ul>
                                        {order.productList.map((product: any, index: number) => (
                                            <li key={product._id}>
                                                <p>{product._id}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>
                                       <Link href={'/order/' + `${order._id}`}>Detail</Link>     
                                </TableCell>
                               <TableCell>
                                <Button>
                                    
                                </Button>
                               </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default OrderListComponent;
