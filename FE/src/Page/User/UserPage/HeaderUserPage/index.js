import classNames from "classnames/bind";
import styles from './HeaderUserPage.module.scss'

import plusImg from './../../../../Img/plus.png'
import editImg from './../../../../Img/edit.png'
import userNoneImg from './../../../../Img/userNone.png'
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../../App";
import PostBoxFb from "../../../../PostBoxFb";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../../useReducerUpdateImageUser/actions";
import * as ServicePostApi from './../../../../apiServices/postAPI'
import ImageGalleryImg from "../../../../ImageGalleryImg";
const cx = classNames.bind(styles)

function HeaderUserPage() {
    const {dataUser, ImageUrlPath} = useContext(MyContext)

    const imageUploadState = useSelector(state => state.imageUpload)
    const { checkStatusUploadImage } = imageUploadState
    const dispatch = useDispatch()

    const [isCheckModal, setIsCheckModal] = useState(false)
    const [typePost, setTypePost] = useState('')
    const [imageCover, setImageCover] = useState({})
    const [imageAvartar, setImageAvartar] = useState({})

    const [imageSlide, setImageSlide] = useState([])
    const [isOpenSlide, setIsOpenSlide] = useState(false);
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
    useEffect(() => {
        const fecthImageAvartarCover = async (userId) => {
            const imageAvartar = await ServicePostApi.showPostByUserAvartarCover(userId, {typePost: 'avartar'})
            const imageCover = await ServicePostApi.showPostByUserAvartarCover(userId, {typePost: 'cover'})
        
            if(imageCover.success) {
                if(imageCover.result.image.length > 0) {
                    setImageCover(imageCover.result.image[0])
                }
            }
            if(imageAvartar.success) {
                if(imageAvartar.result.image.length > 0) {
                    setImageAvartar(imageAvartar.result.image[0])
                }
            }
        }
        fecthImageAvartarCover(localStorage.getItem('tokenFb'))
    },[])
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
                                    <div className={cx('avatarIcon')} onClick={() => handleShowHideModal('avartar')}>
                                        <div className={cx('cameraIcon')}></div>
                                    </div>
                                </div>
                                <div className={cx('avatar-info')}>
                                    <div className={cx('avatar-name')}>
                                        {dataUser.first_name + ' ' +  dataUser.last_name}                               
                                    </div>
                                    <span className={cx('avatar-friend')}>2355 bạn bè</span>
                                </div>
                            </div>
                            
                        <div className={cx('avatar-option')}>
                            <div className={cx('option-addEdit')}>
                                <div className={cx('option-addFeed')}>
                                    <img src={plusImg} alt="img"/>
                                    <span>Thêm vào tin</span>
                                </div>
                                <div className={cx('option-editSefl')}>
                                    <img src={editImg} alt="img"/>
                                    <span>
                                        Chỉnh sửa trang cá nhân
                                    </span>
                                </div>
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