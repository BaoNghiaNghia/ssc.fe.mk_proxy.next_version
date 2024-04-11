import { all } from 'redux-saga/effects';
import { loginWatcherSaga, logoutWatcherSaga } from './authentication/sagas';
import { fetchListUserProxyWatcherSaga } from './proxies/sagas';

export default function* rootSaga() {
    return yield all([
        loginWatcherSaga(),
        logoutWatcherSaga(),
        fetchListUserProxyWatcherSaga()
    ]);
}