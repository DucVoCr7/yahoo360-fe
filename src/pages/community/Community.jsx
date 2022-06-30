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
        <div className={dataCommunity ? 'community' : 'community loading'}>
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
                        {/* {dataCommunity && <PostsBigRight posts={dataCommunity.newPostsTech}/>} */}
                    </div>
                    <div className="communityMidLeftItem">
                        <Link to='' className='communityName'>
                            <i className="communityNameIcon bi bi-bookmarks"></i>
                            Sport
                        </Link>
                        {/* {dataCommunity && <PostsBigRight posts={dataCommunity.newPostsSport}/>} */}
                    </div>
                    <div className="communityMidLeftItem">
                        <Link to='' className='communityName'>
                            <i className="communityNameIcon bi bi-bookmarks"></i>
                            Travel
                        </Link>
                        {/* {dataCommunity && <PostsBigRight posts={dataCommunity.newPostsTravel}/>} */}
                    </div>
                </div>
                <div className="communityMidRight">
                    <div className="communityMidRightItem">
                        <Link to='' className='communityName'>
                            <i className="communityNameIcon bi bi-bookmarks"></i>
                            Music
                        </Link>
                        {dataCommunity && <PostsBigTop posts={dataCommunity.newPostsMusic}/>}
                    </div>
                    <div className="communityMidRightItem">
                        <Link to='' className='communityName'>
                            <i className="communityNameIcon bi bi-bookmarks"></i>
                            Life
                        </Link>
                        {dataCommunity && <PostsBigTop posts={dataCommunity.newPostsLife}/>}
                    </div>
                    <div className="communityMidRightItem">
                        <Link to='' className='communityName'>
                            <i className="communityNameIcon bi bi-bookmarks"></i>
                            Food
                        </Link>
                        {dataCommunity && <PostsBigTop posts={dataCommunity.newPostsFood}/>}
                    </div>
                </div>
            </div>
            <div className="communityBottom">
                <Link to='' className='communityName'>
                    <i className="communityNameIcon bi bi-bookmarks"></i>
                    Cenima
                </Link>
                {dataCommunity && <PostsEqual posts={dataCommunity.newPostsCinema} />}
            </div>
            {/* 
            <Posts posts={dataCommunity.newPostsTech} type={'communityMidLeft'}/>
            <Posts posts={dataCommunity.newPostsMusic} type={'communityMidRight'}/>
            <Posts posts={dataCommunity.newPostsSport} type={'communityMidLeft'}/>
            <Posts posts={dataCommunity.newPostsLife} type={'communityMidRight'}/>
            <Posts posts={dataCommunity.newPostsTravel} type={'communityMidLeft'}/>
            <Posts posts={dataCommunity.newPostsFood} type={'communityMidRight'}/>
            <Posts posts={dataCommunity.newPostsStyle} type={'communityBottom'}/>
            <Posts posts={dataCommunity.newPostsCinema} type={'communityBottom'}/> */}
        </div>
    </>
    )
}