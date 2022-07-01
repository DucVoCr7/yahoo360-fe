import React from 'react'
import { Link } from 'react-router-dom'
import './post.scss'

export default function Post({post}) {
    return (
        <div className='post'>
            <img src={post.image} alt="postImg" className="postImg" />
            <h1 className="postTitle">{post.title}</h1>
            <div className="postActions">
                <Link to={`/posts?category=${post.category}`} className="postActionsChild">
                    <i className="postActionsChildIcon bi bi-bookmarks"></i>
                    {post.category}
                </Link>
                <span className="postActionsChild">
                    <i className="postActionsChildIcon bi bi-hand-thumbs-up"></i>
                    {post.likesNumber}
                </span>
                <span className="postActionsChild">
                    <i className="postActionsChildIcon bi bi-chat-left"></i>
                    {post.comments?.length}
                </span>
                <i className="postActionsChild bi bi-recycle"></i>
                <i className="postActionsChild bi bi-trash"></i>
            </div>
            <div className="postAuthorTime">
                <Link to={`/users/${post.userId}`} className="postAuthor">
                    <img src={post.user.image} alt="postImg" className="postAuthorImg"/>
                    <span className="postAuthorName">by {post.user.name}</span>
                </Link>
                <span className="postTime">at {post.updatedAt}</span>
            </div>
            <div className="postContent">{post.content}</div>
            <button className="postComments">Read {post.comments?.length} Comments</button>
        </div>
    )
}