import Link from 'next/link'
import styles from './Nav.module.css'
function Nav() {
  return (
    <div className={styles.main_nav}>
    <Link href={'/'}>
    <h3 className={styles.logo}>
    JTL
    </h3></Link>
    <span className={styles.search}>
    <input type='text' className={styles.search_bar}/>
    <button>search</button>
    </span>
    <Link href={'/Playlist'}><h3 className={styles.menu}>
    Playlist
    </h3>
    </Link>
    <Link href={'/Pricing'}><h3 className={styles.menu}>
    Pricing
    </h3>
    </Link>
    <Link href={'/signin'}>
    <h3 className={styles.menu}>
    singin/signup
    </h3>
    </Link>
    <Link href={'/'}>
    <h3 className={styles.menu}>
    Home
    </h3>
    </Link>
    </div>
  )
}

export default Nav