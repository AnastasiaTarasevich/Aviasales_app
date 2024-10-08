import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    all: true,
    noTransfers: true,
    oneTransfer: true,
    twoTransfers: true,
    threeTransfers: true,
  },
  reducers: {
    toggleFilter: (state, action) => {
      if (action.payload === 'all') {
        const newState = !state.all
        return {
          ...state,
          all: newState,
          noTransfers: newState,
          oneTransfer: newState,
          twoTransfers: newState,
          threeTransfers: newState,
        }
      }
      const newFilterState = {
        ...state,
        [action.payload]: !state[action.payload],
      }

      const allSelected =
        newFilterState.noTransfers &&
        newFilterState.oneTransfer &&
        newFilterState.twoTransfers &&
        newFilterState.threeTransfers

      return {
        ...newFilterState,
        all: allSelected,
      }
    },
  },
})

export const { toggleFilter } = filterSlice.actions
export default filterSlice.reducer
