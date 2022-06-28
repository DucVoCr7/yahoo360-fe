import React from 'react'
import './post.scss'

export default function Post({post, type}) {
    return (
        <div className={`post ${type}`}>
            <img src={post.image} alt="postImg" className="postImg" />
            <h1 className="postTitle">{post.title}</h1>
            <div className="postActions">
                <span className="postActionsChild">
                    <i className="postActionsChildIcon bi bi-hand-thumbs-up"></i>
                    {post.likesNumber}
                </span>
                <span className="postActionsChild">
                    <i className="postActionsChildIcon bi bi-chat-left"></i>
                    {post.comments.length}
                </span>
                <i className="postActionsChild bi bi-recycle"></i>
                <i className="postActionsChild bi bi-trash"></i>
            </div>
            <div className="postAuthor">
                <img src={post.user.image} alt="postImg" className="postAuthorImg"/>
                <span className="postAuthorName">by {post.user.name}</span>
            </div>
            <div className="postContent">{post.content}</div>
            <div className="postComments">Read {post.comments.length} Comments</div>
        </div>
    )
}