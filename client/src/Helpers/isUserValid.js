
const isUserValid = () => {
    const access_token = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user'));
    if(access_token && user){
        return 'user';
    }
    else{
        return null
    }
};

export default isUserValid;
