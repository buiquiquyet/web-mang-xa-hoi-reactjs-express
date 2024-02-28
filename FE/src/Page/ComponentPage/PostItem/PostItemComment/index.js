
import { memo, useContext, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PostItemComment.module.scss';
import testImg from './../../../../Img/test3.jpg'
import { LogoSend } from '../../../../Icon';
import * as ServiceCommentApi from './../../../../apiServices/commentAPI'
import * as ServiceCommenFeedbacktApi from './../../../../apiServices/commentFeedbackAPI'
import { MyContextSocket } from '../../../..';



const cx = classNames.bind(styles);

function PostItemComment({handleFocusComment,
                        postId, 
                        userId, 
                        typeComment, 
                        isFocusComment, 
                        onClickChangeStatusSendComment, 
                        statusSendComment}) {
    const {socket } = useContext(MyContextSocket)
    const inputRef = useRef()
    const [dataComment, setDataComment] = useState('')
    
    const handleInputComment = () => {
       
        setDataComment(inputRef.current.textContent)
    }  
    const handleSubmitComment = async () => {
        if(dataComment.length > 0) {
            const formData = new FormData()
            formData.append('content', dataComment)
            formData.append('postId', postId)
            formData.append('userId', userId)
            
            if(typeComment === 'normal') {
                //socket
                socket.emit('newComment', dataComment);
                await ServiceCommentApi.Create(formData)
                onClickChangeStatusSendComment(!statusSendComment)
                setDataComment('')
                inputRef.current.textContent = ''
            }else if(typeComment === 'feedback') {
                //socket
                socket.emit('newCommentFeedback', dataComment);
                await ServiceCommenFeedbacktApi.Create(formData)
                // onClickChangeStatusSendComment(!statusSendComment)
                setDataComment('')
                inputRef.current.textContent = ''
            }
        }
    }
    return ( 
        <div className={cx('comment-post')}>
            <div className={cx('avatar-post')}>
                <img src={testImg} alt='img' style={typeComment === 'feedback' ? {height: '24px', width:'24px'}: null}/>
            </div>
            <div className={cx('comment-send', )}>
                <div
                    contentEditable="true"
                    className={cx('input-post', {'input-post--focus' : isFocusComment})}
                    onFocus={handleFocusComment}
                    suppressContentEditableWarning={true}
                    onInput={handleInputComment}
                    ref={inputRef}
                />
                {
                    dataComment.length === 0 &&
                    <div className={cx('placeholder-input')}  style={typeComment === 'feedback' ? {left: '64px'}: null}>
                        Viết bình luận...
                    </div>  
                }
                
                <div className={cx('button-sendComment')} 
                    style={isFocusComment ? {display:'flex'} : null }
                    onClick={handleSubmitComment}>
                    <LogoSend className={cx('icon-send',{ 'check-icon': dataComment.length === 0})}/>
                </div>
            </div>
        </div>
     );
}

export default memo(PostItemComment);