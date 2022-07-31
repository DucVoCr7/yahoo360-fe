import React, { useState, useEffect }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import convertDate from '../../utils/convertDate'
import Comments from '../comments/Comments'
import { useReduxUserId, useReduxValueCategory } from '../../utils/reduxMethods'
import { publicRequest, userRequest } from '../../utils/requestMethods'
import UpdatePost from '../updatePost/UpdatePost'
import './post.scss'

function Post({post, setPost}) {

    const [likesNumber, setLikesNumber] = useState(post.likesNumber)
    const [commentsNumber, setCommentsNumber] = useState(post.commentsNumber)
    const [isLike, setIsLike] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const valueCategory = useReduxValueCategory(post.category)
    const userId = useReduxUserId()
    const [openComments, setOpenComments] = useState()
    const navigate = useNavigate();

    const handleLike = async (event)=> {
        try {
            const response = await userRequest.post('/likes', {
                postId: post.id,
                userId: userId
            })
            if(isLike) {
                setLikesNumber(prev => prev -1)
                setIsLike(false)
            } else {
                setLikesNumber(prev => prev + 1)
                setIsLike(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (event)=> {
        try {
            const response = await userRequest.delete(`/posts/${post.id}`)
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=> {
        (async()=> {
            try {
                const response = await publicRequest.get(`/likes?postId=${post.id}`)
                if (response.data.dataLikesOfPost.some(item => item.userId === userId)) {
                    setIsLike(true)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [post.id])

    console.log('render Post')
    return (
        !openUpdate ? 
            <>
            <div className='post'>
                <img src={post.image} alt="postImg" className="postImg" />
                <h1 className="postTitle">{post.title}</h1>
                <div className="postActions">
                    <Link to={`/posts?category=${post.category}`} className="postActionsChild">
                        <i className="postActionsChildIcon bi bi-bookmarks"></i>
                        {valueCategory}
                    </Link>
                    <span className= "postActionsChild" onClick={handleLike}>
                        <i className={isLike ? "postActionsChildIcon active bi bi-hand-thumbs-up-fill" : "postActionsChildIcon bi bi-hand-thumbs-up"} ></i>
                        {likesNumber}
                    </span>
                    <span className="postActionsChild" onClick={()=> setOpenComments(true)}>
                        <i className= "postActionsChildIcon bi bi-chat-left"></i>
                        {commentsNumber}
                    </span>
                    {userId === post.userId && 
                        <>
                            <i className="postActionsChild bi bi-recycle" onClick={()=> setOpenUpdate(true)}></i>
                            <i className="postActionsChild bi bi-trash" onClick={handleDelete}></i>
                        </>
                    }
                </div>
                <div className="postAuthorTime">
                    <Link to={`/users/${post.userId}`} className="postAuthor">
                        <img src={post.user.image} alt="postImg" className="postAuthorImg"/>
                        <span className="postAuthorName">{post.user.name}</span>
                    </Link>
                    <span className="postTime">{convertDate(post.updatedAt)}</span>
                </div>
                <div className="postContent" dangerouslySetInnerHTML={{__html: post.content}}/>
                <button className="postComments btnBig btnMain" onClick={()=> setOpenComments(true)}>READ {commentsNumber} COMMENTS</button>
            </div>
            {openComments && 
                <Comments postId={post.id} setOpenComments={setOpenComments} setCommentsNumber={setCommentsNumber}/>
            }
            </> 
        :
            <UpdatePost post={post} setOpenUpdate={setOpenUpdate} setPost={setPost}/>
    )
}
export default Post