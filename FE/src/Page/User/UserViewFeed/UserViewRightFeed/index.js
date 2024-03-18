import { memo, useContext, useEffect, useMemo, useState } from "react";
import { LogoNavMore, LogoNext, LogoPauseVideo, LogoPlayVideo, LogoPrev } from '../../../../Icon';
import classNames from 'classnames/bind';
import styles from './UserViewRightFeed.module.scss';
import { MyContext } from "../../../../App";
import userNoneImg from './../../../../Img/userNone.png'
import LoadingBar from "./LoadingBar";
import { useDispatch, useSelector } from "react-redux";
import { LoadingStatusSlice } from "../../../../redux/selector";
import { addLoadingDone } from "../../../../Reducer/loadingSlice";
import { imgFeedArr } from "../../UserFeed/imgFeed";
import HeadelessTippy from '@tippyjs/react/headless';
import * as ServiceFeedApi from './../../../../apiServices/feedAPI'
const cx = classNames.bind(styles);

function UserViewRightFeed({data, item,onClickCheck, total, lengthFeed}) {
    const [totalFeedByUser, setTotalFeedByUser] = useState(total)
    const {dataUser, ImageUrlPath} = useContext(MyContext)
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
                data={data[i]}
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
    },[item, data, loadingStatusSlice])
    const indexToUse = useMemo(() => {
        return loadingStatusSlice === lengthFeed - 1 && currentProgress === total
            ? 0
            : currentProgress === total
            ? currentProgress - 1
            : currentProgress;

    }, [loadingStatusSlice, lengthFeed, currentProgress, total])
    const checkTextOrImage = useMemo(() => {
        return  data.length > currentProgress 
            ? data[data.length > currentProgress ? currentProgress : currentProgress - 1].type === 'text' 
                ? `url(${imgFeedArr[data[indexToUse ].indexImg]})`
                : `url(${ImageUrlPath+data[indexToUse].image})`
            : data[data.length > currentProgress ? currentProgress : currentProgress - 1].type === 'text' 
                ?  `url(${imgFeedArr[data[currentProgress - 1 ].indexImg]})`
                : `url(${ImageUrlPath+data[currentProgress - 1].image})`
    },[data, currentProgress,indexToUse,ImageUrlPath])
    const handleDeleteFeed = async () => {
        const formData = new FormData()
        formData.append('feedId', data[currentProgress]._id)
        formData.append('url', data[currentProgress].image)
        const rs = await ServiceFeedApi.deleteFeedByUserId(formData)
        if(rs.success) {
            onClickCheck()
            setTotalFeedByUser(prev => prev - 1)
        }
    }
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
                    <div  className={cx('right-content')} 
                        style={{
                            backgroundImage:checkTextOrImage
                            }}
                    >
                        <div className={cx('content-headerBar')}>
                           {renderLoadingBar(totalFeedByUser)}
                        </div>
                        <div className={cx('right-header')}  >
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
                            {
                                dataUser && dataUser._id === item.idUser &&
                                <HeadelessTippy
                                    render={attrs => (
                                        <div className={cx('info-result')} tabIndex="-1" {...attrs} onClick={handleDeleteFeed}>     
                                            <span>Xóa bài đăng</span>
                                        </div>
                                )}
                                    interactive   
                                    placement="bottom"
                                    trigger='click'
                                
                                >
                                    <div className={cx('logo-navMore')}>
                                        <LogoNavMore className={cx('navMore-icon')}/>
                                    </div>
                                </HeadelessTippy>
                            }
                        </div>
                        <div className={cx('right-text')}>
                                { data.length > currentProgress 
                                ?
                                data[indexToUse].content 
                                :
                                data[currentProgress - 1].content 
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

export default memo(UserViewRightFeed);