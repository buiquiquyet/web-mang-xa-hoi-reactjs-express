import classNames from 'classnames/bind';
import styles from './UserFeedRightPageChild.module.scss';
import { useSelector } from 'react-redux';
import { FeedSlice } from '../../../../redux/selector';
import { imgFeedArr } from '../imgFeed';
import { memo, useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function UserFeedRightPageChild({type}) {

    const feedRedux = useSelector(FeedSlice)
    const [imageBackground, setImageBackground] = useState(null)
    useEffect(() => {
        if(type !== 'text' && type) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageBackground(reader.result);
            };
            reader.readAsDataURL(type);
        }
    }, [type])
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('lable')}>
                    Xem trước
                </div>
               
                <div className={cx('content-edit')}>
                    <div 
                        className={cx('content-text')} 
                        style={{backgroundImage: type === 'text' ? `url(${imgFeedArr[feedRedux.indexImg]})` : imageBackground && `url(${imageBackground})`,
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

export default memo(UserFeedRightPageChild);