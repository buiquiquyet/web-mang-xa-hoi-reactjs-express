
import classNames from "classnames/bind";
import styles from './VideoPage.module.scss'
import testImg from './../../../../Img/test4.jpg'
const cx = classNames.bind(styles)


function VideoPage() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header-friend')}>
                    <div className={cx('header-lable')}>
                        <span>Video</span>
                    </div>
                   
                </div>
                <div className={cx('all-friend')}>
                    <div className={cx('allFriend-lable')}>
                        <span>Video của bạn</span>
                    </div>
                </div>
                <div className={cx('friend-nav')}>
                <div className={cx('Image-nav')}>
                    <div className={cx('Image-item')}>
                        <img src={testImg} alt="img"/>
                    </div>
                    <div className={cx('Image-item')}>
                        <img src={testImg} alt="img"/>
                    </div>
                    <div className={cx('Image-item')}>
                        <img src={testImg} alt="img"/>
                    </div>
                    <div className={cx('Image-item')}>
                        <img src={testImg} alt="img"/>
                    </div>
                    <div className={cx('Image-item')}>
                        <img src={testImg} alt="img"/>
                    </div>
                    <div className={cx('Image-item')}>
                        <img src={testImg} alt="img"/>
                    </div>
                </div>
                </div>
            </div>
        </div>
     );
}

export default VideoPage;