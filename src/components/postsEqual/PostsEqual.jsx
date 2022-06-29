import React from 'react'
import './postsEqual.scss'
import Post from '../post/Post'
import PostBrief from '../postBrief/PostBrief'
export default function PostsEqual({posts}) {
    return (
        <div className='postsEqual'>
            {posts.map((post, index)=> (
                <PostBrief post={post} type={'noContent'} key={index}/>
            ))}
        </div>
    )
}