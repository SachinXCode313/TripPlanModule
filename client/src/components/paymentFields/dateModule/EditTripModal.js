import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';
import { City, Country, State } from 'country-state-city';

const EditTripModal = ({ open, handleClose, initialData, setTripPlanList, index }) => {
    const theme = useTheme();
    const [countries, setCountries] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [formData, setFormData] = React.useState({
        date: '',
        country: '',
        state: '',
        city: '',
        clientName: '',
        purpose: '',
        remarks: '',
        countryCode: '',
        stateCode: '',
    });

    React.useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countries = await Country.getAllCountries();
                setCountries(countries);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCountries();
    }, []);

    React.useEffect(() => {
        const fetchStates = async () => {
            if (formData.countryCode) {
                try {
                    const states = await State.getStatesOfCountry(formData.countryCode);
                    setStates(states);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchStates();
    }, [formData.countryCode]);

    React.useEffect(() => {
        const fetchCities = async () => {
            if (formData.stateCode) {
                try {
                    const cities = await City.getCitiesOfState(formData.countryCode, formData.stateCode);
                    setCities(cities);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchCities();
    }, [formData.stateCode]);

    React.useEffect(() => {
        if (initialData[index]) {
            const data = initialData[index];
            setFormData({
                date: data.date,
                country: data.country,
                state: data.state,
                city: data.city,
                clientName: data.clientName,
                purpose: data.purpose,
                remarks: data.remarks,
                countryCode: data.countryCode,
                stateCode: data.stateCode,
            });
        }
    }, [initialData, index]);

    const handleCountryChange = (event, value) => {
        const countryCode = value?.isoCode || '';
        setFormData(prev => ({
            ...prev,
            country: value?.name || '',
            state: '',
            city: '',
            countryCode,
            stateCode: '',
        }));
    };

    const handleStateChange = (event, value) => {
        const stateCode = value?.isoCode || '';
        setFormData(prev => ({
            ...prev,
            state: value?.name || '',
            city: '',
            stateCode,
        }));
    };

    const handleCityChange = (event, value) => {
        setFormData(prev => ({
            ...prev,
            city: value?.name || '',
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting formData:', formData);
        setTripPlanList(formData, index);

        handleClose();
    };

    const handleCancel = () => {

        handleClose();
    };
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
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 1,
                }}
            >
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    Edit Trip
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ flexGrow: 1, p: 1, mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    options={countries}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={countries.find(c => c.name === formData.country) || null}
                                    onChange={handleCountryChange}
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
                                    getOptionLabel={(option) => option.name || ''}
                                    value={states.find(s => s.name === formData.state) || null}
                                    onChange={handleStateChange}
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
                                    getOptionLabel={(option) => option.name || ''}
                                    value={cities.find(c => c.name === formData.city) || null}
                                    onChange={handleCityChange}
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
                            <Grid item xs={6}>
                                    <TextField
                                        label="Client Name"
                                        name="clientName"
                                        value={formData.clientName}
                                        onChange={handleInputChange}
                                        size="small"
                                        fullWidth
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                height: 45,
                                                width: '100%'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                color: theme.palette.text.primary,
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.palette.text.primary,
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: theme.palette.text.primary,
                                                '&.Mui-focused': {
                                                    color: theme.palette.text.primary,
                                                },
                                            },
                                        }}
                                        variant="outlined"
                                    />
                            </Grid>
                            <Grid item xs={6}>
                                    <TextField
                                        label="Purpose"
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleInputChange}
                                        size="small"
                                        fullWidth
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                height: 45,
                                                width: '100%'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                color: theme.palette.text.primary,
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.palette.text.primary,
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: theme.palette.text.primary,
                                                '&.Mui-focused': {
                                                    color: theme.palette.text.primary,
                                                },
                                            },
                                        }}
                                        variant="outlined"
                                    />
                            </Grid>
                            <Grid item xs={6}>
                                    <TextField
                                        label="Remarks"
                                        name="remarks"
                                        value={formData.remarks}
                                        onChange={handleInputChange}
                                        size="small"
                                        fullWidth
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                height: 45,
                                                width: '100%'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                color: theme.palette.text.primary,
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.palette.text.primary,
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: theme.palette.text.primary,
                                                '&.Mui-focused': {
                                                    color: theme.palette.text.primary,
                                                },
                                            },
                                        }}
                                        variant="outlined"
                                    />
                            </Grid>
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
                            Update
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

export default EditTripModal;
