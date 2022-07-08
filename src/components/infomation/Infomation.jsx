import React from 'react'
import './infomation.scss'
import { useSelector } from 'react-redux'
function Infomation({name, gender, position, postsNumber, address}) {
      /// Chỗ này dùng tạm từ từ fix sau.
      const valueGender = useSelector(state => state.app.gender.find(element => element.key === gender)?.value)
      const valuePosition = useSelector(state => state.app.position.find(element => element.key === position)?.value)
      ////
      ////
  return (
    <div className='infomation'>
        <title className='infomationTitle'>
            <i className="infomationTitleIcon bi bi-person-lines-fill"></i>
            INFOMATION
        </title>
        <div className="infomationContent">
            <div className="infomationContentItem">Name: {name}</div>
            <div className="infomationContentItem">Gender: {valueGender}</div>
            <div className="infomationContentItem">Level: {valuePosition}</div>
            <div className="infomationContentItem">Number of posts: {postsNumber}</div>
            <div className="infomationContentItem">Address: {address}</div>
        </div>
    </div>
  )
}

export default Infomation