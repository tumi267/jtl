async function contactArtisit(artist,user,userinfo) {
    try {
        const response = await fetch('/api/sendArtisitReq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ artist, user,userinfo }),
        });
    
        const result = await response.json();
        console.log(result);
        return result.msg
      } catch (error) {
        console.error('Error sending email:', error);
        console.log(error)
      }
  
}

export default contactArtisit


