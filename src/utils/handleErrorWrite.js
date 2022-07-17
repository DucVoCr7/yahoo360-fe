export default function handleErrorWrite(postInfo) {
    const error = {}
    if(!postInfo?.title?.trim()) {
        error.title = 'Enter your post title!'
    }
    if(!postInfo?.content?.trim()) {
        error.content = 'Enter your post content!'
    }
    if(!postInfo?.category?.trim()) {
        error.category = 'Choice post category!'
    }
    if(!postInfo?.image) {
        error.image = 'Please upload post image!'
    }
    return error
}
