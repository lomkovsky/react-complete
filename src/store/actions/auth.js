import actionTypes from './actionTypes';
import jwt from 'jsonwebtoken';
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

const authFail = (error) => {
  console.log('error ', error)
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
}

const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
}

export const auth = (email, password, isSignup) => {
  return async dispatch => {
    try {
      dispatch(authStart());
      const authData = {
        email,
        password,
        returnSecureToken: true,
      }
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8jTWCv3RDON3EZluwZWhlbJryb0KkAzs'
      if (!isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8jTWCv3RDON3EZluwZWhlbJryb0KkAzs'
      }
      const resultAuth = await axios.post(url, authData);
      const expirationDate = new Date(new Date().getTime() + resultAuth.data.expiresIn * 1000);
      const decodedToken = jwt.decode(resultAuth.data.idToken, {complete: true});
      const expirationDateFromToken = new Date(decodedToken.payload.exp * 1000);
      console.log('expirationDateFromToken ', expirationDateFromToken);
      localStorage.setItem('token', resultAuth.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', resultAuth.data.localId);
      dispatch(authSuccess(resultAuth.data.idToken, resultAuth.data.localId,));
      dispatch(checkAuthTimeout(resultAuth.data.expiresIn));
    } catch (e) {
      dispatch(authFail(e.response.data.error));
    }
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  }
}