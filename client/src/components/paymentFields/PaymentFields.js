import { Button, Toolbar } from "@mui/material"
import * as React from 'react';
import { useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import transition from "react-element-popper/animations/transition"
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { IconButton, TextField, Select, ListItemText, Checkbox, FormControl, MenuItem, InputLabel, OutlinedInput } from "@mui/material";

import DateObject from "react-date-object";

import './PaymentFields.css'
import MultiTrips from "./dateModule/MultiTrips";



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



const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


function PaymentFields() {

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [personType, setPersonType] = React.useState('');
    const [personDept, setPersonDept] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [dates, setDates] = React.useState([]);

    // const [openEditDate, setOpenEditDate] = React.useState(false);
    const handleOpen = () => setOpen(true);
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


    const handleChangeType = (event) => {
        const { value } = event.target;
        console.log(personName.length)
        setPersonType(value);
    };

    const handleChangeDept = (event) => {
        const { value } = event.target;
        setPersonDept(value);
    };



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
                <Toolbar>
                    {/* EmployeeID */}
                    <FormControl sx={{ m: 1, my: 2, width: 400 }} size="small">
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
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1}
                                        sx={{
                                            "&.Mui-checked": {
                                                color: theme.palette.inputText.primary, // Change color when checked
                                            },// Change checkbox color
                                        }}
                                    />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    {/* Select Type */}
                    <FormControl sx={{ m: 1, width: 300 }} size="small">
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


                    {/* Select Dept */}
                    <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                    {personDept === 'Services' && (
                        <TextField
                            label="Service Id"
                            id="outlined-size-small"

                            size="small"
                            sx={{
                                m: 1,
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

                    )}

                    {/* Select Date */}
                    <DatePicker
                        value={dates}
                        onChange={handleDateChange}
                        format="MMMM DD YYYY"
                        sort
                        plugins={[
                            <DatePanel />
                        ]}
                        placeholder="Select Date"
                        style={{ // Adjust the size of the DatePicker
                            height: "45px",
                            borderRadius: "4px",
                            fontSize: "16px",
                            padding: "3px 12px",
                            width: "400px",
                            backgroundColor: "transparent",
                            color: theme.palette.text.primary,
                            borderWidth: "1px",
                            borderStyle: "solid",
                            zIndex: 1000,

                        }}
                        inputClass="custom-input"
                        className="bg-dark"
                        animations={[transition()]}
                    />
                    <IconButton onClick={handleOpen}>
                        <EditCalendarIcon sx={{ color: theme.palette.buttonBG.primary, }} />
                    </IconButton>
                    <MultiTrips open={open} handleClose={handleClose} dateCount={dates.length} dates={dates} />


                </Toolbar >
            </div >

        </>
    )
}

export default PaymentFields