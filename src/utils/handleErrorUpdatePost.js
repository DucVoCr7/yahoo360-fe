export default function handleErrorUpdatePost(postUpdate, postInfo) {
    const dataUpdate = {...postUpdate}
    Object.keys(dataUpdate).forEach(key => {
        if(key == 'image') {
            if(dataUpdate[key] === postInfo[key]) {
                delete dataUpdate[key]
            }
        } else {
            if(dataUpdate[key].trim() === postInfo[key]) {
                delete dataUpdate[key]
            }
        }
    })

    const resultError = {}
    if(!postUpdate.title.trim()) {
        resultError.title = 'Enter your post title!'
    }
    if(!postUpdate.content.trim()) {
        resultError.content = 'Enter your post content!'
    }
    return [dataUpdate, resultError]
}
