import { createSlice } from '@reduxjs/toolkit'

const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    tickets: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTickets(state, action) {
      // Создаем новое состояние для tickets, добавляя новые билеты
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
      }
    },
    setLoading(state, action) {
      // Создаем новое состояние для loading
      return {
        ...state,
        loading: action.payload,
      }
    },
    setError(state, action) {
      // Создаем новое состояние для error
      return {
        ...state,
        error: action.payload,
      }
    },
  },
})

export const { addTickets, setLoading, setError } = ticketSlice.actions

export default ticketSlice.reducer
