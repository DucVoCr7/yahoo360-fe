import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccount } from '../../redux/userSlice'
import { handleErrorUpdateUser } from '../../utils/handleErrorUpdateUser'
import './updateAccount.scss'
import { useReduxValueGender } from '../../utils/reduxMethods'

export default function UpdateAccount() {

const {pending, userInfo} = useSelector(state => state.user)
const [infoUpdate, setInfoUpdate] = useState({})
const [errors, setErrors] = useState()
const dispatch = useDispatch()
const navigate = useNavigate()
const valueGender = useReduxValueGender(userInfo.gender)
const handleChange = event => setInfoUpdate({...infoUpdate, [event.target.name]: event.target.value})
const handleSetFile = event => {
    const file = event.target.files[0]
    file.preview = URL.createObjectURL(file)
    setInfoUpdate({...infoUpdate, image: file})
}

const handleUpdate = async()=> {
    const [dataNeedUpdate, resultErrors] = handleErrorUpdateUser(infoUpdate)
    if(Object.keys(dataNeedUpdate).length === 0) {
        navigate('/home')
    } else {
        if(Object.keys(resultErrors).length === 0) {
            const data = new FormData()
            Object.keys(dataNeedUpdate).forEach(key=> data.append(key, dataNeedUpdate[key]))
            const statusUpdate = await dispatch(updateAccount({userId: userInfo.id, dataUpdate: data}));
            if(!statusUpdate.error) {
                navigate('/home')
            }
        } else {
            setErrors(resultErrors)
        }
    }
}

useEffect(()=> {
    return ()=> infoUpdate?.image && URL.revokeObjectURL(infoUpdate.image.preview)
}, [infoUpdate?.image])

    return (
        <div className='updateAccount'>
            <span className="updateAccountTitle">
                UPDATE ACCOUNT
            </span>
            <div className="updateAccountContent">
                <span className="updateAccountContentItem">
                    <img src={ infoUpdate?.image ? 
                            infoUpdate.image.preview 
                            :
                            userInfo.image
                        } 
                        alt="ImgUser" className="updateAccountContentItemImg" />
                    <label className="updateAccountContentItemLabel" htmlFor='updateAccountImgId'>
                        Change Avatar
                        <i className="updateAccountContentItemLabelInfo bi bi-cloud-arrow-up-fill"></i>
                    </label>
                    <input onChange={handleSetFile} type="file" id='updateAccountImgId' hidden/>
                </span>
                <span className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Name
                        <span className="updateAccountContentItemLabelInfo">
                            {userInfo.name}
                        </span>
                    </label>
                    <input onChange={handleChange} name='name' type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </span>
                <span className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Gender
                        <span className="updateAccountContentItemLabelInfo">
                            {valueGender}
                        </span>
                    </label>
                    <select onChange={handleChange} name='gender' className='updateAccountContentItemInput'>
                        <option value="" disabled selected>Choice ...</option>
                        <option value="G0">Male</option>
                        <option value="G1">Female</option>
                    </select>
                </span>
                <span className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Email
                        {errors?.email ? 
                            <span className="updateAccountContentItemLabelError">
                                {errors.email}
                            </span>
                            :
                            <span className="updateAccountContentItemLabelInfo">
                                {userInfo.email}
                            </span>
                        }
                    </label>
                    <input onChange={handleChange} name='email' type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </span>
                <span className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Phone
                        {errors?.phoneNumber? 
                            <span className="updateAccountContentItemLabelError">
                                {errors.phoneNumber}
                            </span>
                            :
                            <span className="updateAccountContentItemLabelInfo">
                                {userInfo.phoneNumber}
                            </span>
                        }
                    </label>
                    <input onChange={handleChange} name='phoneNumber' type="number" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </span>
                <span className="updateAccountContentItem">
                    <label className="updateAccountContentItemLabel">
                        Address
                        <span className="updateAccountContentItemLabelInfo">
                            {userInfo.address}
                        </span>
                    </label>
                    <input onChange={handleChange} name='address' type="text" className="updateAccountContentItemInput" placeholder='Enter new info...' />
                </span>
                <button className={pending ? 'updateAccountContentSubmit btnBig btnMain active' : 'updateAccountContentSubmit btnBig btnMain'}  onClick={handleUpdate}> {!pending && 'UPDATE'} </button>
            </div>
        </div>
    )
}