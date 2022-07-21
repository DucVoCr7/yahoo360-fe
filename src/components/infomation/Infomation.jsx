import React, { memo } from 'react'
import './infomation.scss'
import { useReduxValueGender, useReduxValuePosition } from '../../utils/reduxMethods'
function Infomation({gender, position, postsNumber, address, statusFriend, isHomePage = false}) {
    const valueGender = useReduxValueGender(gender)
    const valuePosition = useReduxValuePosition(position)
    console.log('re-render: Infomation')
  return (
    <div className='infomation'>
        <title className='infomationTitle'>
            <span className="infomationTitleContent">
            <i className="infomationTitleContentIcon bi bi-person-lines-fill"></i>
                INFOMATION
            </span>
        </title>
        <div className="infomationContent">
            <div className="infomationContentTop">
            <div className="infomationContentTopItem">
                <i className="infomationContentTopItemIcon bi-file-person-fill"></i>
                {valueGender ? valueGender : 'No Info'}
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
                {address ? address : 'No Info'}
            </div>
            </div>
            {!isHomePage && 
                <div className="infomationContentBottom">
                    {
                        // La ban be cua nhau
                        statusFriend === 3 &&
                        <div className="infomationContentBottomItem">
                            <button className="removeFriend btnSmall btnGrey">
                                Remove
                                <i className="removeFriendIcon bi bi-person-dash-fill"></i>
                            </button>
                            <button className="isFriend btnSmall btnSmall btnBlue" >
                                Friend
                                <i className="isFriendIcon bi bi-person-check-fill"></i>
                            </button>
                        </div>
                    }
                    {   
                        // Minh da gui yeu cau ket ban cho no
                        statusFriend === 0 &&
                        <div className="infomationContentBottomItem">
                            <button className="removeRequestFriend btnSmall btnGrey">
                                Remove
                                <i className="removeRequestFriendIcon bi bi-send-x"></i>
                            </button>
                            <button className="requestFriend btnSmall btnBlue">
                                Request
                                <i className="requestFriendIcon bi-send-check"></i>
                            </button>
                        </div>
                    }
                    {
                        // No da gui yeu cau ket ban cho minh
                        statusFriend === 2 &&
                        <div className="infomationContentBottomItem">
                            <button className="removeFriendRequest btnSmall btnGrey">
                                Refuse
                                <i className="removeFriendRequestIcon bi bi-send-x"></i>
                            </button>
                            <button className="friendRequest btnSmall btnBlue">
                                Accept
                                <i className="friendRequestIcon bi-send-check"></i>
                            </button>
                        </div>
                    }
                    {
                        // Khong la ban be cua nhau, cung khong co yeu cau nao ca
                        statusFriend === 1 &&
                        <div className="infomationContentBottomItem">
                            <button className="notFriend btnSmall btnBlue">
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