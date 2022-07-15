import React from 'react'
import { Link } from 'react-router-dom'
import convertDate from '../../utils/convertDate'
import Reply from '../reply/Reply'
import { useSelector } from 'react-redux'
import './comment.scss'
function Comment({ comment }) {
  console.log(comment)
  const userId = useSelector(state => state.user.userInfo?.id)
  return (
    <div className='comment'>
      <div className="commentTop">
        <Link to={`/users/${comment.user.id}`} className='commentTopLeft'>
          <img src={comment.user.image} alt="userImg" className="commentTopLeftImg" />
        </Link>
        <div className="commentTopRight">
          <div className="commentTopRightContent">
            <Link to={`/users/${comment.user.id}`} className="commentTopRightContentName">
              {comment.user.name}
            </Link>
            <span className="commentTopRightContentText">
              {comment.content}
            </span>
          </div>
          <div className="commentTopRightAction">
            <span className="commentTopRightActionItem">
              {convertDate(comment.createdAt, false)}
            </span>
            <span className="commentTopRightActionItem">
              Reply
            </span>
            {userId === comment.userId &&
              <>
                <span className="commentTopRightActionItem">
                  Repair
                </span>
                <span className="commentTopRightActionItem">
                  Remove
                </span>
              </>
            }
          </div>
        </div>
      </div>
      <div className="commentBottom">
        {comment.replies.map((reply, index) => (
          <Reply reply={reply} key ={index}/>
        ))}
      </div>
    </div>
  )
}

export default Comment