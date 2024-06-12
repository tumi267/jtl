const getfilename=async(e)=>{
    const urlObj = new URL(e);
  // Get the pathname from the URL object
    const pathname = urlObj.pathname;
  // Decode the pathname to handle encoded characters
    const decodedPath = decodeURIComponent(pathname);
  // Split the path and get the last part
    const fileName = decodedPath.split('/').pop();

  return(fileName)
  }

  export default getfilename