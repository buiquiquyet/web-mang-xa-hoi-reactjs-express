import classNames from 'classnames/bind';
import styles from './LoadingBar.module.scss';
import { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLoadingDone } from '../../../../../Reducer/loadingSlice';
import { LoadingStatusSlice } from '../../../../../redux/selector';
const cx = classNames.bind(styles);


function LoadingBar({item, onComplete, currentProgress , index, total, playPauseVideo, lengthFeed}) {
    const [progress, setProgress] = useState(0);
    const loadingStatusSlice = useSelector(LoadingStatusSlice)
    const dispatch = useDispatch()
    useEffect(() => {
        setProgress(0)
    }, [item]);
    useEffect(() => {
       if(index === currentProgress && !playPauseVideo) {
            const interval = setInterval(() => {
                if (progress < 100) {
                    setProgress(progress + 2);
                } else {
                    clearInterval(interval);
                    onComplete();
                    if(index === total - 1) {
                        if(loadingStatusSlice < lengthFeed - 1) {
                            dispatch(addLoadingDone(loadingStatusSlice + 1))
                        }
                    }
                }
            }, 100);

            return () => clearInterval(interval);
       }
    }, [progress, onComplete, index, currentProgress, dispatch, total, loadingStatusSlice,playPauseVideo, lengthFeed]);
  
    return ( 
        <div className={cx('loading-bar')}>
            <div  className={cx('progress', {'active-animation': progress > 0})} style={{ width: `${progress}%`}}></div>
        </div>
     );
}

export default LoadingBar;