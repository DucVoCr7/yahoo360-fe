import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../../components/post/Post'
import { publicRequest } from '../../utils/requestMethods'
import './single.scss'

export default function Single() {
    const [post, setPost] = useState()
    const params = useParams()
    useEffect(()=> {
        (async()=> {
            try {
                const response = await publicRequest(`/posts/${params.postId}`)
                setPost(response.data.post)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <div className={post ? 'single' : 'single loading'}>
           {post && <Post post = {post}/>}
        </div>
    )
}