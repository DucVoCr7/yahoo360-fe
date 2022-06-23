export const handleErrorWrite = (postInfo)=> {
    const error = {}
    if(!postInfo.title?.trim()) {
        error.title = 'Enter your post title'
    }
    if(!postInfo.content?.trim()) {
        error.content = 'Enter your post content'
    }
    if(!postInfo.category?.trim()) {
        error.category = 'You have not selected the post category'
    }
    return error
}