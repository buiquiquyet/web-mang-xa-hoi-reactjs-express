import classNames from "classnames/bind";
import styles from './MenuMessager.module.scss'
import testImg from './../../Img/test3.jpg'
import testImg1 from './../../Img/test2.jpg'
import testImg2 from './../../Img/test1.jpg'
import { LogoSearch } from "../../Icon";
import { setMessLog, setMessItem, zoomOutHideToMessItem } from "../../useReducerMessager/actions";
import { useDispatch, useSelector } from "react-redux";
const cx = classNames.bind(styles)

function MenuMessager() {
    const messagerState = useSelector(state => state.messager)
    const { jobsZoomOut } = messagerState
    const dispatch = useDispatch()
    const handleShowMessLogorShowMess = (item) => {
        dispatch(setMessLog(false))
        // dispatch(setMess(true))
        dispatch(setMessItem(item))
        if(jobsZoomOut.length > 0) {
            dispatch(zoomOutHideToMessItem(item))
        }
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('messager-lable')}>Đoạn chat</div>
            <div className={cx('messager-search')}>
                <LogoSearch classsName={cx('iconSearch')}/>
                <input placeholder="Tìm kiếm trên Messager"/>
            </div>
            <div className={cx('messager-content')}>
                <div  className={cx('messager-item')} onClick={() => handleShowMessLogorShowMess(1)} >
                    
                        <img src={testImg} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}>Nguyễn Văn Thêm</span>
                        <div>
                            <span >oke bạn</span> <span>5 giờ</span>
                        </div>
                    </div>
                </div>
                <div  className={cx('messager-item')} onClick={() => handleShowMessLogorShowMess(2)} >
                    
                        <img src={testImg1} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}>Bùi Qúi Nhật</span>
                        <div>
                            <span >Bạn: oke bạn</span> <span>5 giờ</span>
                        </div>
                    </div>
                </div>
                <div  className={cx('messager-item')} onClick={() => handleShowMessLogorShowMess(3)} >
                    
                        <img src={testImg2} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}>Bùi Qúi Quyết</span>
                        <div>
                            <span >oke bạn</span> <span>5 giờ</span>
                        </div>
                    </div>
                </div>
                <div  className={cx('messager-item')} onClick={() => handleShowMessLogorShowMess(4)}>
                    
                        <img src={testImg} alt="img"/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}>Trần Văn Đãng</span>
                        <div>
                            <span >oke bạn</span> <span>5 giờ</span>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
     );
}

export default MenuMessager;