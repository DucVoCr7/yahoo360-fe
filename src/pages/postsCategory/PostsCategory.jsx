import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../../utils/requestMethods';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import './postsCategory.scss'
import slideShow from '../../utils/constArrayImg';
import PostsSummary from '../../components/postsSummary/PostsSummary';

export default function PostsCategory() {
    const [posts, setPosts] = useState()
    const location = useLocation();
    const valueCategory = useSelector(state=> state.app.category.find(item=> item.key === location.search.replace('?category=', '')).value)
    useEffect(()=> {
        (async()=> {
            try {
                const response = await publicRequest.get(`/postsPage${location.search}`)
                setPosts(response.data.dataPosts)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [location.search])
    return (
        posts ? 
        <div className='postsCategory'>
            <div className="postsCategoryHeader">
                <Link to='/' className="postsCategoryHeaderLogo">YAHOO 360</Link>
                <div className="postsCategoryHeaderTitle">Store the experience your way!</div>
                    <img src={slideShow.find(item => item.name === valueCategory).img} alt='postsCategoryHeaderImg' className="postsCategoryHeaderImg"/>
                <div className="postsCategoryHeaderName">
                    {valueCategory}
                </div>
            </div>
            <PostsSummary posts={posts} isPostsCategory={true}/>
        </div>
      :
      <div className='postsCategory loading'></div>
    )
}