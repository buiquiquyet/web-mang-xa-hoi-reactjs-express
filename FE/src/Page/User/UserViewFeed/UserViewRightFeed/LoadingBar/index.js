import classNames from 'classnames/bind';
import styles from './LoadingBar.module.scss';
import { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIsCheckFeed, addLoadingDone, addTotalNewFeedCount } from '../../../../../Reducer/loadingSlice';
import { LoadingIsCheckFeedSlice, LoadingStatusSlice, LoadingTotalNewFeedCountFeedSlice } from '../../../../../redux/selector';
import * as ServiceFeedApi from './../../../../../apiServices/feedAPI'
const cx = classNames.bind(styles);

function LoadingBar({data, item, onComplete, currentProgress , index, total, playPauseVideo, lengthFeed}) {
    const [progress, setProgress] = useState(0);
    const loadingStatusSlice = useSelector(LoadingStatusSlice)
    const loadingIsCheckFeedSlice = useSelector(LoadingIsCheckFeedSlice)
    const loadingTotalNewFeedCountFeedSlice = useSelector(LoadingTotalNewFeedCountFeedSlice)
    const dispatch = useDispatch()
    useEffect(() => {
        setProgress(0)
    }, [item]);
    const updateStatusFeed = async(feedId) => {
        await ServiceFeedApi.updateStatus(feedId)
        
    }
    useEffect(() => {
        if(loadingTotalNewFeedCountFeedSlice === item.totalNewFeed) {
            dispatch(addIsCheckFeed(item.idUser))
            dispatch(addTotalNewFeedCount(0))
        }
    },[loadingTotalNewFeedCountFeedSlice, item, dispatch] )
    useEffect(() => {
       if(index === currentProgress && !playPauseVideo) {
            const interval = setInterval(() => {
                if (progress < 100) {
                    setProgress(progress + 10);
                } else {
                    clearInterval(interval);
                    onComplete();
                    updateStatusFeed(data._id)
                    if(index === total - 1) {
                        if(loadingStatusSlice < lengthFeed - 1) {
                            dispatch(addIsCheckFeed(''))
                            dispatch(addLoadingDone(loadingStatusSlice + 1))
                        }
                    }
                    if(item.totalNewFeed > 0) {
                        dispatch(addTotalNewFeedCount(loadingTotalNewFeedCountFeedSlice + 1))
                    }
                }
            }, 100);
            return () => clearInterval(interval);
       }
    }, [progress, 
        loadingTotalNewFeedCountFeedSlice,
        onComplete, 
        index, 
        currentProgress,
        dispatch, 
        total, 
        loadingStatusSlice,
        playPauseVideo, 
        lengthFeed, 
        item, 
        loadingIsCheckFeedSlice,
        data]);
    return ( 
        <div className={cx('loading-bar')}>
            <div  className={cx('progress', {'active-animation': progress > 0})} style={{ width: `${progress}%`}}></div>
        </div>
     );
}

export default LoadingBar;