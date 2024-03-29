import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import empty from '../../assets/image/empty.png'
import './friends.scss'

function Friends({ 
  name, 
  friends, 
  elementRenderNumber 
}) {

  const friendsHiddenNumber = friends.length - elementRenderNumber
  const [openFriends, setOpenFriends] = useState(false)

  return (
    <div className='friends'>
      <span className='friendsTitle'>
        <span className="friendsTitleContent" onClick={() => setOpenFriends(true)}>
          <i className="friendsTitleContentIcon bi bi-person-fill"></i>
          FRIENDS
        </span>
        <span className="friendsTitleSeeAll" onClick={() => setOpenFriends(true)}>
            See all ({friends.length})
        </span>
      </span>
      {friends.length > 0 ?
        <div className="friendsContent">
          {friends.map((friend, index) => (
            index < elementRenderNumber &&
            <Link to={`/users/${friend.friendId}`} className="friendsContentItem" key={index}>
              <img src={friend.dataFriend.image} alt="friendImg" className="friendsContentItemImg" />
              <span className="friendsContentItemName">{friend.dataFriend.name}</span>
            </Link>
          ))}
          {friendsHiddenNumber > 0 && <span className="friendsContentHidden" onClick={() => setOpenFriends(true)}>+{friendsHiddenNumber}</span>}
        </div>
        :
        <div className="friendsNoContent">
            <span className="friendsNoContentContent">
              <img src={empty} alt='emptyIcon' className="friendsNoContentContentIcon"/>
            </span>
        </div>
      }

      {/* FriendsList */}
      {openFriends &&
        <div className="friendsList">
          <div className="friendsListTitle">
            {name}'s friends
            <i className="friendsListTitleClose bi bi-x-lg" onClick={() => setOpenFriends(false)}></i>
          </div>
          <div className="friendsListContent">
            {friends.map((friend, index) => (
              <Link to={`/users/${friend.friendId}`} onClick={() => setOpenFriends(false)} className="friendsListContentItem" key={index}>
                <img src={friend.dataFriend.image} alt="friendImg" className="friendsListContentItemImg" />
                <span className="friendsListContentItemName">{friend.dataFriend.name}</span>
              </Link>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default memo(Friends)