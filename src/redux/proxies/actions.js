const actions = {
    FETCH_LIST_USER_PROXIES_BEGIN: 'FETCH_LIST_USER_PROXIES_BEGIN',
    FETCH_LIST_USER_PROXIES_SUCCESS: 'FETCH_LIST_USER_PROXIES_SUCCESS',
    FETCH_LIST_USER_PROXIES_ERR: 'FETCH_LIST_USER_PROXIES_ERR',

    fetchListUserProxyBegin: (payload) => {
      return {
        type: actions.FETCH_LIST_USER_PROXIES_BEGIN,
        payload
      };
    },
  
    fetchListUserProxySuccess: (data) => {
      return {
        type: actions.FETCH_LIST_USER_PROXIES_SUCCESS,
        data,
      };
    },
  
    fetchListUserProxyErr: (err) => {
      return {
        type: actions.FETCH_LIST_USER_PROXIES_ERR,
        err,
      };
    },
};
    
export default actions;