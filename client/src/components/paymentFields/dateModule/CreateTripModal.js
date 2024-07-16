import * as React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import { IconButton, Select, Checkbox, FormControl, MenuItem, InputLabel, OutlinedInput } from "@mui/material";
import { useTheme } from '@emotion/react';
import axios from 'axios';


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


const CreateTripModal = ({ open, handleClose, date, day }) => {
    const theme = useTheme();
    const [country, setCountry] = React.useState('');
    const [state, setState] = React.useState('');
    const [city, setCity] = React.useState('');
    const [clientName, setClientName] = React.useState('');
    const [purpose, setPurpose] = React.useState('');
    const [remarks, setRemarks] = React.useState('');


    // const fetchUsers = () => {
    //     // Fetch users from your API or any data source
    //     // Example API call:
    //     axios.get('/api/get')
    //         .then((res) => {
    //             setUsersList(res.data)
    //             console.log(typeof (usersList));
    //         })
    //         .catch(error => console.error('Error fetching users:', error));
    // };

    // useEffect(() => {
    //     fetchUsers();
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Data = {
            country,
            state,
            city,
            clientName,
            purpose,
            remarks,
        };
        console.log('Submitting form data:', Data);
        try {
            const res = await axios.post('/api/create', Data);
            console.log('Data submitted successfully:', res.data);
            handleClose(); // Close the modal after submission
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };


    const handleChangeCountry = (event) => setCountry(event.target.value);
    const handleChangeState = (event) => setState(event.target.value);
    const handleChangeCity = (event) => setCity(event.target.value);
    const handleClientName = (event) => setClientName(event.target.value);
    const handlePurpose = (event) => setPurpose(event.target.value);
    const handleRemarks = (event) => setRemarks(event.target.value);



    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgb(0,0,0,0.1)',
                    },
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(0.4px)',
                }}
            >
                <Box sx={{
                    mt: 5,
                    width: 600,
                    height: 320,
                    bgcolor: 'background.paper',
                    border: '2px solid #3d3d3d55',
                    borderRadius: 2,
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 1,
                }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        <ListItemText primary={`Day ${day} ${date}`} />
                    </Typography>
                    
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ flexGrow: 1, p: 2, mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    {/* Select Dept */}
                                    <FormControl sx={{ width: 270 }} size="small">
                                        <InputLabel id="demo-multiple-chip-label"
                                            sx={{
                                                "&.Mui-focused": {
                                                    color: theme.palette.text.primary, // Change label color when focused
                                                },
                                                color: theme.palette.text.primary,
                                            }}>Select Country</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            value={country}
                                            onChange={handleChangeCountry}
                                            input={<OutlinedInput id="select-dept" label="Select Country" sx={{
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
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: 270 }} size="small">
                                        <InputLabel id="demo-multiple-chip-label"
                                            sx={{
                                                "&.Mui-focused": {
                                                    color: theme.palette.text.primary, // Change label color when focused
                                                },
                                                color: theme.palette.text.primary,
                                            }}>Select State</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            value={state}
                                            onChange={handleChangeState}
                                            input={<OutlinedInput id="select-dept" label="Select State" sx={{
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
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: 270 }} size="small">
                                        <InputLabel id="demo-multiple-chip-label"
                                            sx={{
                                                "&.Mui-focused": {
                                                    color: theme.palette.text.primary, // Change label color when focused
                                                },
                                                color: theme.palette.text.primary,
                                            }}>Select City</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            value={city}
                                            onChange={handleChangeCity}
                                            input={<OutlinedInput id="select-dept" label="Select City" sx={{
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
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: 270 }} size="small">
                                        <InputLabel id="demo-multiple-chip-label"
                                            sx={{
                                                "&.Mui-focused": {
                                                    color: theme.palette.text.primary, // Change label color when focused
                                                },
                                                color: theme.palette.text.primary,
                                            }}>Client Name</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            value={clientName}
                                            onChange={handleClientName}
                                            input={<OutlinedInput id="select-dept" label="Client Name" sx={{
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
                                <Grid item xs={6}>
                                    {/* Select Dept */}
                                    <FormControl sx={{ width: 270 }} size="small">
                                        <InputLabel id="demo-multiple-chip-label"
                                            sx={{
                                                "&.Mui-focused": {
                                                    color: theme.palette.text.primary, // Change label color when focused
                                                },
                                                color: theme.palette.text.primary,
                                            }}>Purpose</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            value={purpose}
                                            onChange={handlePurpose}
                                            input={<OutlinedInput id="select-dept" label="Purpose" sx={{
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
                                <Grid item xs={6}>
                                    {/* Select Dept */}
                                    <FormControl sx={{ width: 270 }} size="small">
                                        <InputLabel id="demo-multiple-chip-label"
                                            sx={{
                                                "&.Mui-focused": {
                                                    color: theme.palette.text.primary, // Change label color when focused
                                                },
                                                color: theme.palette.text.primary,
                                            }}>Remarks</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            value={remarks}
                                            onChange={handleRemarks}
                                            input={<OutlinedInput id="select-dept" label="Remarks" sx={{
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
                                {/* Add more Grid items with TextField components as needed */}
                            </Grid>

                        </Box>
                        <Box sx={{ mb: 2, }}>
                            <Button
                                variant="contained"
                                sx={{
                                    color: theme.palette.buttonText.primary,
                                    backgroundColor: theme.palette.buttonBG.primary,
                                    borderRadius: "20px",
                                    '&:hover': {
                                        backgroundColor: theme.palette.buttonBG.hover,
                                    },
                                    mr: 30
                                }}
                                onClick={handleClose}
                            >Cancel</Button>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    color: theme.palette.buttonText.primary,
                                    backgroundColor: theme.palette.buttonBG.primary,
                                    borderRadius: "20px",
                                    ml: 15,
                                    '&:hover': {
                                        backgroundColor: theme.palette.buttonBG.hover,
                                    },

                                }}>Submit</Button>

                        </Box>
                    </form>
                </Box>

            </Modal>
        </>
    )
}

export default CreateTripModal