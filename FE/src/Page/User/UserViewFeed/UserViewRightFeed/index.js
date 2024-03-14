import { useContext, useEffect, useState } from "react";
import { LogoNext, LogoPauseVideo, LogoPlayVideo, LogoPrev } from '../../../../Icon';
import classNames from 'classnames/bind';
import styles from './UserViewRightFeed.module.scss';
import { MyContext } from "../../../../App";
import userNoneImg from './../../../../Img/userNone.png'
import LoadingBar from "./LoadingBar";
import { useDispatch, useSelector } from "react-redux";
import { LoadingStatusSlice } from "../../../../redux/selector";
import { addLoadingDone } from "../../../../Reducer/loadingSlice";

const cx = classNames.bind(styles);

function UserViewRightFeed({item, total, lengthFeed}) {
    const {ImageUrlPath} = useContext(MyContext)
    const [currentProgress, setCurrentProgress] = useState(0);
    const [playPauseVideo, setPlayPauseVideo] = useState(false);
    const dispatch = useDispatch()
    const loadingStatusSlice = useSelector(LoadingStatusSlice)

    const handlePreNextFeed = (type) => {
        if(type === 'prev') {
            dispatch(addLoadingDone(loadingStatusSlice - 1))
            return
        }
        dispatch(addLoadingDone(loadingStatusSlice + 1))

    }
    const renderLoadingBar = (total) => {
        const bars = [];
        for (let i = 0; i < total; i++) {
            bars.push(
            <LoadingBar 
                key={i} 
                index= {i}
                lengthFeed={lengthFeed}
                total={total}
                playPauseVideo={playPauseVideo}
                currentProgress={currentProgress}
                item={item}
                onComplete={() => handleComplete(i)}
                />
            );
        }
        return <>{bars}</>;
    }
    const handleComplete = (index) => {
        setCurrentProgress(index + 1);
    };
    const handlePlayPauseVideo = () => {
        setPlayPauseVideo(!playPauseVideo)
    }
    useEffect(() => {
        setCurrentProgress(0);
        setPlayPauseVideo(false)
    },[item])
    console.log(loadingStatusSlice);
    console.log('length',lengthFeed);
    return ( <div className={cx('friend-right')}>
                <div className={cx('right-nav')}>
                    <div className={cx('prev')} 
                        onClick={() => loadingStatusSlice > 0 ? handlePreNextFeed('prev') : undefined}
                    >
                        {
                            loadingStatusSlice > 0 &&
                            <div className={cx('prev-div')} >
                                <LogoPrev className={cx('logo')}/>
                            </div>
                        }
                    </div>
                    <div  className={cx('right-content')}>
                        <div className={cx('content-headerBar')}>
                           {renderLoadingBar(total)}
                        </div>
                        <div className={cx('right-header')}>
                            <div className={cx('right-person')}>
                                <img src={item.image
                                    ? ImageUrlPath+item.image
                                    : userNoneImg} alt='img'/>
                                <span>{item && item.name}</span> 
                            </div>
                            {
                                playPauseVideo  
                                ?
                                <div className={cx('right-logoVideo')} onClick={handlePlayPauseVideo}>
                                    <LogoPlayVideo className={cx('logoVideo')}/>
                                </div>
                                :
                                <div className={cx('right-logoVideo')} onClick={handlePlayPauseVideo}>
                                    <LogoPauseVideo className={cx('logoVideo')}/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={cx('next')}  
                        onClick={() => loadingStatusSlice < lengthFeed - 1 ? handlePreNextFeed('next') : undefined}
                    >
                    {
                        loadingStatusSlice < lengthFeed - 1
                        &&
                        <div className={cx('prev-div')}>
                            <LogoNext  className={cx('logo')}/>
                        </div>
                    }
                    </div>
                </div>
            </div> 
        );
}

export default UserViewRightFeed;