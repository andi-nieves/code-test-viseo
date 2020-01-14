import { combineReducers } from 'redux';

// Reducers
import Auth from './Auth';

// Actions
import * as AuthActions from './Auth'

export default combineReducers({
    Auth
})

export {
    AuthActions
}