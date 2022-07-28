import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import empty from '../../assets/image/empty.png'
import './postsUser.scss'
import PostMedium from '../postMedium/PostMedium'
function PostsUser({ posts, isHomePage = false }) {
    console.log('re-render: PostsUser')
    return (
        <div className='postsUser'>
            {posts.length > 0 ?
                <div className="postsUserContent">
                    {posts.length > 5 ?
                        <>
                            <div className="postsUserContentCenter">
                                {posts.map((post, index) => (
                                    index < 4 &&
                                    <PostMedium post={post} type={'noContentCenter'} key={index}/>
                                ))}
                            </div>
                            <div className="postsUserContentBottom">
                                {posts.map((post, index) => (
                                    index >= 4 &&
                                    <PostMedium post={post} type={'fullUser'} key={index}/>
                                ))}
                            </div>
                        </>
                        :
                        <div className="postsUserContentBottom">
                            {posts.map((post, index) => (
                                <PostMedium post={post} type={'fullUser'} key={index}/>
                            ))}
                        </div>
                    }

                </div>
                :
                <div className="postsUserNoContent">
                    {isHomePage ?
                        <Link to={'/write'} className="postsUserNoContentContent">
                            <img src={empty} alt='emptyIcon' className="postsUserNoContentContentIcon active" />
                        </Link>
                        :
                        <span className="postsUserNoContentContent">
                            <img src={empty} alt='emptyIcon' className="postsUserNoContentContentIcon" />
                        </span>
                    }
                </div>
            }
        </div>
    )
}
export default memo(PostsUser)