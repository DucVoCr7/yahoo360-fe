import React, { memo } from 'react'
import { Link } from 'react-router-dom'
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
                        <Link to={'/write'} className='postsSummaryNoContentIcon'>
                        Write <br /> post
                        <i className="postsSummaryNoContentIconChild bi bi-file-earmark-richtext"></i>
                        <i className="postsSummaryNoContentIconChild bi bi-plus-circle"></i>
                        </Link>
                        :
                        <div className="postsSummaryNoContentContent">
                        Post have not been writed yet!
                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default memo(PostsSummary)