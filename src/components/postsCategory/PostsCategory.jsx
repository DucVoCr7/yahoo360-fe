import React from 'react'
import './postsCategory.scss'
import PostMedium from '../postMedium/PostMedium'
export default function PostsCategory({posts}) {
    return (
        <div className='postsCategory'>
            <div className="postsCategoryTop">
                <span className="postsCategoryTopLeft">
                    <PostMedium post={posts[1]} isCategory={true} type={'noImg'}/>
                    <PostMedium post={posts[2]} isCategory={true} type={'noImg'}/>
                </span>
                <span className="postsCategoryTopRight">
                    <PostMedium post={posts[0]} isCategory={true} type={'noContentTop'}/>
                </span>
            </div>
            <div className="postsCategoryCenter">
                {posts.map((post, index)=> (
                    (index > 2 && index < 7) &&
                    <PostMedium post={post} isCategory={true} type={'noContentCenter'}/>
                ))}
            </div>
            <div className="postsCategoryBottom">
                {posts.map((post, index)=> (
                index >= 7 &&
                    <PostMedium post={post} isCategory={true} type={'full'}/>
                ))}
            </div>
        </div>
    )
}