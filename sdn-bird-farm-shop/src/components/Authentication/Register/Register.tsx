import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormLabel, IconButton, InputAdornment, Radio, RadioGroup } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ApiService from '../ApiAuthService';
import { apiBaseUrl, basePonitUrl } from '../../../api/ApiConfig';
import dayjs from 'dayjs';
import { Login, Visibility, VisibilityOff } from '@mui/icons-material';

/** Import Css */
import './Register.css';

const defaultTheme = createTheme();

export default function Register() {

    //** Variable */
    const baseUrl = basePonitUrl.auth;
    const apiService = new ApiService();

    //** UseState variable */ 
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = React.useState(false);

    const [formData, setFormData] = React.useState({

        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: true,
        dateOfBirth: dayjs(),
        address: "1",
        role: "CUSTOMER"

    });

    const [formErrors, setFormErrors] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        phone: "",
        dateOfBirth: ""
    });

    /**
     * validateFirstName
     * @param value 
     * @returns 
     */
    const validateFirstName = (value: string) => {
        if (!value) {
            return "First Name is required.";
        }
        if (value.length >= 20) {
            return "Frist Name must be lower than 20 character."
        }
        return "";
    };

    /**
     * validateLastName
     * @param value 
     * @returns 
     */
    const validateLastName = (value: string) => {
        if (!value) {
            return "Last Name is required.";
        }
        if (value.length >= 20) {
            return "Last Name must be lower than 20 character."
        }
        return "";
    };

    /**
     * validateEmail
     * @param value 
     * @returns 
     */
    const validateEmail = (value: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!value) {
            return "Email is required.";
        } else if (!emailRegex.test(value)) {
            return "Invalid email format.";
        }
        return "";
    };

    /**
     * validatePassword
     * @param password 
     * @returns 
     */
    const validatePassword = (password: string) => {
        if (!password) {
            return "Password is required.";
        } else if (password.length < 8 || password.length > 20) {
            return "Password must be between 8 and 20 characters.";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(password)) {
            return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }

        return "";
    };

    /**
     * validateConfirmPassword
     * @param password 
     * @returns 
     */
    const validateConfirmPassword = (password: string) => {
        if (!password) {
            return "Password is required.";
        } else if (password.length < 8 || password.length > 20) {
            return "Password must be between 8 and 20 characters.";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(password)) {
            return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }

        if (password !== formData.password) {
            return "Confirm password does not match."
        }

        return "";
    };

    /**
     * validatePhone
     * @param phone 
     * @returns 
     */
    const validatePhone = (phone: string) => {
        const phoneRegex = /^\d{10}$/;

        if (!phone) {
            return "Phone number is required.";
        } else if (!phoneRegex.test(phone)) {
            return "Please enter a valid 10-digit phone number.";
        }

        return "";
    };

    /**
     * validateDateOfBirth
     * @param dateOfBirth 
     * @returns 
     */
    const validateDateOfBirth = (dateOfBirth: any) => {
        const currentDate = dayjs();
        const selectedDate = dayjs(dateOfBirth);
        const minDate = dayjs('1903-01-01');

        if (!dateOfBirth) {
            return "Date of birth is required.";
        } else if (selectedDate.isAfter(currentDate)) {
            return "Date of birth cannot be in the future.";
        } else if (selectedDate.isBefore(minDate)) {
            return "Date of birth cannot be earlier than 1903.";
        }

        return "";
    };

    //** Handle show pasword */ 
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setConfirmShowPassword((show) => !show);

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    /**
     * handleInputChange
     * @param event 
     */
    const handleInputChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        const errorMessage =
            name === "firstName"
                ? validateFirstName(value)
                : name === "lastName"
                    ? validateLastName(value)
                    : name === "email"
                        ? validateEmail(value)
                        : name === "password"
                            ? validatePassword(value)
                            : name === "phone"
                                ? validatePhone(value)
                                : name === "dateOfBirth"
                                    ? validateDateOfBirth(value)
                                    : name === "confirmPassword"
                                        ? validateConfirmPassword(value)
                                        : ""

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };

    /**
     * handleDateChange
     * @param date 
     */
    const handleDateChange = (date: any) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedDate: date,
        }));
    };

    /**
     * handleRegister
     * @param event 
     */
    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        console.log(apiBaseUrl);

        const obj = apiService.postData(baseUrl + '/register', formData);
        obj.then((res) => {
            console.log(res);
            localStorage.setItem("accessToken", res.token)
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container className={'register-form'} component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    error={!!formErrors.firstName}
                                    helperText={formErrors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    error={!!formErrors.lastName}
                                    helperText={formErrors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={!!formErrors.email}
                                    helperText={formErrors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>

                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={!!formErrors.password}
                                    helperText={formErrors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    error={!!formErrors.confirmPassword}
                                    helperText={formErrors.confirmPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}

                                >
                                    <FormControlLabel value={false} control={<Radio />} label="Female" />
                                    <FormControlLabel value={true} control={<Radio />} label="Male" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={formData.dateOfBirth}
                                        onChange={handleDateChange}
                                        maxDate={dayjs()}
                                        minDate={dayjs('1920-01-01')}

                                    />
                                </LocalizationProvider>
                                {formErrors.dateOfBirth && (
                                    <Typography variant="caption" color="error" >
                                        {formErrors.dateOfBirth}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone Number"
                                    type="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    error={!!formErrors.phone}
                                    helperText={formErrors.phone}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="allowExtraEmails"
                                            color="primary"
                                            onChange={handleInputChange}
                                        />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2, height: '50px' }}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <CssBaseline />
                        </Grid >
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
