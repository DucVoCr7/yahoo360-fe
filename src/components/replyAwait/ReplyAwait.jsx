import React, { useState } from 'react'
import { useCallback } from 'react'
import { useReduxUserId } from '../../utils/reduxMethods'
import { userRequest } from '../../utils/requestMethods'
import './replyAwait.scss'
function ReplyAwait({commentId, setOpenReply, postId, setCommentsNumber, setReplies}) {
    const [content, setContent] = useState('')
    const userId = useReduxUserId()
    const handleReply = useCallback(async () => {
        if(content.trim()) {
            try {
                const data = {userId, commentId, content, postId}
                const response = await userRequest.post('/replies', data)
                setOpenReply(false)
                setCommentsNumber(prev => prev + 1)
                setReplies(prev => [response.data.reply, ...prev])
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
            <button className="replyAwaitActionItem" onClick={()=> setOpenReply(false)}>
                Cancel
            </button>
            <button className="replyAwaitActionItem" onClick={handleReply}>
                Reply
            </button>
        </div>
    </div>
  )
}

export default ReplyAwait