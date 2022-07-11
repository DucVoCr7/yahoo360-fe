import React, { memo } from 'react'
import './infomation.scss'
import { useSelector } from 'react-redux'
function Infomation({gender, position, postsNumber, address}) {
    const valueGender = useSelector(state => state.app.gender.find(item => item.key === gender)?.value)
    const valuePosition = useSelector(state => state.app.position.find(item => item.key === position)?.value)
    console.log('re-render: Infomation')
  return (
    <div className='infomation'>
        <title className='infomationTitle'>
            <i className="infomationTitleIcon bi bi-person-lines-fill"></i>
            INFOMATION
        </title>
        <div className="infomationContent">
            <div className="infomationContentItem">
                {valueGender ? 
                (valueGender === 'Male' ? 
                    <>
                    <i className="infomationContentItemIcon bi bi-gender-male"></i>
                    {valueGender}
                    </>
                :
                <>
                    <i className="infomationContentItemIcon bi bi-gender-female"></i>
                    {valueGender}
                    </>
                )
                : 
                <>
                    <i className="infomationContentItemIcon bi bi-question-octagon"></i>
                    Gender
                </>
            }
            </div>
            <div className="infomationContentItem">
                <i className="infomationContentItemIcon bi bi-bookmark-star"></i>
                {valuePosition}
            </div>
            <div className="infomationContentItem">
                <i className="infomationContentItemIcon bi bi-file-earmark-richtext"></i>
                {postsNumber}
            </div>
            <div className="infomationContentItem">
                <i className="infomationContentItemIcon bi bi-geo"></i>
                {address ? address : 'Address'}
            </div>
        </div>
    </div>
  )
}
export default memo(Infomation)