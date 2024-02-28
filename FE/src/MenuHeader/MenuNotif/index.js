import classNames from "classnames/bind";
import styles from './MenuNotif.module.scss'
import testImg from './../../Img/test3.jpg'
import testImg1 from './../../Img/test2.jpg'
import testImg2 from './../../Img/test1.jpg'
import { Link } from "react-router-dom";
const cx = classNames.bind(styles)

function MenuNotif() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('notif-lable')}>Thông báo</div>
            <div className={cx('notif-content')}>
                <Link to={''} className={cx('notif-item')}>
                    
                        <img src={testImg} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}><b>Huy Nguyễn</b> đã mời bạn thích<b> Đẹp Một Chút Mỗi Ngày</b></span>
                        <span className={cx('item-time')}>2 ngày trước</span>
                    </div>
                </Link>
                <Link to={''} className={cx('notif-item')}>
                    
                        <img src={testImg1} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}><b>Huy Nguyễn</b> đã mời bạn thích<b> Đẹp Một Chút Mỗi Ngày</b></span>
                        <span className={cx('item-time')}>2 ngày trước</span>
                    </div>
                </Link>
                <Link to={''} className={cx('notif-item')}>
                    
                        <img src={testImg2} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}><b>Huy Nguyễn</b> đã mời bạn thích<b> Đẹp Một Chút Mỗi Ngày</b></span>
                        <span className={cx('item-time')}>2 ngày trước</span>
                    </div>
                </Link>
                <Link to={''} className={cx('notif-item')}>
                    
                        <img src={testImg} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}><b>Huy Nguyễn</b> đã mời bạn thích<b> Đẹp Một Chút Mỗi Ngày</b></span>
                        <span className={cx('item-time')}>2 ngày trước</span>
                    </div>
                </Link>
                <Link to={''} className={cx('notif-item')}>
                    
                        <img src={testImg} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}><b>Huy Nguyễn</b> đã mời bạn thích<b> Đẹp Một Chút Mỗi Ngày</b></span>
                        <span className={cx('item-time')}>2 ngày trước</span>
                    </div>
                </Link>
                <Link to={''} className={cx('notif-item')}>
                    
                        <img src={testImg} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}><b>Huy Nguyễn</b> đã mời bạn thích<b> Đẹp Một Chút Mỗi Ngày</b></span>
                        <span className={cx('item-time')}>2 ngày trước</span>
                    </div>
                </Link>
                <Link to={''} className={cx('notif-item')}>
                    
                        <img src={testImg} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}><b>Huy Nguyễn</b> đã mời bạn thích<b> Đẹp Một Chút Mỗi Ngày</b></span>
                        <span className={cx('item-time')}>2 ngày trước</span>
                    </div>
                </Link>
                <Link to={''} className={cx('notif-item')}>
                    
                        <img src={testImg} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}><b>Huy Nguyễn</b> đã mời bạn thích<b> Đẹp Một Chút Mỗi Ngày</b></span>
                        <span className={cx('item-time')}>2 ngày trước</span>
                    </div>
                </Link>
                <Link to={''} className={cx('notif-item')}>
                    
                        <img src={testImg} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}><b>Huy Nguyễn</b> đã mời bạn thích<b> Đẹp Một Chút Mỗi Ngày</b></span>
                        <span className={cx('item-time')}>2 ngày trước</span>
                    </div>
                </Link>
                <Link to={''} className={cx('notif-item')}>
                    
                        <img src={testImg} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}><b>Huy Nguyễn</b> đã mời bạn thích<b> Đẹp Một Chút Mỗi Ngày</b></span>
                        <span className={cx('item-time')}>2 ngày trước</span>
                    </div>
                </Link>
            </div>
        </div>
     );
}

export default MenuNotif;