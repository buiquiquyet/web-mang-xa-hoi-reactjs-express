
import styles from './SideBarRight.module.scss'
import classNames from 'classnames/bind';
import TestImg from './../../../../Img/test.jpg'
import { Link } from 'react-router-dom';
import SideBarRightPersonContact from './SideBarRightPersonContact';
const cx = classNames.bind(styles)
function SideBarRight() {
   
    
    return ( 
        <div className={cx('wrapper')}>
            <div  className={cx('siderbar-rightHeader')}>
                <div className={cx('addFriend-content')}>
                        <span className={cx('lable-add')}>Lời mời kết bạn</span>
                        <Link to={'/'} className={cx('lableall-add')}>Xem tất cả</Link>
                </div>
                <Link to={'/'} className={cx('addFriend-info')}>
                    <div className={cx('add-imgMain')}>
                        <img src={TestImg} alt='img'/>
                    </div>
                    <div className={cx('add-info')}>
                        <div className={cx('info-person')}>
                            <div className={cx('infoName-comomFriend')}>
                                <div className={cx('infoName')}>
                                    Bùi Qúi Quyết
                                </div>
                                <div className={cx('commonFriend')}>
                                    <img src={TestImg}  alt='img'/>
                                    <span>1 bạn chung</span>
                                </div>
                            </div>
                            <div className={cx('info-time')}>
                                <span>5 ngày</span>
                            </div>
                        </div>
                        <div className={cx('button-submitAdd')}>
                            
                            <button>Xác nhận</button>
                        
                            <button style={{backgroundColor:'#DADDE1', color:'black'}}>Xóa</button>
                            
                        </div>
                    </div>
                </Link>
            </div>
            <div  className={cx('siderbar-rightBirthDay')}>
                <Link to={'/'}>
                    <span style={{ padding: '6px 8px' }}className={cx('lable-add')}>Sinh nhật</span>
                    <div className={cx('rightBirthDayChil')}>
                        <div className={cx('giftbox')}></div>
                        <span>Hôm nay sinh nhật của <b>Bùi Lan Anh</b> và <b>6 người khác</b></span>
                    </div>
                </Link>
            </div>
            <SideBarRightPersonContact/>
            
        </div>
     );
}

export default SideBarRight;