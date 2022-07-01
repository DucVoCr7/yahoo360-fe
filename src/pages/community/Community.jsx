import React, { useEffect, useState } from 'react'
import './community.scss'
import Header from '../../components/header/Header'
import { publicRequest } from '../../utils/requestMethods'
import PostsEqual from '../../components/postsEqual/PostsEqual'
import PostsBigTop from '../../components/postsBigTop/PostsBigTop'
import { Link } from 'react-router-dom'
import PostsBigRight from '../../components/postsBigRight/PostsBigRight'
export default function Community() {
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
    console.log(dataCommunity)
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
                                Tech
                            </Link>
                            <PostsBigRight posts={dataCommunity.newPostsTech}/>
                        </div>
                        <div className="communityMidLeftItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                Sport
                            </Link>
                            <PostsBigRight posts={dataCommunity.newPostsSport}/>
                        </div>
                        <div className="communityMidLeftItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                Travel
                            </Link>
                            <PostsBigRight posts={dataCommunity.newPostsTravel}/>
                        </div>
                    </div>
                    <div className="communityMidRight">
                        <div className="communityMidRightItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                Music
                            </Link>
                            <PostsBigTop posts={dataCommunity.newPostsMusic}/>
                        </div>
                        <div className="communityMidRightItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                Life
                            </Link>
                            <PostsBigTop posts={dataCommunity.newPostsLife}/>
                        </div>
                        <div className="communityMidRightItem">
                            <Link to='' className='communityName'>
                                <i className="communityNameIcon bi bi-bookmarks"></i>
                                Food
                            </Link>
                            <PostsBigTop posts={dataCommunity.newPostsFood}/>
                        </div>
                    </div>
                </div>
                <div className="communityBottom">
                    <Link to='' className='communityName'>
                        <i className="communityNameIcon bi bi-bookmarks"></i>
                        Cenima
                    </Link>
                    <PostsEqual posts={dataCommunity.newPostsCinema} />
                </div>
            </div>
            :
            <div className="community loading"></div>
        }
    </>
    )
}