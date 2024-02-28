
import classNames from 'classnames/bind';
import styles from './PostIemEvaluate.module.scss';
import Tippy from '@tippyjs/react';
import likeImg from './../../../../Img/likeLogo.svg'
import * as ServiceEvaluateApi from './../../../../apiServices/evaluateAPI'
import { useEffect, useMemo, useState, memo } from 'react';
import testImg from './../../../../Img/test3.jpg'
import likeLogo from './../../../../Img/likeLogo.svg'
const cx = classNames.bind(styles);

function PostIemEvaluate({postId, userId, handleFocusComment, typeLike, convertDate, content, namePerson}) {
    
    const [totalLike, setTotalLike] = useState(null)
    const [userLikes, setUserLikes] = useState(null)
    const [userIdLike, setUserIdLikes] = useState('dislike')

    const dataEvaluate = useMemo(() => {
        const formData = new FormData();
        formData.append('postCommentId', postId);
        formData.append('typeEvaluate', typeLike);
        formData.append('userId', userId);
        return formData;
      }, [postId, userId, typeLike]);
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
       
        setTotalLike(rs.total)
        setUserLikes(rs.users)

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
    useEffect(() => {
        fetchGetTotalLike(dataEvaluate)
        fecthGetLikePostByUserId(dataEvaluate)
    },[dataEvaluate, userId, typeLike])
 
    return ( 
        <>
            
            {
                typeLike === 'post' ?
                <>
                    {totalLike !== 0 && totalLike  && 
                    <div className={cx('totalLike-post')}>
                        <img src={likeImg} alt='img'/>
                        
                        {
                            userLikes && userLikes.map((item, index) => (
                                <Tippy key={index} content={item.first_name + ' ' + item.last_name}>
                                    <span>{totalLike && totalLike}</span>
                                </Tippy>
                            ))
                                
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
                            <img src={testImg} alt='img'/>
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