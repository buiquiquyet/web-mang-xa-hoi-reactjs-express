import classNames from 'classnames/bind';
import styles from './PostYouThink.module.scss';
import userNoneImg from './../Img/userNone.png'
import liveImg from './../Img/liveStream.png'
import imageImg from './../Img/imageImg.png'
import flagImg from './../Img/flag.png'
import { memo } from 'react';
const cx = classNames.bind(styles);


function PostYouThink({ImageUrlPath, onClickShowHideModal, imageAvartar}) {
    return ( 
        <div className={cx('postDiv')}>
                <div className={cx('header-post')}>
                    <div className={cx('headerPost-img')}>
                        <img  src={Object.keys(imageAvartar).length > 0 
                            ? ImageUrlPath+imageAvartar.url
                            : userNoneImg}  
                            alt='img'
                        />
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