import Image from "next/image"
import styles from './Catagorie.module.css'
import genre from '../../db/genre.json'
import Link from "next/link"
function Catagorie() {
  const Genre=genre.genre
  
  return (
    <div className={styles.contain}>
        <h2>Catagorie</h2>
        <div className={styles.card_contian}>
            {/* map catgorie */}
            {Genre.map((e,i)=>{return <Link href={`/Playlist/${e}`} key={i}><div >
              <div className={styles.image_size}>
              <Image src={'/guitar.jpg'} alt={e} height={150} width={150}/>
              </div>
            
            <p>{e}</p>
            </div>
            </Link>}
            )
            }
        </div>
    </div>
  )
}

export default Catagorie