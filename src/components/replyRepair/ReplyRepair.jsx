import React from 'react'
import './replyRepair.scss'
function ReplyRepair({replyContent, setOpenRepair}) {
    const handleRepairReply = async (event) => {
        try {
            setOpenRepair(false)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='replyRepair'>
        <textarea className="replyRepairContent">
            {replyContent }
        </textarea>
        <div className="replyRepairAction">
            <button className="replyRepairActionItem" onClick={()=> setOpenRepair(false)}>
                Cancle
            </button>
            <button className="replyRepairActionItem" onClick={handleRepairReply}>
                Repair
            </button>
        </div>
    </div>
  )
}

export default ReplyRepair