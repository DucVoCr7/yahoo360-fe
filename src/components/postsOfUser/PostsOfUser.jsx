import React, { memo } from 'react'
import './postsOfUser.scss'
import PostMedium from '../postMedium/PostMedium'
function PostsOfUser({posts, type}) {
    console.log('re-render: PostsOfUser')
    return (
        <div className='postsOfUser'>
            {posts.map((post, index)=> (
                <PostMedium post={post} key={index}/>
            ))}
        </div>
    )
}
export default memo(PostsOfUser)