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

const columns = [
    { id: 'action', label: 'Action', minWidth: 130 },
    { id: 'sr', label: 'Sr.', minWidth: 70 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'country', label: 'Country', minWidth: 130 },
    { id: 'state', label: 'State', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'clientName', label: 'Client Name', minWidth: 100 },
    { id: 'purpose', label: 'Purpose', minWidth: 100 },
    { id: 'remarks', label: 'Remarks', minWidth: 100 },
];

const MultiTrips = ({ open, handleClose, dateCount, dates, getTripPlanList }) =>{
    const theme = useTheme();

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [openDate, setOpenDate] = useState();
    const [openDay, setOpenDay] = useState();
    const [expanded, setExpanded] = useState(false);

    const [tripPlanList, setTripPlanList] = useState([]);

    const handleEditModalOpen = (day, date, index) => {
        setEditModalOpen(true);
        setOpenDropdownIndex(index);
        setOpenDay(day);
        setOpenDate(date);
        setExpanded(index);
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

    const handleSave = () => {
        getTripPlanList(tripPlanList);
        handleClose();
        
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(0.7px)' }}
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
                    {dates.map((obj, index) => (
                        <Accordion
                            expanded={expanded === index}
                            onChange={() => setExpanded(expanded === index ? false : index)}
                            key={obj.date}


                        >
                            <AccordionSummary
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{ pt: 0, display: 'flex', alignItems: 'center', }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 'normal', flexGrow: 1 }}>
                                    {`Day-${obj.day}  ${obj.date}`}
                                </Typography>
                                <IconButton
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleEditModalOpen(obj.day, obj.date, index);
                                    }}
                                >
                                    <AddCircleOutlineIcon />
                                </IconButton>
                                <CreateTripModal
                                    open={editModalOpen}
                                    handleClose={handleEditModalClose}
                                    day={openDay}
                                    date={openDate}
                                    setTripPlanList={handleTripPlanList}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ p: 1, pt: 0 }}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <thead sx={{ backgroundColor: theme.palette.primary.main }}>
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
                                                {tripPlanList
                                                    .filter(tripPlan => tripPlan.date === obj.date)
                                                    .map((tripPlan, index) => (
                                                        <TableRow hover key={index}>
                                                            <TableCell>
                                                                <IconButton>
                                                                    <EditIcon sx={{ color: theme.palette.buttonBG.primary }} />
                                                                </IconButton>
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
