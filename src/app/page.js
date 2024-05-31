import Image from 'next/image'
import styles from './page.module.css'
import Hero from './components/Hero/Hero'
import Promo from './components/Promo/Promo'
import PricingPlan from './components/PricingPlan/PricingPlan'
import Playlist from './components/Playlist/Playlist'
import Catagorie from './components/Catagorie/Catagorie'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.contain}>
        <Hero/>
        <Promo/>
        <Catagorie/>
        <PricingPlan/>
        <Playlist
        selete={'fulllist'}
        options={null}
        />
      </div>
    </main>
  )
}
