import { combineReducers } from 'redux'

import sortSlice from './filter-reducer'
import filterSlice from './checkbox-reducer'
import ticketSlice from './ticket-reducer'

const rootReducer = combineReducers({
  filters: filterSlice,
  sort: sortSlice,
  ticket: ticketSlice,
})
export default rootReducer
