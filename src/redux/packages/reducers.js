import actions from './actions';

const initialState = {
  userPackages: {},
  adminPackages: {},
  superAdminPackages: {},
  packagePlansInfo: {},
  loading: false,
  error: null,
};

const {
  FETCH_LIST_USER_PACKAGES_BEGIN,
  FETCH_LIST_USER_PACKAGES_SUCCESS,
  FETCH_LIST_USER_PACKAGES_ERR,
  FETCH_USER_PACKAGES_INFO_BEGIN,
  FETCH_USER_PACKAGES_INFO_SUCCESS,
  FETCH_USER_PACKAGES_INFO_ERR,
} = actions;

const PackagesReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FETCH_LIST_USER_PACKAGES_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case FETCH_LIST_USER_PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        userPackages: data,
      };

    case FETCH_LIST_USER_PACKAGES_ERR:
      return {
        ...state,
        loading: false,
        error: err,
      };

    // PACKAGE PLANS INFO
    case FETCH_USER_PACKAGES_INFO_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_PACKAGES_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        packagePlansInfo: data,
      };

    case FETCH_USER_PACKAGES_INFO_ERR:
      return {
        ...state,
        loading: false,
        error: err,
      };

    default:
      return state;
  }
};

export default PackagesReducer;
