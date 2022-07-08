import React from 'react'
import './musics.scss'
function Musics({musics, isHomePage = false}) {

  return (
    <div className='musics'>
        <title className='musicsTitle'>
          <span className="musicsTitleContent">
            <i className="musicsTitleContentIcon bi bi-boombox-fill"></i>
            MUSICS
          </span>
          {isHomePage &&
            <span className="musicsTitleAdd">
              <i className="musicsTitleAddIcon bi bi-plus"></i>
              <i className="musicsTitleAddIcon bi bi-file-earmark-music"></i>
            </span>
          }
        </title>
        {musics.length > 0 ? 
          <div className="musicsContent">
            <iframe className='musicsContentItem' 
              src={`https://www.youtube.com/embed/${musics[0].music}`} 
              title='song' frameBorder="0">
            </iframe>
          </div>
          :
          <div className="musicsNoContent">
                    {
                      isHomePage ?
                          <div className='musicsNoContentIcon'>
                              Add <br /> music
                              <i className="musicsNoContentIconChild bi bi-file-earmark-music"></i>
                              <i className="musicsNoContentIconChild  bi bi-plus-circle"></i>
                          </div>
                          :
                          <div className="musicsNoContentContent">
                              Music have not been added yet!
                          </div>


                  }
          </div>
        }
    </div>
  )
}

export default Musics