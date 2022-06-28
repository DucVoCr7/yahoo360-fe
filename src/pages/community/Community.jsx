import React, { useEffect, useState } from 'react'
import './community.scss'
import Header from '../../components/header/Header'
import { useSelector } from 'react-redux'
import { publicRequest } from '../../utils/requestMethods'
export default function Community() {
    const [dataCommunity, setDataCommunity] = useState()
    useEffect(()=> {
        (async()=> {
            try {
                const response = await publicRequest.get('/api/homePage')
                setDataCommunity(response.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    console.log(dataCommunity)
    return (
        <div className={dataCommunity ? 'community' : 'community loading'}>
            <Header/>
        </div>
    )
}