import classNames from 'classnames/bind';
import styles from './PostItemUsersComment.module.scss';
import React, { useContext, useEffect,  useState } from 'react';
import PostItemComment from '../PostItemComment';
import * as ServiceCommentApi from './../../../../apiServices/commentAPI'
import * as ServiceUserApi from './../../../../apiServices/userAPI'
import * as ServiceCommentFeedbackApi from './../../../../apiServices/commentFeedbackAPI'

import moment from 'moment';
import PostItemCommentFeedback from '../PostItemCommentFeedback';
import PostIemEvaluate from '../PostIemEvaluate';
import { MyContextSocket } from '../../../..';



const cx = classNames.bind(styles);

function PostItemUsersComment({ImageUrlPath, postId, statusSendComment}) {
    const {socket} = useContext(MyContextSocket)
    const [isFocusComment, setIsFocusComment] = useState(false)
    const [showDataComment, setShowDataCommet] = useState([])
    const [totalComment, setTotalComment] = useState(null)
    const [nameUserComment, setNameUserComment] = useState([])
    const [limitDataComment, setLimitDataComment] = useState(0)
    const [countDocs, setCountDocs] = useState(0)
    const [postIdToShowFeedback, setPostIdToShowFeedback] = useState([])

    //check action del to render post
    const [checkActionDelComment, setCheckActionDelComment] = useState(false)

    //commentFeedback
    const [showDataCommentFeedback, setShowDataCommetFeedback] = useState([])
    const [showDataCommentFeedbackSocket, setShowDataCommentFeedbackSocket] = useState([])
    const [showDataFeedbackWithEachCommentId, setShowDataFeedbackWithEachCommentId] = useState([])

    const handleFocusComment = () => {
        setIsFocusComment(true)
    }
    const handleFocusCommentWithPostId = (postId) => {
        setIsFocusComment(true)
        const isCheck = postIdToShowFeedback.includes(postId)
        if(isCheck) {
            const newRs = postIdToShowFeedback.filter(item => item !== postId)
            setPostIdToShowFeedback(newRs)
            return
        }
        setPostIdToShowFeedback( prev => [
            ...prev,
            postId
        ])
    }
    const handleOpenFeedback = (commentId) => {
        const isCheck = showDataFeedbackWithEachCommentId.includes(commentId);
        if(isCheck) {
            const newRs = showDataFeedbackWithEachCommentId.filter(item => item !== commentId)
            setShowDataFeedbackWithEachCommentId(newRs)
        } else {
            setShowDataFeedbackWithEachCommentId(prev => [
                ...prev,
                commentId
            ])
        }
        setShowDataCommentFeedbackSocket([])
       
    }
    //check action del comment
    const handleCheckActionDelComment = () => {
        setCheckActionDelComment(!checkActionDelComment)
    }
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
    
    const fecthNameUser = async (userId) => {
        const rs = await ServiceUserApi.getNameUser(userId)
        return rs.data.first_name + ' ' + rs.data.last_name
    }
    const fecthShowComment = async (postId, limit) => {
        const rs = await ServiceCommentApi.Show(postId, limit)
        setCountDocs(Number(rs.countDocs))
        setTotalComment(rs.total)
        setShowDataCommet(rs.data)
        setLimitDataComment(Number(rs.limit))
    }
    const fecthShowCommentFeedback = async(postId, limit) => {
        const rs = await ServiceCommentFeedbackApi.Show(postId, limit)
        return rs
    }
    const renderTotalAndDataFeedback = (commentId, showDataCommentFeedback, handleOpenFeedback, showDataFeedbackWithEachCommentId) => {
        const commentItem = showDataCommentFeedback.find(item => item.commentId === commentId);
    
        if (!commentItem || showDataFeedbackWithEachCommentId.includes(commentId) ) {
            return showDataCommentFeedback
                .filter(item => item.commentId === commentId)
                .map((item, index) => (
                    <PostItemCommentFeedback 
                        ImageUrlPath={ImageUrlPath}
                        key={index} 
                        dataFeedback={item.data} 
                        handleOpenFeedback={() => handleOpenFeedback(commentId)}
                        onClickHandleCheckDelComment={handleCheckActionDelComment}
                    />
                ));
        } else {
            return (
                <div style={{display:'flex', alignItems:'center'}} key={commentItem.commentId}>
                    <div className={cx('feedbackContent-icon')}></div>
                    <div className={cx('feedbackContent-total')} onClick={() => handleOpenFeedback(commentId)}>
                        <span>Xem tất cả {commentItem.total} phản hồi</span>
                    </div>
                </div>
            );
        }
    };
    const renderToDataFeedbackSocket = (showDataCommentFeedbackSocket, commentId) => {
        if (showDataCommentFeedbackSocket.length > 0 && showDataFeedbackWithEachCommentId.includes(commentId)) {
            setShowDataCommentFeedbackSocket([]);
        }
        return (
            showDataCommentFeedbackSocket.length > 0 &&
            showDataCommentFeedbackSocket
            .filter(value => value.commentId ===  commentId)
            .reverse()
            .map((value, index) => (
                <PostItemCommentFeedback 
                    ImageUrlPath={ImageUrlPath}
                    key={index} 
                    checkShowHideFeedbackData={true}
                    dataFeedback={value.data}
                    onClickHandleCheckDelComment={handleCheckActionDelComment} 
                />
            ))
        )
    }
    useEffect(() => {
        fecthShowComment(postId, 1)
    }, [postId, statusSendComment, checkActionDelComment])
    useEffect(() => {
       if(showDataComment.length > 0){
            const fetchNames = async () => {
                const nameAndFeedbackData = await Promise.all(showDataComment.map(async (item) => {
                    const name = await fecthNameUser(item.userId);
                    const feedback = await fecthShowCommentFeedback(item._id, 1); 
                    return {name, feedback };
                }));
                if(nameAndFeedbackData.length > 0) {
                    const names = nameAndFeedbackData.map(item => item.name)
                    const dataFeedbacks = nameAndFeedbackData.map(item => item.feedback)
                    setShowDataCommetFeedback(dataFeedbacks)
                    setNameUserComment(names);
                }   
            };
           
            fetchNames();
       }
    }, [showDataComment, showDataCommentFeedbackSocket]);

    useEffect(() => {
        socket.on('newComment', (comment) => {
            if (comment.postId === postId) {
                setShowDataCommet(prevComments => [comment, ...prevComments]);
                fecthShowComment(postId, 1)
            }
        });
        socket.on('newCommentFeedback', (comment) => {
            setShowDataCommentFeedbackSocket(prev => [comment, ...prev])
        });
        return () => {
            socket.off('newComment');
            socket.off('newCommentFeedback');
        };
    }, [postId,socket]);
    return ( 
        <>
        {
           showDataComment.length > 0 && 
            <div className={cx('wrapper')}>
                <div className={cx('userComment-nav')}>
                    {
                        showDataComment.length > 0 &&
                        showDataComment.map((item, index) => (
                            <div key={index} className={cx('userComment-item')}>
                                
                                <PostIemEvaluate 
                                    ImageUrlPath={ImageUrlPath}
                                    postId={item._id} 
                                    userId={item.userId} 
                                    convertDate={convertDate(item.createdAt)}
                                    namePerson={nameUserComment[index]}
                                    content={item.content}
                                    handleFocusComment={() => handleFocusCommentWithPostId(item._id)}
                                    typeLike={'comment'}
                                    onClickHandleCheckDelComment={handleCheckActionDelComment}/>
                                {
                                isFocusComment && postIdToShowFeedback.includes(item._id)
                                &&
                                <div style={{margin: '0 20px'}}>
                                    <PostItemComment 
                                        postId={item._id} 
                                        ImageUrlPath={ImageUrlPath}
                                        isFocusComment={isFocusComment} 
                                        typeComment={'feedback'} 
                                        handleFocusComment={handleFocusComment}/>
                                </div>
                                }
                                <div className={cx('feedbackContent')}>
                                    { 
                                        renderTotalAndDataFeedback(
                                            item._id, 
                                            showDataCommentFeedback,
                                            handleOpenFeedback,
                                            showDataFeedbackWithEachCommentId)   
                                    }
                                    {
                                        renderToDataFeedbackSocket(showDataCommentFeedbackSocket,item._id)
                                    }
                                </div>   
                            </div>
                        ))
                    }
                    {
                        totalComment && totalComment > showDataComment.length &&
                        <div className={cx('showMore-comment')} onClick={() => fecthShowComment(postId,limitDataComment + 1 )}>
                            <span>Xem thêm bình luận</span>
                        </div>
                    }
                    {
                        totalComment && countDocs < showDataComment.length &&
                        <div className={cx('showMore-comment')} onClick={() => fecthShowComment(postId,limitDataComment - 1 )}>
                            <span>Ẩn bớt bình luận</span>
                        </div>
                    }
                </div>
                
            </div>
        }
        </>
     );
}

export default PostItemUsersComment;