import React, { memo } from 'react'
import { useReduxValueGender, useReduxValuePosition } from '../../utils/reduxMethods'
import './infomation.scss'

function Infomation({
    gender, 
    position, 
    postsNumber, 
    address
}) {

    const valueGender = useReduxValueGender(gender)
    const valuePosition = useReduxValuePosition(position)

  return (
    <div className='infomation'>
        <span className="infomationItem">
            <i className="infomationItemIcon bi-file-person-fill"></i>
            {valueGender ? valueGender : 'Not updated information'}
        </span>
        <span className="infomationItem">
            <i className="infomationItemIcon bi-bookmark-star-fill"></i>
            {valuePosition}
        </span>
        <span className="infomationItem">
            <i className="infomationItemIcon bi bi-file-earmark-richtext-fill"></i>
            {postsNumber}
        </span>
        <span className="infomationItem">
            <i className="infomationItemIcon bi-house-fill"></i>
            {address ? address : 'Not updated information'}
        </span>
    </div>
  )
}
export default memo(Infomation)