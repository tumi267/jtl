import styles from './Admin_menue.module.css'
function AdminMenu({select}) {
  return (
    <div className={styles.contain}>
        <button className={styles.btn} onClick={()=>{select(0)}}>Add Song</button>
        <button className={styles.btn} onClick={()=>{select(1)}}>Remove Song</button>
        <button className={styles.btn} onClick={()=>{select(2)}}>Votes</button>
        <button className={styles.btn} onClick={()=>{select(3)}}>States</button>
        <button className={styles.btn} onClick={()=>{select(4)}}>Q&A</button>
    </div>
  )
}

export default AdminMenu