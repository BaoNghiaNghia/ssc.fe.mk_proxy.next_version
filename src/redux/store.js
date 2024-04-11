import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import firebase, { storage as firebaseStorage } from 'firebase';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from "redux-saga";

import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducers';
import rootSaga from './rootSagas';
import fbConfig from '../config/database/firebase';

const logger = createLogger({});

// const sagaMonitor =
//     process.env.NODE_ENV === 'development'
//         ? console.tron.createSagaMonitor()
//         : null;
        
const sagaMiddleware = createSagaMiddleware({
  // sagaMonitor
});

const reduxDevTool =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(
        // console.tron.createEnhancer(),
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore, firebaseStorage }), logger, sagaMiddleware),
        reduxFirestore(fbConfig),
      )
    : compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore, firebaseStorage }), sagaMiddleware),
        reduxFirestore(fbConfig),
      );

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, reduxDevTool);

// running the sagas
sagaMiddleware.run(rootSaga);

export const rrfProps = {
  firebase,
  config: (fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true }),
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export const persistor = persistStore(store);