import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { userRequest } from '../../utils/requestMethods'
import './commentRepair.scss'
function CommentRepair({commentId, commentContent, setCommentContent, setOpenRepair}) {
    const [contentRepair, setContentRepair] = useState(commentContent)
    const handleRepairComment = useCallback(async (event) => {
        if(contentRepair === commentContent || contentRepair.trim() === '') {
            setOpenRepair(false)
        } else {
            try {
                const response = await userRequest.patch(`comments/${commentId}`, {
                    content: contentRepair
                })
                setCommentContent(response.data.comment.content)
                setOpenRepair(false)
            } catch (error) {
                console.log(error)
            }
        }
    })

   console.log('render CommentRepair') 
  return (
    <div className='commentRepair'>
        <textarea className="commentRepairContent"
            value={contentRepair}
            onChange={event => setContentRepair(event.target.value)}
        />
        <div className="commentRepairAction">
            <button className="commentRepairActionItem btnSmall btnGrey" onClick={()=> setOpenRepair(false)}>
                Cancel
            </button>
            <button className="commentRepairActionItem btnSmall btnBlue" onClick={handleRepairComment}>
                Repair
            </button>
        </div>
    </div>
  )
}

export default CommentRepair