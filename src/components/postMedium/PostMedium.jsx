import React from 'react'
import './postMedium.scss'
import { Link } from 'react-router-dom'
export default function PostMedium({ post }) {
    return (
        <Link to={`/posts/${post.id}`} className='postMedium'>
            <div className="postMediumLeft">
                <h1 className="postMediumTitle">{post.title}</h1>
                <div className="postMediumOther">
                    <span className="postMediumOtherChild">
                        <i className="postMediumOtherChildIcon bi bi-bookmarks"></i>
                        {post.category}
                    </span>
                    <span className="postMediumOtherChild">
                        <i className="postMediumOtherChildIcon bi bi-hand-thumbs-up"></i>
                        {post.likesNumber}
                    </span>
                    <span className="postMediumOtherChild">
                        <i className="postMediumOtherChildIcon bi bi-chat-left"></i>
                        {post.comments?.length}
                    </span>
                    <span className="postMediumOtherChild">at {post.updatedAt}</span>
                    <i className="postMediumOtherChild bi bi-recycle"></i>
                    <i className="postMediumOtherChild bi bi-trash"></i>
                </div>
                <div className="postMediumContent">{post.content}</div>
            </div>
            <div className="postMediumRight">
                <img src={post.image} alt="postMediumImg" className="postMediumImg" />
            </div>
        </Link>
    )
}