import Image from "next/image";
import styles from './Catagorie.module.css';
import genre from '../../db/genre.json';
import Link from "next/link";

function Catagorie() {
  // Extract genre data from JSON
  const Genre = genre.genre;

  return (
    <div className={styles.contain}>
      <h2>Categories</h2>
      <div className={styles.card_contain}>
        {/* Map through genres and create a card for each */}
        {Genre.map((e, i) => (
          <Link href={`/Playlist/${e}`} key={i}>
            <div className={styles.card}>
              <div className={styles.image_size}>
                <Image src='/guitar.jpg' alt={e} height={150} width={150} />
              </div>
              <p>{e}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Catagorie;
