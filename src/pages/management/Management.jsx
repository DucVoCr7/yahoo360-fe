import React, { useState, useEffect } from 'react'
import ListUsers from '../../components/listUsers/ListUsers'
import Statistics from '../../components/statistics/Statistics'
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
                        <Statistics title='Visitor'/>
                        <Statistics title='Post'/>
                    </div>
                    <div className="managementTopItem">
                        <Statistics title='New Accounts'/>
                        <Statistics title='Title'/>
                    </div>
                </div>
                <div className="managementBottom">
                    <ListUsers data={data}/>
                </div>
            </div>
            :
            <div className="management loading"></div>
    )
}