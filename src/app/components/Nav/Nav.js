import styles from './Nav.module.css'
function Nav() {
  return (
    <div className={styles.main_nav}>
    <h3 className={styles.logo}>
    JTL
    </h3>
    <span className={styles.search}>
    <input type='text' className={styles.search_bar}/>
    <button>search</button>
    </span>
    <h3 className={styles.menu}>
    MENU
    </h3>

    </div>
  )
}

export default Nav