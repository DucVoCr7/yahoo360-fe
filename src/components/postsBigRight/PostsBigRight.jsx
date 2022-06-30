import React from 'react'
import './postsBigRight.scss'
import Post from '../post/Post'
import PostBrief from '../postBrief/PostBrief'
export default function PostsBigRight({posts, type}) {
    return (
        <div className='postsBigRight'>
            <div className="postsBigRightGroup">
                <div className="postsBigRightGroupChild">
                    <PostBrief post={posts[1]} type={'noImg'}/>
                    <PostBrief post={posts[2]} type={'noImg'}/>
                </div>
                <div className="postsBigRightGroupChild">
                    <PostBrief post={posts[0]} type={'noContent'}/>
                </div>
            </div>
            <div className="postsBigRightGroup">
                <PostBrief post={posts[3]} type={'noImg'}/>
                <PostBrief post={posts[4]} type={'noImg'}/>
            </div>
        </div>
    )
}