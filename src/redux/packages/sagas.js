import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import actions from './actions';
import { MESSSAGE_STATUS_CODE } from '../../variables';
import { fetchListUserPackageApi, fetchPackageInfoApi } from '../../api/UserPackage/index';

function* fetchListUserPackageFunc() {
  try {
    const response = yield call(fetchListUserPackageApi, {});

    if (response?.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
      yield put(actions.fetchListUserPackagesSuccess(response?.data?.data));
    }
  } catch (err) {
    yield put(actions.fetchListUserPackagesErr({ error: err || 'Fetch user packages failed' }));
  }
}

function* fetchUserPackagePlansInfoFunc() {
  try {
    const response = yield call(fetchPackageInfoApi, {});

    if (response?.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
      yield put(actions.fetchListUserPackagesInfoSuccess(response?.data?.data));
    }
  } catch (err) {
    yield put(actions.fetchListUserPackagesInfoErr({ error: err || 'Fetch package plans infomation failed' }));
  }
}

export function* fetchListUserPackageWatcherSaga() {
  yield takeLatest(actions.FETCH_LIST_USER_PACKAGES_BEGIN, fetchListUserPackageFunc);
  yield takeLatest(actions.FETCH_USER_PACKAGES_INFO_BEGIN, fetchUserPackagePlansInfoFunc);
}
