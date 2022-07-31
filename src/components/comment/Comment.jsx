import React, { useCallback, memo, useState } from 'react';
import { Link } from 'react-router-dom'
import convertDate from '../../utils/convertDate'
import Reply from '../reply/Reply'
import CommentRepair from '../commentRepair/CommentRepair'
import ReplyAwait from '../replyAwait/ReplyAwait'
import { useReduxUserId } from '../../utils/reduxMethods'
import { userRequest } from '../../utils/requestMethods'
import './comment.scss'

function Comment({ 
  comment, 
  setComments, 
  setCommentsNumber, 
  postId
}) {

  const userId = useReduxUserId()
  const [commentContent, setCommentContent] = useState(comment.content)
  const [replies, setReplies] = useState(comment.replies)
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

  return (
    <div className='comment'>
      <div className="commentTop">
        <Link to={`/users/${comment.userId}`} className='commentTopLeft'>
          <img src={comment.user.image} alt="userImg" className="commentTopLeftImg"/>
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