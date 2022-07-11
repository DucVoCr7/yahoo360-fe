import React from 'react'
import { memo } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { userRequest } from '../../utils/requestMethods';
import './musics.scss'
function Musics({ musics, setMusics, isHomePage = false }) {
  const [openAddMusic, setOpenAddMusic] = useState(false)

  // Add music
  const [codeMusic, setCodeMusic] = useState()
  const userId = useSelector(state => state.user.userInfo?.id)
  const handleAddMusic = async (event)=> {
    if(codeMusic) {
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
          <span className="musicsTitleAdd" onClick={()=> setOpenAddMusic(true)}>
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
            {
              isHomePage ?
                <div className='musicsNoContentIcon' onClick={()=> setOpenAddMusic(true)}>
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
        )
        :
        <div className="musicsAdd">
          <div className="musicsAddTitle">
            Paste the youtube link:
            <i className="musicsAddTitleClose bi bi-x" onClick={() => setOpenAddMusic(false)}></i>
          </div>
          <textarea type="text" className="musicsAddInput" placeholder='Example: https://www.youtube.com/watch?v=YQHsXMglC9A'
            onChange={(event)=> setCodeMusic(event.target.value.trim().replace('https://www.youtube.com/watch?v=', ''))}
          />
          <button className="musicsAddSubmit" onClick={handleAddMusic}>ADD MUSIC</button>
        </div>
      }
    </div>
  )
}

export default memo(Musics)