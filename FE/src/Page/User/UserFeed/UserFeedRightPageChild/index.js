import classNames from 'classnames/bind';
import styles from './UserFeedRightPageChild.module.scss';
import { useSelector } from 'react-redux';
import { FeedSlice } from '../../../../redux/selector';
import { imgFeedArr } from '../imgFeed';
const cx = classNames.bind(styles);
function UserFeedRightPageChild() {

    const feedRedux = useSelector(FeedSlice)
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('lable')}>
                    Xem trước
                </div>
                <div className={cx('content-edit')}>
                    <div 
                        className={cx('content-text')} 
                        style={{backgroundImage: `url(${imgFeedArr[feedRedux.indexImg]})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        objectFit: 'fill'
                       }}
                    >
                        <span className={cx({'activeText' : feedRedux.text.length > 0})}>
                           { feedRedux.text.length > 0 
                                ? feedRedux.text
                                : 'Bắt đầu nhập'  }
                        </span>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default UserFeedRightPageChild;