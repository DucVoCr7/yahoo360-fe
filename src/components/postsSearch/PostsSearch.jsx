import React, { memo } from 'react'
import empty from '../../assets/image/empty.png'
import './postsSearch.scss'
import PostMedium from '../postMedium/PostMedium'
function PostsSearch({ posts }) {
    return (
        <div className='postsSearch'>
            {posts.length > 0 ?
                <div className="postsSearchContent">
                    {posts.length > 5 ?
                        <>
                            <div className="postsSearchContentCenter">
                                {posts.map((post, index) => (
                                    index < 4 &&
                                    <PostMedium post={post} isSearch={true} type={'noContentCenter'} key={index}/>
                                ))}
                            </div>
                            <div className="postsSearchContentBottom">
                                {posts.map((post, index) => (
                                    index >= 4 &&
                                    <PostMedium post={post} isSearch={true} type={'full'} key={index}/>
                                ))}
                            </div>
                        </>
                        :
                        <div className="postsSearchContentBottom">
                            {posts.map((post, index) => (
                                <PostMedium post={post} isSearch={true} type={'full'} key={index}/>
                            ))}
                        </div>
                    }

                </div>
                :
                <div className="postsSearchNoContent">
                    <img src={empty} alt='emptyIcon' className="postsSearchNoContentIcon" />
                </div>
            }
        </div>
    )
}
export default memo(PostsSearch)