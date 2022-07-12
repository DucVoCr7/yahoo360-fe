import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../../utils/requestMethods';
import { useSelector } from 'react-redux'
import './postsCategory.scss'
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
            <div className="postsCategoryTitle">
                {valueCategory}
            </div>
            <PostsSummary posts={posts} isPostsCategory={true}/>
        </div>
      :
      <div className='postsCategory loading'></div>
    )
}