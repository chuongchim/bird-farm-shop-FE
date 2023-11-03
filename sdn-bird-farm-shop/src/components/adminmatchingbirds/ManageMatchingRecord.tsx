import React from 'react';
import { Box, Card } from "@mui/material";
import MenuAdmin from "../page/menu/Menu";
// import MatchingRe from "./adminmatchingbirdscomponent/MatchingRecordsCRUDTable";
import MatchingRecordsCRUDTable from './adminmatchingbirdscomponent/MatchingRecordsCRUDTable';

const ManageMatchingRecord: React.FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 0, p: 3 }}>
                <MenuAdmin />
            </Box>
            <Card sx={{ flexGrow: 1, p: 2 }} style={{ marginTop: "5rem" }}>
                <MatchingRecordsCRUDTable />
            </Card>
        </Box>
    );
}

export default ManageMatchingRecord;
