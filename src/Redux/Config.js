import { AsyncStorage } from 'AsyncStorage';
import { createStore } from 'redux';
import reducers from './Module';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = { 
  key: 'mcrroot',
  storage: AsyncStorage,
  whitelist: ['Auth'],
  blacklist: [],
  timeout: 0
};

const persistedRecuder = persistReducer(persistConfig, reducers);
const store = createStore(persistedRecuder);
const persistor = persistStore(store);

export { store, persistor }
