import { useDispatch, useSelector } from 'react-redux'
import testImg from './../../../../../Img/test.jpg'
import testImg1 from './../../../../../Img/test1.jpg'
import testImg2 from './../../../../../Img/test2.jpg'
import testImg3 from './../../../../../Img/test3.jpg'
import { setMessItem, zoomOutHideToMessItem } from '../../../../../useReducerMessager/actions'
import styles from './SideBarRightPersonContact.module.scss'
import classNames from 'classnames/bind';
import MessagerChat from '../../../../../MessagerChat'
const cx = classNames.bind(styles)

function SideBarRightPersonContact() {
    const messagerState = useSelector(state => state.messager)
    const { jobsZoomOut, jobs } = messagerState
    
    const dispatch = useDispatch();
    const handleShowMessLogorShowMess = (item) => {
       
        dispatch(setMessItem(item))
        if(jobsZoomOut.length > 0) {
            dispatch(zoomOutHideToMessItem(item))
        }
    }
    return ( 
        <>
            <div  style={{paddingBottom:'10px'}} className={cx('siderbar-rightBirthDay')}>
                <div style={{ padding: '2px 8px 6px' }}className={cx('lable-add')}>Người liên hệ</div>
                
                <div className={cx('rightPersonConnect')} onClick={() => handleShowMessLogorShowMess(5)}>
                    <img src={testImg} alt='img' />
                    <span>Vu Quang Dat</span>
                </div>
                <div className={cx('rightPersonConnect')}  onClick={() => handleShowMessLogorShowMess(6)}>
                    <img src={testImg1} alt='img' />
                    <span>Bui Duy</span>
                </div>
            
                <div className={cx('rightPersonConnect')} onClick={() => handleShowMessLogorShowMess(7)}>
                    <img src={testImg2} alt='img' />
                    <span>Thanh Cong</span>
                </div>
            
                <div className={cx('rightPersonConnect')} onClick={() => handleShowMessLogorShowMess(8)}>
                    <img src={testImg3} alt='img' />
                    <span>Tran Minh Hieu</span>
                </div>
            
            </div>
            <div to={''} style={{marginBottom:'45px'}}className={cx('siderbar-rightBirthDay')}>
                <div style={{ padding: '2px 8px 6px' }}className={cx('lable-add')}>Cuộc trò chuyện nhóm</div>
                <div  >
                    <div className={cx('rightPersonConnect')}>
                        <img src={testImg1} alt='img' />
                        <span>Động muối tồn kho</span>
                    </div>
                </div>
                <div  >
                    <div className={cx('rightPersonConnect')}>
                        <img src={testImg2} alt='img' />
                        <span>Người nghẹo</span>
                    </div>
                </div>
                <div  >
                    <div className={cx('rightPersonConnect')}>
                        <img src={testImg3} alt='img' />
                        <span>FC Gia Lộc</span>
                    </div>
                </div>
                <div  >
                    <div className={cx('rightPersonConnect')}>
                        <img src={testImg} alt='img' />
                        <span>FC Hải Dương</span>
                    </div>
                </div>
                
            </div>
            {
                jobs.slice(-2).map((item, index) => (
                    <MessagerChat 
                        key={index} 
                        id={item} 
                        style={index > 0 ? { right: `420px` } : null }
                    />
                ))
            } 
        </>
     );
}

export default SideBarRightPersonContact;