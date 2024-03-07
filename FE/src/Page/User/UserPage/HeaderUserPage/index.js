import classNames from "classnames/bind";
import styles from './HeaderUserPage.module.scss'
import HeadelessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import plusImg from './../../../../Img/plus.png'
import editImg from './../../../../Img/edit.png'
import friendImg from './../../../../Img/friend.png'
import messImg from './../../../../Img/mess.png'
import addFriend from './../../../../Img/addFriend.png'
import unFriend from './../../../../Img/unFriend.png'
import userNoneImg from './../../../../Img/userNone.png'
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../../App";
import PostBoxFb from "../../../../PostBoxFb";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../../useReducerUpdateImageUser/actions";
import * as ServicePostApi from './../../../../apiServices/postAPI'
import * as ServiceUserApi from './../../../../apiServices/userAPI'
import * as ServiceFriendApi from './../../../../apiServices/friendAPI'
import ImageGalleryImg from "../../../../ImageGalleryImg";
import { setMessItem, zoomOutHideToMessItem } from '../../../../useReducerMessager/actions'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function HeaderUserPage({userId}) {
    
    
    const {dataUser, ImageUrlPath} = useContext(MyContext)

    const imageUploadState = useSelector(state => state.imageUpload)
    const { checkStatusUploadImage } = imageUploadState

    const messagerState = useSelector(state => state.messager)
    const { jobsZoomOut } = messagerState
    
    const handleShowMessLogorShowMess = (item) => {
       
        dispatch(setMessItem(item))
        if(jobsZoomOut.length > 0) {
            dispatch(zoomOutHideToMessItem(item))
        }
    }
    const dispatch = useDispatch()

    //friend
    const [statusFriend, setStatusFriend] = useState(false)
    const [totalFriend, setTotalFriend] = useState()

    const [isCheckModal, setIsCheckModal] = useState(false)
    const [typePost, setTypePost] = useState('')
    const [imageCover, setImageCover] = useState({})
    const [imageAvartar, setImageAvartar] = useState({})

    const [imageSlide, setImageSlide] = useState([])
    const [isOpenSlide, setIsOpenSlide] = useState(false);

    const [fullNameUser, setFullNameUser] = useState(null)
    const handleCloseSlide = () => {
        setIsOpenSlide(false);
       
    };
    const handleShowImageSlide = (image) => {
        setImageSlide([
            {
                original: `http://localhost:3001/uploads/${image.url}`,
                thumbnail: `http://localhost:3001/uploads/${image.url}`,
            }
        ])
        setIsOpenSlide(true)
    }

    const handleShowHideModal = (typePost) => {
        setIsCheckModal(!isCheckModal)
        setTypePost(typePost)
    }
    const handleCheckToFecth = () => {
        dispatch(setStatus(!checkStatusUploadImage))
    }
    //add friend
    const handleAddFriend = async (userId1, userId2) => {
        const rs = await ServiceFriendApi.createFriend({userId1, userId2})
        if(rs.success) {
            setStatusFriend(rs.data)
        }
    }
    //handle Cance add friend 
    const handleCancelAddFriend = async (userId1, userId2) => {
        const rs = await ServiceFriendApi.cancelAddFriend({userId1, userId2})
        if(rs.success) {
            setStatusFriend(false)
        }
    }
    //handle Acceoted add friend 
    const handleAcceptedAddFriend = async (userId1, userId2) => {
        const rs = await ServiceFriendApi.updateAcceptedFriend({userId1, userId2})
        if(rs.success) {
            setStatusFriend(rs.data)
        }
    }
    const fecthStatusFriend = async (userId1, userId2) => {
        const rs = await ServiceFriendApi.getStatusFriend({userId1, userId2})
        if(rs.success) {
            setStatusFriend(rs.data)
        }
    }
    const fecthGetTotalFriend = async (userId) => {
        const rs = await ServiceFriendApi.getTotalFriend(userId)
        if(rs.success) {
            setTotalFriend(rs.data)
        }
    }
    const renderStatusFriend = (statusFriend, dataUser, userId) => {
        if(statusFriend) {
            if(statusFriend.status === 'pending') {
                return    dataUser._id === statusFriend.receiver_id 
                            ?
                            ( <div className={cx('option-editSefl')} onClick={() => handleAcceptedAddFriend(dataUser._id, userId)}>
                                    <img src={friendImg} alt="img"/>
                                    <span>Xác nhận kết bạn </span>
                                </div>)
                            :
                            (<div className={cx('option-editSefl')} onClick={() => handleCancelAddFriend(dataUser._id, userId)}>
                                    <img src={unFriend} alt="img"/>
                                    <span>Hủy lời mời </span>
                                </div>   )
            }
            return <HeadelessTippy
                            render={attrs => (
                                <div className={cx('unFriend')} tabIndex="-1" {...attrs}>
                                    <div className={cx('unFriend-item')} onClick={() => handleCancelAddFriend(dataUser._id, userId)}>
                                        <div className={cx('unFriend-icon')}></div>
                                        <span>Hủy kết bạn</span>
                                    </div>
                                </div>
                        )}
                        interactive   
                        trigger='click'
                        placement="top"
                        arrow={true}
                    >
                    <div className={cx('option-editSefl')}>
                        <img src={friendImg} alt="img"/>
                        <span>Bạn bè</span>
                    </div>
                </HeadelessTippy>
        }
           
        return   <div className={cx('option-editSefl')} onClick={() => handleAddFriend(dataUser._id, userId)}>
                    <img src={addFriend} alt="img"/>
                    <span>Thêm bạn bè</span>
                </div>
    }
    useEffect(() => {
        if(userId) {
            const fecthImageAvartarCover = async (userId) => {
                const imageAvartar = await ServicePostApi.showPostByUserAvartarCover( {typePost: 'avartar', userId: userId})
                const imageCover = await ServicePostApi.showPostByUserAvartarCover( {typePost: 'cover', userId: userId})
                console.log(userId);
                console.log(imageAvartar);
                console.log(1,imageCover);
                if(imageCover.success) {
                    if(imageCover.result.image.length > 0) {
                        setImageCover(imageCover.result.image[0])
                    }
                }else {
                    setImageCover({})
                }
                if(imageAvartar.success) {
                    if(imageAvartar.result.image.length > 0) {
                        setImageAvartar(imageAvartar.result.image[0])
                    }
                }else {
                    setImageAvartar({})
                }
            }
            const fecthNameUser = async (userId) => {
                const rs = await ServiceUserApi.getNameUser(userId)
                if(rs.success) {
                    setFullNameUser({
                        firstName: rs.data.first_name,
                        lastName: rs.data.last_name,
                    })
                }
            }
            fecthImageAvartarCover(userId)
            fecthNameUser(userId)
            fecthGetTotalFriend(userId)
        }
    },[userId])
   
    useEffect(() => {
        if(dataUser && dataUser._id !== userId) {
            fecthStatusFriend(dataUser._id, userId)
        }
    }, [dataUser, userId])
    return ( 
        <>
            {
                dataUser && 
                <div className={cx('header')}>
                    
                            <div className={cx('header-coverImg')}>
                                <div className={cx('coverImg')} >
                                    {
                                        Object.keys(imageCover).length > 0 
                                        ?
                                        <img   src={ImageUrlPath+imageCover.url} alt="img" onClick={() => handleShowImageSlide(imageCover)}/>
                                        :
                                        <div  className={cx('none-coverImg')}></div>
                                    }
                                    {
                                        dataUser && dataUser._id === userId &&
                                        <div className={cx('header-addCoverImg')} onClick={() => handleShowHideModal('cover')}>
                                            <div className={cx('addCoverImg')}>
                                                <div className={cx('cameraIcon')}></div>
                                                {
                                                    Object.keys(imageCover).length > 0
                                                    ?
                                                    <span>Chỉnh sửa ảnh bìa</span>
                                                    :
                                                    <span>Thêm ảnh bìa</span>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                    <div className={cx('header-avatar')}>
                            <div  className={cx('avatar-person')}>
                                <div className={cx('avatar-div')}>
                                    <div className={cx('avatar-img')}>
                                        <img  
                                            src={Object.keys(imageAvartar).length > 0 
                                            ? ImageUrlPath+imageAvartar.url
                                            : userNoneImg} 
                                            alt="img"
                                            onClick={() => {
                                                if (Object.keys(imageAvartar).length > 0) {
                                                    handleShowImageSlide(imageAvartar);
                                                }
                                            }}
                                            />
                                    </div>
                                    {
                                        dataUser && dataUser._id === userId &&
                                        <div className={cx('avatarIcon')} onClick={() => handleShowHideModal('avartar')}>
                                            <div className={cx('cameraIcon')}></div>
                                        </div>
                                    }
                                </div>
                                <div className={cx('avatar-info')}>
                                    <div className={cx('avatar-name')}>
                                        {fullNameUser && fullNameUser.firstName + ' ' +  fullNameUser.lastName}                               
                                    </div>
                                    <span className={cx('avatar-friend')}> {totalFriend && totalFriend } bạn bè</span>
                                </div>
                            </div>
                            
                        <div className={cx('avatar-option')}>
                            <div className={cx('option-addEdit')}>
                            {
                                dataUser && dataUser._id === userId ?
                                    <>
                                        <div className={cx('option-addFeed')}>
                                            <img src={plusImg} alt="img"/>
                                            <span>Thêm vào tin</span>
                                        </div>
                                        <Link to={`/userIntroduce/${dataUser._id}`} className={cx('option-editSefl')}>
                                            <img src={editImg} alt="img"/>
                                            <span>
                                                Chỉnh sửa trang cá nhân
                                            </span>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        {
                                            renderStatusFriend(statusFriend, dataUser, userId)
                                        }
                                        <div className={cx('option-addFeed')} onClick={() => handleShowMessLogorShowMess(userId)}>
                                            <img src={messImg} alt="img"/>
                                            <span>
                                                Nhắn tin
                                            </span>
                                        </div>
                                    </>
                            }
                            </div>
                        </div>
                    </div>
                    {
                        isCheckModal && 
                        <PostBoxFb
                            typePost={typePost}
                            onClickCheckToFecth={handleCheckToFecth}
                            onClickShowHideModal={handleShowHideModal}/>
                    }
                    {
                        isOpenSlide && Object.keys(imageSlide).length > 0 &&
                        <ImageGalleryImg 
                            handleCloseSlide={handleCloseSlide}
                            imageSlide={imageSlide}
                            currentIndex={0}
                            isOpenSlide={isOpenSlide}/>
                    }
                    
                </div>
            }
        </>
     );
}

export default HeaderUserPage;