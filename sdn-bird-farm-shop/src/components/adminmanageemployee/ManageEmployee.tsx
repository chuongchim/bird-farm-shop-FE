import React from 'react';
import { Box, Card, Grid } from '@mui/material';
import MenuAdmin from '../page/menu/Menu';
import EmployeeListCRUDTable from './adminmanageemployeecomponent/EmployeeListCRUDTable';

const ManageEmployee: React.FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 0, p: 3 }}>
                <MenuAdmin />
            </Box>
            <Card sx={{ flexGrow: 1, p: 2 }} style={{ marginTop: '5rem' }}>
                <EmployeeListCRUDTable />
            </Card>
        </Box>
    );
}

export default ManageEmployee;
