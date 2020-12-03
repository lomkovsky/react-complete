import actionTypes from './actionTypes';
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
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
}

const checkAuthTimeout = (expirationTime) => {
  console.log('expirationTime ', expirationTime)
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

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
      dispatch(authSuccess(resultAuth.data.idToken, resultAuth.data.localId,));
      dispatch(checkAuthTimeout(resultAuth.data.expiresIn));
    } catch (e) {
      dispatch(authFail(e.response.data.error));
    }
  }
}