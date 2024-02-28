import classNames from "classnames/bind";
import styles from './MenuUser.module.scss'
import { Link, useNavigate } from "react-router-dom";
import UserImg from './../../Img/LogoUser.png'
import { useContext } from "react";
import { MyContext } from "../../App";
const cx = classNames.bind(styles)
function MenuUser() {
    const {dataUser} = useContext(MyContext)
    const navigate = useNavigate()
    const handleGoToLogin = () => {
        localStorage.setItem('tokenFb', '')
        navigate('/login')
    }
    return ( 
        <div to={''} className={cx('wrapper')} > 
            <div className={cx('content')}>
               <Link to={'/userPost'} className={cx('header-content')}>
                <div className={cx('imgUser')}>
                        <img src={UserImg} alt="img"/>
                    </div>
                    <div className={cx('nickname')}>
                        <span>
                            {dataUser !== null && <span>{dataUser.first_name + ' ' +  dataUser.last_name} </span>}
                        </span>
                    </div>
               </Link>
            </div>
            <div className={cx('user-item')}>
                <Link to={'/'} className={cx('item')} >
                        <div className={cx('item-iconDiv')}>
                            <div className={cx('item-iconSetting')}></div>
                        </div>
                        <span  className={cx('item-text')}>Cài đặt & quyền riêng tư</span>
                </Link>
                <Link to={'/'} className={cx('item')} >
                    <div className={cx('item-iconDiv')}>
                        <div className={cx('item-iconHelp')}></div>
                    </div>
                    <span  className={cx('item-text')}>Trợ giúp & hỗ trợ</span>
                </Link>
                <Link to={'/'} className={cx('item')} >
                    <div className={cx('item-iconDiv')}>
                        <div className={cx('item-iconMonitor')}></div>
                    </div>
                    <span  className={cx('item-text')}>Màn hình & trợ năng</span>
                </Link>
                <Link to={'/'} className={cx('item')} >
                    <div className={cx('item-iconDiv')}>
                        <div className={cx('item-iconContact')}></div>
                    </div>
                    <span  className={cx('item-text')}>Đóng góp ý kiến</span>
                </Link>
                <div  className={cx('item')} onClick={handleGoToLogin} >
                    <div className={cx('item-iconDiv')}>
                        <div className={cx('item-iconOut')}></div>
                    </div>
                    <span  className={cx('item-text')}>Đăng xuất</span>
                </div>
            </div>
            
        </div>
     );
}

export default MenuUser;