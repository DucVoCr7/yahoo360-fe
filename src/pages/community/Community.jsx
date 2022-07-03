import React, { useEffect, useState } from 'react'
import './community.scss'
import Header from '../../components/header/Header'
import { publicRequest } from '../../utils/requestMethods'
import PostsEqual from '../../components/postsEqual/PostsEqual'
import PostsBigTop from '../../components/postsBigTop/PostsBigTop'
import { Link } from 'react-router-dom'
import PostsBigRight from '../../components/postsBigRight/PostsBigRight'
import { useSelector } from 'react-redux'
export default function Community() {
    const {category} = useSelector(state=> state.app)
    const [dataCommunity, setDataCommunity] = useState()
    useEffect(() => {
        (async () => {
            try {
                const response = await publicRequest.get('/communityPage')
                setDataCommunity(response.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (<>
        <Header />
        {dataCommunity ?
            <div className='community'>
                <div className="communityTop">
                    <Link to='' className='communityName'>Cenima</Link>
                    Top
                </div>
                <div className="communityMid">
                    <div className="communityMidLeft">
                        <div className="communityMidLeftItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                {category[0].value}
                            </Link>
                            <PostsBigRight posts={dataCommunity.newPostsC0}/>
                        </div>
                        <div className="communityMidLeftItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                {category[1].value}
                            </Link>
                            <PostsBigRight posts={dataCommunity.newPostsC1}/>
                        </div>
                        <div className="communityMidLeftItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                {category[2].value}
                            </Link>
                            <PostsBigRight posts={dataCommunity.newPostsC2}/>
                        </div>
                    </div>
                    <div className="communityMidRight">
                        <div className="communityMidRightItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                {category[3].value}
                            </Link>
                            <PostsBigTop posts={dataCommunity.newPostsC3}/>
                        </div>
                        <div className="communityMidRightItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                {category[4].value}
                            </Link>
                            <PostsBigTop posts={dataCommunity.newPostsC4}/>
                        </div>
                        <div className="communityMidRightItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                {category[5].value}
                            </Link>
                            <PostsBigTop posts={dataCommunity.newPostsC5}/>
                        </div>
                    </div>
                </div>
                <div className="communityBottom">
                    <Link to='' className='communityName'>
                        <i className="communityNameIcon bi bi-bookmarks"></i>
                        {category[6].value}
                    </Link>
                    <PostsEqual posts={dataCommunity.newPostsC6} />
                </div>
            </div>
            :
            <div className="community loading"></div>
        }
    </>
    )
}