import actions from './actions';

const initialState = {
  userProxies: {},
  adminProxies: {},
  superadminProxies: {},
  loading: false,
  error: null
};

const {
    FETCH_LIST_USER_PROXIES_BEGIN,
    FETCH_LIST_USER_PROXIES_SUCCESS,
    FETCH_LIST_USER_PROXIES_ERR,
} = actions;

const ReportsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FETCH_LIST_USER_PROXIES_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case FETCH_LIST_USER_PROXIES_SUCCESS:
      return {
        ...state,
        loading: false,
        userProxies: data,
      };

    case FETCH_LIST_USER_PROXIES_ERR:
      return {
        ...state,
        loading: false,
        error: err
      };

    default:
      return state;
  }
};

export default ReportsReducer;
