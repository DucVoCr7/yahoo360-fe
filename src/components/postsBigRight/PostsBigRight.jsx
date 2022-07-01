import React from 'react'
import './postsBigRight.scss'
import Post from '../post/Post'
import PostBrief from '../postBrief/PostBrief'
export default function PostsBigRight({posts, type}) {
    return (
        <div className='postsBigRight'>
            <div className="postsBigRightTop">
                <div className="postsBigRightTopLeft">
                    <PostBrief post={posts[0]} type={'noImgBigRightTop'}/>
                    <PostBrief post={posts[1]} type={'noImgBigRightTop'}/>
                </div>
                <div className="postsBigRightTopRight">
                    <PostBrief post={posts[2]} type={'noContentBigRight'}/>
                </div>
            </div>
            <div className="postsBigRightBottom">
                <PostBrief post={posts[3]} type={'noImgBigRightBottom'}/>
                <PostBrief post={posts[4]} type={'noImgBigRightBottom'}/>
            </div>
        </div>
    )
}