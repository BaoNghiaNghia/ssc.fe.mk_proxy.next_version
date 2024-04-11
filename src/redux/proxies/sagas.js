import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import actions from "./actions";
import { MESSSAGE_STATUS_CODE } from '../../variables';
import { fetchListUserProxyApi } from '../../api/UserProxy/index'

function* fetchListUserProxyFunc() {
  try {
    const response = yield call(fetchListUserProxyApi, {});

    if (response?.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
      yield put(
        actions.fetchListUserProxySuccess(response?.data?.data)
      );
    }
  } catch (err) {
    yield put(
      actions.fetchListUserProxyErr({ error: err || 'Fetch user proxies failed' })
    )
  }
}

export function* fetchListUserProxyWatcherSaga() {
  yield takeLatest(actions.FETCH_LIST_USER_PROXIES_BEGIN, fetchListUserProxyFunc);
}