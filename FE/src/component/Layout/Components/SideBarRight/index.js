
import styles from './SideBarRight.module.scss'
import classNames from 'classnames/bind';
import userNoneImg from './../../../../Img/userNone.png'
import { Link } from 'react-router-dom';
import SideBarRightPersonContact from './SideBarRightPersonContact';
import { useContext, useEffect, useState } from 'react';
import * as ServiceFriendApi from './../../../../apiServices/friendAPI'
import * as ServiceUserApi from './../../../../apiServices/userAPI'
import * as ServicePostApi from './../../../../apiServices/postAPI'
import { MyContext } from '../../../../App';
import { message } from 'antd';
const cx = classNames.bind(styles)
function SideBarRight({newMesseger, checkUserOnline}) {
    
    const {dataUser, ImageUrlPath} = useContext(MyContext)
    const [newLessUserAddFriend, setNewLessUserAddFriend] = useState(null)

    const fecthProfileByUserId = async (userId) => {
        const rs = await ServiceUserApi.getProfileByUserId(userId)
        if(rs.success) {
            setNewLessUserAddFriend(prev => {
               return {
                ...prev,
                data: rs.data
               }
            })
        }
    }
    const fecthImageAvartar = async (userId) => {
        const imageAvartar = await ServicePostApi.showPostByUserAvartarCover({typePost: 'avartar', userId})
        if(imageAvartar.success) {
            if(imageAvartar.result.image.length > 0) {
                setNewLessUserAddFriend(prev => {
                    return {
                        ...prev,
                        image: imageAvartar.result.image[0]
                    }
                })
            }
        }
    }
    //handle Cance add friend 
    const handleCancelAddFriend = async (userId1, userId2) => {
        const rs = await ServiceFriendApi.cancelAddFriend({userId1, userId2})
        if(rs.success) {
            message.success(rs.success)
            fecthNewLessUserAddFriend(dataUser._id)
        }
    }
    //handle Accepted add friend 
    const handleAcceptedAddFriend = async (userId1, userId2) => {
        const rs = await ServiceFriendApi.updateAcceptedFriend({userId1, userId2})
        if(rs.success) {
            message.success(rs.success)
            fecthNewLessUserAddFriend(dataUser._id)
            
        }
    }
    const fecthNewLessUserAddFriend = async (userId) => {
        const rs = await ServiceFriendApi.getNewLessAdd(userId)
        if(rs.success) {
            fecthImageAvartar(rs.data.sender_id)
            fecthProfileByUserId(rs.data.sender_id)
            return 
        }
        setNewLessUserAddFriend(null)
    }
    useEffect(() => {
        if(dataUser) {
            fecthNewLessUserAddFriend(dataUser._id)
        }
    }, [dataUser])
    return ( 
        <div className={cx('wrapper')}>
            {
                newLessUserAddFriend &&
                <div  className={cx('siderbar-rightHeader')}>
                    <div className={cx('addFriend-content')}>
                            <span className={cx('lable-add')}>Lời mời kết bạn</span>
                            <Link to={`/friendPage`} className={cx('lableall-add')}>Xem tất cả</Link>
                    </div>
                    <div  className={cx('addFriend-info')}>
                        <Link  to={newLessUserAddFriend && 
                                newLessUserAddFriend.data && 
                                `/userPost/${newLessUserAddFriend.data._id}`}
                                className={cx('add-imgMain')}>
                            <img  src={newLessUserAddFriend && newLessUserAddFriend.image && Object.keys(newLessUserAddFriend.image).length > 0 
                                ? ImageUrlPath+ newLessUserAddFriend.image.url
                                : userNoneImg}  alt='img'/>
                        </Link>
                        <div className={cx('add-info')}>
                            <div className={cx('info-person')}>
                                <div className={cx('infoName-comomFriend')}>
                                    <div className={cx('infoName')}>
                                        {newLessUserAddFriend && newLessUserAddFriend.data && Object.keys(newLessUserAddFriend.data).length > 0 &&
                                        newLessUserAddFriend.data.first_name + ' ' + newLessUserAddFriend.data.last_name }
                                    </div>
                                    {/* <div className={cx('commonFriend')}>
                                        <img src={userNoneImg}  alt='img'/>
                                        <span>1 bạn chung</span>
                                    </div> */}
                                </div>
                                {/* <div className={cx('info-time')}>
                                    <span>5 ngày</span>
                                </div> */}
                            </div>
                            <div className={cx('button-submitAdd')}>
                                
                                <button onClick={() => handleAcceptedAddFriend(dataUser._id, newLessUserAddFriend.data._id)}>Xác nhận</button>
                            
                                <button onClick={() => handleCancelAddFriend(dataUser._id, newLessUserAddFriend.data._id)} style={{backgroundColor:'#DADDE1', color:'black'}}>Xóa</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <div  className={cx('siderbar-rightBirthDay')}>
                <Link to={'/'}>
                    <span style={{ padding: '6px 8px' }}className={cx('lable-add')}>Sinh nhật</span>
                    <div className={cx('rightBirthDayChil')}>
                        <div className={cx('giftbox')}></div>
                        <span>Hôm nay sinh nhật của <b>Bùi Lan Anh</b> và <b>6 người khác</b></span>
                    </div>
                </Link>
            </div> */}
            <SideBarRightPersonContact newMesseger={newMesseger} checkUserOnline={checkUserOnline}/>
            
        </div>
     );
}

export default SideBarRight;