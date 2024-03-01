
import classNames from 'classnames/bind';
import styles from './LeftPostUserPage.module.scss';
import houseImg from './../../../../../Img/house.png'
import { memo, useEffect, useRef, useState } from 'react';
import { LogoSend } from '../../../../../Icon';
import * as ServiceUserApi from './../../../../../apiServices/userAPI'
import LeftPostUserPageImage from './LeftPostUserPageImage';
import LeftPostUserPageFriend from './LeftPostUserPageFriend';
const cx = classNames.bind(styles);

function LeftPostUserPage({userId, dataUser}) {

    const [isShowUpdateStory, setIsShowUpdateStory] = useState(false)
    const [dataComment, setDataComment] = useState('')
    const [isFocusComment, setIsFocusComment] = useState(false)
    const [dataStory, setDataStory] = useState('')
    const [dataProfileUser, setDataProfileUser] = useState(null)
    const inputRef = useRef()
    
    const handleShowUpdateStory = () => {
        setIsShowUpdateStory(!isShowUpdateStory)
    }
    const handleFocusComment = () => {
        setIsFocusComment(true)
    }
    const handleInputComment = () => {
       
        setDataComment(inputRef.current.textContent)
    }  
    const handleSubmitComment = async (userId, dataComment) => {
        const rs = await ServiceUserApi.updateStory({userId, story: dataComment})
        if(rs.success) {
            setIsShowUpdateStory(false)
            setDataStory(rs.story)
            setDataComment('')
        }
    }
    const renderAddStory = (dataUser, userId, isShowUpdateStory) => {
        if(dataUser && dataUser._id === userId && !isShowUpdateStory) {
            return  <div className={cx('introduce-box')} onClick={handleShowUpdateStory}>
                    <span>Thêm tiểu sử</span>
                </div>
        }
        if(dataUser && dataUser._id && isShowUpdateStory) {
            return <div className={cx('comment-sendStory', )}>
                        <div
                            contentEditable="true"
                            className={cx('input-postStory', {'input-post--focusStory' : isFocusComment})}
                            onFocus={handleFocusComment}
                            suppressContentEditableWarning={true}
                            onInput={handleInputComment}
                            ref={inputRef}
                        />
                        {
                            dataComment.length === 0 &&
                            <div className={cx('placeholder-inputStory')} >
                                Mô tả về bạn
                            </div>  
                        }
                        
                        <div className={cx('button-sendCommentStory')} 
                            style={isFocusComment ? {display:'flex'} : null }
                            onClick={() => handleSubmitComment(dataUser._id, dataComment)}>
                            <LogoSend className={cx('icon-send',{ 'check-icon': dataComment.length === 0})}/>
                        </div>
                    </div>
            
        }
    }
    useEffect(() => {
        if(dataUser) {
            setDataStory(dataUser.story)
        }
    }, [dataUser])
    useEffect(() => {
        if(userId) {
            const fecthProfile = async (userId) => {
                const rs = await ServiceUserApi.getProfileByUserId(userId)
                if(rs.success) {
                    setDataProfileUser(rs.data)
                }
            }
            fecthProfile(userId)
        }
    }, [userId])
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-box')}>
                <div className={cx('label')}>
                    <span>Giới thiệu</span>
                </div>
                {
                   renderAddStory(dataUser, userId, isShowUpdateStory)
                }
                {
                    dataStory !== ''  && dataUser && dataUser._id === userId ?  
                    <div className={cx('introduce-live')} style={{justifyContent: 'center'}}>
                        <span className={cx('introduceLive-bold')} >{dataStory }</span>
                    </div>
                    :
                    <div className={cx('introduce-live')} style={{justifyContent: 'center'}}>
                        <span className={cx('introduceLive-bold')} >{dataProfileUser && dataProfileUser.story }</span>
                    </div>
                }
                <div className={cx('introduce-live')}>
                    <img src={houseImg} alt='img'/>
                    <span>Sống tại</span>
                    <span className={cx('introduceLive-bold')}>Việt Nam</span>
                </div>
                
            </div>
            <LeftPostUserPageImage userId={userId}/>
            <LeftPostUserPageFriend userId={userId}/>
            
        </div>
     );
}

export default memo(LeftPostUserPage);