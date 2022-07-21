import React, { useState } from 'react'
import { useCallback } from 'react'
import { useReduxUserId, useReduxUserImage, useReduxUserName } from '../../utils/reduxMethods'
import { userRequest } from '../../utils/requestMethods'
import './replyAwait.scss'
function ReplyAwait({commentId, setOpenReply, postId, setCommentsNumber, setReplies}) {
    const [content, setContent] = useState('')
    const userId = useReduxUserId()
    const userName = useReduxUserName()
    const userImage = useReduxUserImage()
    const handleReply = useCallback(async () => {
        if(content.trim()) {
            try {
                const data = {userId, commentId, content, postId}
                const response = await userRequest.post('/replies', data)
                setOpenReply(false)
                setCommentsNumber(prev => prev + 1)
                setReplies(prev => [
                    {...response.data.reply, user: {
                    name: userName,
                    image: userImage,
                }}, ...prev])
            } catch (error) {
                console.log(error)
            }
        } else {
            setOpenReply(false)
        }
    })
  return (
    <div className='replyAwait'>
        <textarea className="replyAwaitContent" placeholder='Write reply...' 
            onChange={(event)=>setContent(event.target.value)} id='replyAwaitId'/>
        <div className="replyAwaitAction">
            <button className="replyAwaitActionItem btnSmall btnGrey" onClick={()=> setOpenReply(false)}>
                Cancel
            </button>
            <button className="replyAwaitActionItem btnSmall btnBlue" onClick={handleReply}>
                Reply
            </button>
        </div>
    </div>
  )
}

export default ReplyAwait