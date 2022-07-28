import React from 'react'
import { memo } from 'react';
import { useState } from 'react'
import { useReduxUserId } from '../../utils/reduxMethods';
import { userRequest } from '../../utils/requestMethods';
import './nameMusics.scss'
function NameMusics({name, musics, setMusics, isHomePage = false}) {
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
    const handleChangeMusic = async (event) => {
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
  return (
    <div className="nameMusics">
        <div className="nameMusicsName">
            {name}
        </div>
        <span className="nameMusicsMusic">
            <i className="nameMusicsMusicIcon bi bi-music-note"></i>
                {musics.length > 0 ?
                  <>
                    <span className="nameMusicsMusicContent"></span>
                    {/* <iframe className='nameMusicsMusicContent'
                      src={`https://www.youtube.com/embed/${musics[0].music}`}
                      title='song' frameBorder="0">
                    </iframe> */}
                    {isHomePage && 
                      <i className="nameMusicsMusicOpenChange bi bi-arrow-repeat"
                        onClick={()=> setOpenAddMusic(true)}
                      />
                    }
                  </>
                  :
                  <>
                    <span className="nameMusicsMusicNoContent">
                      No infomation
                    </span>
                    {isHomePage && 
                      <i className="nameMusicsMusicOpenAdd bi bi-plus-lg"
                        onClick={()=> setOpenAddMusic(true)}
                      />
                    }
                  </>
                }
            {openAddMusic &&
              <div className="nameMusicsMusicAdd">
                <span className="nameMusicsMusicAddTitle">
                  Paste the youtube link:
                  <i className="nameMusicsMusicAddTitleClose bi bi-x-lg"
                    onClick={() => setOpenAddMusic(false)}
                  />
                </span>
                <textarea type="text" className="nameMusicsMusicAddInput" placeholder='https://www.youtube.com/watch?v=YQHsXMglC9A'
                  onChange={(event) => setCodeMusic(event.target.value.trim().replace('https://www.youtube.com/watch?v=', ''))}
                />
                {musics.legnth > 0 ? 
                  <button className="nameMusicsMusicAddSubmit btnSmall btnMain" onClick={handleAddMusic}>Add music</button>
                  :
                  <button className="nameMusicsMusicAddSubmit btnSmall btnMain" onClick={handleChangeMusic}>Change music</button>
                }
            </div>
            }


        </span>
    </div>
  )
}

export default NameMusics