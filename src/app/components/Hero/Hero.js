import Image from 'next/image';
import styles from './Hero.module.css';

function Hero() {
  return (
    <div className={styles.contain}>
      {/* Main header with styled buzzwords */}
      <h1 className={styles.header}>
        <span className={styles.buzzword}>SOUNDS</span> THAT ARE MADE FOR{' '}
        <span className={styles.buzzword}>YOU</span>
      </h1>
      
      {/* Hero image section */}
      <div className={styles.hero_Image}>
        <Image src={'/drum.jpg'} alt='hero image drum' layout='fill' />
      </div>
      
      {/* Triangle element (if used for styling purposes) */}
      <div className={styles.triangel}>
        &nbsp; {/* Non-breaking space (if used for layout purposes) */}
      </div>
    </div>
  );
}

export default Hero;
