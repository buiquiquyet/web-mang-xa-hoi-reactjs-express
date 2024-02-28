import classNames from 'classnames/bind';
import styles from './FriendPage.module.scss';
import { LogoNavMore, LogoSearch } from '../../../../Icon';
import testImg from './../../../../Img/test4.jpg'
const cx = classNames.bind(styles);

function FriendPage() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header-friend')}>
                    <div className={cx('header-lable')}>
                        <span>Bạn bè</span>
                    </div>
                    <div className={cx('header-searchSendFriend')}>
                        <div className={cx('header-search')}>
                            <LogoSearch className={cx('search-icon')}/>
                            <input placeholder='Tìm kiếm...'/>
                        </div>
                        <div className={cx('header-SendFriend')}>
                            <span>Lời mời kết bạn</span>
                        </div>
                    </div>
                </div>
                <div className={cx('all-friend')}>
                    <div className={cx('allFriend-lable')}>
                        <span>Tất cả bạn bè</span>
                    </div>
                </div>
                <div className={cx('friend-nav')}>
                    <div className={cx('friend-item')}>
                        <div className={cx('friend-infoPerson')}>
                            <div className={cx('friend-img')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('friend-name')}>
                                <span>Bui Hien</span>
                            </div>
                        </div>
                        <div className={cx('friend-icon')}>
                            <LogoNavMore className={cx('icon')}/>
                        </div>
                    </div>
                    <div className={cx('friend-item')}>
                        <div className={cx('friend-infoPerson')}>
                            <div className={cx('friend-img')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('friend-name')}>
                                <span>Bui Hien</span>
                            </div>
                        </div>
                        <div className={cx('friend-icon')}>
                            <LogoNavMore className={cx('icon')}/>
                        </div>
                    </div>
                    <div className={cx('friend-item')}>
                        <div className={cx('friend-infoPerson')}>
                            <div className={cx('friend-img')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('friend-name')}>
                                <span>Bui Hien</span>
                            </div>
                        </div>
                        <div className={cx('friend-icon')}>
                            <LogoNavMore className={cx('icon')}/>
                        </div>
                    </div>
                    <div className={cx('friend-item')}>
                        <div className={cx('friend-infoPerson')}>
                            <div className={cx('friend-img')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('friend-name')}>
                                <span>Bui Hien</span>
                            </div>
                        </div>
                        <div className={cx('friend-icon')}>
                            <LogoNavMore className={cx('icon')}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default FriendPage;