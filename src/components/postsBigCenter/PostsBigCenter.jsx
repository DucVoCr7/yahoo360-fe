import React from 'react'
import './postsBigCenter.scss'
import Post from '../post/Post'
export default function PostsBigCenter({posts, type}) {
    return (
        <div className='postsBigCenter'>
            <div className="postsBigCenterGroup">
                <div className="postsBigCenterGroupChild">
                    <PostBrief post={posts[1]} type={'noImg'}/>
                    <PostBrief post={posts[2]} type={'noImg'}/>
                </div>
                <div className="postsBigCenterGroupChild">
                <PostBrief post={posts[0]} type={'noContent'}/>
                </div>
                <div className="postsBigCenterGroupChild">
                <PostBrief post={posts[3]} type={'noImg'}/>
                <PostBrief post={posts[4]} type={'noImg'}/>
                </div>
            </div>
            <div className="postsBigCenterGroup">
                <PostBrief post={posts[5]} type={'noImg'}/>
                <PostBrief post={posts[6]} type={'noImg'}/>
                <PostBrief post={posts[7]} type={'noImg'}/>
            </div>
        </div>
    )
}