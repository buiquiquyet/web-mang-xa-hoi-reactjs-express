import testImg from './../../../Img/test3.jpg'
import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import PostItemComment from './PostItemComment';
import {  LogoNavMore } from '../../../Icon';
import { memo, useContext, useEffect, useState } from 'react';
import moment from 'moment';

import PostIemEvaluate from './PostIemEvaluate';
import HeadelessTippy from '@tippyjs/react/headless';
import * as ServicePostApi from './../../../apiServices/postAPI'
import * as ServiceEvaluateApi from './../../../apiServices/evaluateAPI'
import * as ServiceCommentApi from './../../../apiServices/commentAPI'
import * as ServiceCommentFeedbackApi from './../../../apiServices/commentFeedbackAPI'
import PostItemUsersComment from './PostItemUsersComment';
import ImageGalleryImg from '../../../ImageGalleryImg';
import { MyContext } from '../../../App';

const cx = classNames.bind(styles);

function PostItem({dataUser, post, images , onClickCheckToFecth}) {
    const { ImageUrlPath } = useContext(MyContext)
    const [imageSlide, setImageSlide] = useState({})
    const [isOpenSlide, setIsOpenSlide] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFocusComment, setIsFocusComment] = useState(false)
    const [statusSendComment, setStatusSendComment] = useState(false);

    const handleChangeStatusSendComment = (newValue) => {
        setStatusSendComment(newValue);
    };

    const convertDate = (dateString) => {
        const dateObject = moment(dateString);
        const day = dateObject.date();
        const month = dateObject.month() + 1; 
        const hour = dateObject.hour();
        const minute = dateObject.minute();
        const time = hour + ":"  + minute
        return {
            day,
            month,
            time
        }
    }
    const handleFocusComment = () => {
        setIsFocusComment(true)
    }
    const handleRenderTypePost = (typePost, images) => {
        if(typePost === 'normal') {
            return images.length === 0 ? '' : `đã thêm ${images.length} ảnh mới`
        }else {
            return typePost === 'avartar' ? 'đã cập nhật ảnh đại diện' : 'đã cập nhật ảnh bìa'
        }
    }
    const handleStyleImage = (lengthImage, indexImage) => {
       if(lengthImage === 3) {
        
            return indexImage === 2 ? {height: '280px'} : {width: `49.8%`}
       }else if(lengthImage >= 5) {
            
            return indexImage > 1 ? {width: '33%'} : {width: `49.8%`}
       }
    }
    const handleOpenSlide  = (index) => {
        setIsOpenSlide(true); 
        setCurrentIndex(index);
        
    };
    const handleCloseSlide = () => {
        setIsOpenSlide(false);
       
    };
    const handleDeletePost = async () => {
       
        const imageUrls = images.length > 0 ? images.map(item => item.url) : []
        const dataPostDel = new FormData()
        dataPostDel.append('postId', post._id)
        dataPostDel.append('imageUrls',  JSON.stringify(imageUrls))
        await ServicePostApi.deletePost(dataPostDel)
        await ServiceEvaluateApi.deleteByPostId(post._id)
        const rsCommentId = await ServiceCommentApi.DeleteByPostId(post._id)
        if(rsCommentId.data) {
            const commentId = rsCommentId.data.map(item => item._id)
            const dataCommentIdDel = new FormData()
            dataCommentIdDel.append('commentIds', JSON.stringify(commentId))
            const rsCommentIdFeedback = await ServiceCommentFeedbackApi.DeleteByPostId(dataCommentIdDel)
            if(rsCommentIdFeedback.data) {
                const commentIdFeedback = rsCommentIdFeedback.data.map(item  => item._id)
                const idBothComment = [...commentId, ...commentIdFeedback]
                const dataCommentIdDelBoth = new FormData() 
                dataCommentIdDelBoth.append('commentIds', JSON.stringify(idBothComment))
                await ServiceEvaluateApi.deleteByCommentId(dataCommentIdDelBoth)
                onClickCheckToFecth()
            }
        }
    }
    useEffect(() => {
        if(images && images.length > 0) {
            const galleryImages = images.map(item => ({
                original: ImageUrlPath+item.url,
                thumbnail: ImageUrlPath+item.url,
            }));
            setImageSlide(galleryImages)
        }
    }, [images, ImageUrlPath])
    useEffect(() => {
        if (isOpenSlide) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
    
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isOpenSlide]);
    return ( 
         <>
            {
                post && 
                <div className={cx('postDiv')}>
                    <div className={cx('headerPost')}>
                        <div className={cx('headerInfo-post')}>
                            <div className={cx('avatar-post')}>
                                <img src={testImg} alt='img'/>
                            </div>
                            <div className={cx('name-post')}>
                                <div className={cx('status-post')}>
                                    <span className={cx('fullname-post')}>
                                        {  dataUser.first_name + ' ' + dataUser.last_name}
                                    </span>
                                    <span className={cx('status')}>{handleRenderTypePost(post.typePost, images)}</span>
                                </div>
                                <div className={cx('time-post')}>
                                    <span> { 
                                    convertDate(post.createdAt).day + ' tháng ' 
                                    + convertDate(post.createdAt).month + ' lúc ' 
                                    + convertDate(post.createdAt).time }</span>
                                </div>
                            </div>
                        </div>
                        
                        <HeadelessTippy
                            render={attrs => (
                                <div className={cx('navMore-option')} tabIndex="-1" {...attrs}>
                                    
                                    <div className={cx('navMore-option--item')} onClick={handleDeletePost}>
                                        <span>Xóa bài viết</span>
                                    </div>
                                </div>
                            )}
                            interactiveBorder={1}
                            interactive   
                            placement="bottom"
                            trigger='click'
                            arrow={true}
                        >
                            <div className={cx('navMore-post')}>
                                <LogoNavMore className={cx('navMore-icon')}/>
                            </div>
                        </HeadelessTippy>
                    </div>
                    <div className={cx('post-content')}>
                        <div className={cx('content-lableText')}>
                            <span>{post.content}</span>
                        </div>
                        {
                            images.length > 0 && 
                            <div className={cx('content-image')}>
                            {
                                images.map((item, index) => (
                                    <div key={index} 
                                        className={cx('image-item')} 
                                        style={ index <= 1 ? {width: `49.8%` } : handleStyleImage(images.length, index)}
                                        onClick={() => handleOpenSlide (index)}>
                                        <img src={ImageUrlPath+item.url} alt='img'/>
                                        {
                                            images.length > 5 && index === 4 &&
                                            <div className={cx('overflay-image')}>
                                                <span className={cx('image-remain')}>+3 </span>
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                            
                            </div>
                        }
                    </div>
                    
                    <PostIemEvaluate 
                        postId={post._id} 
                        userId={dataUser._id} 
                        typeLike={'post'}
                        
                        handleFocusComment={handleFocusComment}/>
                    <PostItemComment 
                        postId={post._id}
                        userId={dataUser._id} 
                        handleFocusComment={handleFocusComment} 
                        typeComment={'normal'} 
                        statusSendComment={statusSendComment}
                        onClickChangeStatusSendComment = {handleChangeStatusSendComment}
                        isFocusComment={isFocusComment}/>
                    <PostItemUsersComment 
                        postId={post._id}
                        statusSendComment={statusSendComment}
                        userId={dataUser._id} />
                    {
                        isOpenSlide && imageSlide.length > 0 &&
                        <ImageGalleryImg 
                            handleCloseSlide={handleCloseSlide}
                            imageSlide={imageSlide}
                            currentIndex={currentIndex}
                            isOpenSlide={isOpenSlide}/>
                    }
                </div>
                
            }
         </>
     );
}

export default memo(PostItem)
 