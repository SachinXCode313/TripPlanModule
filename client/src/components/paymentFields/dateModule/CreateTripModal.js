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
import { debounce } from 'lodash';

const CreatePlanModal = ({ open, handleClose, date, day, setTripPlanList }) => {
    const theme = useTheme();
    const [countries, setCountries] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [cities, setCities] = React.useState([]);
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

    const handleCountryChange = (event, value) => {
        const countryCode = value?.isoCode || '';
        setFormData(prev => ({
            ...prev,
            day: day,
            date: date,
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

    const handleInputChange = (name) => (event) => {
        setFormData({
            ...formData,
            [name]: event.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting formData:', formData);
        setTripPlanList(formData);
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
        handleClose();
    };

    const handleCancel = () => {
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
        handleClose();
    };

    const debouncedHandleCountryChange = debounce(handleCountryChange, 300);
    const debouncedHandleStateChange = debounce(handleStateChange, 300);
    const debouncedHandleCityChange = debounce(handleCityChange, 300);

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
                backdropFilter: 'blur(0.7px)',
            }}
            keepMounted
        >
            <Box
                sx={{
                    mt: 5,
                    width: {
                        xs: '90%',
                        sm: '60%',
                        md: '50%',
                        lg: '40%',
                        xl: '35%',
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
                    Create Trip
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ flexGrow: 1, p: 1, mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    options={countries}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={countries.find(c => c.name === formData.country) || null}
                                    onChange={debouncedHandleCountryChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Country"
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 45,
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
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    options={states}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={states.find(s => s.name === formData.state) || null}
                                    onChange={debouncedHandleStateChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select State"
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 45,
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
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    options={cities}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={cities.find(c => c.name === formData.city) || null}
                                    onChange={debouncedHandleCityChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select City"
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 45,
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
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Client Name"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleInputChange('clientName')}
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
                                    onChange={handleInputChange('purpose')}
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
                                    onChange={handleInputChange('remarks')}
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
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
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
                            Create
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

export default CreatePlanModal;
