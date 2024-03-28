import PriceCard from "./PriceCard"
import styles from './Pricing.module.css'
function PricingPlan() {
  return (
    <div className={styles.contain}>
      <h2>Pricing Plan</h2>
      <div className={styles.card_contain}>
      <PriceCard
      title={'Free'}
      detail={'free plan'}
      arr={'arr deatil'}
      />
      <PriceCard
      title={'Gold'}
      detail={'gold plan'}
      arr={'arr deatil'}
      />
      <PriceCard
      title={'Platium'}
      detail={'platium plan'}
      arr={'arr deatil'}
      />
      </div>
    </div>
  )
}

export default PricingPlan