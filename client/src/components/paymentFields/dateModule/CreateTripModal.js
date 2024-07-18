import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TextField } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { City, Country, State } from 'country-state-city';
import axios from 'axios';
import { ElevenMp } from '@mui/icons-material';

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

const CreateTripModal = ({ open, handleClose, date, day, setTripPlanList }) => {
    const theme = useTheme();
    const [country, setCountry] = React.useState('');
    const [state, setState] = React.useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = React.useState({
        date,
        country: '',
        state: '',
        city: '',
        clientName: '',
        purpose: '',
        remarks: ''
    });

    useEffect(() => {
        const getAllCountries = async () => {
            try {
                const countries = await Country.getAllCountries();
                setCountries(countries)
            } catch (err) {
                console.log(err);
            }
        };
        getAllCountries();
    }, []);

    useEffect(() => {
        const getStates = async () => {
            if (country.isoCode) {
                const states = await State.getStatesOfCountry(country.isoCode);
                setStates(states);
            }
        };
        getStates();
    }, [country]);

    useEffect(() => {
        const getCities = async () => {
            if (state.isoCode) {
                const cities = await City.getCitiesOfState(country.isoCode, state.isoCode);
                setCities(cities);
            }
        };
        getCities();
    }, [state]);

    const handleInputChange = (name) => (event) => {
        setFormData({
            ...formData,
            [name]: event.target.value,
        });
    };

    const handleChangeCountry = async (event) => {
        const selectedCountry = event.target.value;
        setCountry(selectedCountry)
        setFormData({
            ...formData,
            date:date,
            country: selectedCountry.name,
            state: '',
            city: '',
        });
    };

    const handleChangeState = async (event) => {
        const selectedState = event.target.value;
        setState(selectedState)
        setFormData({
            ...formData,
            state: selectedState.name,
            city: '',
        });
    };


    // const handleClientName = (event) => setClientName(event.target.value);
    // const handlePurpose = (event) => setPurpose(event.target.value);
    // const handleRemarks = (event) => setRemarks(event.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission
        setTripPlanList(formData);

        // console.log(formData); // Log the form data
        // setTripPlanList(formData)

        // Reset states and cities
        setCountry('')
        setState('')
        console.log(formData)
        console.log(date)
        handleClose(); // Close the modal
    };

    const handleCancel = async (e) => {
        e.preventDefault();

        setCountry('')
        setState('')
        handleClose();

    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(0.4px)',
            }}
            keepMounted
        >
            <Box
                sx={{
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
                }}
            >
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    <ListItemText primary={`Day ${day} ${date}`} />
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ flexGrow: 1, p: 2, mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: 270 }} size="small">
                                    <InputLabel
                                        id="select-country-label"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: theme.palette.text.primary,
                                            },
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        Select Country
                                    </InputLabel>
                                    <Select
                                        labelId="select-country-label"
                                        id="select-country"
                                        value={country}
                                        onChange={handleChangeCountry}
                                        input={
                                            <OutlinedInput
                                                id="select-country-input"
                                                label="Select Country"
                                                sx={{
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: theme.palette.text.primary,
                                                    },
                                                    height: '45px',
                                                }}
                                            />
                                        }
                                        MenuProps={MenuProps}

                                    >
                                        {countries.map((country) => (
                                            <MenuItem key={country.isoCode} value={country}>
                                                {country.name}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: 270 }} size="small">
                                    <InputLabel
                                        id="select-state-label"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: theme.palette.text.primary,
                                            },
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        Select State
                                    </InputLabel>
                                    <Select
                                        labelId="select-state-label"
                                        id="select-state"
                                        value={state}
                                        onChange={handleChangeState}
                                        input={
                                            <OutlinedInput
                                                id="select-state-input"
                                                label="Select State"
                                                sx={{
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: theme.palette.text.primary,
                                                    },
                                                    height: '45px',
                                                }}
                                            />
                                        }
                                        MenuProps={MenuProps}
                                    >
                                        {states.map((state) => (
                                            <MenuItem key={state.isoCode} value={state}
                                            >
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: 270 }} size="small">
                                    <InputLabel
                                        id="select-city-label"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: theme.palette.text.primary,
                                            },
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        Select City
                                    </InputLabel>
                                    <Select
                                        labelId="select-city-label"
                                        id="select-city"
                                        value={formData.city}
                                        onChange={handleInputChange('city')}
                                        input={
                                            <OutlinedInput
                                                id="select-city-input"
                                                label="Select City"
                                                sx={{
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: theme.palette.text.primary,
                                                    },
                                                    height: '45px',
                                                }}
                                            />
                                        }
                                        MenuProps={MenuProps}
                                    >
                                        {cities.map((city) => (
                                            <MenuItem key={city.name} value={city.name}>
                                                {city.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: 270 }} size="small">
                                    <TextField
                                        label="Client Name"
                                        id="outlined-size-small"
                                        value={formData.clientName}
                                        onChange={handleInputChange('clientName')}
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
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: 270 }} size="small">
                                    <TextField
                                        label="Purpose"
                                        id="outlined-size-small"
                                        value={formData.purpose}
                                        onChange={handleInputChange('purpose')}
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
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: 270 }} size="small">
                                    <TextField
                                        label="Remarks"
                                        id="outlined-size-small"
                                        value={formData.remarks}
                                        onChange={handleInputChange('remarks')}
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
                                </FormControl>
                            </Grid>
                            {/* Add more Grid items with TextField components as needed */}
                        </Grid>
                    </Box>
                    <Box sx={{
                        mb: 2, ml: 25, display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                color: theme.palette.buttonText.primary,
                                backgroundColor: theme.palette.buttonBG.primary,
                                borderRadius: '20px',

                                '&:hover': {
                                    backgroundColor: theme.palette.buttonBG.hover,
                                },
                                mr: 2,
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                color: theme.palette.buttonText.primary,
                                backgroundColor: theme.palette.buttonBG.primary,
                                borderRadius: '20px',
                                '&:hover': {
                                    backgroundColor: theme.palette.buttonBG.hover,
                                },

                            }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>

                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateTripModal;
