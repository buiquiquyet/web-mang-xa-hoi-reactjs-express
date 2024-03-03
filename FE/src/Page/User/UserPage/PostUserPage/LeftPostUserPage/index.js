
import classNames from 'classnames/bind';
import styles from './LeftPostUserPage.module.scss';
import houseImg from './../../../../../Img/house.png'
import schoolImg from './../../../../../Img/school.png'
import locationImg from './../../../../../Img/location.png'
import statusImg from './../../../../../Img/statusLove.png'
import phoneNumberImg from './../../../../../Img/phone.png'
import React, { memo, useEffect, useRef, useState } from 'react';
import { LogoSend } from '../../../../../Icon';
import * as ServiceUserApi from './../../../../../apiServices/userAPI'
import * as ServiceIntroduceApi from './../../../../../apiServices/introduceAPI'
import LeftPostUserPageImage from './LeftPostUserPageImage';
import LeftPostUserPageFriend from './LeftPostUserPageFriend';
const cx = classNames.bind(styles);

function LeftPostUserPage({userId, dataUser}) {

    const [isShowUpdateStory, setIsShowUpdateStory] = useState(false)
    const [dataComment, setDataComment] = useState('')
    const [isFocusComment, setIsFocusComment] = useState(false)
    const [dataStory, setDataStory] = useState('')
    const [dataProfileUser, setDataProfileUser] = useState(null)
    const [dataIntroduce, setDataIntroduce] = useState(null)
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
        }else {
            setDataStory('')
        }
    }
    const renderAddStory = (dataUser, userId, isShowUpdateStory) => {
        if(dataUser && dataUser._id === userId && !isShowUpdateStory) {
            return  <div className={cx('introduce-box')} onClick={handleShowUpdateStory}>
                    <span>Thêm tiểu sử</span>
                </div>
        }
        if(dataUser && dataUser._id && isShowUpdateStory) {
            return (
                <div className={cx('comment-sendStory', )}>
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
            )
        }
    }
    const renderIntroduce = (urlImg, text, key,  dataIntroduce) => {
        return (
            <div className={cx('introduce-live')}>
                <img src={urlImg} alt='img'/>
                <span>{text}</span>
                <span className={cx('introduceLive-bold')}>{dataIntroduce[key]}</span>
            </div>
        )
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
            const fecthIntroduce = async (userId) => {
                const rs = await ServiceIntroduceApi.GetByUserId(userId)
                if(rs.success && rs.data) {
                    setDataIntroduce(rs.data)
                }
            }
            fecthIntroduce(userId)
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
                {
                    dataIntroduce && [
                        { img: houseImg, label: 'Sống tại', key: 'province' },
                        { img: schoolImg, label: 'Đã học tại', key: 'school' },
                        { img: locationImg, label: 'Đến từ', key: 'place' },
                        { img: statusImg, label: '', key: 'status' },
                        { img: phoneNumberImg, label: '', key: 'phoneNumber' }
                    ].map((info, index) => {
                        return (
                            <React.Fragment key={index}>
                            {
                                (dataIntroduce.hasOwnProperty(info.key) 
                                && dataIntroduce[info.key] !== ''
                                && dataIntroduce[info.key] !== null ) &&
                                renderIntroduce(info.img, info.label, info.key, dataIntroduce)
                            }
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <LeftPostUserPageImage userId={userId}/>
            <LeftPostUserPageFriend userId={userId}/>
            
        </div>
     );
}

export default memo(LeftPostUserPage);