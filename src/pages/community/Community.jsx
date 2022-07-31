import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { publicRequest } from '../../utils/requestMethods'
import PostsEqual from '../../components/postsEqual/PostsEqual'
import PostsBigTop from '../../components/postsBigTop/PostsBigTop'
import { Link } from 'react-router-dom'
import PostsBigRight from '../../components/postsBigRight/PostsBigRight'
import { useSelector, useDispatch } from 'react-redux'
import { appStart } from '../../redux/appSlice'
import './community.scss'

export default function Community() {

    const { category } = useSelector(state => state.app)
    const [dataCommunity, setDataCommunity] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                await dispatch(appStart())
                const response = await publicRequest.get('/communityPage')
                setDataCommunity(response.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    
    return (
        dataCommunity ?
            <>
                <Header />
                <div className='community'>
                    <div className="communityTop">
                        <div className="communityTopLeft">
                            <div className="communityTopLeftItem">
                                <Link to={`posts?category=${category[0].key}`} className='communityName'>
                                    <i className="communityNameIcon bi bi-bookmarks"></i>
                                    {category[0].value}
                                </Link>
                                <PostsBigRight posts={dataCommunity.newPostsC0} />
                            </div>
                            <div className="communityTopLeftItem">
                                <Link to={`posts?category=${category[1].key}`} className='communityName'>
                                    <i className="communityNameIcon bi bi-bookmarks"></i>
                                    {category[1].value}
                                </Link>
                                <PostsBigRight posts={dataCommunity.newPostsC1} />
                            </div>
                            <div className="communityTopLeftItem">
                                <Link to={`posts?category=${category[2].key}`} className='communityName'>
                                    <i className="communityNameIcon bi bi-bookmarks"></i>
                                    {category[2].value}
                                </Link>
                                <PostsBigRight posts={dataCommunity.newPostsC2} />
                            </div>
                        </div>
                        <div className="communityTopRight">
                            <div className="communityTopRightItem">
                                <Link to={`posts?category=${category[3].key}`} className='communityName'>
                                    <i className="communityNameIcon bi bi-bookmarks"></i>
                                    {category[3].value}
                                </Link>
                                <PostsBigTop posts={dataCommunity.newPostsC3} />
                            </div>
                            <div className="communityTopRightItem">
                                <Link to={`posts?category=${category[4].key}`} className='communityName'>
                                    <i className="communityNameIcon bi bi-bookmarks"></i>
                                    {category[4].value}
                                </Link>
                                <PostsBigTop posts={dataCommunity.newPostsC4} />
                            </div>
                            <div className="communityTopRightItem">
                                <Link to={`posts?category=${category[5].key}`} className='communityName'>
                                    <i className="communityNameIcon bi bi-bookmarks"></i>
                                    {category[5].value}
                                </Link>
                                <PostsBigTop posts={dataCommunity.newPostsC5} />
                            </div>
                        </div>
                    </div>
                    <div className="communityBottom">
                        <Link to={`posts?category=${category[6].key}`} className='communityName'>
                            <i className="communityNameIcon bi bi-bookmarks"></i>
                            {category[6].value}
                        </Link>
                        <PostsEqual posts={dataCommunity.newPostsC6} />
                    </div>
                </div>
            </>
            :
            <div className="community loading"></div>
    )
}