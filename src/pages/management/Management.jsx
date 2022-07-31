import React, { useState, useEffect } from 'react'
import { userRequest } from '../../utils/requestMethods'
import './management.scss'

export default function Management() {

    const [data, setData] = useState()

    useEffect(()=> {
        (async()=> {
            const response = await userRequest.get('/users')
            setData(response.data.data)
        })()
    }, [])

    return (
        data ?
            <div className='management'>
                <div className="managementTitle">
                    MAGAGEMENT PAGE
                </div>
                <div className="managementTop">
                    <div className="managementTopItem">
                        <div className="managementTopItemTitle">
                            <div className="managementTopItemTitleContent">Visitor</div>
                            <div className="managementTopItemTitleSearch">
                                <i className="managementTopItemTitleSearchIcon bi bi-search"></i>
                                <input className='managementTopItemTitleSearchInput' placeholder='Search data...' type="search" />
                            </div>
                            <div className="managementTopItemTitleView">
                                <i className="managementTopItemTitleViewIcon active bi bi-file-earmark-bar-graph"></i>
                                <i className="managementTopItemTitleViewIcon bi bi-filetype-exe"></i>
                            </div>
                            <button className="managementTopItemTitleExport btnSmall btnMain">
                                Export
                            </button>
                        </div>
                        <div className="managementTopItemContent">
                            Visitor Statistics Graph
                        </div>
                    </div>
                    <div className="managementTopItem">
                        <div className="managementTopItemTitle">
                            <div className="managementTopItemTitleContent">Post</div>
                            <div className="managementTopItemTitleSearch">
                                <i className="managementTopItemTitleSearchIcon bi bi-search"></i>
                                <input className='managementTopItemTitleSearchInput' placeholder='Search data...' type="search" />
                            </div>
                            <div className="managementTopItemTitleView">
                                <i className="managementTopItemTitleViewIcon active bi bi-file-earmark-bar-graph"></i>
                                <i className="managementTopItemTitleViewIcon bi bi-filetype-exe"></i>
                            </div>
                            <button className="managementTopItemTitleExport btnSmall btnMain">
                                Export
                            </button>
                        </div>
                        <div className="managementTopItemContent">
                            Post Statistics Graph
                        </div>
                    </div>
                </div>
                <div className="managementTop">
                    <div className="managementTopItem">
                        <div className="managementTopItemTitle">
                            <div className="managementTopItemTitleContent">New Accounts</div>
                            <div className="managementTopItemTitleSearch">
                                <i className="managementTopItemTitleSearchIcon bi bi-search"></i>
                                <input className='managementTopItemTitleSearchInput' placeholder='Search data...' type="search" />
                            </div>
                            <div className="managementTopItemTitleView">
                                <i className="managementTopItemTitleViewIcon active bi bi-file-earmark-bar-graph"></i>
                                <i className="managementTopItemTitleViewIcon bi bi-filetype-exe"></i>
                            </div>
                            <button className="managementTopItemTitleExport btnSmall btnMain">
                                Export
                            </button>
                        </div>
                        <div className="managementTopItemContent">
                            Statistics of new registered accounts Graph
                        </div>
                    </div>
                    <div className="managementTopItem">
                        <div className="managementTopItemTitle">
                            <div className="managementTopItemTitleContent">Title</div>
                            <div className="managementTopItemTitleSearch">
                                <i className="managementTopItemTitleSearchIcon bi bi-search"></i>
                                <input className='managementTopItemTitleSearchInput' placeholder='Search data...' type="search" />
                            </div>
                            <div className="managementTopItemTitleView">
                                <i className="managementTopItemTitleViewIcon active bi bi-file-earmark-bar-graph"></i>
                                <i className="managementTopItemTitleViewIcon bi bi-filetype-exe"></i>
                            </div>
                            <button className="managementTopItemTitleExport btnSmall btnMain">
                                Export
                            </button>
                        </div>
                        <div className="managementTopItemContent">
                            Graph
                        </div>
                    </div>
                </div>
                <div className="managementBottom">
                    <div className="managementBottomTitle">
                        <div className="managementBottomTitleContent">Manage Users</div>
                        <div className="managementBottomTitleSearch">
                            <i className="managementBottomTitleSearchIcon bi bi-search"></i>
                            <input className='managementBottomTitleSearchInput' type="search" />
                        </div>
                    </div>
                    <div className="managementBottomContent">
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
            </div>
            :
            <div className="management loading"></div>
    )
}