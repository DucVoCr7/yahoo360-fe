import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../../assets/image/avatar.jpg'
import './updateAccount.scss'

export default function UpdateAccount() {

const handleUpdate = async()=> {
    //
}
const userInfo = useSelector(state => state.user.userInfo)
    return (
        <div className='updateAccount'>
            <span className="updateAccountTitle">
                UPDATE ACCOUNT
            </span>
            <div className="updateAccountContent">
                <span className="updateAccountContentItem">
                    <img src={userInfo.image ? userInfo.image : avatar} alt="" className="updateAccountContentItemImg" />
                    <label className="updateAccountContentItemLabel" htmlFor='updateAccountImgId'>
                        Change Avatar
                        <i className="updateAccountContentItemLabelInfo bi bi-cloud-arrow-up-fill"></i>
                    </label>
                    <input type="file" id='updateAccountImgId' hidden/>
                </span>
                <span className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Name
                        <span className="updateAccountContentItemLabelInfo">
                            {userInfo.name}
                        </span>
                    </label>
                    <input type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </span>
                <span className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Gender
                        <span className="updateAccountContentItemLabelInfo">
                            {userInfo.gender}
                        </span>
                    </label>
                    <select className='updateAccountContentItemInput'>
                        <option value="" disabled selected>Choice gender...</option>
                        <option value="G0">Male</option>
                        <option value="G1">Female</option>
                    </select>
                </span>
                <span className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Email
                        <span className="updateAccountContentItemLabelInfo">
                            {userInfo.email}
                        </span>
                    </label>
                    <input type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </span>
                <span className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Phone Number
                        <span className="updateAccountContentItemLabelInfo">
                            {userInfo.phoneNumber}
                        </span>
                    </label>
                    <input type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </span>
                <span className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Address
                        <span className="updateAccountContentItemLabelInfo">
                            {userInfo.address}
                        </span>
                    </label>
                    <input type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </span>
                <button className='updateAccountContentSubmit btnBig btnMain' onClick={handleUpdate}> SUBMIT </button>
            </div>
        </div>
    )
}