import { createAsyncThunk } from '@reduxjs/toolkit'

import { addTickets, setLoading, setError } from '../reducers/ticket-reducer'

const baseURL = 'https://aviasales-test-api.kata.academy/'

const setSearchId = async () => {
  if (sessionStorage.getItem('searchId')) {
    return sessionStorage.getItem('searchId')
  }

  const resp = await fetch(`${baseURL}search`)
  const obj = await resp.json()

  sessionStorage.setItem('searchId', obj.searchId)
  return obj.searchId
}

const fetchTicketsUntilStop = async (searchId) => {
  const res = await fetch(`${baseURL}tickets?searchId=${searchId}`)
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Ошибка ${res.status}: ${errorText}`)
  }

  const data = await res.json()
  return { tickets: data.tickets, stop: data.stop }
}

const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true))
    const searchId = await setSearchId()
    let stop = false

    while (!stop) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const { tickets, stop: currentStop } = await fetchTicketsUntilStop(searchId)
        stop = currentStop
        dispatch(addTickets(tickets))
        dispatch(setLoading(false))
      } catch (error) {
        // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
  } catch (error) {
    dispatch(setError(error.message))
    return rejectWithValue(error.message)
  } finally {
    dispatch(setLoading(false))
  }
  return undefined
})

export default fetchTickets
