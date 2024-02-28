import classNames from 'classnames/bind';
import styles from './PostItemCommentFeedback.module.scss';
import React, { useEffect, useState } from 'react';
import * as ServiceUserApi from './../../../../apiServices/userAPI'
import moment from 'moment';
import PostIemEvaluate from '../PostIemEvaluate';
const cx = classNames.bind(styles);


function PostItemCommentFeedback({dataFeedback, handleOpenFeedback,checkShowHideFeedbackData}) {

    const [nameUserFeedback, setNameUserFeedback] = useState([])
    

    const fecthNameUser = async (userId) => {
        const rs = await ServiceUserApi.getNameUser(userId)
        return rs.data.first_name + ' ' + rs.data.last_name
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
    useEffect(() => {
        if( dataFeedback.length > 0){
            const fetchNames = async () => {
                const names = await Promise.all(dataFeedback.map(async (item) => {
                    const name = await fecthNameUser(item.userId);
                    return name ;
                }));
                setNameUserFeedback(names)
                
            };
           
            fetchNames();
       }
    },[dataFeedback])
   
    return ( 
        <div className={cx('userComment-item')}>
            {
                dataFeedback.length > 0 &&
                dataFeedback.map((item, index) => (
                  <div key={index} >
                    
                    <div className={cx('userComment-timeAndOption')}>
                        <PostIemEvaluate
                            postId={item._id} 
                            userId={item.userId} 
                            convertDate={convertDate(item.createdAt)}
                            namePerson={nameUserFeedback[index]}
                            content={item.content}
                            typeLike={'feedback'}/>
                    </div>
                  </div >
                ))
            }
            {
                !checkShowHideFeedbackData && 
                <div className={cx('feedback-hide')} onClick={handleOpenFeedback}>
                    <span>Ẩn bớt bình luận</span>
                </div>
            }
        </div>
     );
}

export default PostItemCommentFeedback
