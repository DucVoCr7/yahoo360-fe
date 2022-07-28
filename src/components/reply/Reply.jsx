import React, { memo, useState } from 'react'
import convertDate from '../../utils/convertDate'
import { Link } from 'react-router-dom'
import ReplyRepair from '../replyRepair/ReplyRepair'
import './reply.scss'
import { useReduxUserId } from '../../utils/reduxMethods'
import { useCallback } from 'react'
import { userRequest } from '../../utils/requestMethods'

function Reply({ reply, setReplies, setCommentsNumber }) {

  const [replyContent, setReplyContent] = useState(reply.content)
  const userId = useReduxUserId()

  const [openRepair, setOpenRepair] = useState(false)

  const handleRemoveReply = useCallback(async()=> {
    try {
      const response = await userRequest.delete(`/replies/${reply.id}`)
      setReplies(prev => prev.filter(item => item.id !== reply.id))
      setCommentsNumber(prev => prev - 1)
    } catch (error) {
      console.log(error)
    }
  })

  console.log('render Reply')
  return (
    <div className='reply'>
      <Link to={`/users/${reply.userId}`} className='replyLeft'>
        <img src={reply.user.image} alt="userImg" className="replyLeftImg" />
      </Link>
      {!openRepair ?
        <div className="replyRight">
          <div className="replyRightContent">
            <Link to={`/users/${reply.userId}`} className="replyRightContentName">
              {reply.user.name}
            </Link>
            <span className="replyRightContentText">
              {replyContent}
            </span>
          </div>
          <div className="replyRightAction">
            <span className="replyRightActionItem">
              {convertDate(reply.createdAt, 'noYear')}
            </span>
            {userId === reply.userId &&
              <>
                <label className="replyRightActionItem" onClick={()=> setOpenRepair(true)}>
                  Repair
                </label>
                <span className="replyRightActionItem" onClick={handleRemoveReply}>
                  Remove
                </span>
              </>
            }
          </div>
        </div>
        :
        <div className="replyRightRepair">
          <ReplyRepair 
            replyId={reply.id}
            replyContent={replyContent} 
            setReplyContent={setReplyContent} 
            setOpenRepair={setOpenRepair}/>
        </div>
      }
    </div>
  )
}
export default memo(Reply)
