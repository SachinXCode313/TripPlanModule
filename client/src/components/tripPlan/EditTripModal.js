import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TextField } from '@mui/material';
import { useTheme } from '@emotion/react';
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'country') {
            const countryCode = countries.find(c => c.name === value)?.isoCode || '';
            setFormData(prev => ({
                ...prev,
                state: '',
                city: '',
                countryCode,
            }));
        }
        if (name === 'state') {
            const stateCode = states.find(s => s.name === value)?.isoCode || '';
            setFormData(prev => ({
                ...prev,
                city: '',
                stateCode,
            }));
        }
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
                    Edit Trip
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
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
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
                                            <MenuItem key={country.isoCode} value={country.name}>
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
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
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
                                            <MenuItem key={state.isoCode} value={state.name}>
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
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
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
                                        name="clientName"
                                        value={formData.clientName}
                                        onChange={handleInputChange}
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
                                        variant="outlined"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: 270 }} size="small">
                                    <TextField
                                        label="Purpose"
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleInputChange}
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
                                        variant="outlined"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: 270 }} size="small">
                                    <TextField
                                        label="Remarks"
                                        name="remarks"
                                        value={formData.remarks}
                                        onChange={handleInputChange}
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
                                        variant="outlined"
                                    />
                                </FormControl>
                            </Grid>
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
                </form>
            </Box>
        </Modal>
    );
};

export default EditTripModal;
