import React from 'react'
import convertDate from '../../utils/convertDate'
import { Link } from 'react-router-dom'
import './reply.scss'
import { useSelector } from 'react-redux'
function Reply({ reply }) {
  const userId = useSelector(state => state.user.userInfo?.id)
  return (
    <div className='reply'>
      <Link to={`/users/${reply.user.id}`} className='replyLeft'>
        <img src={reply.user.image} alt="userImg" className="replyLeftImg" />
      </Link>
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
          {userId === reply.userId &&
            <>
              <span className="replyRightActionItem">
                Repair
              </span>
              <span className="replyRightActionItem">
                Remove
              </span>
            </>
          }
        </div>
      </div>
    </div>
  )
}
export default Reply
