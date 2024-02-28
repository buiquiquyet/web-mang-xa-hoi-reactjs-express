
import classNames from 'classnames/bind';
import styles from './LeftPostUserPage.module.scss';
import houseImg from './../../../../../Img/house.png'
import testImg from './../../../../../Img/test4.jpg'
const cx = classNames.bind(styles);

function LeftPostUserPage() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-box')}>
                <div className={cx('label')}>
                    <span>Giới thiệu</span>
                </div>
                <div className={cx('introduce-box')}>
                    <span>Thêm tiểu sử</span>
                </div>
                <div className={cx('introduce-live')}>
                    <img src={houseImg} alt='img'/>
                    <span>Sống tại</span>
                    <span className={cx('introduceLive-bold')}>Gia Lộc</span>
                </div>
                <div className={cx('introduce-box')}>
                    <span>Chỉnh sửa chi tiết</span>
                </div>
                <div className={cx('introduce-box')}>
                    <span>Thêm nội dung đáng chú ý</span>
                </div>
            </div>
            <div className={cx('wrapper-box')}>
                <div className={cx('friend-box')}>
                    <div className={cx('label')}>
                        <span>Ảnh</span>
                    </div>
                    <div className={cx('friendBox-seeAll')}>
                        <span>Xem tất cả ảnh</span>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper-box')}>
                <div className={cx('friend-box')}>
                    <div className={cx('label')}>
                        <span>Bạn bè</span>
                    </div>
                    <div className={cx('friendBox-seeAll')}>
                        <span>Xem tất cả bạn bè</span>
                    </div>
                </div>
                <div className={cx('friend-total')}>
                    <span>2345 người bạn</span>
                </div>
                <div className={cx('friend-person')}>
                    <div className={cx('friend-list')}>
                        <div className={cx('friend-item')}>
                            <div className={cx('friend-img')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('friend-name')}>
                                <span>Lê Hồng</span>
                            </div>
                        </div>
                        <div className={cx('friend-item')}>
                            <div className={cx('friend-img')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('friend-name')}>
                                <span>Lê Hồng</span>
                            </div>
                        </div>
                        <div className={cx('friend-item')}>
                            <div className={cx('friend-img')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('friend-name')}>
                                <span>Lê Hồng</span>
                            </div>
                        </div>
                        <div className={cx('friend-item')}>
                            <div className={cx('friend-img')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('friend-name')}>
                                <span>Lê Hồng</span>
                            </div>
                        </div>
                        <div className={cx('friend-item')}>
                            <div className={cx('friend-img')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('friend-name')}>
                                <span>Lê Hồng</span>
                            </div>
                        </div>
                        <div className={cx('friend-item')}>
                            <div className={cx('friend-img')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('friend-name')}>
                                <span>Lê Hồng</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
     );
}

export default LeftPostUserPage;