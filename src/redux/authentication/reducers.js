import Cookies from 'js-cookie';
import actions from './actions';
// import { loginUserApi } from '../../api/Auth';

const { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERR, LOGOUT_BEGIN, LOGOUT_SUCCESS, LOGOUT_ERR, USER_PROFILE } = actions;

const initState = {
  login: Cookies.get('logedIn'),
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
  const { type, data, err } = action;
  console.log('==============================');
  console.log(state);
  console.log('==============================');
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,

      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
      };
    case LOGOUT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case USER_PROFILE:
      return {
        ...state,
        profile: data,
        loading: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
