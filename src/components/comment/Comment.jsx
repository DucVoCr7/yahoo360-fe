import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import convertDate from '../../utils/convertDate'
import Reply from '../reply/Reply'
import CommentRepair from '../commentRepair/CommentRepair'
import ReplyAwait from '../replyAwait/ReplyAwait'
import { useReduxUserId } from '../../utils/reduxMethods'
import avatar from '../../assets/image/avatar.jpg'
import './comment.scss'
import { userRequest } from '../../utils/requestMethods'
import { useCallback } from 'react'

function Comment({ comment, setComments, setCommentsNumber, postId }) {
  const [commentContent, setCommentContent] = useState(comment.content)
  const [replies, setReplies] = useState(comment.replies)
  const userId = useReduxUserId()
  const [openRepair, setOpenRepair] = useState(false)
  const [openReply, setOpenReply] = useState(false)

  const handleRemoveComment = useCallback(async ()=> {
    try {
      const response = await userRequest.delete(`/comments/${comment.id}`)
      setComments(prev => prev.filter(item => item.id !== comment.id) )
      setCommentsNumber(prev => prev - 1)
    } catch (error) {
      console.log(error)
    }
  })

  console.log('render Comment')
  return (
    <div className='comment'>
      <div className="commentTop">
        <Link to={`/users/${comment.userId}`} className='commentTopLeft'>
          <img src={comment.user.image ? comment.user.image : avatar} alt="userImg" className="commentTopLeftImg"/>
        </Link>
        {!openRepair ?
          <div className="commentTopRight">
            <div className="commentTopRightContent">
              <Link to={`/users/${comment.userId}`} className="commentTopRightContentName">
                {comment.user.name}
              </Link>
              <span className="commentTopRightContentText">
                {commentContent}
              </span>
            </div>
            <div className="commentTopRightAction">
              <span className="commentTopRightActionItem">
                {convertDate(comment.createdAt, 'noYear')}
              </span>
              <label className="commentTopRightActionItem" htmlFor='replyAwaitId'
                onClick={() => setOpenReply(true)}
              >
                Reply
              </label>
              {userId === comment.userId &&
                <>
                  <span className="commentTopRightActionItem" onClick={() => setOpenRepair(true)}>
                    Repair
                  </span>
                  <span className="commentTopRightActionItem" onClick={handleRemoveComment}>
                    Remove
                  </span>
                </>
              }
            </div>
          </div>
          :
          <div className="commentTopRightRepair">
            <CommentRepair 
              commentId = {comment.id}
              commentContent={commentContent} 
              setCommentContent={setCommentContent} 
              setOpenRepair={setOpenRepair} />
          </div>
        }

      </div>
      <div className="commentBottom">
        {openReply &&
          <ReplyAwait
            setOpenReply={setOpenReply}
            commentId={comment.id}
            postId={postId}
            setReplies={setReplies}
            setCommentsNumber={setCommentsNumber}
          />
        }
        {replies.map((reply) => (
          <Reply 
            key={reply.id}
            reply={reply}
            setReplies={setReplies}
            setCommentsNumber={setCommentsNumber} 
          />
        ))}
      </div>
    </div>
  )
}

export default memo(Comment)