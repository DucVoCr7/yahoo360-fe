import React from 'react'
import './postMedium.scss'
import avatar from '../../assets/image/avatar.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import convertDate from '../../utils/convertDate'
export default function PostMedium({ post, isPostsCategory = false }) {
    // Dùng tạm khi nào biết cách mapSatetoprops thì xóa đi
    const valueCategory = useSelector(state => state.app.category.find(element => element.key === post.category).value)
    ///
    return (
        <Link to={`/posts/${post.id}`} className='postMedium'>
            <div className="postMediumLeft">
                <h1 className="postMediumTitle">{post.title}</h1>
                {
                    isPostsCategory &&
                <div className="postMediumAuthor">
                    <img src={post.user.image ? post.user.image : avatar} alt="postImg" className="postMediumAuthorImg"/>
                    <span className="postMediumAuthorName">{post.user.name}</span>
                </div>
                }
                <div className="postMediumOther">
                    {
                        !isPostsCategory &&
                        <span className="postMediumOtherChild">
                        <i className="postMediumOtherChildIcon bi bi-bookmarks"></i>
                        {valueCategory}
                    </span>
                    }

                    <span className="postMediumOtherChild">
                        <i className="postMediumOtherChildIcon bi bi-hand-thumbs-up"></i>
                        {post.likesNumber}
                    </span>
                    <span className="postMediumOtherChild">
                        <i className="postMediumOtherChildIcon bi bi-chat-left"></i>
                        {post.commentsNumber}
                    </span>
                    <span className="postMediumOtherChild">{convertDate(post.updatedAt)}</span>
                </div>
                <div className="postMediumContent" dangerouslySetInnerHTML={{__html: post.content}}/>
            </div>
            <div className="postMediumRight">
                <img src={post.image} alt="postMediumImg" className="postMediumImg" />
            </div>
        </Link>
    )
}