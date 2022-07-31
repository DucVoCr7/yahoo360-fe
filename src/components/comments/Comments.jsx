import React, { useState, useEffect,  memo, useCallback }  from 'react'
import { publicRequest, userRequest } from '../../utils/requestMethods'
import { useReduxUserId, useReduxUserImage, useReduxUserName } from '../../utils/reduxMethods'
import Comment from '../comment/Comment'
import './comments.scss'

function Comments({
  postId, 
  setOpenComments, 
  setCommentsNumber
}) {

    const [comments, setComments] = useState()
    const [content, setContent] = useState('')
    const userId = useReduxUserId()
    const userName = useReduxUserName()
    const userImage = useReduxUserImage()

    const handleComment = useCallback(async()=> {
      if(content.trim()) {
        try {
          const data = {postId, userId, content}
          const response = await userRequest.post('/comments', data)
          setComments(prev => [{
            ...response.data.comment, replies: [], user: {
              name: userName,
              image: userImage,
            }}
            , ...prev])
          setCommentsNumber(prev => prev + 1)
          setContent('')
        } catch (error) {
          console.log(error)
        }
      }
    })

    useEffect(()=> {
      (async()=> {
        try {
          const response = await publicRequest.get(`/comments?postId=${postId}`)
          setComments(response.data.dataCommentsOfPost)
        } catch (error) {
          console.log(error)
        }
      })()
    }, [postId])

  return (
    comments ?
    <div className='comments'>
        <div className="commentsTop">
            <div className="commentsTopTitle">
                Write comments
                <i className="commentsTopTitleClose bi bi-box-arrow-right" 
                  onClick={() => setOpenComments(false)}
                />
            </div>
            <textarea 
              className='commentsTopContent'
              placeholder='Write comment...' 
              value={content} 
              onChange={(event)=> setContent(event.target.value)}/>
            <button className='commentsTopSubmit btnSmall btnBlue'
              onClick={handleComment}
            >
              POST
            </button>
        </div>
        <div className="commentsBottom">
            {comments.map((comment)=> (
              <Comment 
                key ={comment.id} 
                setComments={setComments}
                comment={comment} 
                setCommentsNumber={setCommentsNumber} 
                postId={postId}
              />
            ))}
        </div>
    </div>
    :
    <div className='comments loading'/>
  )
}

export default memo(Comments)