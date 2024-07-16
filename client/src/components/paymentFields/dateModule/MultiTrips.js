import React, { useState } from 'react';
import {
    Typography,
    Modal,
    Box,
    ListSubheader,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
} from '@mui/material';
import { DateRangeSharp, ExpandLess, ExpandMore, Inbox } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateTripModal from './CreateTripModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';

const style = {
    width: 900,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { id: 'action', label: 'Action', minWidth: 130 },
    { id: 'sr', label: 'Sr.', minWidth: 70 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'day', label: 'Day', minWidth: 100 },
    { id: 'country', label: 'Country', minWidth: 130 },
    { id: 'state', label: 'State', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'clientName', label: 'Client Name', minWidth: 100 },
    { id: 'purpose', label: 'Purpose', minWidth: 100 },
    { id: 'Remarks', label: 'Remarks', minWidth: 100 },
    // {
    //   id: 'population',
    //   label: 'Population',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },

    // {
    //   id: 'density',
    //   label: 'Density',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toFixed(2),
    // },
];


const MultiTrips = ({ open, handleClose, dateCount, dates }) => {
    const theme = useTheme();
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [EditModalOpen, setEditModalOpen] = useState(false);
    const [openDate, setOpenDate] = useState();
    const [index, setIndex] = useState();



    const handleClick = (index, date) => {
        setOpenDate(date)
        setIndex(index)
        setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    };

    const handleEditModalOpen = () => setEditModalOpen(true);


    const handleEditModalClose = () => setEditModalOpen(false);

    const createData = (name, calories, fat, carbs, protein) => {
        return { name, calories, fat, carbs, protein };
    };

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),

    ];

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(0.7px)', }}
        >
            <Box
                sx={{
                    mt: 5,
                    width: 1200,
                    height: 550,
                    bgcolor: 'background.paper',
                    border: '2px solid #666666',
                    borderRadius: 3,
                    boxShadow: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                    overflow: 'auto'
                }}
            >
                <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold' }}>
                    Plan For {dateCount} Days
                </Typography>
                <Box sx={{ height: 600, width: 1100 }}>

                    {dates.map((date, index) => (
                        <List
                            sx={{ width: '100%', maxWidth: 1100, bgcolor: 'background.paper', boxShadow: 2, borderRadius: 5, my: 0.5 }}
                            component="nav"
                        >
                            <ListItemButton onClick={() => handleClick(index, date)}>
                                <ListItemText key={index} primary={`Day ${index + 1}  ${date.format("DD-MM-YYYY")}`} />

                                <ListItemIcon onClick={handleEditModalOpen}>
                                    <AddCircleOutlineIcon />
                                </ListItemIcon>
                                <CreateTripModal open={EditModalOpen} handleClose={handleEditModalClose} dateCount={dateCount} day={index + 1} date={openDate} />
                            </ListItemButton>
                            <Collapse in={index === openDropdownIndex} timeout="auto" unmountOnExit>
                                <Box sx={{ p: 2, pt: 0.5 }}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <thead class="MuiTableHead-root css-1wbz3t9" sx={"background-color: black;"}>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </thead>
                                            <TableBody>
                                                {rows.map((row) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.Date }>
                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id} align={column.align} sx={{ py: '3px' }}>
                                                                        {column.id === 'action'
                                                                            ? <>
                                                                                <IconButton >
                                                                                    <EditIcon sx={{ color: theme.palette.buttonBG.primary }} />
                                                                                </IconButton>

                                                                                <IconButton >
                                                                                    <DeleteIcon sx={{ color: theme.palette.buttonBG.primary }} />
                                                                                </IconButton>
                                                                            </>
                                                                            : "ranu"}

                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Collapse>
                        </List>
                    ))}
                </Box>

                <Box sx={{ mb: 2, }}>
                    <Button variant="contained"
                        sx={{
                            color: theme.palette.buttonText.primary,
                            backgroundColor: theme.palette.buttonBG.primary,
                            borderRadius: "20px",
                            width: 90,
                            '&:hover': {
                                backgroundColor: theme.palette.buttonBG.hover,
                            },
                            mr: 2
                        }}>Save</Button>
                    <Button variant="contained"
                        sx={{
                            color: theme.palette.buttonText.primary,
                            backgroundColor: theme.palette.buttonBG.primary,
                            borderRadius: "20px",
                            width: 90,
                            '&:hover': {
                                backgroundColor: theme.palette.buttonBG.hover,
                            },

                        }}>Clear</Button>

                </Box>
            </Box>
        </Modal >
    );
};

export default MultiTrips;
