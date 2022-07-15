import React from 'react'
import './commentRepair.scss'
function CommentRepair({commentContent, setOpenRepair}) {
    const handleRepairComment = async (event) => {
        try {
            setOpenRepair(false)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='commentRepair'>
        <textarea className="commentRepairContent">
            {commentContent }
        </textarea>
        <div className="commentRepairAction">
            <button className="commentRepairActionItem" onClick={()=> setOpenRepair(false)}>
                Cancle
            </button>
            <button className="commentRepairActionItem" onClick={handleRepairComment}>
                Repair
            </button>
        </div>
    </div>
  )
}

export default CommentRepair