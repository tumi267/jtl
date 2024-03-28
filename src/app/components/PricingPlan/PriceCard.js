import styles from './Pricing.module.css'
function PriceCard({title,detail,arr}) {
  return (
    <div className={styles.card}>
    <div className={styles.card_details}>
    <h2>{title}</h2>
    <p>{detail}</p>
    <button>select plan</button>
    <p>{arr}</p>
    </div>
    </div>
  )
}

export default PriceCard