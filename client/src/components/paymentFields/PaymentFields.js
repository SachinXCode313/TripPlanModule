import { Button, Toolbar } from "@mui/material"
import * as React from 'react';
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


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <>
            <div className="paymentFields">
                <Toolbar>
                    {/* EmployeeID */}
                    <FormControl sx={{ m: 1, width: 400 }} size="small">
                        <InputLabel id="demo-multiple-chip-label"
                            sx={{
                                "&.Mui-focused": {
                                    color: theme.palette.inputText.primary, // Change label color when focused
                                },
                                fontWeight: 'bold'
                            }}>Employee ID</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Employee ID" sx={{
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette.inputBorder.primary,
                                },
                                height: "50px",
                            }}

                            />}
                            renderValue={(selected) => (
                                <Box sx={{
                                    display: 'flex', overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none', }, gap: 0.5
                                }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
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
                                    color: theme.palette.inputText.primary, // Change label color when focused
                                },
                                fontWeight: 'bold',
                            }}>Select Type</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Select Type" sx={{
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette.inputBorder.primary,
                                },
                                height: "50px",
                            }}

                            />}
                            renderValue={(selected) => (
                                <Box sx={{
                                    display: 'flex', overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none', }, gap: 0.5
                                }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>

                            ))}
                        </Select>
                    </FormControl>


                    {/* Select Dept */}
                    <FormControl sx={{ m: 1, width: 400 }} size="small">
                        <InputLabel id="demo-multiple-chip-label"
                            sx={{
                                "&.Mui-focused": {
                                    color: theme.palette.inputText.primary, // Change label color when focused
                                },
                                fontWeight: 'bold',
                            }}>Select Dept</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Select Dept" sx={{
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette.inputBorder.primary,
                                },
                                height: "50px",
                            }}

                            />}
                            renderValue={(selected) => (
                                <Box sx={{
                                    display: 'flex', overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none', }, gap: 0.5
                                }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox sx={{
                                        "&.Mui-checked": {
                                            color: theme.palette.inputText.primary, // Change color when checked
                                          },// Change checkbox color
                                    }}
                                     checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>

                            ))}
                        </Select>
                    </FormControl>
                    
                </Toolbar >
            </div >

        </>
    )
}

export default PaymentFields