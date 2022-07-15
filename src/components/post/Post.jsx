import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './post.scss'
import convertDate from '../../utils/convertDate'
import Comments from '../comments/Comments'
export default function Post({post}) {
    /// Chỗ này dùng tạm từ từ fix sau.
    const valueCategory = useSelector(state => state.app.category.find(element => element.key === post.category).value)
    ////
    ////
    const [openComments, setOpenComments] = useState()
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
                <span className="postActionsChild">
                    <i className="postActionsChildIcon bi bi-hand-thumbs-up"></i>
                    {post.likesNumber}
                </span>
                <span className="postActionsChild" onClick={()=> setOpenComments(true)}>
                    <i className="postActionsChildIcon bi bi-chat-left"></i>
                    {post.commentsNumber}
                </span>
                <i className="postActionsChild bi bi-recycle"></i>
                <i className="postActionsChild bi bi-trash"></i>
            </div>
            <div className="postAuthorTime">
                <Link to={`/users/${post.userId}`} className="postAuthor">
                    <img src={post.user.image} alt="postImg" className="postAuthorImg"/>
                    <span className="postAuthorName">{post.user.name}</span>
                </Link>
                <span className="postTime">{convertDate(post.updatedAt)}</span>
            </div>
            <div className="postContent">{post.content}</div>
            <button className="postComments" onClick={()=> setOpenComments(true)}>Read {post.commentsNumber} Comments</button>
        </div>
        {openComments && 
            <Comments postId={post.id} setOpenComments={setOpenComments}/>
        }
        </>
    )
}