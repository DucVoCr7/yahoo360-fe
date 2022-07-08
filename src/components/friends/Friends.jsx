import React from 'react'
import { Link } from 'react-router-dom'
import './friends.scss'
function Friends({friends, isHomePage = false}) {
  const friendsHiddenNumber = friends.length - 4
  return (
    <div className='friends'>
        <title className='friendsTitle'>
          <i className="friendsTitleIcon bi bi-person-plus-fill"></i>
          FRIENDS ({friends.length})
        </title>
        {friends.length > 0 ?

          <div className="friendsContent">
          {friends.map((friend, index)=> (
                index < 4 &&
                <Link to={`/users/${friend.dataFriend.id}`} className="friendsContentItem"  key={index}>
                  <img src={friend.dataFriend.image} alt="friendImg" className="friendsContentItemImg"/>
                  <span className="friendsContentItemName">{friend.dataFriend.name}</span>
                </Link>
              ))}
              {friendsHiddenNumber > 0 && <span className="friendsContentHidden">+{friendsHiddenNumber}</span>}
          </div>
          :
          <div className="friendsNoContent">
          {
            isHomePage ?
                <div className='friendsNoContentIcon'>
                    Search <br /> friend
                    <i className="friendsNoContentIconChild bi bi-person-fill"></i>
                    <i className="friendsNoContentIconChild  bi bi-plus-circle"></i>
                </div>
                :
                <div className="friendsNoContentContent">
                    Friend have not been added yet!
                </div>
        }
      </div>
        }
    </div>
  )
}

export default Friends