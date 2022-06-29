import React from 'react'
import './postsBigTop.scss'
import Post from '../post/Post'
export default function PostsBigTop({posts, type}) {
    return (
        <div className='postsBigTop'>
            <div className="postsTop">
                <div className="postsTopLeft">
                    <div className="postsTopLeftChild">
                        1
                    </div>
                    <div className="postsTopLeftChild">
                        2
                    </div>
                </div>
                <div className="postsTopCenter">
                    0
                </div>
                <div className="postsTopRight">
                    <div className="postsTopRightChild">
                        3
                    </div>
                    <div className="postsTopRightChild">
                        4
                    </div>
                </div>
            </div>
            <div className="postsBottom">
                <div className="postsBottomChild">5</div>
                <div className="postsBottomChild">6</div>
                <div className="postsBottomChild">7</div>
                <div className="postsBottomChild">8</div>
                <div className="postsBottomChild">9</div>
            </div>
        </div>
    )
}