import { combineReducers } from 'redux'
import session from './account/session'

const rootReducer = combineReducers({
    session,

})

export default rootReducer