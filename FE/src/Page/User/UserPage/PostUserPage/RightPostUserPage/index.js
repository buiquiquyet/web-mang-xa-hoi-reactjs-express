
import classNames from 'classnames/bind';
import styles from './RightPostUserPage.module.scss';


import PostItem from '../../../../ComponentPage/PostItem';
import {  useEffect, useState } from 'react';

import PostBoxFb from '../../../../../PostBoxFb';
import PostYouThink from '../../../../../PostYouThink';
import * as ServicePostApi from './../../../../../apiServices/postAPI'
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);



function RightPostUserPage() {
    const imageUploadState = useSelector(state => state.imageUpload)
    const { checkStatusUploadImage } = imageUploadState

    const [isCheckModal, setIsCheckModal] = useState(false)
    const [isCheckToFecth, setIsCheckToFecth] = useState(false)
    const [showDataPost, setShowDataPost] = useState({})
    const handleShowHideModal = () => {
        setIsCheckModal(!isCheckModal)
    }
    const handleCheckToFecth = () => {
        setIsCheckToFecth(!isCheckToFecth)
    }
    const filterImagesByPost = (images, postId) => {
        const imageByPost = images.filter((itemImage) => itemImage.length > 0 && itemImage[0].postId === postId);
        return imageByPost.flat();
    };
    
    const fecthPostByUser = async ( token ) => {
        const rs = await ServicePostApi.showPostByUser(token)
        setShowDataPost(rs.result)
    }
    useEffect(() => {
        fecthPostByUser(localStorage.getItem('tokenFb'))
    },[isCheckToFecth,checkStatusUploadImage])
    return ( 
        <div className={cx('wrapper')}>
            <PostYouThink onClickShowHideModal={handleShowHideModal}/>
            <div className={cx('postDiv')}>
                <div className={cx('post-filter')}>
                    <div className={cx('post-lable')}>
                        <span>Bài viết </span>
                    </div>
                    <div className={cx('post-search')}>
                        <div className={cx('postSearch-icon')}>

                        </div>
                        <span>Bộ lọc</span>
                    </div>
                </div>
            </div>
            {
                Object.keys(showDataPost).length > 0 && showDataPost.posts.length > 0 ?
                showDataPost.posts.map((item, index) => (
                    <PostItem key={index} 
                        dataUser = {showDataPost.user} 
                        post={item} 
                        onClickCheckToFecth={handleCheckToFecth}
                        images={ filterImagesByPost(showDataPost.images, item._id) } />
                ))
                :
                <div className={cx('none-post')}>
                    <span>Không có bài viết</span>
                </div>
            }
            
            {
                isCheckModal && 
                <PostBoxFb 
                    typePost={'normal'}
                    onClickCheckToFecth={handleCheckToFecth}
                    onClickShowHideModal={handleShowHideModal}/>
            }
        </div>
        
     );
}

export default RightPostUserPage;