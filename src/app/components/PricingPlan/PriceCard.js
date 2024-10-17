'use client'
import { useRouter } from 'next/navigation';
import styles from './Pricing.module.css';

function PriceCard({ title, detail, arr }) {
  const router=useRouter()
  return (
    <div className={styles.card}>
      <div className={styles.card_details}>
        <h2>{title}</h2>
        <p>{detail}</p>
        {/* change to paygate logic */}
        <button className={title=='Free'?styles.free_btn:title=='Gold'?styles.btn_gold:title=='Platinum'&&styles.silver_btn} onClick={(()=>{router.push('/Pricing')})}>Select Plan</button>
        <p>{arr}</p>
      </div>
    </div>
  );
}

export default PriceCard;
