import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../../utils/requestMethods';
import PostsSearch from '../../components/postsSearch/PostsSearch'
import './search.scss'

export default function Search() {
  
  const [posts, setPosts] = useState()
  const location = useLocation();

  useEffect(()=> {
    (async()=> {
        try {
            const response = await publicRequest.get(`/searchPosts${location.search}`)
            setPosts(response.data.posts)
        } catch (error) {
            console.log(error)
        }
    })()
}, [location.search])

  return (
    posts ?
        <div className='search'>
          <PostsSearch 
            posts={posts} 
          />
        </div>
      :
      <div className='search loading'></div>
  )
}