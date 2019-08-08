import React, {Component} from 'react';
import LoginComponent from '../../../Components/User/Login/LoginComponent'
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom'
import apiRequest from "../../../Helpers/apiRequest";
import {LOGIN} from "../../../config";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";


class Login extends Component {
	state = {
		email: "",
		password: "",
		loading: false
	};


	handleSubmit = async () => {
		try {
			this.setState({
				loading: true
			});
			const {email, password} = this.state;
			const loginResponse = await apiRequest(LOGIN, 'POST', {}, {email, password});
			if (loginResponse.data && loginResponse.data.result === 'success' && loginResponse.data.data === 'Auth successful') {
				// если получили токен то сохраняем его в локал сторейдж а также декодируем его для того чтобы туда же положить инфу о юзере
				const user = jwtDecode(loginResponse.data.token);
				localStorage.setItem('access_token', loginResponse.data.token);
				localStorage.setItem('user', JSON.stringify(user));
				this.props.history.push('/shop')
			} else {
				this.setState({
					loading: false
				});
				Swal.fire({
					confirmButtonColor: '#ff3366',
					titleText: 'Ошибка!',
					text: 'Неправильные данные',
					type: 'error'
				});
			}
		} catch (e) {
			Swal.fire({
				confirmButtonColor: '#ff3366',
				titleText: 'Ошибка!',
				text: 'Случилась ошибка при логине' + JSON.stringify(e.message),
				type: 'error'
			});
			console.log( `error in login`, e);
			this.setState({
				loading: false
			});
		}
	};

	changeEmail = (e) => {
		this.setState({
			email: e.target.value
		})
	};

	changePassword = (e) => {
		const password = e.target.value;
		this.setState({
			password,
		})
	};


	render() {
		const { email, password, loading } = this.state;
		return (
				<LoginComponent
					changeEmail={this.changeEmail}
					changePassword={this.changePassword}
					handleSubmit={this.handleSubmit}
					email={email}
					password={password}
					loading={loading}
				/>
		);
	}
}

Login.propTypes = {
	history: PropTypes.object,
	location: PropTypes.object,
};

export default withRouter(Login) ;
