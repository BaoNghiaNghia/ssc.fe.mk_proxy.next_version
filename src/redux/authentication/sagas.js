import Cookies from 'js-cookie';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import actions from "./actions";
import { loginUserApi } from '../../config/apiFactory/Auth/index';
import { MESSSAGE_STATUS_CODE } from '../../variables';

function* loginSaga(params) {
  try {
    const response = yield call(loginUserApi, params?.payload?.request);
    
    if (response?.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
      toast.success('Đăng nhập thành công');

      const dataResponse = response?.data?.data;
      Cookies.set('logedIn', dataResponse?.token);
      Cookies.set('userInfo', JSON.stringify(dataResponse?.user));

      yield put(
        actions.loginSuccess(dataResponse)
      );

      params?.payload?.history.push('/admin/tong-quan');
    }
  } catch (error) {
    const errorMessage = error;
    yield put(
      actions.loginErr({ error: errorMessage || 'Login failed' })
    );

    if (errorMessage?.response?.data?.data?.error) {
      toast.error(errorMessage?.response?.data?.data?.error);
    } else {
      toast.error('Login failed');
    }
  } finally { /* empty */ }
}

function* logoutSaga() {
  try {
    Cookies.remove('logedIn');

    yield put(
      actions.logoutSuccess(null)
    )
  } catch (error) {
    console.log(error);
  } finally {
    yield put(actions.logoutErr());
  }
}

export function* logoutWatcherSaga() {
  yield takeLatest(actions.LOGOUT_BEGIN, logoutSaga);
}

export function* loginWatcherSaga() {
  yield takeLatest(actions.LOGIN_BEGIN, loginSaga);
}
