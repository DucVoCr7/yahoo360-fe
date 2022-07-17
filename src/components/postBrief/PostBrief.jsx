import React from 'react'
import { Link } from 'react-router-dom'
import './postBrief.scss'
export default function PostBrief({post, type}) {
    return (
        <Link to={`/posts/${post.id}`} className={`postBrief ${type}`}>
            <img src={post.image} alt="postImg" className="postImg" />
            <h1 className="postTitle">{post.title}</h1>
            <div className="postContent" dangerouslySetInnerHTML={{__html: post.content}}></div>
        </Link>
    )
}