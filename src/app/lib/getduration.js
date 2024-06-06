const getAudioDuration = async (url) => {
    const audio = new Audio(url);
    await new Promise(resolve => {
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
    });
    return audio.duration;
  };

  export default getAudioDuration