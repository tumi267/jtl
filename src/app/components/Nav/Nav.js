'use client'
import Link from 'next/link';
import styles from './Nav.module.css';
import { UserState } from '@/app/context/context';

function Nav() {
  const { userinfo } = UserState(); // Fetch user information from context

  return (
    <div className={styles.main_nav}>
      {/* Logo with link to home */}
      <Link href={'/'}>
        <h3 className={styles.logo}>JTL</h3>
      </Link>

      {/* Search bar */}
      <span className={styles.search}>
        <input type='text' className={styles.search_bar} />
        <button onClick={()=>{alert('search')}}>search</button>
      </span>
      <br />

      {/* Navigation links */}
      <div className={styles.main_nav_sub}>
        <Link href={'/'}>
          <h3 className={styles.menu}>Home</h3>
        </Link>
        <Link href={'/Playlist'}>
          <h3 className={styles.menu}>Playlist</h3>
        </Link>
        <Link href={'/Pricing'}>
          <h3 className={styles.menu}>Pricing</h3>
        </Link>
        <Link href={'/signin'}>
          <h3 className={styles.menu}>
            {userinfo ? userinfo.name : 'signin/signup'}
          </h3>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
