import React, { useState } from 'react'
import './write.scss'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSelector } from 'react-redux';

export default function Write() {
    const [openCategory, setOpenCategory] = useState(false)
    const [postInfo, setPostInfo] = useState()
    const [error, setError] = useState()
    const [isSubmit, setIsSubmit] = useState(false)
    const {category} = useSelector(state => state.app)
    const handlePreview = (event) => {
        const file = event.target.files[0]
        file.preview = URL.createObjectURL(file)
        setPostInfo({...postInfo, image: file})
    }

    const handleChange = (event) => setPostInfo({ ...postInfo, [event.target.name]: event.target.value })

    const handleSubmit = (event) => {
        event.preventDefault()
        // setError(handleErrorWrite(postInfo))
        setIsSubmit(true)
        setError({...error,
            title: 'Title not found',
            category: 'isdfbsdjf',
            image: 'ashgdjuhasgdsa',
            content: 'sdsdsd'
        })
    }
    // useEffect(() => {
    //     if (Object.keys(error).length === 0 && isSubmit) {
    //         (async () => {
    //             const newPost = {
    //                 title: postInfo.title,
    //                 category: postInfo.category,
    //                 content: postInfo.content,
    //                 userId: user.id,
    //                 thumbnail: "https://image.thanhnien.vn/w1024/Uploaded/2022/ifyiy/2021_02_28/lay10_jozk.jpg",
    //                 likes: 0
    //             }
    //             if (file) {
    //                 const data = new FormData()
    //                 data.append('file', file)
    //                 const res = await axios.post('https://server-yahoo360v1.herokuapp.com/upload-file', data)
    //                 newPost.thumbnail = res.data.path
    //             } else {
    //                 newPost.thumbnail = "https://image.thanhnien.vn/w1024/Uploaded/2022/ifyiy/2021_02_28/lay10_jozk.jpg"
    //             }
    //             try {
    //                 const res = await axios.post('https://server-yahoo360v1.herokuapp.com/posts', newPost, {
    //                     headers: { "authorization": `Bearer ${user.token}` }
    //                 })
    //                 navigate(`/post/${res.data.id}`)
    //             } catch (error) {
    //                 alert(error?.response.data.message)
    //                 dispatch(actions.setUser(null))
    //                 navigate('/login');
    //             }
    //         })()
    //     }
    //     return () => file && URL.revokeObjectURL(file.preview)
    // }, [error, file])
    return (
        <div className='write'>

            {/* Image */}
            <div className="writeImage">
                <label className={postInfo?.image ? 'writeImageIcon active' : 'writeImageIcon'} htmlFor="writeImage">
                    {postInfo?.image ? 'Change' : 'Choose'} <br/> image
                    <i className="writeImageIconChild bi bi-image"></i>
                    <i className={postInfo?.image ? "writeImageIconChild bi bi-arrow-repeat" : "writeImageIconChild bi bi-plus-circle"}></i>
                </label>
                <input type="file" id="writeImage" onChange={handlePreview} hidden/>
                {postInfo?.image &&
                    <img src={postInfo.image.preview} className="writeImageContent" name='image' alt="writeImage"/>
                }
            </div>
            {error?.image && <span className='writeError'>{error.image}</span>}

            {/* Title */}
            <input className='writeTitle' name='title' type="text" placeholder='Write your title...' onChange={handleChange} />
            {error?.title && <span className='writeError'>{error.title}</span>}

            {/* Category */}
            <div className="writeCategory" onClick={()=> setOpenCategory(!openCategory)}>
                {postInfo?.category ? 'Change category' : 'Choose category'}
                <i className={postInfo?.category ? "writeCategoryIcon bi bi-arrow-repeat" :"writeCategoryIcon bi bi-ui-checks-grid"}></i>
                {postInfo?.category && <span className="writeCategoryContent" name='category' onChange={handleChange}>{postInfo.category}</span>}
                <ul className={openCategory ? "writeCategoryList active" : "writeCategoryList"}>
                    {category.map((categoryItem, index) => (
                        <li className="writeCategoryItem" key={index}
                            onClick={(event) => setPostInfo({ ...postInfo, category: event.target.innerText })}
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
                }}
            />
            </div>
            {error?.content && <span className='writeError'>{error.content}</span>}

            {/* Submit */}
            <button className="writeSubmit" onClick={handleSubmit}>SUBMIT</button>
        </div>
    )
}