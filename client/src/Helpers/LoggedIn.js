const loggedIn = () => !!localStorage.getItem('access_token');
export default loggedIn;
