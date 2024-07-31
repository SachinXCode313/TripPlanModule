import React, { useState, useEffect } from 'react';
import {
    Typography,
    Modal,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateTripModal from './CreateTripModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useTheme } from '@emotion/react';
import EditTripModal from './EditTripModal';
// import EditTripModal from '../paymentFields/dateModule/EditTripModal'

const columns = [
    { id: 'action', label: 'Action', minWidth: 130 },
    { id: 'sr', label: 'Sr.', minWidth: 50 },
    { id: 'date', label: 'Date', minWidth: 105 },
    { id: 'country', label: 'Country', minWidth: 130 },
    { id: 'state', label: 'State', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'clientName', label: 'Client Name', minWidth: 100 },
    { id: 'purpose', label: 'Purpose', minWidth: 100 },
    { id: 'remarks', label: 'Remarks', minWidth: 100 },
];

const customScrollbar = {
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '-ms-overflow-style': 'none', // Internet Explorer 10+
    'scrollbar-width': 'none', // Firefox
};

const MultiTrips = ({ open, handleClose, dateCount, dates, getTripPlanList }) => {
    const theme = useTheme();

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [EditModalOpen, setEditModalOpen] = useState(false);
    const [openDate, setOpenDate] = useState();
    const [openDay, setOpenDay] = useState();
    const [expanded, setExpanded] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);


    const [tripPlanList, setTripPlanList] = useState([]);

    const handleCreateModalOpen = (day, date, index) => {
        setCreateModalOpen(true);
        setOpenDropdownIndex(index);
        setOpenDay(day);
        setOpenDate(date);
        setExpanded(index);
    };

    const handleCreateModalClose = () => {
        setCreateModalOpen(false);
    };

    const handleEditModalOpen = (day, date, index) => {
        setEditModalOpen(true);
        setOpenDropdownIndex(index);
        setOpenDay(day);
        setOpenDate(date);
        setExpanded(index);
        setSelectedIndex(index);
        console.log(index);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    const handleTripPlanList = (formData) => {
        // Generate sr number based on existing trip plans for the specific date
        const tripPlansForDate = tripPlanList.filter(trip => trip.date === formData.date);
        const sr = tripPlansForDate.length + 1;

        // Add sr to formData
        const updatedFormData = { ...formData, sr, day: formData.day };

        setTripPlanList(prevList => [...prevList, updatedFormData]);
        console.log(tripPlanList);

        // setTripPlanList(prevList => [...prevList, formData]);
        // console.log(tripPlanList);
    };

    const handleEditTripPlanList = (formData, index) => {
        setTripPlanList(prevList => {
            // Create a new list with updated data
            const updatedList = prevList.map((trip, i) =>
                i === index ? { ...trip, ...formData } : trip
            );
            console.log("Updated Trip Plan List:", updatedList);
            return updatedList;
        });
    };


    const handleSave = () => {
        getTripPlanList(tripPlanList);
        handleClose();

    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(0.7px)',
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                },
            }}
            
        >
            <Box
                sx={{
                    mt: 5,
                    width: {
                        xs: '95%', // Set width to 100% for extra-small screens
                        sm: '80%',  // Set width to 80% for small screens
                        md: '70%',  // Set width to 70% for medium screens
                        lg: '60%',  // Set width to 60% for large screens
                        xl: '70%',  // Set width to 50% for extra-large screens
                    },
                    height: 550,
                    bgcolor: 'background.paper',
                    border: '2px solid #666666',
                    borderRadius: 3,
                    boxShadow: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                    px: 3,
                    overflow: 'auto'
                }}
            >
                <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold' }}>
                    Plan For {dateCount} Days
                </Typography>
                <Box sx={{
                    maxHeight: 440,
                    height: 440,
                    overflow: 'auto',
                    my: 2,
                    py: 0,
                    width: "100%",
                    ...customScrollbar
                }}>
                    {dates.map((obj, index) => (
                        <Accordion
                            expanded={expanded === index}
                            onChange={() => setExpanded(expanded === index ? false : index)}
                            key={obj.date}
                            sx={{
                                boxShadow: 'rgba(50, 50, 93, 0.25) 2px 2px 5px -2px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
                                '&:before': {
                                    display: 'none', // Remove default border before pseudo-element
                                },
                                my: 1,
                            }}
                        // box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;


                        >
                            <AccordionSummary
                                sx={{
                                    py: 0, // Remove vertical padding
                                    height: 20, // Set default height
                                    '&.Mui-expanded': { // Target the expanded state correctly
                                        minHeight: '35px', // Adjust the min-height when expanded
                                    },
                                    '&.MuiButtonBase-root-MuiAccordionSummary-root': { // General AccordionSummary styles
                                        minHeight: '20px', // Adjust the min-height for general state
                                    },
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 'normal', flexGrow: 1 }}>
                                    {`Day-${obj.day}  ${obj.date}`}
                                </Typography>
                                <IconButton
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleCreateModalOpen(obj.day, obj.date, index);
                                    }}
                                >
                                    <AddCircleOutlineIcon />
                                </IconButton>
                                <CreateTripModal
                                    open={createModalOpen}
                                    handleClose={handleCreateModalClose}
                                    day={openDay}
                                    date={openDate}
                                    setTripPlanList={handleTripPlanList}
                                />
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ p: 1 }}>
                                <Box sx={{ p: 0, pt: 0 }}>
                                    <TableContainer component={Paper} sx={{...customScrollbar}}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <thead sx={{ backgroundColor: theme.palette.primary.main, }}>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                            sx={{ py: 1.5 }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </thead>
                                            <TableBody>
                                                {tripPlanList
                                                    .filter(tripPlan => tripPlan.date === obj.date)
                                                    .map((tripPlan, index) => (
                                                        <TableRow hover key={index}>
                                                            <TableCell>
                                                                <IconButton>
                                                                    <EditIcon
                                                                        onClick={(event) => {
                                                                            event.stopPropagation();
                                                                            handleEditModalOpen(obj.day, obj.date, index);
                                                                        }}
                                                                        sx={{ color: theme.palette.buttonBG.primary }} />
                                                                </IconButton>
                                                                <EditTripModal
                                                                    open={EditModalOpen}
                                                                    handleClose={handleEditModalClose}
                                                                    day={openDay}
                                                                    date={openDate}
                                                                    initialData={tripPlanList}
                                                                    setTripPlanList={handleEditTripPlanList}
                                                                    index={selectedIndex}
                                                                />
                                                                <IconButton>
                                                                    <DeleteIcon sx={{ color: theme.palette.buttonBG.primary }} />
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell>{tripPlan.sr}</TableCell>
                                                            <TableCell>{tripPlan.date}</TableCell>
                                                            <TableCell>{tripPlan.country}</TableCell>
                                                            <TableCell>{tripPlan.state}</TableCell>
                                                            <TableCell>{tripPlan.city}</TableCell>
                                                            <TableCell>{tripPlan.clientName}</TableCell>
                                                            <TableCell>{tripPlan.purpose}</TableCell>
                                                            <TableCell>{tripPlan.remarks}</TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>

                                        </Table>
                                    </TableContainer>
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                    ))}

                </Box>
                <Box sx={{ mb: 2 }}>
                    <Button variant="contained"
                        onClick={handleSave}
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
                        onClick={handleClose}
                        sx={{
                            color: theme.palette.buttonText.primary,
                            backgroundColor: theme.palette.buttonBG.primary,
                            borderRadius: "20px",
                            width: 90,
                            '&:hover': {
                                backgroundColor: theme.palette.buttonBG.hover,
                            },
                        }}>Cancel</Button>
                </Box>

            </Box>
        </Modal>
    );
};

export default MultiTrips;
