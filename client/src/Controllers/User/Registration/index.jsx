import React, {Component} from 'react';
import RegistrationComponent from '../../../Components/User/Registration/RegistrationComponent'
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom'
import apiRequest from '../../../Helpers/apiRequest'
import {REGISTRATION, LOGIN} from '../../../config'
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

class Registration extends Component {
    state = {
        email: "",
        password: "",
        repeatPassword: "",
        loading: false,
        foreigner: false,
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

    changeRepeatPassword = (e) => {
        const repeatPassword = e.target.value;
        this.setState({
            repeatPassword,
        })
    };

    // Функцция регистрации
    handleSubmit = async () => {
        this.setState({
            loading: true
        });
        const {
            password,
            email,
        } = this.state;

        const variables = {
            email,
            password,
        };
        try {
            // запрос на регистрацию
            const registrationResponse = await apiRequest(REGISTRATION, 'POST', {}, variables);
            // если пользователя нет в системе далее делаем логин
            if (registrationResponse.data && registrationResponse.data.result === 'success' && registrationResponse.data.data === 'User created') {
                return await this.loginUser(email, password);
            }
            // если пользователь с таким ящиком найден то выводим алерт
            if (registrationResponse.data && registrationResponse.data.result === 'error' && registrationResponse.data.data === 'User already exists') {
                return this.setState({loading: false}, () => {
                    Swal.fire({
                        confirmButtonColor: '#ff3366',
                        titleText: 'Внимание!',
                        text: 'Данный E-mail уже был зарегистрирован ранее. Попробуйте другой',
                        type: 'warning'
                    });
                });
            }
            return this.setState({loading: false}, () => {
                Swal.fire({
                    confirmButtonColor: '#ff3366',
                    titleText: 'Ошибка!',
                    text: 'Случилась ошибка при регистрации попробуйте еще раз',
                    type: 'error'
                });
            });
        } catch (e) {
            Swal.fire({
                confirmButtonColor: '#ff3366',
                titleText: 'Ошибка!',
                text: 'Случилась ошибка при регистрации' + JSON.stringify(e.message),
                type: 'error'
            });
            this.setState({
                loading: false
            });
            console.log(e);
        }

    };

    loginUser = async (email, password) => {
        try {
            const loginResponse = await apiRequest(LOGIN, 'POST', {}, {email, password});
            if (loginResponse.data && loginResponse.data.result === 'success' && loginResponse.data.data === 'Auth successful') {
                // если получили токен то сохраняем его в локал сторейдж а также декодируем его для того чтобы туда же положить инфу о юзере
                const user = jwtDecode(loginResponse.data.token);
                localStorage.setItem('access_token', loginResponse.data.token);
                localStorage.setItem('user', JSON.stringify(user));
                Swal.fire({
                    confirmButtonColor: '#ff3366',
                    titleText: 'Успешно!',
                    text: 'Вы успешно зарегистрированы',
                    type: 'success'
                }).then((result) => {
                    // Переход в галерею
                    if (result.value) { this.props.history.push('/shop') }
                    else {
                        Swal.fire({
                            confirmButtonColor: '#ff3366',
                            titleText: 'Ошибка!',
                            text: 'Случилась ошибка при логине попробуйте еще раз',
                            type: 'error'
                        });
                    }
                });
            } else {
                this.setState({
                    loading: false
                });
                Swal.fire({
                    confirmButtonColor: '#ff3366',
                    titleText: 'Ошибка!',
                    text: 'Случилась ошибка при логине попробуйте еще раз',
                    type: 'error'
                });
            }
        } catch (e) {
            this.setState({
                loading: false
            });
            Swal.fire({
                confirmButtonColor: '#ff3366',
                titleText: 'Ошибка!',
                text: 'Случилась ошибка при логине' + JSON.stringify(e.message),
                type: 'error'
            });
            console.log(`error in login`, e);
        }
    };


    render() {
        const {
            password,
            repeatPassword,
            email,
            loading,
        } = this.state;
        return (
            <>
                <RegistrationComponent
                    loading={loading}
                    changePassword={this.changePassword}
                    changeRepeatPassword={this.changeRepeatPassword}
                    handleSubmit={this.handleSubmit}
                    changeEmail={this.changeEmail}
                    email={email}
                    password={password}
                    repeatPassword={repeatPassword}
                />
            </>
        );
    }
}

Registration.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default withRouter(Registration);
