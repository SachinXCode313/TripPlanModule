import { Button, Toolbar } from "@mui/material"
import * as React from 'react';
import { useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import './PaymentFields.css'


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

    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChangeDate = (newValue) => {
        setValue(newValue);
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
                    <FormControl sx={{ m: 1, width: 220 }} size="small">
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
                    <FormControl sx={{ m: 1, width: 400 }} size="small">
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
                                    borderColor: theme.palette.text.primary, // Outline color on focus (click)
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.text.primary, // Default outline color
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: theme.palette.text.primary, // Default label color

                                },
                            }}
                            variant="outlined"
                        />

                    )}


                    {/* Select Date */}
                    <FormControl sx={{ m: 1, width: 400, }} size="small">

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="MM/DD/YYYY"
                                value={value}
                                multiple
                                onChange={handleChangeDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Toolbar >
            </div >

        </>
    )
}

export default PaymentFields