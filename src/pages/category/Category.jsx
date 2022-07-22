import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../../utils/requestMethods';
import { useSelector } from 'react-redux'
import './category.scss'
import PostsCategory from '../../components/postsCategory/PostsCategory';

export default function Category() {
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
        <div className='category'>
            <div className="categoryTitle">
                {valueCategory}
            </div>
            <PostsCategory posts={posts}/>
        </div>
      :
      <div className='category loading'></div>
    )
}