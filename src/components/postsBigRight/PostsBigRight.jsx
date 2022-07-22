import React from 'react'
import './postsBigRight.scss'
import Post from '../post/Post'
import PostBrief from '../postBrief/PostBrief'
export default function PostsBigRight({posts, type}) {
    return (
        <div className='postsBigRight'>
            <div className="postsBigRightTop">
                <span className="postsBigRightTopLeft">
                    <PostBrief post={posts[0]} type={'noImg'}/>
                    <PostBrief post={posts[1]} type={'noImg'}/>
                </span>
                <span className="postsBigRightTopRight">
                    <PostBrief post={posts[2]} type={'noContentBigRight'}/>
                </span>
            </div>
            <div className="postsBigRightBottom">
                <PostBrief post={posts[3]} type={'noImg'}/>
                <PostBrief post={posts[4]} type={'noImg'}/>
            </div>
        </div>
    )
}