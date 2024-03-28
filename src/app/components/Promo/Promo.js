import Image from "next/image"
import styles from './Promo.module.css'
function Promo() {
  return (
    <div className={styles.contain}>
        <Image src={'/guitar.jpg'} alt="guitar" height={412} width={455}/>
        {/* align item center */}
        <h2>30 new sounds added every month vote on what will be in the library  </h2>
    </div>
  )
}

export default Promo