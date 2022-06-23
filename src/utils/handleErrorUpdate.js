export const handleErrorUpdate = (postInfoUpdate)=> {
    const error = {}
    if(!postInfoUpdate.title?.trim()) {
        error.title = 'Enter your post new title'
    }
    if(!postInfoUpdate.content?.trim()) {
        error.content = 'Enter your post new content'
    }
    return error
}