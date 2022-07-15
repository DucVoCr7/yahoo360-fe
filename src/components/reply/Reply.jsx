import React from 'react'
import convertDate from '../../utils/convertDate'
import { Link } from 'react-router-dom'
import './reply.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import ReplyRepair from '../replyRepair/ReplyRepair'
function Reply({ reply }) {
  const [openRepair, setOpenRepair] = useState(false)
  const userId = useSelector(state => state.user.userInfo?.id)
  return (
    <div className='reply'>
      <Link to={`/users/${reply.user.id}`} className='replyLeft'>
        <img src={reply.user.image} alt="userImg" className="replyLeftImg" />
      </Link>
      {!openRepair ?
        <div className="replyRight">
          <div className="replyRightContent">
            <Link to={`/users/${reply.user.id}`} className="replyRightContentName">
              {reply.user.name}
            </Link>
            <span className="replyRightContentText">
              {reply.content}
            </span>
          </div>
          <div className="replyRightAction">
            <span className="replyRightActionItem">
              {convertDate(reply.createdAt, false)}
            </span>
            {!(userId === reply.userId) &&
              <>
                <span className="replyRightActionItem" onClick={()=> setOpenRepair(true)}>
                  Repair
                </span>
                <span className="replyRightActionItem">
                  Remove
                </span>
              </>
            }
          </div>
        </div>
        :
        <div className="replyRightRepair">
          <ReplyRepair replyContent={reply.content} setOpenRepair={setOpenRepair}/>
        </div>
      }
    </div>
  )
}
export default Reply
