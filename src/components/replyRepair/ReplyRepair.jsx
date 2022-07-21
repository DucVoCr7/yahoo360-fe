import React, { useCallback, useState } from 'react'
import { userRequest } from '../../utils/requestMethods'
import './replyRepair.scss'
function ReplyRepair({replyId, replyContent, setReplyContent, setOpenRepair}) {
    const [contentRepair, setContentRepair] = useState(replyContent)
    const handleRepairReply = useCallback(async (event) => {
        if(contentRepair === replyContent || contentRepair.trim() === '') {
            setOpenRepair(false)
        } else {
            try {
                const response = await userRequest.patch(`/replies/${replyId}`, {
                    content: contentRepair
                })
                setReplyContent(response.data.reply.content)
                setOpenRepair(false)
            } catch (error) {
                console.log(error)
            }
        }
    })
  return (
    <div className='replyRepair'>
        <textarea className="replyRepairContent"
            onChange={(event)=> setContentRepair(event.target.value)}
            value={contentRepair}
        />
        <div className="replyRepairAction">
            <button className="replyRepairActionItem btnSmall btnGrey" onClick={()=> setOpenRepair(false)}>
                Cancel
            </button>
            <button className="replyRepairActionItem btnSmall btnBlue" onClick={handleRepairReply}>
                Repair
            </button>
        </div>
    </div>
  )
}

export default ReplyRepair