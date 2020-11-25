import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-udemy-burger-build.firebaseio.com/'
});

export default instance;
