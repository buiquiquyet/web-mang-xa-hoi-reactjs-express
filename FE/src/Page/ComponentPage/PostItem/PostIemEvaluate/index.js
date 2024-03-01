
import classNames from 'classnames/bind';
import styles from './PostIemEvaluate.module.scss';
import Tippy from '@tippyjs/react';
import likeImg from './../../../../Img/likeLogo.svg'
import * as ServiceEvaluateApi from './../../../../apiServices/evaluateAPI'
import * as ServicePostApi from './../../../../apiServices/postAPI'
import * as ServiceCommentApi from './../../../../apiServices/commentAPI'
import * as ServiceCommentFeedbackApi from './../../../../apiServices/commentFeedbackAPI'
import { useEffect, useMemo, useState, memo, useContext } from 'react';
import userNoneImg from './../../../../Img/userNone.png'
import likeLogo from './../../../../Img/likeLogo.svg'
import { LogoNavMore } from '../../../../Icon';
import HeadelessTippy from '@tippyjs/react/headless';
import { MyContext } from '../../../../App';
import { message } from 'antd';

const cx = classNames.bind(styles);

function PostIemEvaluate({ImageUrlPath, 
                            postId, 
                            userId, 
                            handleFocusComment, 
                            typeLike, 
                            convertDate, 
                            content, 
                            namePerson,
                            onClickHandleCheckDelComment}) {

    const {dataUser} = useContext(MyContext)
    const [totalLike, setTotalLike] = useState(null)
    const [userLikes, setUserLikes] = useState(null)
    const [userIdLike, setUserIdLikes] = useState('dislike')
    //img avartar
    const [imageAvartar, setImageAvartar] = useState({})
    const dataEvaluate = useMemo(() => {
        if(dataUser) {
            const formData = new FormData();
            formData.append('postCommentId', postId);
            formData.append('typeEvaluate', typeLike);
            formData.append('userId', dataUser._id);
            return formData;
        }
      }, [postId, dataUser, typeLike]);
    const handleLike = async (typeEvaluate) => {
        if(typeEvaluate === 'like') {
            await ServiceEvaluateApi.like(dataEvaluate)
            await  fetchGetTotalLike(dataEvaluate)
            await  fecthGetLikePostByUserId(dataEvaluate)
            return 
        }
        await ServiceEvaluateApi.dislike(dataEvaluate)
        await  fetchGetTotalLike(dataEvaluate)
        await  fecthGetLikePostByUserId(dataEvaluate)
        return
    }
    const fetchGetTotalLike = async (dataEvaluate) => {
        const rs = await ServiceEvaluateApi.getTotalLike(dataEvaluate)
        if(rs.success) {
            setTotalLike(rs.total)
            setUserLikes(rs.users)
        }

    }
    const fecthGetLikePostByUserId = async (dataEvaluate) => {
            const rs = await ServiceEvaluateApi.getLikePostByUserId(dataEvaluate)
            if(rs.success) {
                setUserIdLikes('dislike')
                return
            }
            setUserIdLikes('like')
    }
    const handleRenderLikeDislike = (typeLike, userIdLike) => {
        return  typeLike === 'post' ? 
                <div className={cx('option-status')} onClick={() => handleLike(userIdLike)} >
                    <div className={cx(`icon-${userIdLike}`)} ></div>
                    <div className={cx('option-lable')}>
                        <span>Thích</span>
                    </div>
                </div>
                :
                <div className={cx('userComment-like')} onClick={() => handleLike(userIdLike)} >
                    <span style={userIdLike ==='like' ? {} : {color: 'var(--primary)'}}>Thích</span>
                </div>

    }
    //del comment 
    const handleDelComment = async (postId) => {
        if(typeLike === 'feedback' ) {
            const rsFeedback = await ServiceCommentFeedbackApi.DeleteByCommentFeedId(postId)
            if(rsFeedback.success) {
                message.success(rsFeedback.success)
                await ServiceEvaluateApi.deleteByPostId(postId)
            }
        }else {
            const rsComment = await ServiceCommentApi.DeleteByCommentId(postId) 
            if(rsComment.success) {
                message.success(rsComment.success)
                const formData = new FormData()
                formData.append('commentId', postId)
                const rsFeedback = await ServiceCommentFeedbackApi.DeleteByCommentId(formData)
                if(rsFeedback.success) {
                    const commentFeedId = rsFeedback.data.map(item => item._id)
                    const idBothComment = [postId, ...commentFeedId] 
                    const dataCommentFeedId = new FormData() 
                    dataCommentFeedId.append('commentIds', JSON.stringify(idBothComment))
                    await ServiceEvaluateApi.deleteByCommentId(dataCommentFeedId)
                }
               
            }
        }
        onClickHandleCheckDelComment()
    }
    useEffect(() => {
        fetchGetTotalLike(dataEvaluate)
        fecthGetLikePostByUserId(dataEvaluate)
    },[dataEvaluate, userId, typeLike])
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
        <>
            
            {
                typeLike === 'post' ?
                <>
                    {totalLike !== 0 && totalLike  && 
                    <div className={cx('totalLike-post')}>
                        <img src={likeImg} alt='img'/>
                        
                        {
                            <Tippy  
                                content={(
                                    <div>
                                        {userLikes && userLikes.map((item, index) => (
                                            <div key={index} >
                                                {item.first_name} {item.last_name}
                                            </div>
                                        ))}
                                    </div>
                                )}>
                                <span>{totalLike && totalLike}</span>
                            </Tippy>
                        }
                    </div>  
                    }
                    <div className={cx('option-post')}>
                        {handleRenderLikeDislike(typeLike,userIdLike)}
                        <div className={cx('option-status')} onClick={handleFocusComment}>
                            <div className={cx('icon-comment')}></div>
                            <div className={cx('option-lable')}>
                                <span>Bình luận</span>
                            </div>
                        </div>
                        <div className={cx('option-status')}>
                            <div className={cx('icon-share')}></div>
                            <div className={cx('option-lable')}>
                                <span>Chia sẻ</span>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={cx('userComment-normal')}>
                        <div className={cx('userComment-img')}>
                        <img  src={Object.keys(imageAvartar).length > 0 
                            ? ImageUrlPath+imageAvartar.url
                            : userNoneImg}  
                            alt='img'
                        />
                        </div>
                        <div className={cx('userComment-person')}>
                            <span className={cx('userComment-name')}>
                                {namePerson}
                            </span>
                            <span className={cx('userComment-content')}>
                                {content}
                            </span>
                            {
                                totalLike !== 0 && totalLike && 
                                <Tippy
                                    content={(
                                        <div>
                                            {userLikes && userLikes.map((item, index) => (
                                                <div key={index}>
                                                    {item.first_name} {item.last_name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                >
                                    <div className={cx('likeComment')}>
                                        <img src={likeLogo} alt='img'/>
                                        <span>{totalLike && totalLike}</span>
                                    </div>
                                </Tippy>
                            }
                        </div>
                        {
                            dataUser && dataUser._id === userId &&
                            <HeadelessTippy
                                render={attrs => (
                                    <div className={cx('del-optionIcon')} tabIndex="-1" {...attrs}>
                                        <div onClick={() => handleDelComment(postId)}>Xóa comment</div>
                                    </div>
                                )}
                                interactive   
                                placement="top"
                                trigger='click'
                            >
                                <div className={cx('userComment-moreOption')}>
                                    <LogoNavMore className={cx('userComment-moreOptionIcon')}/>
                                </div>
                            </HeadelessTippy>
                        }
                    </div>
                    <div className={cx('userComment-timeAndOption')}>
                        <div className={cx('userComment-time')}>
                            <span>{
                                convertDate.day + ' tháng ' 
                                + convertDate.month }</span>
                        </div>
                        {handleRenderLikeDislike(typeLike,userIdLike)}
                        {
                            typeLike !== 'feedback' &&
                            <div className={cx('userComment-feedback')} onClick={handleFocusComment}>
                                <span>Phản hồi</span>
                            </div>
                        }
                    </div> 
                </>
            }
           
                
           
        </>
     );
}

export default  memo(PostIemEvaluate);