import React, { useState, useEffect } from 'react'
import './updatePost.scss'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import handleErrorUpdatePost from '../../utils/handleErrorUpdatePost';
import addImage from '../../assets/image/addImage.png'
import { useReduxCategoryList, useReduxUserId, useReduxValueCategory } from '../../utils/reduxMethods';
import {userRequest} from '../../utils/requestMethods'
import { useNavigate } from 'react-router-dom';
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
    const userId = useReduxUserId()
    const valueCategory = useReduxValueCategory(postUpdate.category)
    const navigate = useNavigate()


    const handlePreview = (event) => {
        const file = event.target.files[0]
        file.preview = URL.createObjectURL(file)
        setPostUpdate({...postUpdate, image: file})
    }

    const handleChange = (event) => {
        setPostUpdate({ ...postUpdate, [event.target.name]: event.target.value})
        setError({...error, [event.target.name]: ''})
    }

    const handleSubmit = async (event) => {
        const [dataUpdate, resultError] = handleErrorUpdatePost(postUpdate, post)
        if(Object.keys(dataUpdate).length === 0) {
            console.log(123)
            setOpenUpdate(false)
        } else {
            console.log(1234)
            if(Object.keys(resultError).length === 0) {
                const data = new FormData()
                Object.keys(postUpdate).forEach(key=> data.append(key, postUpdate[key]))
                try {
                    const response = await userRequest.patch(`/posts/${post.id}`, data)
                    console.log(response.data)
                    setPost(prev => ({...prev, ...response.data.post}))
                    setOpenUpdate(false)
                } catch (error) {
                    console.log(error)
                }
            } else {
                setError(resultError)
            }
        }
    }
    useEffect(() => {
        return () => postUpdate?.image && URL.revokeObjectURL(postUpdate?.image.preview)
    }, [postUpdate?.image])
    console.log('postUpdate:', postUpdate)
    return (
        <div className='updatePost'>

            {/* Image */}
            <div className="updatePostImage">
                <label className='updatePostImageLabel' htmlFor="updatePostImageId">
                    <img src={addImage} alt="imgLabel" className="updatePostImageLabelContent" />
                </label>
                <input type="file" id="updatePostImageId" onChange={handlePreview} hidden/>
                <img src={postUpdate.image?.preview ? postUpdate.image.preview : postUpdate.image} className="updatePostImageContent" name='image' alt="updatePostImage"/>
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