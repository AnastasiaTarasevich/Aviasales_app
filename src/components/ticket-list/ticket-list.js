import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Spin, Alert } from 'antd'

import Ticket from '../ticket/ticket'
import fetchTickets from '../../api/api'
import selectFilteredTickets from '../../selectors/ticketSelectors'
import ButtonElse from '../button-else'

import styles from './ticket-list.module.scss'

function TicketList() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.ticket)
  const [visibleCount, setVisibleCount] = useState(5)
  const filteredTickets = useSelector(selectFilteredTickets)

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  const loadMoreTickets = () => {
    setVisibleCount((prevCount) => prevCount + 5)
  }

  if (loading) {
    return (
      <div>
        <Spin className={styles.spin} />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Alert message="Ошибка с загрузкой" type="error" />
      </div>
    )
  }
  if (!navigator.onLine) {
    return (
      <div>
        <Alert message="Нет сети" type="error" />
      </div>
    )
  }

  return (
    <div>
      <ul className={styles['ticket-list']}>
        {filteredTickets.length === 0 ? (
          <Alert message="Билетов нет" type="info" className={styles.alert} />
        ) : (
          <>
            {filteredTickets.slice(0, visibleCount).map((ticket) => (
              <Ticket key={uuidv4()} ticket={ticket} />
            ))}
            {visibleCount < filteredTickets.length && <ButtonElse onClick={loadMoreTickets} />}
          </>
        )}
      </ul>
    </div>
  )
}

export default TicketList
