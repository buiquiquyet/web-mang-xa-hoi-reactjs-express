import HeadelessTippy from '@tippyjs/react/headless';
import { Wrapper } from '../../../../Popper';
import classNames from 'classnames/bind';
import MenuMessager from '../../../../MenuHeader/MenuMessager';
import styles from './HeaderUserMessager.module.scss'
import { setMessLog, zoomOutMessItem } from '../../../../useReducerMessager/actions';
import MessagerChat from './../../../../MessagerChat'
import MessagerChatZoomOut from '../../../../MessagerChatZoomOut';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function HeaderUserMessager({children}) {

    const messagerState = useSelector(state => state.messager)
    const { jobsZoomOut, checkMesLog, jobs } = messagerState

    const dispatch = useDispatch()
    const handleOutsideClick = () => {
        if (checkMesLog) {
            dispatch(setMessLog(false))
        }
    };
    useEffect(() => {
        if(jobs.length > 2) {
            const newArrZoomOut = jobs.slice(0, -2).filter(item => !jobsZoomOut.includes(item))
            dispatch(zoomOutMessItem(newArrZoomOut[0]))
        }
    }, [jobs, jobsZoomOut, dispatch])
    
    return ( 
        <div style={{position:'relative'}}>
            <HeadelessTippy
                render={attrs => (
                    <div className={cx('info-result')} tabIndex="-1" {...attrs}>     
                        {
                            checkMesLog && 
                            <Wrapper>
                                <MenuMessager  data={''}/>
                            </Wrapper>  
                        }
                    </div>
            )}
                interactive   
                placement="top"
                trigger='click'
                onClickOutside={handleOutsideClick}
                visible={checkMesLog} 
            >
            {children}
            </HeadelessTippy>
            {
                jobs.slice(-2).map((item, index) => (
                    <MessagerChat 
                        key={index} 
                        id={item} 
                        style={index > 0 ? { right: `420px` } : null}
                    />
                ))
            } 
            {
                jobsZoomOut.map((item, index) => (
                    <MessagerChatZoomOut
                        key={index}
                        id={item}
                        style={index > 0 ? {top: `${650 - (index * 60)}px`} : null}
                    />
                ))
            }
        </div>
     );
}

export default memo(HeaderUserMessager);