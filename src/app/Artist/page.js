'use client'
import artist from '../db/artist.json'
function page() {
    const artistlist=artist.artist
    const concatArtist=()=>{
      // still need tothink about this
      alert('btn clicked')
    }
  return (
    <div>
        {artistlist.map((e,i)=>{
            return<div key={i}>
                <h2>{e.name}</h2>
                {/* will be a arry */}
                <p>{e.song}</p>
                <button onClick={concatArtist}>click here to contact</button>
            </div>
        })}
    </div>
  )
}

export default page