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

function PlaylistCard({ e, selete }) {
  const { user, info } = UserState();
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
        ? <button onClick={handleDownload}>Download</button>
        : <button onClick={() => { handlePurchase(e) }}>Buy</button>;
    } else {
      return <button onClick={() => { handlePurchase(e) }}>Buy</button>;
    }
  };

  return (
    <div className={styles.image_discription}>
      <Image src={e.imageUrl} alt={e.name} width={100} height={100} />
      <div>
        <p>{e.name.replace(pattern, '')}</p>
        <p>{formatDuration(e.duration)}</p>
        <p>{e.mood}</p>
        <p>{e.bpm}</p>
        {params === '/admin' && <p>Votes: {e.votes}</p>}
        <span>
          {selete === 'vote'
            ? <Upvote song={e} />
            : renderButton(e.songUrl)
          }
        </span>
      </div>
      <audio controls controlsList='nodownload'>
        <source src={e.songUrl} />
      </audio>
    </div>
  );
}

export default PlaylistCard;
