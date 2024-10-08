import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSort } from '../../reducers/filter-reducer'

import styles from './filter.module.scss'

function Filter() {
  const sort = useSelector((state) => state.sort)
  const dispatch = useDispatch()

  const handleSortChange = (sortOption) => {
    dispatch(setSort(sortOption))
  }

  return (
    <div className={styles.filter}>
      <ul className={styles.filter__list}>
        <li className={`${styles['filter__list-item']} ${sort === 'cheapest' ? styles.filter__sort : ''}`}>
          <button type="button" className={styles['filter__list-button']} onClick={() => handleSortChange('cheapest')}>
            Самый дешевый
          </button>
        </li>
        <li className={`${styles['filter__list-item']} ${sort === 'faster' ? styles.filter__sort : ''}`}>
          <button type="button" className={styles['filter__list-button']} onClick={() => handleSortChange('faster')}>
            Самый быстрый
          </button>
        </li>
        <li className={`${styles['filter__list-item']} ${sort === 'optimal' ? styles.filter__sort : ''}`}>
          <button type="button" className={styles['filter__list-button']} onClick={() => handleSortChange('optimal')}>
            Оптимальный
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Filter
