import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../../assets/image/avatar.jpg'
import './updateAccount.scss'

export default function UpdateAccount() {

const userInfo = useSelector(state => state.user.userInfo)
    return (
        <div className='updateAccount'>
            <div className="updateAccountTitle">
                UPDATE ACCOUNT
            </div>
            <div className="updateAccountContent">
                <div className="updateAccountContentItem">
                    <img src={userInfo.image ? userInfo.image : avatar} alt="" className="updateAccountContentItemImg" />
                    <label className="updateAccountContentItemLabel" htmlFor='updateAccountImgId'>
                        Change Avatar
                        <i className="updateAccountContentItemLabelInfo bi bi-cloud-arrow-up-fill"></i>
                    </label>
                    <input type="file" id='updateAccountImgId' hidden/>
                </div>
                <div className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Name
                        <div className="updateAccountContentItemLabelInfo">
                            {userInfo.name}
                        </div>
                    </label>
                    <input type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </div>
                <div className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Gender
                        <div className="updateAccountContentItemLabelInfo">
                            {userInfo.gender}
                        </div>
                    </label>
                    <select className='updateAccountContentItemInput'>
                        <option value="" disabled selected>Choice gender...</option>
                        <option value="G0">Male</option>
                        <option value="G1">Female</option>
                    </select>
                </div>
                <div className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Email
                        <div className="updateAccountContentItemLabelInfo">
                            {userInfo.email}
                        </div>
                    </label>
                    <input type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </div>
                <div className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Phone Number
                        <div className="updateAccountContentItemLabelInfo">
                            {userInfo.phoneNumber}
                        </div>
                    </label>
                    <input type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </div>
                <div className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Address
                        <div className="updateAccountContentItemLabelInfo">
                            {userInfo.address}
                        </div>
                    </label>
                    <input type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </div>
                <button className='updateAccountContentSubmit'> SUBMIT </button>
            </div>
        </div>
    )
}