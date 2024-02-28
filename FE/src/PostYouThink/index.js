import classNames from 'classnames/bind';
import styles from './PostYouThink.module.scss';
import testImg from './../Img/test3.jpg'
import liveImg from './../Img/liveStream.png'
import imageImg from './../Img/imageImg.png'
import flagImg from './../Img/flag.png'
import { memo } from 'react';
const cx = classNames.bind(styles);


function PostYouThink({onClickShowHideModal}) {
    return ( 
        <div className={cx('postDiv')}>
                <div className={cx('header-post')}>
                    <div className={cx('headerPost-img')}>
                        <img src={testImg} alt='img'/>
                    </div>
                    <div className={cx('headerPost-text')} onClick={onClickShowHideModal}>
                        <span>Bạn đang nghĩ gì?</span>
                    </div>
                </div>
                <div className={cx('header-postImg')}>
                   
                    <div className={cx('postImg-div')}>
                        <div className={cx('postImg-img')}>
                            <img src={liveImg} alt='img'/>
                        </div>
                        <div className={cx('postImg-text')}>
                            <span>Video trực tiếp</span>
                        </div>
                    </div>
                    <div className={cx('postImg-div')} onClick={onClickShowHideModal}>
                        <div className={cx('postImg-img')}>
                            <img src={imageImg} alt='img'/>
                        </div>
                        <div className={cx('postImg-text')} >
                            <span>Ảnh/Video</span>
                        </div>
                    </div>
                    <div style={{flex: 1}} className={cx('postImg-div')}>
                        <div className={cx('postImg-img')}>
                            <img src={flagImg} alt='img'/>
                        </div>
                        <div className={cx('postImg-text')}>
                            <span>Sự kiện trong đời</span>
                        </div>
                    </div>
                    
                </div>
            </div>
     );
}

export default memo(PostYouThink);