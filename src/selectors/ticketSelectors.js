import { createSelector } from 'reselect'

const selectTickets = (state) => state.ticket.tickets
const selectFilters = (state) => state.filters
const selectSort = (state) => state.sort

const selectFilteredTickets = createSelector([selectTickets, selectFilters, selectSort], (tickets, filters, sort) => {
  const hasActiveFilters = filters.noTransfers || filters.oneTransfer || filters.twoTransfers || filters.threeTransfers

  const filteredTickets =
    filters.all || !hasActiveFilters
      ? tickets
      : tickets.filter((ticket) => {
          const outboundStops = ticket.segments[0].stops.length
          const returnStops = ticket.segments[1].stops.length

          const matchesFilters = [
            filters.noTransfers && (outboundStops === 0 || returnStops === 0),
            filters.oneTransfer && (outboundStops === 1 || returnStops === 1),
            filters.twoTransfers && (outboundStops === 2 || returnStops === 2),
            filters.threeTransfers && (outboundStops === 3 || returnStops === 3),
          ]

          return matchesFilters.some((match) => match)
        })

  if (!hasActiveFilters) {
    return []
  }
  let sortedTickets
  switch (sort) {
    case 'cheapest':
      sortedTickets = [...filteredTickets].sort((a, b) => a.price - b.price)
      break
    case 'faster':
      sortedTickets = [...filteredTickets].sort((a, b) => {
        const aDuration = a.segments.reduce((total, segment) => total + segment.duration, 0)
        const bDuration = b.segments.reduce((total, segment) => total + segment.duration, 0)
        return aDuration - bDuration
      })
      break
    case 'optimal':
      sortedTickets = [...filteredTickets].sort((prev, next) => {
        const totalDurationPrev = prev.segments.reduce((total, segment) => total + segment.duration, 0)
        const totalDurationNext = next.segments.reduce((total, segment) => total + segment.duration, 0)
        return totalDurationPrev + prev.price - (totalDurationNext + next.price)
      })
      break
    default:
      sortedTickets = filteredTickets
  }

  return sortedTickets
})
export default selectFilteredTickets
