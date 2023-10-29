import React from 'react';
import { Box, Card } from "@mui/material";
import BirdListCRUDTable from "./AdminManageTypeOfBirdList/TypeOfBirdListCRUDTable";
import MenuAdmin from '../../page/menu/Menu';

const ManageTypeOfBirdList: React.FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 0, p: 3 }}>
                <MenuAdmin />
            </Box>
            <Card sx={{ flexGrow: 1, p: 2 }} style={{ marginTop: '5rem' }}>
                <Box p={2} flexGrow={1}>
                    <BirdListCRUDTable />
                </Box>
            </Card>
        </Box>
    );
}

export default ManageTypeOfBirdList;
