import React from 'react'
import { memo } from 'react';
import { useState } from 'react'
import { useReduxUserId } from '../../utils/reduxMethods';
import { userRequest } from '../../utils/requestMethods';
import empty from '../../assets/image/empty.png'
import './musics.scss'
function Musics({ musics, setMusics, isHomePage = false }) {

  const [openAddMusic, setOpenAddMusic] = useState(false)

  // Add music
  const [codeMusic, setCodeMusic] = useState()
  const userId = useReduxUserId()
  const handleAddMusic = async (event) => {
    if (codeMusic) {
      try {
        const data = {
          music: codeMusic,
          userId: userId
        }
        const response = await userRequest.post('/musics', data)
        setMusics([response.data.music.music, ...musics])
        setOpenAddMusic(false)
      } catch (error) {
        console.log(error)
      }
    }
  }
  console.log('re-render: Music')

  return (
    <div className='musics'>
      <title className='musicsTitle'>
        <span className="musicsTitleContent">
          <i className="musicsTitleContentIcon bi bi-boombox-fill"></i>
          MUSICS
        </span>
        {isHomePage &&
          <span className="musicsTitleAdd" onClick={() => setOpenAddMusic(true)}>
            <i className="musicsTitleAddIcon bi bi-plus"></i>
            <i className="musicsTitleAddIcon bi bi-file-earmark-music"></i>
          </span>
        }
      </title>
      {!openAddMusic ?
        (
          musics.length > 0 ?
            <div className="musicsContent">
              <iframe className='musicsContentItem'
                src={`https://www.youtube.com/embed/${musics[0].music}`}
                title='song' frameBorder="0">
              </iframe>
            </div>
            :
            <div className="musicsNoContent">
              {isHomePage ?
                <div className="musicsNoContentContent" onClick={() => setOpenAddMusic(true)}>
                  <img src={empty} alt='emptyIcon' className="musicsNoContentContentIcon" />
                </div>
                :
                <div className="musicsNoContentContent">
                  <img src={empty} alt='emptyIcon' className="musicsNoContentContentIcon" />
                </div>
              }
            </div>
        )
        :
        <div className="musicsAdd">
          <div className="musicsAddTitle">
            Paste the youtube link:
            <i className="musicsAddTitleClose bi bi-box-arrow-right" onClick={() => setOpenAddMusic(false)}></i>
          </div>
          <textarea type="text" className="musicsAddInput" placeholder='Example: https://www.youtube.com/watch?v=YQHsXMglC9A'
            onChange={(event) => setCodeMusic(event.target.value.trim().replace('https://www.youtube.com/watch?v=', ''))}
          />
          <button className="musicsAddSubmit btnSmall btnMain" onClick={handleAddMusic}>Add music</button>
        </div>
      }
    </div>
  )
}

export default memo(Musics)