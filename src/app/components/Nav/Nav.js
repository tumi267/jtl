'use client'
import Link from 'next/link';
import styles from './Nav.module.css';
import { UserState } from '@/app/context/context';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState } from 'react';
function Nav() {
  const { userinfo } = UserState(); // Fetch user information from context
  const [searchInput,setSearchInput]=useState('')
  const [list,setList]=useState([])
  const search=async (e)=>{
    e.preventDefault()
    const call=await fetch('/api/search',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({searchInput})
    })
    const res=await call.json()
    console.log(res.list)
    setList(res.list)
  }
  return (
    <div className={styles.main_nav}>
      <div className={styles.search_contain}>
      {/* Logo with link to home */}
      <Link href={'/'}>
        <h3 className={styles.logo}>JTL</h3>
      </Link>

      {/* Search bar */}
      
        <form onSubmit={search} className={styles.search}>
        <span className={styles.search}>
        <input type='text' value={searchInput} onChange={(e)=>{setSearchInput(e.target.value)}} className={styles.search_bar} />
        <SearchRoundedIcon onClick={search}/>
        </span>
        </form>
      
      </div>
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
    {/* Modal to display search results */}
      {list.length > 0 && (
        <div className={`${styles.model} ${list.length > 0 ? styles.visible : ''}`}>
          <div className={styles.modal_content}>
            <h3>Search Results</h3>
            <ul>
              {list.map((item, index) => (
                <li key={index}>{item.name}</li> // Assuming each item has a 'name' property
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
