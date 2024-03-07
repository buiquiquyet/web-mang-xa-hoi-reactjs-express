import classNames from 'classnames/bind';
import styles from './MainFeed.module.scss';
import UserNoneImg from './../../../../Img/userNone.png'
import testImg from './../../../../Img/test.jpg'
import testImg2 from './../../../../Img/test1.jpg'
import testImg1 from './../../../../Img/test2.jpg'
import { LogoFeed } from '../../../../Icon';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MainFeed() {
    return ( 
        <div className={cx('wrapper')}>
            <Link to={''} className={cx('feed-item')}>
                <div className={cx('feedSelf')} style={{ backgroundImage: `url(${UserNoneImg})`, filter:'brightness(86%)' }}>
                </div>
                <div className={cx('feedDiv')}>
                        <span>Tạo tin</span>
                        <div className={cx('add-feed')}>
                            <div className={cx('logo-feed')}>
                                <LogoFeed className={cx('logoFeed-icon')}/>
                            </div>
                        </div>
                </div>
            </Link>
            <div className={cx('feed-item')}>
                <div className={cx('feedSelf')} style={{ backgroundImage: `url(${testImg1})`, height:'100%' }}>
                </div>
               
            </div>
            <div className={cx('feed-item')}>
                <div className={cx('feedSelf')} style={{ backgroundImage: `url(${testImg2})`, height:'100%' }}>
                </div>
               
            </div>
            <div className={cx('feed-item')}>
                <div className={cx('feedSelf')} style={{ backgroundImage: `url(${testImg})`, height:'100%' }}>
                </div>
               
            </div>
           
        </div>
     );
}

export default MainFeed;