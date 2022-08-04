import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { userRequest } from '../../utils/requestMethods'
import './listUsers.scss'

function ListUsers({ data }) {

    const navigate = useNavigate()
    const handleDetailsUser = (userId) => {
        navigate(`/users/${userId}`)
    }
    const handleLogoutUser = async (userId) => {
        const response = await userRequest.post(`/admin/${userId}`)
        console.log(response.data)
    }
    const handleBlockUser = (userId) => {

    }
    const handleDeleteUser = (userId) => {

    }
    return (
        <div className="listUsers">
        <div className="listUsersTop">
            <div className="listUsersTopTitle">Manage Users</div>
            <div className="listUsersTopSearch">
                <i className="listUsersTopSearchIcon bi bi-search"></i>
                <input className='listUsersTopSearchInput' type="search" placeholder='Search user by email...'/>
            </div>
        </div>
        <div className="listUsersBottom">
            <table className='managementTable'>
                <tbody>
                <tr className='managementTableRow'>
                    <th className='managementTableHeader'>ID</th>
                    <th className='managementTableHeader'>Name</th>
                    <th className='managementTableHeader'>Email</th>
                    <th className='managementTableHeader'>Actions</th>
                </tr>
                {data.map((user, index)=> 
                    <tr className='managementTableRow' key={index}>
                        <td className='managementTableData'>{user.id}</td>
                        <td className='managementTableData'>{user.name}</td>
                        <td className='managementTableData'>{user.email}</td>
                        <td className='managementTableData'>
                            <button className='managementTableDataButton btnSmall'
                                onClick={()=> handleDetailsUser(user.id)}
                            >
                                Details
                            </button>
                            <button className='managementTableDataButton btnSmall'
                                onClick={()=> handleLogoutUser(user.id)}
                            >
                                Logout
                            </button>
                            <button className='managementTableDataButton btnSmall'
                                onClick={()=> handleBlockUser(user.id)}
                            >
                                Block
                            </button>
                            <button className='managementTableDataButton btnSmall'
                                onClick={()=> handleDeleteUser(user.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default ListUsers
