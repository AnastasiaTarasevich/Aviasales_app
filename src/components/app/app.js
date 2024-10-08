import { Provider } from 'react-redux'

import SideBar from '../sidebar'
import Filter from '../filter'
import TicketList from '../ticket-list'
import store from '../../store/store'

import logo from './logo.png'
import styles from './app.module.scss'

function App() {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <header className={styles.app__header}>
          <img src={logo} className={styles['app__header-logo']} alt="logo" />
        </header>
        <section className={styles.app__base}>
          <SideBar />
          <main className={styles.app__main}>
            <Filter />
            <TicketList />
          </main>
        </section>
      </div>
    </Provider>
  )
}

export default App
