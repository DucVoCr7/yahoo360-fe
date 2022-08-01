import React, {useState} from 'react'
import './listUsers.scss'

function ListUsers({ data }) {

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
                            <button className='managementTableDataButton btnSmall'>Details</button>
                            <button className='managementTableDataButton btnSmall'>Logout</button>
                            <button className='managementTableDataButton btnSmall'>Block</button>
                            <button className='managementTableDataButton btnSmall'>Delete</button>
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
