import classNames from 'classnames/bind';
import styles from './UserFeedRightPageChild.module.scss';
import { useSelector } from 'react-redux';
import { FeedSlice } from '../../../../redux/selector';

const cx = classNames.bind(styles);
function UserFeedRightPageChild() {

    const feedRedux = useSelector(FeedSlice)
    console.log(feedRedux);
   
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('lable')}>
                    Xem trước
                </div>
                <div className={cx('content-edit')}>
                    <div className={cx('content-text')}>
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