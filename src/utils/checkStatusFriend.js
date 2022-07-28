const checkStatusFriend = (
    dataId,
    dataFriends, 
    userId, 
    userFriendRequestReceiveds, 
    userFriendRequestSents
    )=> {
        let statusFriend;
        console.log(dataId, dataFriends, userId, userFriendRequestReceiveds, userFriendRequestSents)
        if(dataFriends.find(item => item.friendId === userId)) {
            statusFriend = 3 // La ban be cua nhau
        } else if(userFriendRequestSents.find(item => item.friendId === dataId)) {
            statusFriend = 2 // Minh da gui yeu cau ket ban cho no
        } else if(userFriendRequestReceiveds.find(item => item.userId === dataId)) {
            statusFriend = 1 // No da gui yeu cau ket ban cho minh
        } else statusFriend = 0 // Khong la ban be cua nhau, cung khong co yeu cau nao ca
        return statusFriend;
}
export default checkStatusFriend