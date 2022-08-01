import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/userSlice'
import { useReduxUserFriendRequestReceiveds } from '../../utils/reduxMethods'
import ListNotify from '../listNotify/ListNotify'
import './topbar.scss'
export default function Topbar() {

    const [openNotify, setOpenNotify] = useState(false)
    const [openNotifyM, setOpenNotifyM] = useState(false)
    const [openSetting, setOpenSetting] = useState(false)
    const [openTopbarMenu, setOpenTopbarMenu] = useState(false)
    const refNotifyList = useRef()
    const refNotifyIcon = useRef()
    const refNotifyNumber = useRef() 
    const refNotifyListM = useRef()
    const refNotifyIconM = useRef()
    const refNotifyNumberM = useRef() 
    const refSetting = useRef()
    const refTopbarMenu = useRef()
    const refTopbarMenuIcon = useRef()
    const friendRequestReceiveds = useReduxUserFriendRequestReceiveds()
    const {userInfo} = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleLogout = async (event) => {
        const statusLogout = await dispatch(logout())
        if(!statusLogout.error) {
            navigate('/')
        }
    }


    const [searchTerm, setSearchTerm] = useState('')
    const refTimeout = useRef(null)
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        if(refTimeout.current) {
            clearTimeout(refTimeout.current)
        }
        refTimeout.current = setTimeout(()=> {
            const valueSearch = event.target.value.trim()
            if(valueSearch) {
                navigate(`/searchPosts?title=${valueSearch}`)
            }
        }, 500)
    }

    // Click outSide close ref
    useEffect(() => {
        const handleClickOutSideNotify = (event) => {
            if (refNotifyList.current && 
                !refNotifyList.current.contains(event.target) && 
                !refNotifyIcon.current.contains(event.target) &&
                !refNotifyNumber.current.contains(event.target)
                ) {
                setOpenNotify(false)
            }
        }
        const handleClickOutSideNotifyM = (event) => {
            if (refNotifyListM.current && 
                !refNotifyListM.current.contains(event.target) && 
                !refNotifyIconM.current.contains(event.target) &&
                !refNotifyNumberM.current.contains(event.target)
                ) {
                setOpenNotifyM(false)
            }
        }
        const handleClickOutSideSetting = (event) => {
            if (refSetting.current && !refSetting.current.contains(event.target)) {
                setOpenSetting(false)
            }
        }
        const handleScrollClickOutSideTopbarMenu = (event) => {
            if (refTopbarMenu.current && !refTopbarMenu.current.contains(event.target) && !refTopbarMenuIcon.current.contains(event.target)) {
                setOpenTopbarMenu(false)
            }
        }
        window.addEventListener('click', handleClickOutSideNotify)
        window.addEventListener('click', handleClickOutSideNotifyM)
        window.addEventListener('click', handleClickOutSideSetting)
        window.addEventListener('click', handleScrollClickOutSideTopbarMenu)
        window.addEventListener('scroll', handleScrollClickOutSideTopbarMenu)
        return () => {
            window.removeEventListener('click', handleClickOutSideNotify)
            window.removeEventListener('click', handleClickOutSideNotifyM)
            window.removeEventListener('click', handleClickOutSideSetting)
            window.removeEventListener('click', handleScrollClickOutSideTopbarMenu)
            window.removeEventListener('scroll', handleScrollClickOutSideTopbarMenu)
        }
    }, [])


    return (
        <div className='topbar'>
            {/* Topbar Tablet Computer */}
            <div className='topbarGroup'>
                <Link className='topbarItem' to='/'>COMMUNITY</Link>
                <Link className='topbarItem' to='/write'>WRITE</Link>
            </div>
            <div className='topbarGroup'>
                <div className='topbarItem'>
                    <input type='text' 
                        className='topbarSearchInput' 
                        placeholder='Search posts by title...'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <i className='topbarSearchIcon bi bi-search'></i>
                </div>
                {userInfo ? 
                    <>
                        <div className='topbarItem'>
                            <i 
                                className={openNotify ? 
                                    'topbarNotifyIcon bi bi-bell-fill active' 
                                    : 
                                    'topbarNotifyIcon bi bi-bell'}
                                ref={refNotifyIcon}
                                onClick={() => setOpenNotify(!openNotify)}
                            />
                            {friendRequestReceiveds?.length > 0 &&
                                <span 
                                    className={openNotify ? 'topbarNotifyNumber active' : "topbarNotifyNumber"}
                                    onClick={() => setOpenNotify(!openNotify)}
                                >
                                    {friendRequestReceiveds.length}
                                </span>
                            }
                            {openNotify &&
                                <div className='topbarNotifyList' ref={refNotifyList}>
                                    <ListNotify data={friendRequestReceiveds} setOpenNotify={setOpenNotify}/>
                                </div>
                            }
                        </div>
                        <Link className='topbarItem' to='/home'>
                            <img className='topbarImg' src={userInfo.image} alt='avatar'/>
                        </Link>
                        {userInfo.role === 'R0' && 
                            <Link to='/management' className='topbarItem'>MANAGEMENT</Link>
                        }
                        <div className='topbarItem' onClick={() => setOpenSetting(!openSetting)} ref={refSetting}>
                            <i className={openSetting ? 
                                'topbarSettingIcon bi bi-gear-fill active' 
                                : 
                                'topbarSettingIcon bi bi-gear'
                            }/>
                            <div className={openSetting ? 'topbarSettingList active' : 'topbarSettingList'}>
                                <Link className='topbarSettingItem' to='/updateAccount'>Update Account</Link>
                                <Link className='topbarSettingItem' to='/' onClick={handleLogout}>Logout</Link>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <Link className='topbarItem' to='/login'>LOGIN</Link>
                        <Link className='topbarItem' to='/register'>REGISTER</Link>
                    </>
                }
            </div>


            {/* Topbar Mobile */}
            <div className="topbarGroupM">
                <i onClick={() => setOpenTopbarMenu(!openTopbarMenu)} ref={refTopbarMenuIcon}
                    className={openTopbarMenu ? 'topbarItem bi-list-nested' : 'topbarItem bi bi-list'}
                ></i>
                <div className={openTopbarMenu ? "topbarMenu active" : "topbarMenu"} ref={refTopbarMenu}>
                    <div className='topbarMenuItem'>
                        <input 
                            type='search' 
                            className='topbarMenuSearchInput' 
                            placeholder='Search posts by title...'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <i className='topbarMenuSearchIcon bi bi-search'></i>
                    </div>
                    {userInfo ?
                        <>  
                            <Link className='topbarMenuItem' to='/home' onClick={()=> setOpenTopbarMenu(false)}>
                                <img className='topbarMenuImg' src={userInfo.image} alt='avatar' />
                            </Link>
                            <div className="topbarMenuItem" onClick={()=> setOpenTopbarMenu(false)}>
                                <Link className='topbarMenuItemChild' to='/updateAccount'>UPDATE ACCOUNT</Link>
                                <Link className='topbarMenuItemChild' to='/' onClick={handleLogout}>LOGOUT</Link>
                            </div>
                            {userInfo.role === 'R0' && 
                                <Link to='/management' className='topbarMenuItem' onClick={()=> setOpenTopbarMenu(false)}>
                                    <i className="topbarMenuItemChild bi bi-clipboard-data-fill"></i>
                                    MANAGEMENT
                                </Link>
                            }
                        </>
                        :
                        <div className="topbarMenuItem" onClick={()=> setOpenTopbarMenu(false)}>
                            <Link className='topbarMenuItemChild' to='/login'>LOGIN</Link>
                            <Link className='topbarMenuItemChild' to='/register'>REGISTER</Link>
                        </div>
                    }
                    <Link to='/write' className="topbarMenuItem" onClick={()=> setOpenTopbarMenu(false)}>
                        <i className="topbarMenuItemChild bi bi-pen-fill"></i>
                        WRITE YOUR POST!
                    </Link>
                </div>
            </div>
            <Link to='/' className="topbarGroupM">
                YAHOO 360
            </Link>
            <div className="topbarGroupM">
                {userInfo ?
                    <div className='topbarItem'>
                        <i className={openNotifyM ? 
                            'topbarNotifyIcon bi bi-bell-fill active' 
                            : 
                            'topbarNotifyIcon bi bi-bell'}
                            onClick={() => setOpenNotifyM(!openNotifyM)}
                            ref={refNotifyIconM}
                        />
                        {friendRequestReceiveds?.length > 0 &&
                            <span className={openNotifyM ? 
                                'topbarNotifyNumber active' 
                                : 
                                "topbarNotifyNumber"}
                                onClick={() => setOpenNotifyM(!openNotifyM)}
                                ref={refNotifyNumberM}
                            >
                                {friendRequestReceiveds.length}
                            </span>
                        }
                        {openNotifyM &&
                            <div className='topbarNotifyList'ref={refNotifyListM}>
                                <ListNotify data={friendRequestReceiveds} setOpenNotify={setOpenNotifyM}/>
                            </div>
                        }
                    </div>
                    :
                    <Link className='topbarItem' to='/login'>
                        <i className="topbarIcon bi bi-person-fill"></i>
                    </Link>
                }
            </div>
        </div>
    )
}