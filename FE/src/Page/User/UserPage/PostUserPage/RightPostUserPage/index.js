
import classNames from 'classnames/bind';
import styles from './RightPostUserPage.module.scss';
import HeadelessTippy from '@tippyjs/react/headless';
import PostItem from '../../../../ComponentPage/PostItem';
import {  useContext, useEffect, useState } from 'react';
import PostBoxFb from '../../../../../PostBoxFb';
import PostYouThink from '../../../../../PostYouThink';
import * as ServicePostApi from './../../../../../apiServices/postAPI'
import { useSelector } from 'react-redux';
import { MyContext } from '../../../../../App';
const cx = classNames.bind(styles);



function RightPostUserPage({userId, dataUser}) {

    const { ImageUrlPath } = useContext(MyContext)

    const imageUploadState = useSelector(state => state.imageUpload)
    const { checkStatusUploadImage } = imageUploadState

    const [isCheckModal, setIsCheckModal] = useState(false)
    const [isCheckToFecth, setIsCheckToFecth] = useState(false)
    const [showDataPost, setShowDataPost] = useState({})
    const [typeSearch, setTypeSearch] = useState(1)
    //img avartar
    const [imageAvartar, setImageAvartar] = useState({})
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
        if(rs.success) {
            setShowDataPost(rs.result)
        }
    }
    const handleSearchPost = (showDataPost, type, typeSearch) => {
        if(type !== typeSearch) {
            const newArrData = showDataPost.posts.reverse()
            setShowDataPost(prev => {
                return {
                    ...prev,
                    posts: newArrData
                }
            })
            setTypeSearch(type)
        }
    }
    useEffect(() => {
        if(userId) {
            fecthPostByUser(userId)
        }
    },[isCheckToFecth,checkStatusUploadImage, userId])
    useEffect(() => {
        const fecthImageAvartar = async (userId) => {
            const imageAvartar = await ServicePostApi.showPostByUserAvartarCover( {typePost: 'avartar', userId: userId})
            if(imageAvartar.success) {
                if(imageAvartar.result.image.length > 0) {
                    setImageAvartar(imageAvartar.result.image[0])
                }
            }
        }
        fecthImageAvartar(userId)
      }, [userId])
    return ( 
        <div className={cx('wrapper')}>
            {
                dataUser && dataUser._id === userId &&
                <PostYouThink 
                    ImageUrlPath={ImageUrlPath}
                    onClickShowHideModal={handleShowHideModal}
                    imageAvartar={imageAvartar} 
                    />
            }
                <div className={cx('postDiv')}>
                    <div className={cx('post-filter')}>
                        <div className={cx('post-lable')}>
                            <span>Bài viết </span>
                        </div>
                    <HeadelessTippy
                        render={attrs => (
                            <div className={cx('tippyHeadeless')} tabIndex="-1" {...attrs}>    
                                <div className={cx('tippy-item')} onClick={()=> handleSearchPost(showDataPost, 1, typeSearch)}> Mới nhất </div> 
                                <div className={cx('tippy-item')} onClick={()=> handleSearchPost(showDataPost, 2, typeSearch)}>  Cũ nhất </div>
                            </div>
                    )}
                        interactive   
                        placement="top"
                        trigger='click'
                    >
                                <div className={cx('post-search')} >
                                    <div className={cx('postSearch-icon')}>
                                    </div>
                                    <span>Bộ lọc</span>
                                </div>
                    </HeadelessTippy>
                    </div>
                </div>
            {
                showDataPost && Object.keys(showDataPost).length > 0 && showDataPost.posts.length > 0 ?
                showDataPost.posts.map((item, index) => (
                    <PostItem key={index}
                        imageAvartar={imageAvartar} 
                        ImageUrlPath={ImageUrlPath}
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
                    imageAvartar={imageAvartar} 
                    ImageUrlPath={ImageUrlPath}
                    typePost={'normal'}
                    onClickCheckToFecth={handleCheckToFecth}
                    onClickShowHideModal={handleShowHideModal}/>
            }
        </div>
        
     );
}

export default RightPostUserPage;