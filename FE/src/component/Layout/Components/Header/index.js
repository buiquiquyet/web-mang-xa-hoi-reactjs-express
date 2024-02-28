import style from './Header.module.scss'
import classNames from 'classnames/bind';
import { LogoFb,LogoHomeActive,LogoGameActive,LogoGroupActive,LogoMarketAcitve, LogoGame, LogoGroup, LogoHome, LogoMarket, LogoMessage, LogoNotif, LogoOption, LogoSearch, LogoWatch } from '../../../../Icon';
import ImgUser from './../../../../Img/LogoUser.png'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';
import HeaderUserNavItem from '../HeaderUserNavItem';
import HeaderUserNotifice from '../HeaderUserNotifice';
import HeaderUserMessager from '../HeaderUserMessager';
import { setMessLog } from '../../../../useReducerMessager/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../../../../App';
const cx = classNames.bind(style)
function Header() {
   
    const {typePage} = useContext(MyContext)
   
    const messagerState = useSelector(state => state.messager)
    const { checkMesLog } = messagerState
    const dispatch = useDispatch()
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
                    <Tippy content="Marketplace" arrow={false} >
                    {
                            typePage === 'homeMarket' 
                            ? <Link to={'/homeMarket'}  className={cx('iconBar','active-navbar')}>
                                <LogoMarketAcitve className={cx('iconOptionBar')}/>   
                            </Link>
                            : <Link to={'/homeMarket'}  className={cx('iconBar')}>
                                <LogoMarket className={cx('iconOptionBar')}/>   
                            </Link>
                        }
                    </Tippy>
                    <Tippy content="Nhóm" arrow={false} >
                    {
                            typePage === 'homeGroup' 
                            ? <Link to={'/homeGroup'}  className={cx('iconBar','active-navbar')}>
                                <LogoGroupActive className={cx('iconOptionBar')}/>   
                            </Link>
                            : <Link to={'/homeGroup'}  className={cx('iconBar')}>
                                <LogoGroup className={cx('iconOptionBar')}/>   
                            </Link>
                        }
                    </Tippy>
                    <Tippy content="Trò chơi" arrow={false} >
                    {
                            typePage === 'homeGame' 
                            ? <Link to={'/homeGame'}  className={cx('iconBar','active-navbar')}>
                                <LogoGameActive className={cx('iconOptionBar')}/>   
                            </Link>
                            : <Link to={'/homeGame'}  className={cx('iconBar')}>
                                <LogoGame className={cx('iconOptionBar')}/>   
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
                                <img  src={ImgUser} alt='img'/>
                            </div>
                        </Tippy>
                   </HeaderUserNavItem>
                    
                </div>
            </div>
            
        </div>
     );
}

export default Header;