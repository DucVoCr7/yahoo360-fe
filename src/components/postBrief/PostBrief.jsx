import React from 'react'
import { Link } from 'react-router-dom'
import './postBrief.scss'

export default function PostBrief({post, type}) {
    return (
        <Link to={`/posts/${post.id}`} className={`postBrief ${type}`}>
            <img src={post.image} alt="postImg" className="postImg" />
            <h1 className="postTitle">{post.title} Hello my name is Duc, y h g Hello my name is Duc, Hello my name is Duc, y h g Hello my name is Duc</h1>
            <div className="postContent">{post.content}</div>
        </Link>
    )
}