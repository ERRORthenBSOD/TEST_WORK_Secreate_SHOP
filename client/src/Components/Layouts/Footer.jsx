import React from 'react';
import {AppBar, Toolbar, Typography,} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	text: {
		padding: theme.spacing(2, 2, 0),
	},
	paper: {
		paddingBottom: 50,
	},
	list: {
		marginBottom: theme.spacing(2),
	},
	subheader: {
		backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		top: 'auto',
		bottom: 0,
		zIndex: theme.zIndex.drawer + 1,
	},
	grow: {
		flexGrow: 1,
	},
	fabButton: {
		position: 'absolute',
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto',
	},
	fontWeight: {
		fontWeight: '600'
	},
	favColor:{
		color: theme.palette.favorite,
	}
}));


const Footer = () => {
	const classes = useStyles();
	return (
		<AppBar position="fixed" color="primary" className={classes.appBar}>
			<Toolbar>
				<div className={classes.grow} />
				<Typography variant="h6"  align="center" className={classes.fontWeight}>
					«Магазин» - тестовое задание для компании Secreate.io
				</Typography>
			</Toolbar>
		</AppBar>
	);
};


export default Footer;
