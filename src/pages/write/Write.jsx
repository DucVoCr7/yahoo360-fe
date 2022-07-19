import React, { useState, useEffect } from 'react'
import './write.scss'
import addImage from '../../assets/image/addImage.png'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import handleErrorWrite from '../../utils/handleErrorWrite';
import { useReduxCategoryList, useReduxUserId, useReduxValueCategory } from '../../utils/reduxMethods';
import {userRequest} from '../../utils/requestMethods'
import { useNavigate } from 'react-router-dom';
export default function Write() {
    const [openCategory, setOpenCategory] = useState(false)
    const [postInfo, setPostInfo] = useState({})
    const [error, setError] = useState({})
    const categoryList = useReduxCategoryList()
    const userId = useReduxUserId()
    const valueCategory = useReduxValueCategory(postInfo?.category)
    const navigate = useNavigate()
    const handlePreview = (event) => {
        const file = event.target.files[0]
        file.preview = URL.createObjectURL(file)
        setPostInfo({...postInfo, image: file})
        setError({...error, image: ''})
    }

    const handleChange = (event) => {
        setPostInfo({ ...postInfo, [event.target.name]: event.target.value })
        setError({...error, [event.target.name]: ''})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const resultError = handleErrorWrite(postInfo)
        if(Object.keys(resultError).length === 0) {
            const data = new FormData()
            data.append('userId', userId)
            Object.keys(postInfo).forEach(key=> data.append(key, postInfo[key]))
            try {
                const response = await userRequest.post('/posts', data)
                navigate(`/posts/${response.data.post.id}`)
            } catch (error) {
                console.log(error)
            }
        } else {
            setError(resultError)
        }
    }
    useEffect(() => {
        return () => postInfo?.image && URL.revokeObjectURL(postInfo?.image.preview)
    }, [postInfo?.image])
    return (
        <div className='write'>

            {/* Image */}
            <div className="writeImage">
                <label className={postInfo?.image ? 'writeImageLabel active' : 'writeImageLabel'} htmlFor="writeImageId">
                    <img src={addImage} alt="imgLabel" className="writeImageLabelContent" />
                </label>
                <input type="file" id="writeImageId" onChange={handlePreview} hidden/>
                {postInfo?.image &&
                    <img src={postInfo.image.preview} className="writeImageContent" name='image' alt="writeImage"/>
                }
            </div>
            {error?.image && <span className='writeError'>{error.image}</span>}

            {/* Title */}
            <div className="writeTitle">
                <i className="writeTitleIcon bi bi-pencil-square"></i>
                <input className='writeTitleInput' name='title' type="text" placeholder='Write your title...' onChange={handleChange} />
            </div>
            {error?.title && <span className='writeError'>{error.title}</span>}

            {/* Category */}
            <div className="writeCategory" onClick={()=> setOpenCategory(!openCategory)}>
                {postInfo?.category ? 'Change category' : 'Choose category'}
                <i className={postInfo?.category ? "writeCategoryIcon bi bi-arrow-repeat" :"writeCategoryIcon bi bi-ui-checks-grid"}></i>
                {postInfo?.category && <span className="writeCategoryContent">{valueCategory}</span>}
                <ul className={openCategory ? "writeCategoryList active" : "writeCategoryList"}>
                    {categoryList.map((categoryItem, index) => (
                        <li className="writeCategoryItem" key={index}
                            onClick={(event) => {
                                setPostInfo({ ...postInfo, category: categoryItem.key})
                                setError({...error, category:''})
                            }}
                        >
                            {categoryItem.value}
                        </li>
                    ))}
                </ul>
            </div>
            {error?.category && <span className='writeError'>{error.category}</span>}

            {/* Content */}
            <div className="writeContent">
            <CKEditor
                editor={ClassicEditor}
                data="<p>Enter content post....</p>"
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setPostInfo({...postInfo, content: data})
                    setError({...error, content:''})
                }}
            />
            </div>
            {error?.content && <span className='writeError'>{error.content}</span>}

            {/* Submit */}
            <button className="writeSubmit" onClick={handleSubmit}>SUBMIT</button>
        </div>
    )
}