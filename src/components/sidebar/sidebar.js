import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleFilter } from '../../reducers/checkbox-reducer'

import styles from './sidebar.module.scss'

function SideBar() {
  const filters = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  const handleFilterChange = (filterName) => {
    dispatch(toggleFilter(filterName))
  }

  return (
    <div className={styles['side-bar']}>
      <legend className={styles['side-bar__title']}>Количество пересадок</legend>
      <div className={styles['side-bar__container']}>
        <label htmlFor="u1" className={styles['side-bar__label']}>
          <input
            id="u1"
            type="checkbox"
            checked={filters.all}
            onChange={() => handleFilterChange('all')}
            className={styles['side-bar__input']}
          />
          <span className={styles['side-bar__input-custom']} />
          Все
        </label>
        <label htmlFor="u2" className={styles['side-bar__label']}>
          <input
            id="u2"
            type="checkbox"
            checked={filters.noTransfers}
            onChange={() => handleFilterChange('noTransfers')}
            className={styles['side-bar__input']}
          />
          <span className={styles['side-bar__input-custom']} />
          Без пересадок
        </label>
        <label htmlFor="u3" className={styles['side-bar__label']}>
          <input
            id="u3"
            type="checkbox"
            checked={filters.oneTransfer}
            onChange={() => handleFilterChange('oneTransfer')}
            className={styles['side-bar__input']}
          />
          <span className={styles['side-bar__input-custom']} />1 пересадка
        </label>
        <label htmlFor="u4" className={styles['side-bar__label']}>
          <input
            id="u4"
            type="checkbox"
            checked={filters.twoTransfers}
            onChange={() => handleFilterChange('twoTransfers')}
            className={styles['side-bar__input']}
          />
          <span className={styles['side-bar__input-custom']} />2 пересадки
        </label>
        <label htmlFor="u5" className={styles['side-bar__label']}>
          <input
            id="u5"
            type="checkbox"
            checked={filters.threeTransfers}
            onChange={() => handleFilterChange('threeTransfers')}
            className={styles['side-bar__input']}
          />
          <span className={styles['side-bar__input-custom']} />3 пересадки
        </label>
      </div>
    </div>
  )
}

export default SideBar
