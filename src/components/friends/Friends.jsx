import React from 'react'
import { Link } from 'react-router-dom'
import './friends.scss'
function Friends({friends}) {
  const friendsHiddenNumber = friends.length - 4
  return (
    <div className='friends'>
        <title className='friendsTitle'>
          <i className="friendsTitleIcon bi bi-person-plus-fill"></i>
          FRIENDS ({friends.length})
        </title>
        <div className="friendsContent">
        {friends.map((friend, index)=> (
              index < 4 &&
              <Link to={`/users/${friend.dataFriend.id}`} className="friendsContentItem"  key={index}>
                <img src={friend.dataFriend.image} alt="friendImg" className="friendsContentItemImg"/>
                <span className="friendsContentItemName">{friend.dataFriend.name}</span>
              </Link>
            ))}
            {friendsHiddenNumber && <span className="friendsContentHidden">+{friendsHiddenNumber}</span>}
        </div>
    </div>
  )
}

export default Friends