import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../assets/image/avatar.jpg'
import './topbar.scss'
export default function Topbar() {
    const categoryList = ['Life', 'Sport', 'Style', 'Tech', 'Music', 'Cinema', 'Travel', 'Food']
    // const user = {
    //     roleId: 'R0'
    // }
    // const user = 'sdsd'
    const user = null

    const [openCategory, setOpenCategory] = useState(false)
    const [openNotify, setOpenNotify] = useState(false)
    const [openSetting, setOpenSetting] = useState(false)
    const [openMenuM, setOpenMenuM] = useState(false)
    const refCategory = useRef()
    const refNotify = useRef()
    const refSetting = useRef()
    const refMenuM = useRef()
    const refMenuMIcon = useRef()

    // Click outSide close ref
    useEffect(() => {
        const handleClickOutSideCategory = (event) => {
            if (refCategory.current && !refCategory.current.contains(event.target)) {
                setOpenCategory(false)
            }
        }
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
        const handleClickOutSideMenuM = (event) => {
            if (refMenuM.current && !refMenuM.current.contains(event.target) && !refMenuMIcon.current.contains(event.target)) {
                setOpenMenuM(false)
            }
        }
        window.addEventListener('click', handleClickOutSideCategory)
        window.addEventListener('click', handleClickOutSideNotify)
        window.addEventListener('click', handleClickOutSideSetting)
        window.addEventListener('click', handleClickOutSideMenuM)
        return () => {
            window.removeEventListener('click', handleClickOutSideCategory)
            window.removeEventListener('click', handleClickOutSideNotify)
            window.removeEventListener('click', handleClickOutSideSetting)
            window.removeEventListener('click', handleClickOutSideMenuM)
        }
    }, [])
    return (
        <div className='topbar'>
            <i onClick={() => setOpenMenuM(!openMenuM)} ref={refMenuMIcon}
                className={openMenuM ? 'topbarMenu bi-list-nested active' : 'topbarMenu bi bi-list'}
            ></i>
            <div className={openMenuM ? 'topbarGroup active' : 'topbarGroup'} ref={refMenuM}>
                <Link className='topbarItem' to='/' onClick={() => setOpenMenuM(!openMenuM)}>COMMUNITY</Link>
                <Link className='topbarItem' to='/write' onClick={() => setOpenMenuM(!openMenuM)}>WRITE</Link>
                <div className='topbarItem' onClick={() => setOpenCategory(!openCategory)} ref={refCategory}> 
                    CATEGORY
                    <i className={openCategory ? 'topbarCategoryIcon bi bi-chevron-right active' : 'topbarCategoryIcon bi bi-chevron-right'}></i>
                    <ul className={openCategory ? 'topbarCategoryList active' : 'topbarCategoryList'} onClick={() => setOpenMenuM(!openMenuM)}>
                        {categoryList.map((categoryItem, index) => (
                            <Link to={`posts?Category=${categoryItem}`} className='topbarCategoryItem' key={index}>{categoryItem}</Link>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='topbarGroup'>
                <div className='topbarItem'>
                    <input type='text' className='topbarSearchInput' placeholder='Search...' />
                    <i className='topbarSearchIcon bi bi-search'></i>
                </div>
                {user &&
                    <div className='topbarItem' onClick={() => setOpenNotify(!openNotify)} ref={refNotify}>
                        <i className={openNotify ? 'topbarNotifyIcon bi bi-bell-fill active' : 'topbarNotifyIcon bi bi-bell'} ></i>
                        <span className={openNotify ? 'topbarNotifyNumber active' : "topbarNotifyNumber"} >1</span>
                        <ul className={openNotify ? 'topbarNotifyList active' : 'topbarNotifyList'}>
                            <Link className='topbarNotifyItem' to='/notify'>
                                <img src={avatar} className="topbarNotifyImg" alt='avatar'/>
                                <span className="topbarNotifyContent">
                                    Hello vừa gửi yêu cầu kết bạn.
                                </span>
                            </Link>
                            <Link className='topbarNotifyItem' to='/notify'>
                                <img src={avatar} className="topbarNotifyImg" alt='avatar'/>
                                <span className="topbarNotifyContent">
                                    Hello thích bài viết của bạn.
                                </span>
                            </Link>
                            <Link className='topbarNotifyItem' to='/notify'>
                                <img src={avatar} className="topbarNotifyImg" alt='avatar'/>
                                <span className="topbarNotifyContent">
                                    Hello thích bài viết của bạn.
                                </span>
                            </Link>
                            <Link className='topbarNotifyItem' to='/notify'>
                                <img src={avatar} className="topbarNotifyImg" alt='avatar'/>
                                <span className="topbarNotifyContent">
                                    Hello thích bài viết của bạn.
                                </span>
                            </Link>
                            <Link className='topbarNotifyItem' to='/notify'>
                                <img src={avatar} className="topbarNotifyImg" alt='avatar'/>
                                <span className="topbarNotifyContent">
                                    Hello thích bài viết của bạn.
                                </span>
                            </Link>
                        </ul>
                    </div>
                }
                {user &&
                    <Link className='topbarItem' to='/home'>
                        <img className='topbarImg' src={user.image ? user.image : avatar} alt='avatar' />
                    </Link>}
                {user?.roleId === 'R0' && <Link to='/manageUsers' className='topbarItem'>MANAGE</Link>}
                {user &&
                    <div className='topbarItem' onClick={() => setOpenSetting(!openSetting)} ref={refSetting}>
                        <i className={openSetting ? 'topbarSettingIcon bi bi-gear-fill active' : 'topbarSettingIcon bi bi-gear'} ></i>
                        <ul className={openSetting ? 'topbarSettingList active' : 'topbarSettingList'}>
                            <Link className='topbarSettingItem' to='/updateAccount'>Update Account</Link>
                            <Link className='topbarSettingItem' to='/'>Logout</Link>
                        </ul>
                    </div>
                }
                {!user && <Link className='topbarItem' to='/login'>LOGIN</Link>}
                {!user && <Link className='topbarItem' to='/register'>REGISTER</Link>}
            </div>
        </div>
    )
}