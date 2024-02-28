import classNames from "classnames/bind";
import styles from './MessagerChatZoomOut.module.scss'
import { LogoClose } from "../Icon";
import imgTest from './../Img/test3.jpg'
import { setMessItem, zoomOutHideToMessItem } from "../useReducerMessager/actions";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles)

function MessagerChatZoomOut({style, id}) {
    const dispatch = useDispatch()
    const handleCloseZoomOutHide = (id) => {
        dispatch(zoomOutHideToMessItem(id))
        dispatch(setMessItem(id))
    }
    const handleCloseZoomOut = (id) => {
        dispatch(zoomOutHideToMessItem(id))
    }
    return ( 
        <div style={style} className={cx('messager-zoomOut')}>
                <div className={cx('zoomOut-icon')} onClick={() => handleCloseZoomOut(id)} >
                        <LogoClose className={cx('icon')}/>
                </div>
                <div className={cx('zoomOut-img')} onClick={() => handleCloseZoomOutHide(id)}>
                    
                    <img src={imgTest} alt='img'/>
                </div>
        </div>
     );

}

export default MessagerChatZoomOut;