import React from 'react'
import './musics.scss'
function Musics({musics}) {
  return (
    <div className='musics'>
        <title className='musicsTitle'>
          <i className="musicsTitleIcon bi bi-boombox-fill"></i>
          MUSICS
        </title>
        <div className="musicsContent">
          <iframe className='musicsContentItem' 
            src={`https://www.youtube.com/embed/${musics[0].music}`} 
            title='song' frameBorder="0">
          </iframe>
        </div>
    </div>
  )
}

export default Musics