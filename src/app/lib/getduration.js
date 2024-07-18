/**
 * Fetches the duration of an audio file given its URL.
 * @param {string} url - The URL of the audio file.
 * @returns {Promise<number>} - A promise that resolves to the duration of the audio file in seconds.
 */
const getAudioDuration = async (url) => {
  // Ensure the URL is defined
  if (url !== undefined) {
    // Create an HTML5 Audio element with the provided URL
    const audio = new Audio(url);

    // Use a promise to wait for the audio metadata to load
    await new Promise(resolve => {
      // Event listener to resolve the promise once metadata is loaded
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration); // Resolve with the audio duration in seconds
      });
    });

    return audio.duration; // Return the duration of the audio file
  }
};

export default getAudioDuration;
