import React, {Component, lazy, Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Loading from '../Components/Loading'
import loggedIn from '../Helpers/LoggedIn'
import isUserValid from '../Helpers/isUserValid'

/*  404   */
const NotFound = lazy(() => import('../Components/NotFound'));

/*  USER ROUTES   */
const Login = lazy(() => import('../Controllers/User/Login'));
const Registration = lazy(() => import('../Controllers/User/Registration'));
const Shop = lazy(() => import('../Controllers/Shop'));
const ShoppingCart = lazy(() => import('../Controllers/ShoppingCart'));

// Роутер работает с код сплитингом с помощью React.lazy , во время подгрузки раутов показывается компонент Loading с помощью React.suspense
class Routes extends Component {
	render() {
		// Создаём кастомный приватный раут для юзера
		const PrivateUserRoute = ({ component: Component, ...rest }) => (
			<Route {...rest} render={(props) => (
				(isUserValid() === 'user')
					? <Component {...props} />
					: <Redirect to='/login' />
			)} />
		);
		return (
			<Router>
				<Suspense fallback={<Loading/>}>
					<Switch>
						<Route exact path="/" render={() => {
							if(loggedIn() && isUserValid() === 'user') return <Redirect to="/shop"/>;
							else return <Login/>
						}}/>
						<Route path="/login" component={Login} />
						<Route path="/registration" component={Registration} />

						<PrivateUserRoute exact path="/shop" component={Shop}/>
						<PrivateUserRoute exact path="/cart" component={ShoppingCart}/>
						{/* 404*/}
						<Route path="*" component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		);
	}
}


export default Routes;
