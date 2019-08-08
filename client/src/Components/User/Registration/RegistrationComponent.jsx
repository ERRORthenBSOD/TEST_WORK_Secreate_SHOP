import React from 'react';
import {
	AppBar,
	Box,
	Button,
	CircularProgress,
	CssBaseline,
	Grid,
	Paper,
	Tab,
	Tabs,
	Typography,
} from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import {makeStyles} from '@material-ui/core/styles';
import {Link as LinkRouter} from 'react-router-dom'
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import emailMask from "text-mask-addons/dist/emailMask";
import PropTypes from "prop-types";


const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
		fontSize: '1.6rem'
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	logo: {
		height: 200
	},
	widthSelect: {
		maxWidth: '100%'
	},
	redText: {
		color: 'red'
	},
	buttonFullWidth: {
		width: '100%'
	},
	formControlFull: {
		width: '100%'
	},
    littleMargin: {
	    marginTop: '5px',
	    marginBottom: '5px'
    },
	boldFont: {
		fontWeight: 600,
	},
	labelPhone: {
		backgroundColor: 'white'
	},
	alreadyRegistered:{
		textDecoration: 'none'
	}
}));


export default function RegistrationComponent(props) {
	ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
		return value === password;
	});

	const classes = useStyles();
	const {
		handleSubmit,
		password,
		repeatPassword,
		changePassword,
		changeRepeatPassword,
		changeEmail,
		email,
		loading,
	} = props;


	return (
		<ValidatorForm
			onSubmit={handleSubmit}
			id="registrationForm"
		>
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<AppBar position="static" color="default">
					<Tabs
						value={0}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						<Tab label="Регистрация" className={classes.boldFont} />
						<Tab label="Авторизация"   component={LinkRouter} className={classes.boldFont}
							 to={'/login'} />
					</Tabs>
				</AppBar>
				<div className={classes.paper}>
					<img src='/images/logo.png' className={classes.logo} alt='logo'/>
					<Typography variant="h3" className={classes.boldFont}>
						Регистрация
					</Typography>
                    <br/>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextValidator
									label="Электронный ящик"
									onChange={changeEmail}
									variant="outlined"
									fullWidth
									name="email"
									id="email"
									placeholder='example@mail.com'
									value={email}
									validators={['required', 'isEmail']}
									errorMessages={['Это поле обязательно', 'неправильный формат']}
									InputLabelProps={{
										shrink: true,
									}}
									InputProps={{inputComponent: EmailMaskCustom}}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextValidator
									label="Пароль"
									onChange={changePassword}
									name="password"
									type="password"
									id="password"
									fullWidth
									variant="outlined"
									validators={['required']}
									errorMessages={['Это поле обязательно']}
									value={password}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextValidator
									label="Повторите пароль"
									onChange={changeRepeatPassword}
									name="repeatPassword"
									type="password"
									id="repeatPassword"
									fullWidth
									variant="outlined"
									validators={['isPasswordMatch', 'required']}
									errorMessages={['Пароли не совпадают', 'Это поле обязательно']}
									value={repeatPassword}
								/>
							</Grid>

						</Grid>
						{loading && <CircularProgress className={classes.progress} />}
						{!loading && <Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							<Typography variant="button" display="block" gutterBottom>
							Зарегистрироваться
							</Typography>
						</Button>}

						<Grid container justify="flex-end">
							<Grid item>
								<LinkRouter to='/login' className={classes.alreadyRegistered}>
									<Typography variant="subtitle1" color="textSecondary" >
										Уже зарегистрированы? Заходите
									</Typography>
								</LinkRouter>
							</Grid>
						</Grid>
							<Box mt={5}>
								<Typography variant="body2" color="textSecondary" align="center">
									«Магазин» - тестовое задание для компании Secreate.io
								</Typography>
							</Box>
				</div>

			</Grid>
		</Grid>
		</ValidatorForm>
	);
}


function EmailMaskCustom(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={emailMask}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}
RegistrationComponent.propTypes = {
	handleSubmit: PropTypes.func,
	password: PropTypes.string,
	repeatPassword: PropTypes.string,
	changePassword: PropTypes.func,
	changeRepeatPassword: PropTypes.func,
	changeEmail: PropTypes.func,
	email: PropTypes.string,
	loading: PropTypes.bool
};