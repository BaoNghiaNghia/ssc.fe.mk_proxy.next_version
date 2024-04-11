const actions = {
  FETCH_LIST_USER_PACKAGES_BEGIN: 'FETCH_LIST_USER_PACKAGES_BEGIN',
  FETCH_LIST_USER_PACKAGES_SUCCESS: 'FETCH_LIST_USER_PACKAGES_SUCCESS',
  FETCH_LIST_USER_PACKAGES_ERR: 'FETCH_LIST_USER_PACKAGES_ERR',
  // =============== PACKAGE INFO ====================
  FETCH_USER_PACKAGES_INFO_BEGIN: 'FETCH_USER_PACKAGES_INFO_BEGIN',
  FETCH_USER_PACKAGES_INFO_SUCCESS: 'FETCH_USER_PACKAGES_INFO_SUCCESS',
  FETCH_USER_PACKAGES_INFO_ERR: 'FETCH_USER_PACKAGES_INFO_ERR',

  fetchListUserPackagesBegin: (payload) => {
    return {
      type: actions.FETCH_LIST_USER_PACKAGES_BEGIN,
      payload,
    };
  },

  fetchListUserPackagesSuccess: (data) => {
    return {
      type: actions.FETCH_LIST_USER_PACKAGES_SUCCESS,
      data,
    };
  },

  fetchListUserPackagesErr: (err) => {
    return {
      type: actions.FETCH_LIST_USER_PACKAGES_ERR,
      err,
    };
  },
  // =============== PACKAGE INFO ====================
  fetchListUserPackagesInfoBegin: (payload) => {
    return {
      type: actions.FETCH_USER_PACKAGES_INFO_BEGIN,
      payload,
    };
  },

  fetchListUserPackagesInfoSuccess: (data) => {
    return {
      type: actions.FETCH_USER_PACKAGES_INFO_SUCCESS,
      data,
    };
  },

  fetchListUserPackagesInfoErr: (err) => {
    return {
      type: actions.FETCH_USER_PACKAGES_INFO_ERR,
      err,
    };
  },
};

export default actions;
