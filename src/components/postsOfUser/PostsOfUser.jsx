import React from 'react'
import './postsOfUser.scss'
import PostMedium from '../postMedium/PostMedium'
export default function PostsOfUser({posts, type}) {
    return (
        <div className='postsOfUser'>
            {posts.map((post, index)=> (
                <PostMedium post={post} key={index}/>
            ))}
        </div>
    )
}