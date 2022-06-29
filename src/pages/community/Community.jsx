import React, { useEffect, useState } from 'react'
import './community.scss'
import Header from '../../components/header/Header'
import { useSelector } from 'react-redux'
import { publicRequest } from '../../utils/requestMethods'
import Posts from '../../components/postsEqual/PostsEqual'
import PostsEqual from '../../components/postsEqual/PostsEqual'
import { Link } from 'react-router-dom'
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
            <div className="communityGroup">
                <Link to='' className='communityGroupName'>Cenima</Link>
                Top
            </div>
            <div className="communityGroup">
                <div className="communityGroupChild">
                    <div className="communityGroupChildItem">
                        <Link to='' className='communityGroupName'>Cenima</Link>
                        Mid Left
                    </div>
                    <div className="communityGroupChildItem">
                        <Link to='' className='communityGroupName'>Cenima</Link>
                        Mid Left
                    </div>
                    <div className="communityGroupChildItem">
                        <Link to='' className='communityGroupName'>Cenima</Link>
                        Mid Left
                    </div>
                </div>
                <div className="communityGroupChild">
                    <div className="communityGroupChildItem">
                        <Link to='' className='communityGroupName'>Cenima</Link>
                        Mid Left
                    </div>
                    <div className="communityGroupChildItem">
                        <Link to='' className='communityGroupName'>Cenima</Link>
                        Mid Left
                    </div>
                    <div className="communityGroupChildItem">
                        <Link to='' className='communityGroupName'>Cenima</Link>
                        Mid Left
                    </div>
                </div>
            </div>
            <div className="communityGroup">
                <Link to='' className='communityGroupName'>Cenima</Link>
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