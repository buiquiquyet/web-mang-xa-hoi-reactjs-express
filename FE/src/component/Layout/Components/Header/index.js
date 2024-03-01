import style from './Header.module.scss'
import classNames from 'classnames/bind';
import { LogoFb,LogoHomeActive,  LogoHome, LogoMessage, LogoNotif, LogoOption, LogoSearch, LogoWatch, LogoFriendActive, LogoFriend } from '../../../../Icon';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';
import HeaderUserNavItem from '../HeaderUserNavItem';
import HeaderUserNotifice from '../HeaderUserNotifice';
import HeaderUserMessager from '../HeaderUserMessager';
import { setMessLog } from '../../../../useReducerMessager/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { memo, useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../../App';
import UserImg from './../../../../Img/userNone.png'
import * as ServicePostApi from './../../../../apiServices/postAPI'

const cx = classNames.bind(style)
function Header() {
   
    const {typePage, ImageUrlPath} = useContext(MyContext)
   
    const messagerState = useSelector(state => state.messager)
    const { checkMesLog } = messagerState
    const dispatch = useDispatch()
    const [imageAvartar, setImageAvartar] = useState('')
    
    useEffect(() => {
        const fecthImgUser = async (token) => {
            const rs = await ServicePostApi.showPostByUserAvartarImg(token)
            if(rs.image && rs.image.length > 0) {
                setImageAvartar(rs.image.flat()[0].url)
               
            }
        }
        fecthImgUser(localStorage.getItem('tokenFb'))
    },[])

    return ( 
        <div  className={cx('wrapper')}>
            <div className={cx('app')}>
                <div className={cx('logo-search')}>
                    <Link to={'/'}  style={{ display: 'flex', alignItems: 'center'}}>
                        <LogoFb className={cx('logo-main')}  />
                    </Link>
                    <div className={cx('search-div')}>
                        <LogoSearch className={cx('icon-search')}/>
                        <input placeholder='Tìm kiếm trên Facebook' className={cx('search-input')}/>
                    </div>
                </div>
                <div className={cx('optionBar')}>   
                    <Tippy content="Trang chủ" arrow={false} >
                        {
                            typePage === 'homeUser' 
                            ? <Link to={'/'}  className={cx('iconBar','active-navbar')}>
                                <LogoHomeActive className={cx('iconOptionBar')}/>   
                            </Link>
                            : <Link to={'/'}  className={cx('iconBar')}>
                                <LogoHome className={cx('iconOptionBar')}/>   
                            </Link>
                        }
                    </Tippy>
                    <Tippy content="Bạn bè" arrow={false} >
                    {
                            typePage === 'friendPage' 
                            ? <Link to={'/friendPage'}  className={cx('iconBar','active-navbar')}>
                                <LogoFriendActive className={cx('iconOptionBar')}/>   
                            </Link>
                            : <Link to={'/friendPage'}  className={cx('iconBar')}>
                                <LogoFriend className={cx('iconOptionBar')}/>   
                            </Link>
                        }
                    </Tippy>
                    <Tippy content="Video" arrow={false} >
                    {
                            typePage === 'homeVideo' 
                            ? <Link to={'/homeVideo'}  className={cx('iconBar','active-navbar')}>
                                <LogoHomeActive className={cx('iconOptionBar')}/>   
                            </Link>
                            : <Link to={'/homeVideo'}  className={cx('iconBar')}>
                                <LogoWatch className={cx('iconOptionBar')}/>   
                            </Link>
                        }
                    </Tippy>
                    
                </div>
                <div className={cx('rightUser')}>
                    <Tippy content='Menu' arrow={false}>
                        <div  className={cx('rightUser-iconDiv')}>
                            <LogoOption className={cx('rightUser-icon')}/>
                        </div>
                    </Tippy>
                    <HeaderUserMessager   >
                        <Tippy content="Messager" arrow={false}>
                            <div className={cx('rightUser-iconDiv')} onClick={() => dispatch(setMessLog(!checkMesLog))}>
                                <LogoMessage className={cx('rightUser-icon')}/>
                            </div>
                        </Tippy>
                    </HeaderUserMessager>
                    <HeaderUserNotifice>
                        <Tippy content="Thông báo" arrow={false}>
                            <div  className={cx('rightUser-iconDiv')}>
                                <LogoNotif className={cx('rightUser-icon')}/>
                            </div>
                        </Tippy>
                    </HeaderUserNotifice>
                   <HeaderUserNavItem>
                        <Tippy content="Tài khoản" arrow={false}>
                            <div  className={cx('rightUser-iconUser')}>
                                <img src={imageAvartar !== '' ? ImageUrlPath + imageAvartar : UserImg} alt='img'/>
                            </div>
                        </Tippy>
                   </HeaderUserNavItem>
                    
                </div>
            </div>
            
        </div>
     );
}

export default memo(Header);