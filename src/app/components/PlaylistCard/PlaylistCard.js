'use client'
import Image from "next/image";
import styles from '../Playlist/PlayList.module.css';
import formatDuration from "@/app/lib/formatDuration";
import { useEffect } from "react";
import getAudioDuration from "@/app/lib/getduration";
import { usePathname } from "next/navigation";
import { UserState } from "@/app/context/context";
import Upvote from '../upvote/Upvote';
import UpdateUserSongs from "@/app/lib/UpdateUserSongs";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
function PlaylistCard({ e, selete }) {
  const { user, info,userinfo } = UserState();
  const params = usePathname();

  useEffect(() => {
    const getDuration = async () => {
      const duration = await getAudioDuration(e.songUrl);
      
      // You can use 'duration' here if needed
    };
    getDuration();
  }, []);

  // Define the regex pattern to match any file extension
  let pattern = /\.[a-zA-Z0-9]+\b/g;

  const handlePurchase = async (element) => {
    if (user) {
      const userEmail = user.email;
      const songID = element.id; // Assuming 'id' is available in your song data
      UpdateUserSongs(userEmail, songID);
      alert('Song purchased!');
    } else {
      alert('Please login or sign up to purchase.');
    }
  };

  const handleDownload = () => {
    alert('Download initiated!');
  };

  const renderButton = (songUrl) => {
    if (info) {
      const songExists = info.some(el => el.songUrl === songUrl);
      return songExists
        ? <FileDownloadRoundedIcon onClick={handleDownload}/>
        : <button className={styles.btn_buy} onClick={() => { handlePurchase(e) }}>Buy</button>;
    } else {
      return <button className={styles.btn_buy} onClick={() => { handlePurchase(e) }}>Buy</button>;
    }
  };
  const contactArtist=()=>{
    // still need to figure out what to do here
    // email artist
    // or dash board notice
    alert('contact artist')
  }
  return (
    <div className={styles.image_discription}>
      <Image src={e.imageUrl} alt={e.name} width={110} height={110} />
      <div>
        <div className={styles.cardLayout}>
        <div>
        <p>{e.name.replace(pattern, '')}</p>
        <p>{formatDuration(e.duration)}</p>
        <p>{e.mood}</p>
        <p>{e.bpm}</p>
        </div>
        <audio className={styles.custom_audio_player} controls controlsList='nodownload'>
        <source src={e.songUrl} />
        </audio>
        </div>
        {params === '/admin' && <p>Votes: {e.votes}</p>}
        <span className={styles.containBtn}>
          {selete === 'vote'
            ? <Upvote song={e} />
            : renderButton(e.songUrl)
          }
          {(userinfo?.priceplan=='gold'||userinfo?.priceplan=='platinum')&&<button className={styles.contact_artist_btn} onClick={contactArtist}>contact artist</button>}
        </span>

      </div>

    </div>
  );
}

export default PlaylistCard;
