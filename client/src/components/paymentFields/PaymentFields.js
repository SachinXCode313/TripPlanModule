import { Box, Button, Grid, Toolbar } from "@mui/material"
import * as React from 'react';
import { useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import transition from "react-element-popper/animations/transition"
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { IconButton, TextField, Select, ListItemText, Checkbox, FormControl, MenuItem, InputLabel, OutlinedInput } from "@mui/material";
import axios from "axios";
import DateObject from "react-date-object";

import './PaymentFields.css'
import MultiTrips from "./dateModule/MultiTrips";
import TripPlan from "../tripPlan/TripPlan";



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};







const PaymentFields = () => {

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [personType, setPersonType] = React.useState('');
    const [personDept, setPersonDept] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [dates, setDates] = React.useState([]);
    const [structuredDates, setStructuredDates] = React.useState([])
    const [tripPlanList, setTripPlanList] = React.useState()
    const [employeeList, setEmployeeList] = React.useState([])

    // const [openEditDate, setOpenEditDate] = React.useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/api/getEmployee')
            .then((res) => {
                console.log("Received data:", res.data);
                setEmployeeList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])



    const handleOpen = () => {
        const structuredDates = dates.map((date, index) => ({
            day: index + 1,
            date: date.format("DD-MM-YYYY")
        }));
        setStructuredDates(structuredDates);
        setOpen(true);
        console.log(structuredDates);
        console.log("EmployeeList: ", employeeList)
    }
    const handleClose = () => setOpen(false);

    const handleDateChange = (selectedDates) => {
        setDates(selectedDates);
        console.log('Selected dates:', selectedDates);
    };

    const handleChangePerson = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        if (personName.length > 1) {
            setPersonType("Group")
        }
    };

    const handleTripPlanList = (value) => {
        setTripPlanList(value)
        console.log(value);
    }


    const handleChangeType = (event) => {
        const { value } = event.target;
        console.log(personName.length)
        setPersonType(value);
    };

    const handleChangeDept = (event) => {
        const { value } = event.target;
        setPersonDept(value);
    };


    const handleClearData = () => {
        setPersonName([])
        setPersonType('')
        setPersonDept('')
        setDates([])
    }


    useEffect(() => {
        // Check if personName has more than one item and set personType accordingly
        if (personName.length > 1) {
            setPersonType('Group');
        }
        if (personName.length == 1) {
            setPersonType('Individual')
        }
    }, [personName]);


    return (
        <>

                <div className="paymentFields">
                    {/* <div className="blur-background"></div> */}
                    <Toolbar>
                        {/* EmployeeID */}
                        <Grid container sx={{ my: 2, mb: 3 }} spacing={2}>
                            <Grid item xs={6} sm={4} md={2.4}>
                                <FormControl sx={{}} fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label"
                                        sx={{

                                            "&.Mui-focused": {
                                                color: theme.palette.text.primary, // Change label color when focused
                                            },
                                            color: theme.palette.text.primary,
                                        }}>Employee ID
                                    </InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={personName}
                                        onChange={handleChangePerson}
                                        MenuProps={MenuProps}
                                        renderValue={(selected) => selected.join(', ')}
                                        input={<OutlinedInput id="select-multiple-chip" label="Employee ID" sx={{
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: theme.palette.text.primary,
                                            },
                                            height: "45px",
                                        }}
                                        />}
                                    >
                                        {employeeList.map(([id, name]) => (
                                            <MenuItem key={id} value={`${id}-${name}`}>

                                                <ListItemText primary={`${id}-${name}`} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Select Type */}
                            <Grid item xs={6} sm={4} md={2.4}>
                                <FormControl sx={{}} fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label"
                                        sx={{
                                            "&.Mui-focused": {
                                                color: theme.palette.text.primary, // Change label color when focused
                                            },
                                            color: theme.palette.text.primary,
                                        }}>Select Type</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"

                                        value={personType}
                                        onChange={handleChangeType}
                                        input={<OutlinedInput id="select-multiple-chip" label="Select Type" sx={{
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: theme.palette.text.primary,
                                            },
                                            height: "45px",
                                        }}

                                        />}

                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value="Individual">Individual</MenuItem>
                                        <MenuItem value="Group">Group</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Select Dept */}
                            <Grid item xs={6} sm={4} md={2.4}>
                                <FormControl sx={{}} fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label"
                                        sx={{
                                            "&.Mui-focused": {
                                                color: theme.palette.text.primary, // Change label color when focused
                                            },
                                            color: theme.palette.text.primary,
                                        }}>Select Dept</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        value={personDept}
                                        onChange={handleChangeDept}
                                        input={<OutlinedInput id="select-dept" label="Select Dept" sx={{
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: theme.palette.text.primary,
                                            },
                                            height: "45px",
                                        }}

                                        />}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value="Sales">Sales</MenuItem>
                                        <MenuItem value="Operations">Operations</MenuItem>
                                        <MenuItem value="Services">Services</MenuItem>
                                    </Select>

                                </FormControl>
                            </Grid>
                            {personDept === 'Services' && (
                                <Grid item xs={6} sm={4} md={2.4}>
                                    <TextField
                                        label="Service Id"
                                        id="outlined-size-small"
                                        fullWidth
                                        size="small"
                                        sx={{

                                            '& .MuiInputBase-root': {  // styles for the input itself
                                                height: 45,  // adjust padding
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                color: theme.palette.text.primary, // Outline color on focus (click)
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.palette.text.primary, // Default outline color
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: theme.palette.text.primary, // Default label color
                                                '&.Mui-focused': {
                                                    color: theme.palette.text.primary, // Label color on focus (click)
                                                },
                                            },
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                            )}

                            {/* Select Date */}
                            <Grid item xs={6} sm={4} md={2.4}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0px',
                                        '@media (min-width: 600px)': {
                                            flexWrap: 'nowrap',
                                        },
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box sx={{
                                        width: {
                                            xs: '80%', // Full width on extra-small screens
                                            sm: 'auto',
                                        },
                                        // flexGrow:1
                                    }}>
                                        <DatePicker
                                            value={dates}
                                            onChange={handleDateChange}
                                            format="MMMM DD YYYY"
                                            sort
                                            plugins={[<DatePanel />]}
                                            placeholder="Select Date"
                                            style={{
                                                margin: "0px",
                                                height: '45px',
                                                borderRadius: '4px',
                                                fontSize: '16px',
                                                padding: '3px 12px',
                                                width: '100%', // Ensure it is responsive
                                                backgroundColor: 'transparent',
                                                color: theme.palette.text.primary,
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                zIndex: 1000,
                                            }}
                                            inputClass="custom-input"
                                            className="bg-dark"
                                            animations={[transition()]}
                                        />
                                    </Box>
                                    <IconButton onClick={handleOpen}
                                        sx={{
                                            p: 0,
                                            pl: 0.4,
                                            // width: 'auto', // Ensure the button's width is appropriate
                                        }}>
                                        <EditCalendarIcon sx={{ color: theme.palette.buttonBG.primary }} />
                                    </IconButton>
                                    <MultiTrips
                                        open={open}
                                        handleClose={handleClose}
                                        dateCount={dates.length}
                                        dates={structuredDates}
                                        getTripPlanList={handleTripPlanList}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar >
                    <TripPlan tripPlanList={tripPlanList} handleClearData={handleClearData} />
                </div >

        </>
    )
}

export default PaymentFields