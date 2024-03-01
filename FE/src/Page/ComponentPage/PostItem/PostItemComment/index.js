
import { memo, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PostItemComment.module.scss';
import userNoneImg from './../../../../Img/userNone.png'
import { LogoSend } from '../../../../Icon';
import * as ServiceCommentApi from './../../../../apiServices/commentAPI'
import * as ServiceCommenFeedbacktApi from './../../../../apiServices/commentFeedbackAPI'
import * as ServicePostApi from './../../../../apiServices/postAPI'
import { MyContextSocket } from '../../../..';
import { MyContext } from '../../../../App';



const cx = classNames.bind(styles);

function PostItemComment({handleFocusComment,
                        postId, 
                        typeComment, 
                        isFocusComment, 
                        onClickChangeStatusSendComment, 
                        statusSendComment,
                        ImageUrlPath
                        }) {
    const {socket } = useContext(MyContextSocket)
    const {dataUser} = useContext(MyContext)
    const inputRef = useRef()
    const [dataComment, setDataComment] = useState('')
    //img avartar
    const [imageAvartar, setImageAvartar] = useState({})
    const handleInputComment = () => {
       
        setDataComment(inputRef.current.textContent)
    }  
    const handleSubmitComment = async () => {
        if(dataComment.length > 0) {
            const formData = new FormData()
            formData.append('content', dataComment)
            formData.append('postId', postId)
            formData.append('userId', dataUser._id)
            
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
    useEffect(() => {
       if(dataUser){
            const fecthImageAvartar = async (userId) => {
                const imageAvartar = await ServicePostApi.showPostByUserAvartarCover( {typePost: 'avartar', userId: userId})
                if(imageAvartar.success) {
                    if(imageAvartar.result.image.length > 0) {
                        setImageAvartar(imageAvartar.result.image[0])
                    }
                }
            }
            fecthImageAvartar(dataUser._id)
       }
      }, [dataUser])
    return ( 
        <div className={cx('comment-post')}>
            <div className={cx('avatar-post')}>
                <img src={Object.keys(imageAvartar).length > 0 
                    ? ImageUrlPath+imageAvartar.url
                    : userNoneImg}  
                    alt='img' style={typeComment === 'feedback' ? {height: '24px', width:'24px'}: null}/>
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