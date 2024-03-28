import Image from 'next/image'
import styles from './Hero.module.css'
function Hero() {
  return (
    <div className={styles.contain}>
  
    <h1 className={styles.header}> <span className={styles.buzzword}>SOUNDS</span> THAT ARE MADE FOR <span className={styles.buzzword}>YOU</span></h1>
    <div className={styles.hero_Image}>
    <Image src={'/drum.jpg'} alt='hero image drum' layout='fill'/>
   
    </div>
    <div className={styles.triangel}>
    &nbsp;
    </div>
    </div>
  )
}

export default Hero