import React, { useState, useEffect } from 'react'
import './updatePost.scss'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import handleErrorUpdatePost from '../../utils/handleErrorUpdatePost';
import addImage from '../../assets/image/addImage.png'
import { useReduxCategoryList, useReduxValueCategory } from '../../utils/reduxMethods';
import {userRequest} from '../../utils/requestMethods'
                                                                                                   
function UpdatePost({post, setOpenUpdate, setPost}) {
    const [postUpdate, setPostUpdate] = useState({
        image: post.image,
        title: post.title,
        content: post.content,
        category: post.category
    })
    const [openCategory, setOpenCategory] = useState(false)
    const [error, setError] = useState({})
    const categoryList = useReduxCategoryList()
    const valueCategory = useReduxValueCategory(postUpdate.category)


    const handleSetFile = (event) => {
        const file = event.target.files[0]
        file.preview = URL.createObjectURL(file)
        setPostUpdate({...postUpdate, image: file})
    }

    const handleChange = (event) => {
        setPostUpdate({ ...postUpdate, [event.target.name]: event.target.value})
        setError({...error, [event.target.name]: ''})
    }

    const handleSubmit = async (event) => {
        const [dataUpdate, resultErrors] = handleErrorUpdatePost(postUpdate, post)
        if(Object.keys(dataUpdate).length === 0) {
            setOpenUpdate(false)
        } else {
            if(Object.keys(resultErrors).length === 0) {
                const data = new FormData()
                Object.keys(dataUpdate).forEach(key=> data.append(key, dataUpdate[key]))
                try {
                    const response = await userRequest.patch(`/posts/${post.id}`, data)
                    console.log(response.data)
                    setPost(prev => ({...prev, ...response.data.post}))
                    setOpenUpdate(false)
                } catch (error) {
                    console.log(error)
                }
            } else {
                setError(resultErrors)
            }
        }
    }

    useEffect(() => {
        return () => postUpdate?.image && URL.revokeObjectURL(postUpdate?.image.preview)
    }, [postUpdate?.image])

    return (
        <div className='updatePost'>

            {/* Image */}
            <div className="updatePostImage">
                <label className='updatePostImageLabel' htmlFor="updatePostImageId">
                    <img src={addImage} alt="imgLabel" className="updatePostImageLabelContent" />
                </label>
                <input type="file" id="updatePostImageId" onChange={handleSetFile} hidden/>
                <img src={postUpdate.image?.preview ? postUpdate.image.preview : postUpdate.image} className="updatePostImageContent" alt="updatePostImage"/>
            </div>

            {/* Title */}
            <div className="updatePostTitle">
                <i className="updatePostTitleIcon bi bi-pencil-square"></i>
                <input 
                    className='updatePostTitleInput' 
                    name='title' 
                    type="text" 
                    placeholder='Write your title...' 
                    value={postUpdate.title}
                    onChange={handleChange}
                />
            </div>
            {error?.title && <span className='updatePostError'>{error.title}</span>}

            {/* Category */}
            <div className="updatePostCategory" onClick={()=> setOpenCategory(!openCategory)}>
                Change category
                <i className="updatePostCategoryIcon bi bi-arrow-repeat"></i>
                <span className="updatePostCategoryContent">{valueCategory}</span>
                <ul className={openCategory ? "updatePostCategoryList active" : "updatePostCategoryList"}>
                    {categoryList.map((categoryItem, index) => (
                        <li className="updatePostCategoryItem" key={index}
                            onClick={(event) => {
                                setPostUpdate({ ...postUpdate, category: categoryItem.key})
                            }} 
                        >
                            {categoryItem.value}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content */}
            <div className="updatePostContent" id="editor">
            <CKEditor
                editor={ClassicEditor}
                data={postUpdate.content}
                config={{
                    removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setPostUpdate({...postUpdate, content: data})
                    setError({...error, content:''})
                }}
            />
            </div>
            {error?.content && <span className='updatePostError'>{error.content}</span>}

            {/* Submit */}
            <div className="updatePostAction">
                <button className="updatePostActionCancel btnBig btnGrey" onClick={()=> setOpenUpdate(false)}>CANCEL</button>
                <button className="updatePostActionSubmit btnBig btnMain" onClick={handleSubmit}>UPDATE</button>
            </div>
        </div>
    )
}
export default UpdatePost