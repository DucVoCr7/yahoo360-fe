const checkStatusFriend = (dataFriends, dataFriendsRequest, dataId, userFriendsRequest, userId)=> {
    let statusFriend;
    if(dataFriends.find(item => item.friendId === userId)) {
        statusFriend = 3 // La ban be cua nhau
    } else if(dataFriendsRequest.find(item => item.userId === userId)) {
        statusFriend = 2 // Minh da gui yeu cau ket ban cho no
    } else if(userFriendsRequest.find(item => item.userId === dataId)) {
        statusFriend = 1 // No da gui yeu cau ket ban cho minh
    } else statusFriend = 0 // Khong la ban be cua nhau, cung khong co yeu cau nao ca
    return statusFriend;
}
export default checkStatusFriend