import React from 'react'
import empty from '../../assets/image/empty.png'
import convertDate from '../../utils/convertDate'
import { Link } from 'react-router-dom'
import './listNotify.scss'

function ListNotify({data, setOpenNotify}) {
    
  return (
    <div className="listNotify">
        <div className="listNotifyTitle">
            Friend request list
            <i className="listNotifyTitleIcon bi bi-x-lg"
                onClick={() => setOpenNotify(false)}
            />
        </div>
        {data?.length > 0 ?
            data.map(item => (
                <Link to={`/users/${item.userId}`} className='listNotifyItem' onClick={()=> setOpenNotify(false)}>
                    <span className="listNotifyItemTop">
                        <img src={item.dataFriendRequestReceived.image} className="listNotifyItemTopImg" alt='avatar' />
                        <span className="listNotifyItemTopContent">
                            {item.dataFriendRequestReceived.name} sent a friend request.
                        </span>
                    </span>
                    <div className="listNotifyItemBottom">
                            {convertDate(item.updatedAt, 'noYear')}
                    </div>
                </Link>
            ))
            :
            <div className="listNotifyNoContent">
                <img src={empty} alt='emptyIcon' className="listNotifyNoContentIcon"/>
            </div>
        }
    </div>
  )
}

export default ListNotify