import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Button,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BirdInterface } from '../../../models/Bird';
import WaveImg from '../../../assets/img/landing-img/wave.png';
import ApiService from '../ApiViewService';

interface BirdSelectionPopupProps {
    open: boolean;
    onClose: () => void;
    birds: BirdInterface[] | null;
    onBirdSelect: (bird: BirdInterface) => void;
}

const APISERVICE = new ApiService

const BirdSelectionPopup: React.FC<BirdSelectionPopupProps> = ({
    open,
    onClose,
    birds,
    onBirdSelect,
}) => {
    const [birdList1, setBirdList1] = React.useState<BirdInterface[] | null>(null);
    const [birdList2, setBirdList2] = React.useState<BirdInterface[] | null>(null);


    

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Select a Bird</DialogTitle>
            <DialogContent>
                <List>
                    {birds ? birds.map((bird) => (
                        <ListItem key={bird.productID} button onClick={() => onBirdSelect(bird)}>
                            <Card variant="outlined" style={{ width: '100%', height: '180px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <CardContent>
                                            <Typography variant="h6">{bird.productName}</Typography>
                                            <div>
                                                <Typography variant="body2">Age: {bird.age}</Typography>
                                                <Typography variant="body2">
                                                    Gender: {bird.gender ? 'Male' : 'Female'}
                                                </Typography>
                                                <Typography variant="body2">Type: {bird.typeOfBirdID}</Typography>
                                                <Typography variant="body2">Price: {bird.price}</Typography>
                                                <Typography variant="body2">Fertility: {bird.fertility}</Typography>
                                            </div>
                                        </CardContent>
                                    </div>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={bird.images[0]}
                                            alt={bird.productName}
                                            style={{ width: '250px', height: '180px', borderRadius: '0' }}
                                        />
                                    </ListItemAvatar>
                                </div>
                            </Card>
                        </ListItem>
                    )): <Typography>Do not have the possible bird</Typography>}
                </List>
                <Button onClick={onClose} color="primary" variant="contained">
                    Cancel
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default BirdSelectionPopup;


