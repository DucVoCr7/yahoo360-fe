import React, { useState, useEffect }  from 'react'
import { publicRequest } from '../../utils/requestMethods'
import Comment from '../comment/Comment'
import './comments.scss'
function Comments({postId, setOpenComments}) {
    const [comments, setComments] = useState()
    useEffect(()=> {
      (async()=> {
        try {
          const response = await publicRequest.get(`/comments?postId=${postId}`)
          setComments(response.data.dataCommentsOfPost)
          console.log(response.data.dataCommentsOfPost)
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
                <i className="commentsTopTitleClose bi bi-box-arrow-right" onClick={() => setOpenComments(false)}></i>
            </div>
            <textarea className='commentsTopContent'></textarea>
            <button className='commentsTopSubmit'>POST</button>
        </div>
        <div className="commentsBottom">
            {comments.map((comment, index)=> (
              <Comment comment={comment} key ={index}/>
            ))}
        </div>
    </div>
    :
    <div className='comments loading'></div>
  )
}

export default Comments