import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { TextField, Autocomplete } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { City, Country, State } from 'country-state-city';


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
    const [country, setCountry] = React.useState(null);
    const [state, setState] = React.useState(null);
    const [city, setCity] = React.useState(null);
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
        remarks: '',
        countryCode: '',
        stateCode: '',

    });

    useEffect(() => {
        const getAllCountries = async () => {
            try {
                const countries = await Country.getAllCountries();
                setCountries(countries);
            } catch (err) {
                console.log(err);
            }
        };
        getAllCountries();
    }, []);

    useEffect(() => {
        const getStates = async () => {
            if (country && country.isoCode) {
                const states = await State.getStatesOfCountry(country.isoCode);
                setStates(states);
            } else {
                setStates([]);
            }
        };
        getStates();
    }, [country]);

    useEffect(() => {
        const getCities = async () => {
            if (country && country.isoCode && state && state.isoCode) {
                const cities = await City.getCitiesOfState(country.isoCode, state.isoCode);
                setCities(cities);
            } else {
                setCities([]);
            }
        };
        getCities();
    }, [country, state]);

    const handleInputChange = (name) => (event) => {
        setFormData({
            ...formData,
            [name]: event.target.value,
        });
    };

    const handleChangeCountry = (event, selectedCountry) => {
        setCountry(selectedCountry);
        setFormData({
            ...formData,
            day: day,
            date: date,
            country: selectedCountry ? selectedCountry.name : '',
            countryCode: selectedCountry ? selectedCountry.isoCode : '',
            state: '',
            city: '',
        });
    };

    const handleChangeState = (event, selectedState) => {
        setState(selectedState);
        setFormData({
            ...formData,
            state: selectedState ? selectedState.name : '',
            stateCode: selectedState ? selectedState.isoCode : '',
            city: '',
        });
    };

    const handleChangeCity = (event, selectedCity) => {
        setFormData({
            ...formData,
            city: selectedCity ? selectedCity.name : '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission
        setTripPlanList(formData);
        setCountry(null)
        setState(null)
        setCity(null)
        setFormData({
            date,
            country: '',
            state: '',
            city: '',
            clientName: '',
            purpose: '',
            remarks: '',
            countryCode: '',
            stateCode: '',})
        console.log(formData)
        console.log(date)
        handleClose(); // Close the modal
    };

    const handleCancel = async (e) => {
        e.preventDefault();
        setFormData({
            date,
            country: null,
            state: null,
            city: null,
            clientName: '',
            purpose: '',
            remarks: '',
            countryCode: '',
            stateCode: '',})
        setCountry(null)
        setState(null)
        setCity(null)
        handleClose();

    }

    return (
        <Modal
            open={open}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(0.7px)',
            }}
            keepMounted
        >
            <Box
                sx={{
                    mt: 5,
                    width: {
                        xs: '90%', // Set width to 100% for extra-small screens
                        sm: '60%',  // Set width to 80% for small screens
                        md: '50%',  // Set width to 70% for medium screens
                        lg: '40%',  // Set width to 60% for large screens
                        xl: '35%',  // Set width to 50% for extra-large screens
                    },
                    height: 320,
                    bgcolor: 'background.paper',
                    border: '2px solid #3d3d3d55',
                    borderRadius: 2,
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 1,
                }}
            >
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    <ListItemText primary={`Day ${day} ${date}`} />
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ flexGrow: 1, p: 1, mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    options={countries}
                                    getOptionLabel={(option) => option.name}
                                    value={country}
                                    onChange={handleChangeCountry}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Country"
                                            variant="outlined"
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
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    options={states}
                                    getOptionLabel={(option) => option.name}
                                    value={state}
                                    onChange={handleChangeState}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select State"
                                            variant="outlined"
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
                                            
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    options={cities}
                                    getOptionLabel={(option) => option.name}
                                    value={city}
                                    onChange={handleChangeCity}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select City"
                                            variant="outlined"
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
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                    <TextField
                                        label="Client Name"
                                        id="outlined-size-small"
                                        value={formData.clientName}
                                        onChange={handleInputChange('clientName')}
                                        fullWidth 
                                        size="small"
                                        sx={{
                                            '& .MuiInputBase-root': {  // styles for the input itself
                                                height: 45,  // adjust padding
                                                width:'100%'
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
                            <Grid item xs={6}>
                                    <TextField
                                        label="Purpose"
                                        id="outlined-size-small"
                                        value={formData.purpose}
                                        onChange={handleInputChange('purpose')}
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
                            <Grid item xs={6}>
                                    <TextField
                                        label="Remarks"
                                        id="outlined-size-small"
                                        value={formData.remarks}
                                        onChange={handleInputChange('remarks')}
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
                            {/* Add more Grid items with TextField components as needed */}
                        </Grid>
                    </Box>
                    

                </form>
                <Box sx={{
                        mt:2
                    }}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
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
            </Box>
            
        </Modal>
    );
};

export default CreateTripModal;
