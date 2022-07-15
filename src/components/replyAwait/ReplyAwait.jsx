import React from 'react'
import './replyAwait.scss'
function ReplyAwait({setOpenReply}) {
    const handleReply = async (event) => {
        try {
            setOpenReply(false)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='replyAwait'>
        <textarea className="replyAwaitContent">
            
        </textarea>
        <div className="replyAwaitAction">
            <button className="replyAwaitActionItem" onClick={()=> setOpenReply(false)}>
                Cancle
            </button>
            <button className="replyAwaitActionItem" onClick={handleReply}>
                Reply
            </button>
        </div>
    </div>
  )
}

export default ReplyAwait