export default function handleErrorWrite(postInfo) {
    const resultError = {}
    if(!postInfo?.title?.trim()) {
        resultError.title = 'Enter your post title!'
    }
    if(!postInfo?.content?.trim()) {
        resultError.content = 'Enter your post content!'
    }
    if(!postInfo?.category?.trim()) {
        resultError.category = 'Choice post category!'
    }
    if(!postInfo?.image) {
        resultError.image = 'Please upload post image!'
    }
    return resultError
}
