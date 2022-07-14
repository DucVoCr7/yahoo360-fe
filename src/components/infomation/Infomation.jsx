import React, { memo } from 'react'
import './infomation.scss'
import { useSelector } from 'react-redux'
function Infomation({gender, position, postsNumber, address, statusFriend, isHomePage = false}) {
    const valueGender = useSelector(state => state.app.gender.find(item => item.key === gender)?.value)
    const valuePosition = useSelector(state => state.app.position.find(item => item.key === position)?.value)
    console.log('re-render: Infomation')
  return (
    <div className='infomation'>
        <title className='infomationTitle'>
            <i className="infomationTitleIcon bi bi-person-lines-fill"></i>
            INFOMATION
        </title>
        <div className="infomationContent">
            <div className="infomationContentTop">
            <div className="infomationContentTopItem">
                <i className="infomationContentTopItemIcon bi-file-person-fill"></i>
                {valueGender ? valueGender : 'Gender'}
            </div>
            <div className="infomationContentTopItem">
                <i className="infomationContentTopItemIcon bi-bookmark-star-fill"></i>
                {valuePosition}
            </div>
            <div className="infomationContentTopItem">
                <i className="infomationContentTopItemIcon bi bi-file-earmark-richtext-fill"></i>
                {postsNumber}
            </div>
            <div className="infomationContentTopItem">
                <i className="infomationContentTopItemIcon bi-house-fill"></i>
                {address ? address : 'Address'}
            </div>
            </div>
            {!isHomePage && 
                <div className="infomationContentBottom">
                    {
                        // La ban be cua nhau
                        statusFriend === 3 &&
                        <div className="infomationContentBottomItem">
                            <button className="removeFriend">
                                Remove
                                <i className="removeFriendIcon bi bi-person-dash-fill"></i>
                            </button>
                            <button className="isFriend">
                                Friend
                                <i className="isFriendIcon bi bi-person-check-fill"></i>
                            </button>
                        </div>
                    }
                    {   
                        // Minh da gui yeu cau ket ban cho no
                        statusFriend === 2 &&
                        <div className="infomationContentBottomItem">
                            <button className="removeRequestFriend">
                                Remove
                                <i className="removeRequestFriendIcon bi bi-send-x"></i>
                            </button>
                            <button className="requestFriend">
                                Request
                                <i className="requestFriendIcon bi-send-check"></i>
                            </button>
                        </div>
                    }
                    {
                        // No da gui yeu cau ket ban cho minh
                        statusFriend === 1 &&
                        <div className="infomationContentBottomItem">
                            <button className="removeFriendRequest">
                                Refuse
                                <i className="removeFriendRequestIcon bi bi-send-x"></i>
                            </button>
                            <button className="friendRequest">
                                Accept
                                <i className="friendRequestIcon bi-send-check"></i>
                            </button>
                        </div>
                    }
                    {
                        // Khong la ban be cua nhau, cung khong co yeu cau nao ca
                        statusFriend === 0 &&
                        <div className="infomationContentBottomItem">
                            <button className="notFriend">
                                Send a friend request
                                <i className="notFriendIcon bi-person-plus-fill"></i>
                            </button>
                        </div>
                    }
                </div>
            }
        </div>
    </div>
  )
}
export default memo(Infomation)