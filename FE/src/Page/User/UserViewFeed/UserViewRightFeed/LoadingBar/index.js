import classNames from 'classnames/bind';
import styles from './LoadingBar.module.scss';
import { useContext, useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIsCheckFeed, addLoadingDone } from '../../../../../Reducer/loadingSlice';
import {  LoadingStatusSlice, LoadingTotalNewFeedCountFeedSlice } from '../../../../../redux/selector';
import { MyContext } from '../../../../../App';
const cx = classNames.bind(styles);

function LoadingBar({data, item, onComplete, currentProgress , index, total, playPauseVideo, lengthFeed}) {
    const { dataUser } = useContext(MyContext)
    const [progress, setProgress] = useState(0);
    const loadingStatusSlice = useSelector(LoadingStatusSlice)
    const loadingTotalNewFeedCountFeedSlice = useSelector(LoadingTotalNewFeedCountFeedSlice)
    const dispatch = useDispatch()
    useEffect(() => {
        setProgress(0)
    }, [item, total]);
   
    useEffect(() => {
       if(index === currentProgress && !playPauseVideo) {
            const interval = setInterval(() => {
                if (progress < 100) {
                    setProgress(progress + 2);
                } else {
                    clearInterval(interval);
                    onComplete();
                    if(index === total - 1) {
                        dispatch(addIsCheckFeed(item.idUser))
                        if(loadingStatusSlice < lengthFeed - 1) {
                            dispatch(addLoadingDone(loadingStatusSlice + 1))
                        }
                    }
                }
            }, 100);
            return () => clearInterval(interval);
       }
    }, [progress, 
        dataUser,
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
        data]);
    return ( 
        <div className={cx('loading-bar')}>
            <div  className={cx('progress', {'active-animation': progress > 0})} style={{ width: `${progress}%`}}></div>
        </div>
     );
}

export default LoadingBar;