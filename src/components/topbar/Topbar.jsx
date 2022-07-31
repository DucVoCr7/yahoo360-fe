import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../../assets/image/avatar.jpg'
import { logout } from '../../redux/userSlice'
import './topbar.scss'
export default function Topbar() {

    const [openNotify, setOpenNotify] = useState(false)
    const [openSetting, setOpenSetting] = useState(false)
    const [openTopbarMenu, setOpenTopbarMenu] = useState(false)
    const refNotify = useRef()
    const refSetting = useRef()
    const refTopbarMenu = useRef()
    const refTopbarMenuIcon = useRef()
    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.user)
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
            if (refNotify.current && !refNotify.current.contains(event.target)) {
                setOpenNotify(false)
            }
        }
        const handleClickOutSideSetting = (event) => {
            if (refSetting.current && !refSetting.current.contains(event.target)) {
                setOpenSetting(false)
            }
        }
        const handleClickOutSideTopbarMenu = (event) => {
            if (refTopbarMenu.current && !refTopbarMenu.current.contains(event.target) && !refTopbarMenuIcon.current.contains(event.target)) {
                setOpenTopbarMenu(false)
            }
        }
        window.addEventListener('click', handleClickOutSideNotify)
        window.addEventListener('click', handleClickOutSideSetting)
        window.addEventListener('click', handleClickOutSideTopbarMenu)
        return () => {
            window.removeEventListener('click', handleClickOutSideNotify)
            window.removeEventListener('click', handleClickOutSideSetting)
            window.removeEventListener('click', handleClickOutSideTopbarMenu)
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
                {userInfo &&
                    <div className='topbarItem' onClick={() => setOpenNotify(!openNotify)} ref={refNotify}>
                        <i className={openNotify ? 'topbarNotifyIcon bi bi-bell-fill active' : 'topbarNotifyIcon bi bi-bell'} ></i>
                        <span className={openNotify ? 'topbarNotifyNumber active' : "topbarNotifyNumber"} >1</span>
                        <div className={openNotify ? 'topbarNotifyList active' : 'topbarNotifyList'}>
                            <Link className='topbarNotifyItem' to='/notify'>
                                <img src={avatar} className="topbarNotifyImg" alt='avatar' />
                                <span className="topbarNotifyContent">
                                    Hello vừa gửi yêu cầu kết bạn.
                                </span>
                            </Link>
                            <Link className='topbarNotifyItem' to='/notify'>
                                <img src={avatar} className="topbarNotifyImg" alt='avatar' />
                                <span className="topbarNotifyContent">
                                    Hello thích bài viết của bạn.
                                </span>
                            </Link>
                            <Link className='topbarNotifyItem' to='/notify'>
                                <img src={avatar} className="topbarNotifyImg" alt='avatar' />
                                <span className="topbarNotifyContent">
                                    Hello thích bài viết của bạn.
                                </span>
                            </Link>
                            <Link className='topbarNotifyItem' to='/notify'>
                                <img src={avatar} className="topbarNotifyImg" alt='avatar' />
                                <span className="topbarNotifyContent">
                                    Hello thích bài viết của bạn.
                                </span>
                            </Link>
                            <Link className='topbarNotifyItem' to='/notify'>
                                <img src={avatar} className="topbarNotifyImg" alt='avatar' />
                                <span className="topbarNotifyContent">
                                    Hello thích bài viết của bạn.
                                </span>
                            </Link>
                        </div>
                    </div>
                }
                {userInfo &&
                    <Link className='topbarItem' to='/home'>
                        <img className='topbarImg' src={userInfo.image} alt='avatar' />
                    </Link>}
                {userInfo?.role === 'R0' && <Link to='/management' className='topbarItem'>MANAGEMENT</Link>}
                {userInfo &&
                    <div className='topbarItem' onClick={() => setOpenSetting(!openSetting)} ref={refSetting}>
                        <i className={openSetting ? 'topbarSettingIcon bi bi-gear-fill active' : 'topbarSettingIcon bi bi-gear'} ></i>
                        <div className={openSetting ? 'topbarSettingList active' : 'topbarSettingList'}>
                            <Link className='topbarSettingItem' to='/updateAccount'>Update Account</Link>
                            <Link className='topbarSettingItem' to='/' onClick={handleLogout}>Logout</Link>
                        </div>
                    </div>
                }
                {!userInfo && <Link className='topbarItem' to='/login'>LOGIN</Link>}
                {!userInfo && <Link className='topbarItem' to='/register'>REGISTER</Link>}
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
                    {userInfo &&
                        <Link className='topbarMenuItem' to='/home' onClick={()=> setOpenTopbarMenu(false)}>
                            <img className='topbarMenuImg' src={userInfo.image} alt='avatar' />
                        </Link>
                    }
                    {userInfo ?
                        <div className="topbarMenuItem" onClick={()=> setOpenTopbarMenu(false)}>
                            <Link className='topbarMenuItemChild' to='/updateAccount'>UPDATE ACCOUNT</Link>
                            <Link className='topbarMenuItemChild' to='/' onClick={handleLogout}>LOGOUT</Link>
                        </div>
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
                    {userInfo?.role === 'R0' && 
                    <Link to='/management' className='topbarMenuItem' onClick={()=> setOpenTopbarMenu(false)}>
                        <i className="topbarMenuItemChild bi bi-clipboard-data-fill"></i>
                        MANAGEMENT
                    </Link>}
                </div>
            </div>
            <Link to='/' className="topbarGroupM">
                YAHOO 360
            </Link>
            <div className="topbarGroupM">
                {userInfo ?
                    <Link to='' className='topbarItem'>
                        <i className="topbarNotifyIcon bi bi-bell-fill"></i>
                        <span className="topbarNotifyNumber">1</span>
                    </Link>
                    :
                    <Link className='topbarItem' to='/login'>
                        <i className="topbarIcon bi bi-person-fill"></i>
                    </Link>
                }
            </div>
        </div>
    )
}