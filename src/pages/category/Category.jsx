import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../../utils/requestMethods';
import PostsCategory from '../../components/postsCategory/PostsCategory';
import { useReduxValueCategory } from '../../utils/reduxMethods';
import './category.scss'

export default function Category() {

    const [posts, setPosts] = useState()
    const location = useLocation();
    const valueCategory = useReduxValueCategory(location.search.replace('?category=', ''))

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