import React from 'react'
import PropTypes from 'prop-types'

import styles from './button-else.module.scss'

function ButtonElse({ onClick = () => {} }) {
  return (
    <div>
      <button className={styles['button-else']} type="button" onClick={onClick}>
        Показать ещё 5
      </button>
    </div>
  )
}
ButtonElse.propTypes = {
  onClick: PropTypes.func.isRequired,
}
export default ButtonElse
