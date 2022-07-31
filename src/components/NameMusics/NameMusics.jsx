import React, { useEffect, useCallback, memo, useState } from 'react';
import axios from "axios"
import ReactPlayer from 'react-player/youtube'
import { useReduxUserId } from '../../utils/reduxMethods';
import { userRequest } from '../../utils/requestMethods';
import './nameMusics.scss'

function NameMusics({ name, musics, setMusics, isHomePage = false }) {

  const [openAddMusic, setOpenAddMusic] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [thumbnailURL, setThumbnailURL] = useState()
  const [titleMusic, setTitleMusic] = useState()
  const [linkMusic, setLinkMusic] = useState()
  const userId = useReduxUserId()

  const handleAddMusic = useCallback(async () => {
    console.log(linkMusic)
    if (linkMusic) {
      try {
        const data = {
          music: linkMusic,
          userId: userId
        }
        const response = await userRequest.post('/musics', data)
        setMusics([response.data.music, ...musics])
        setOpenAddMusic(false)
        setLinkMusic('')
      } catch (error) {
        console.log(error)
      }
    } else {
      setOpenAddMusic(false)
    }
  })
  const handleChangeMusic = useCallback(async () => {
    if (linkMusic) {
      try {
        const data = {
          music: linkMusic,
        }
        const response = await userRequest.patch(`/musics/${musics[0].id}`, data)
        setMusics([response.data.music, ...musics])
        setOpenAddMusic(false)
        setLinkMusic('')
      } catch (error) {
        console.log(error)
      }
    } else {
      setOpenAddMusic(false)
    }
  })
  
  useEffect(() => {
    if(musics.length > 0) {
      (async () => {
        try {
          const response = await axios.get(`https://noembed.com/embed?dataType=json&url=${musics[0].music}`)
          console.log(response.data)
          setThumbnailURL(response.data.thumbnail_url)
          setTitleMusic(response.data.title)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [musics.length])

  return (
    <div className="nameMusics">
      <div className="name">
        {name}
      </div>
      <span className="music">
        {(musics.length > 0 && titleMusic) ?
          <>
            <span className="musicContent">
              <span className="musicContentThumb">
                <img src={thumbnailURL} alt="thumbnailMusic" className="musicContentThumbImg" />
                <i className="musicContentThumbIcon bi bi-music-note"></i>
              </span>
              <i className={playing ?
                "musicContentAction bi bi-pause-fill"
                :
                "musicContentAction bi bi-play-fill"
              }
                onClick={() => setPlaying(!playing)}
              />
              <span className="musicContentTitle">
                <span className={playing ? "musicContentTitleInfo active" : "musicContentTitleInfo"} >
                  <span className="musicContentTitleInfoChild">
                    {titleMusic}
                  </span>
                  <span className="musicContentTitleInfoChild">
                    {titleMusic}
                  </span>
                </span>
              </span>
              <ReactPlayer
                className='musicContentVideo' 
                url={musics[0].music} 
                playing={playing}
                onEnded={()=> setPlaying(false)}
              />
            </span>
            {isHomePage &&
              <i className="musicOpenChange bi bi-arrow-repeat"
                onClick={() => setOpenAddMusic(true)}
              />
            }
          </>
          :
          <>
            <span className="musicNoContent">
              <span className="musicNoContentThumb">
                <i className="musicNoContentThumbIcon bi bi-music-note"></i>
              </span>
              No infomation
            </span>
            {isHomePage &&
              <i className="musicOpenAdd bi bi-plus-lg"
                onClick={() => setOpenAddMusic(true)}
              />
            }
          </>
        }
        {openAddMusic &&
          <div className="musicAdd">
            <span className="musicAddTitle">
              Paste the youtube link:
              <i className="musicAddTitleClose bi bi-x-lg"
                onClick={() => setOpenAddMusic(false)}
              />
            </span>
            <textarea type="text" className="musicAddInput" placeholder='https://www.youtube.com/watch?v=YQHsXMglC9A'
              onChange={(event) => setLinkMusic(event.target.value)}
            />
            {musics.length > 0 ?
              <button className="musicAddSubmit btnSmall btnMain" onClick={handleChangeMusic}>Change music</button>
              :
              <button className="musicAddSubmit btnSmall btnMain" onClick={handleAddMusic}>Add music</button>
            }
          </div>
        }
      </span>
    </div>
  )
}

export default memo(NameMusics)