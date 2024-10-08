import React from 'react'
import { format, add } from 'date-fns'
import PropTypes from 'prop-types'

import styles from './ticket.module.scss'

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}ч ${remainingMinutes}м`
}

function Ticket({
  ticket = {
    price: 0,
    carrier: '',
    segments: [
      {
        origin: '',
        destination: '',
        date: '',
        stops: [],
        duration: 0,
      },
      {
        origin: '',
        destination: '',
        date: '',
        stops: [],
        duration: 0,
      },
    ],
  },
}) {
  if (!ticket || !ticket.segments || ticket.segments.length === 0) {
    return <div>No data available for this ticket.</div>
  }
  const { price, carrier, segments } = ticket
  const outbound = segments[0]
  const inbound = segments[1]

  const outboundDepartureTime = format(new Date(outbound.date), 'HH:mm')
  const outboundArrivalTime = format(add(new Date(outbound.date), { minutes: outbound.duration }), 'HH:mm')
  const inboundDepartureTime = format(new Date(inbound.date), 'HH:mm')
  const inboundArrivalTime = format(add(new Date(inbound.date), { minutes: inbound.duration }), 'HH:mm')
  const timeFly = formatDuration(outbound.duration)
  const timeFlyIn = formatDuration(inbound.duration)
  return (
    <div className={styles.ticket}>
      <div className={styles.ticket__header}>
        <span className={styles['ticket__header-price']}>{price} P</span>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="logo" className={styles['ticket__header-logo']} />
      </div>
      <div className={styles.ticket__info}>
        <span>
          <p className={styles.ticket__text}>
            {outbound.origin} – {outbound.destination}
          </p>
          <p className={styles['ticket__text-info']}>
            {outboundDepartureTime} – {outboundArrivalTime}
          </p>
        </span>
        <span>
          <p className={styles.ticket__text}>В пути</p>
          <p className={styles['ticket__text-info']}>{timeFly}</p>
        </span>
        <span>
          <p className={styles.ticket__text}>
            {outbound.stops && outbound.stops.length > 0 ? `${outbound.stops.length} пересадки` : 'без пересадок'}
          </p>
          <p className={styles['ticket__text-info']}>
            {outbound.stops && outbound.stops.length > 0 ? outbound.stops.join(', ') : '–'}
          </p>
        </span>
      </div>
      <div className={styles.ticket__info}>
        <span>
          <p className={styles.ticket__text}>
            {inbound.origin} – {inbound.destination}
          </p>
          <p className={styles['ticket__text-info']}>
            {inboundDepartureTime} – {inboundArrivalTime}
          </p>
        </span>
        <span>
          <p className={styles.ticket__text}>В пути</p>
          <p className={styles['ticket__text-info']}>{timeFlyIn}</p>
        </span>
        <span>
          <p className={styles.ticket__text}>
            {inbound.stops && inbound.stops.length > 0 ? `${inbound.stops.length} пересадки` : 'без пересадок'}
          </p>
          <p className={styles['ticket__text-info']}>
            {inbound.stops && inbound.stops.length > 0 ? inbound.stops.join(', ') : '–'}
          </p>
        </span>
      </div>
    </div>
  )
}
Ticket.propTypes = {
  ticket: PropTypes.shape({
    price: PropTypes.number,
    carrier: PropTypes.string,
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        origin: PropTypes.string,
        destination: PropTypes.string,
        date: PropTypes.string,
        stops: PropTypes.arrayOf(PropTypes.string),
        duration: PropTypes.number,
      })
    ),
  }).isRequired,
}

export default Ticket
