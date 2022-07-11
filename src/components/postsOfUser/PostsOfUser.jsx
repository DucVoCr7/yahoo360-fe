import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import './postsOfUser.scss'
import PostMedium from '../postMedium/PostMedium'
function PostsOfUser({posts, isHomePage = false}) {
    console.log('re-render: PostsOfUser')
    return (
        <div className='postsOfUser'>
            {posts.length > 0 ?
                <div className="postsOfUserContent">
                    {posts.map((post, index)=> (
                    <PostMedium post={post} key={index}/>
                ))}
                </div>
                :
                <div className="postsOfUserNoContent">
                    {isHomePage ?
                        <Link to={'/write'} className='postsOfUserNoContentIcon'>
                        Write <br /> post
                        <i className="postsOfUserNoContentIconChild bi bi-file-earmark-richtext"></i>
                        <i className="postsOfUserNoContentIconChild bi bi-plus-circle"></i>
                        </Link>
                        :
                        <div className="postsOfUserNoContentContent">
                        Post have not been writed yet!
                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default memo(PostsOfUser)