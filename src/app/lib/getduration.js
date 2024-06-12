const getAudioDuration = async (url) => {
  if(url!==undefined){
    const audio = new Audio(url);
    await new Promise(resolve => {
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
    });
    return audio.duration;
    }
  };

  export default getAudioDuration