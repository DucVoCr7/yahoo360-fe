import React, { useCallback, memo } from 'react';
import { useReduxUserFriendRequestReceiveds, useReduxUserFriendRequestSents, useReduxUserId, useReduxUserImage, useReduxUserName } from '../../utils/reduxMethods'
import { userRequest } from '../../utils/requestMethods'
import { useDispatch } from 'react-redux'
import { setFriendRequestReceiveds, setFriendRequestSents } from '../../redux/userSlice'
import './actionsFriend.scss'

function ActionsFriend({
    id,
    friends,
    setFriends,
    statusFriend,
    setStatusFriend,
}) {

    const dispatch = useDispatch()
    const userId = useReduxUserId()
    const userName = useReduxUserName()
    const userImg = useReduxUserImage()
    const userFriendRequestSents = useReduxUserFriendRequestSents()
    const userFriendRequestReceiveds = useReduxUserFriendRequestReceiveds()

    const handleRemoveFriend = useCallback(async () => {
        try {
            const idFriendData = friends.find(friend => friend.friendId === userId).id
            const response = await userRequest.delete(`/friends/deleteFriend/${idFriendData}`)
            setStatusFriend(0)
            const newFriends = friends.filter(friend => friend.id !== idFriendData)
            setFriends(newFriends)
        } catch (error) {
            console.log(error)
        }
    })
    const handleRemoveRequest = useCallback(async () => {
        try {
            const idRequest = userFriendRequestSents.find(request => request.friendId === id).id
            const response = await userRequest.delete(`/friends/removeRequest/${idRequest}`)
            setStatusFriend(0)
            const newUserFriendRequestSents = userFriendRequestSents.filter(request => request.id !== idRequest)
            dispatch(setFriendRequestSents(newUserFriendRequestSents))
        } catch (error) {
            console.log(error)
        }
    })
    const handleRefuseRequest = useCallback(async () => {
        try {
            const idRequest = userFriendRequestReceiveds.find(request => request.userId === id).id
            const response = await userRequest.delete(`/friends/refuseRequest/${idRequest}`)
            setStatusFriend(0)
            const newUserFriendRequestReceiveds = userFriendRequestReceiveds.filter(request => request.id !== idRequest)
            dispatch(setFriendRequestReceiveds(newUserFriendRequestReceiveds))
        } catch (error) {
            console.log(error)
        }
    })
    const handleAcceptRequest = useCallback(async () => {
        try {
            const idRequest = userFriendRequestReceiveds.find(request => request.userId === id).id
            const response = await userRequest.patch(`/friends/acceptRequest/${idRequest}`)
            setStatusFriend(3)
            const newUserFriendRequestReceiveds = userFriendRequestReceiveds.filter(request => request.id !== idRequest)
            dispatch(setFriendRequestReceiveds(newUserFriendRequestReceiveds))
            setFriends(prev => [{
                ...response.data.friend, dataFriend: {
                    name: userName,
                    image: userImg
                }
            }, ...prev])
        } catch (error) {
            console.log(error)
        }
    })
    const handleSentRequest = useCallback(async () => {
        try {
            const response = await userRequest.post('/friends/sentRequest', {
                userId,
                friendId: id
            })
            setStatusFriend(2)
            dispatch(setFriendRequestSents([response.data.request, ...userFriendRequestSents]))
        } catch (error) {
            console.log(error)
        }
    })

    if (statusFriend === 3) {
        return (
            <div className="actionsFriend">
                <button className="isFriend btnSmall btnSmall btnBlue" >
                    Be friends
                    <i className="isFriendIcon bi bi-person-check-fill"></i>
                </button>
                <button className="removeFriend btnSmall btnGrey"
                    onClick={handleRemoveFriend}
                >
                    Remove friends
                    <i className="removeFriendIcon bi bi-person-dash-fill"></i>
                </button>
            </div>
        )
    } else if (statusFriend === 2) {
        return (
            <div className="actionsFriend">
                <button className="requestFriend btnSmall btnBlue">
                    Sent friend request
                    <i className="requestFriendIcon bi-send-check"></i>
                </button>
                <button className="removeRequestFriend btnSmall btnGrey"
                    onClick={handleRemoveRequest}
                >
                    Remove friend request
                    <i className="removeRequestFriendIcon bi bi-send-x"></i>
                </button>
            </div>
        )
    } else if (statusFriend === 1) {
        return (
            <div className="actionsFriend">
                <button className="friendRequest btnSmall btnBlue"
                    onClick={handleAcceptRequest}
                >
                    Accept friend request
                    <i className="friendRequestIcon bi-send-check"></i>
                </button>
                <button className="removeFriendRequest btnSmall btnGrey"
                    onClick={handleRefuseRequest}
                >
                    Refuse friend request
                    <i className="removeFriendRequestIcon bi bi-send-x"></i>
                </button>
            </div>
        )
    } else if (statusFriend === 0) {
        return (
            <div className="actionsFriend">
                <button className="notFriend btnSmall btnBlue"
                    onClick={handleSentRequest}
                >
                    Send friend request
                    <i className="notFriendIcon bi-person-plus-fill"></i>
                </button>
            </div>
        )
    }
}
export default memo(ActionsFriend)