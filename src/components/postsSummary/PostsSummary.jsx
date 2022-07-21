import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import empty from '../../assets/image/empty.png'
import './postsSummary.scss'
import PostMedium from '../postMedium/PostMedium'
function PostsSummary({posts, isHomePage = false, isPostsCategory = false}) {
    console.log('re-render: PostsSummary')
    return (
        <div className='postsSummary'>
            {posts.length > 0 ?
                <div className="postsSummaryContent">
                    {posts.map((post, index)=> (
                    <PostMedium post={post} isPostsCategory={isPostsCategory} key={index}/>
                ))}
                </div>
                :
                <div className="postsSummaryNoContent">
                                                    {isHomePage ?
              <Link to={'/write'} className="postsSummaryNoContentContent">
                <img src={empty} alt='emptyIcon' className="postsSummaryNoContentContentIcon"/>
                </Link>
              :
              <span className="postsSummaryNoContentContent">
                <img src={empty} alt='emptyIcon' className="postsSummaryNoContentContentIcon"/>
              </span>
            }
                </div>
            }
        </div>
    )
}
export default memo(PostsSummary)