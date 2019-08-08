import React from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    CssBaseline,
    Grid,
    Paper,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Link as LinkRouter} from 'react-router-dom'
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random?q=20)',
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
	input: {
		marginBottom: 20
	},
	boldFont: {
		fontWeight: 600,
	},
	rememberMeLabel:{
		width: '100%'
	},
}));

export default function LoginComponent(props) {
	const classes = useStyles();
	const {
		changeEmail,
		changePassword,
		handleSubmit,
		email,
		password,
		loading,
	} = props;
	return (
		<ValidatorForm
			onSubmit={handleSubmit}
			id="loginForm"
		>
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<AppBar position="static" color="default">
					<Tabs
						value={1}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						<Tab label="Регистрация"   component={LinkRouter} className={classes.boldFont}
							 to={'/registration'} />
						<Tab label="Авторизация" className={classes.boldFont} />
					</Tabs>
				</AppBar>
				<div className={classes.paper}>
						<img src='/images/logo.png' className={classes.logo} alt='logo'/>
					<Typography variant="h3" className={classes.boldFont}>
						Вход в магазин
					</Typography>
					<br/>
						<TextValidator
							label="Электронный ящик"
							onChange={changeEmail}
							className={classes.input}
							variant="outlined"
							id={'email'}
							fullWidth
							name="email"
							value={email}
							validators={['required', 'isEmail']}
							errorMessages={['Это поле обязательно', 'неправильный формат']}
						/>
						<TextValidator
							label="Пароль"
							onChange={changePassword}
							variant="outlined"
							fullWidth
							name="password"
							type="password"
							id="password"
							value={password}
							validators={['required']}
							autoComplete="current-password"
							errorMessages={['Это поле обязательно']}
						/>

					{loading && <CircularProgress className={classes.progress} />}
					{!loading && <Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						<Typography variant="button" display="block" gutterBottom>
						Вход
						</Typography>
					</Button>}

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

LoginComponent.propTypes = {
	handleSubmit: PropTypes.func,
	password: PropTypes.string,
	changePassword: PropTypes.func,
	changeEmail: PropTypes.func,
	email: PropTypes.string,
	loading: PropTypes.bool
};