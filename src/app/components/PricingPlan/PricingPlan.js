import PriceCard from "./PriceCard";
import styles from './Pricing.module.css';

function PricingPlan() {
  return (
    <div className={styles.contain}>
      <h2>Pricing Plan</h2>
      <div className={styles.card_contain}>
        <PriceCard
          title={'Free'}
          detail={'Free plan details'}
          arr={'Array detail for Free plan'}
        />
        <PriceCard
          title={'Gold'}
          detail={'Gold plan details'}
          arr={'Array detail for Gold plan'}
        />
        <PriceCard
          title={'Platinum'}
          detail={'Platinum plan details'}
          arr={'Array detail for Platinum plan'}
        />
      </div>
    </div>
  );
}

export default PricingPlan;
