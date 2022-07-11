import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import './friends.scss'


function Friends({ name, friends }) {

  const friendsHiddenNumber = friends.length - 4
  const [openFriends, setOpenFriends] = useState(false)

  console.log('re-render: Friends')
  return (
    <div className='friends'>

      <title className='friendsTitle' onClick={() => setOpenFriends(true)}>
        <i className="friendsTitleIcon bi bi-person-plus-fill"></i>
        FRIENDS ({friends.length})
      </title>

      {
        friends.length > 0 ?

        <div className="friendsContent">
          {friends.map((friend, index) => (
            index < 4 &&
            <Link to={`/users/${friend.dataFriend.id}`} className="friendsContentItem" key={index}>
              <img src={friend.dataFriend.image} alt="friendImg" className="friendsContentItemImg" />
              <span className="friendsContentItemName">{friend.dataFriend.name}</span>
            </Link>
          ))}
          {friendsHiddenNumber > 0 && <span className="friendsContentHidden" onClick={() => setOpenFriends(true)}>+{friendsHiddenNumber}</span>}
        </div>
        :
        <div className="friendsNoContent">
          <div className="friendsNoContentContent">
            Friend have not been added yet!
          </div>
        </div>
      }

      
      {/* FriendsList */}
      {openFriends &&
        <div className="friendsList">
          <div className="friendsListTitle">
            {name}'s friends
            <i className="friendsListTitleClose bi bi-x" onClick={() => setOpenFriends(false)}></i>
          </div>
          <div className="friendsListContent">
            {friends.map((friend, index) => (
              <Link to={`/users/${friend.dataFriend.id}`} onClick={() => setOpenFriends(false)} className="friendsListContentItem" key={index}>
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