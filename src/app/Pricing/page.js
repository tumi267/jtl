import PricingPlan from "../components/PricingPlan/PricingPlan"
import styles from './Pricing.module.css'
import styles2 from '../components/PricingPlan/Pricing.module.css'
function Page() {
  return (
    <div className={styles.contain}>
      <h1>pricing plan</h1>
      <PricingPlan/>
      <div className={styles2.contain}>
        <div className={styles2.card_contain}>
          <div className={styles2.card}>
            <div className={styles2.card_details_brackdown}>
              <h2 className={styles.header}>free</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div className={styles2.card}>
            <div className={styles2.card_details_brackdown}>
              <h2 className={styles.header}>gold</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div className={styles2.card}>
            <div className={styles2.card_details_brackdown}>
              <h2 className={styles.header}>platium</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        
      </div>
      </div>
    </div>
  )
}

export default Page