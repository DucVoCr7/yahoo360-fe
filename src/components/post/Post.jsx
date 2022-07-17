import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import './post.scss'
import avatar from '../../assets/image/avatar.jpg'
import convertDate from '../../utils/convertDate'
import Comments from '../comments/Comments'
import { useReduxUserId, useReduxValueCategory } from '../../utils/reduxMethods'
import { useEffect } from 'react'
import { publicRequest, userRequest } from '../../utils/requestMethods'
function Post({post}) {
    const [likesNumber, setLikesNumber] = useState(post.likesNumber)
    const [commentsNumber, setCommentsNumber] = useState(post.commentsNumber)
    const [isLike, setIsLike] = useState(false)

    const valueCategory = useReduxValueCategory(post.category)
    const userId = useReduxUserId()

    const [openComments, setOpenComments] = useState()


    const handleLike = async (event)=> {
        try {
            const response = await userRequest.post('/likes', {
                postId: post.id,
                userId: userId
            })
            console.log(response.data)
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
                    {isLike ? `You +${likesNumber - 1}` : likesNumber}
                </span>
                <span className="postActionsChild" onClick={()=> setOpenComments(true)}>
                    <i className= "postActionsChildIcon bi bi-chat-left"></i>
                    {commentsNumber}
                </span>
                <i className="postActionsChild bi bi-recycle"></i>
                <i className="postActionsChild bi bi-trash"></i>
            </div>
            <div className="postAuthorTime">
                <Link to={`/users/${post.userId}`} className="postAuthor">
                    <img src={post.user.image ? post.user.image : avatar} alt="postImg" className="postAuthorImg"/>
                    <span className="postAuthorName">{post.user.name}</span>
                </Link>
                <span className="postTime">{convertDate(post.updatedAt)}</span>
            </div>
            <div className="postContent" dangerouslySetInnerHTML={{__html: post.content}}/>
            <button className="postComments" onClick={()=> setOpenComments(true)}>Read {post.commentsNumber} Comments</button>
        </div>
        {openComments && 
            <Comments postId={post.id} setOpenComments={setOpenComments} setCommentsNumber={setCommentsNumber}/>
        }
        </>
    )
}
export default Post