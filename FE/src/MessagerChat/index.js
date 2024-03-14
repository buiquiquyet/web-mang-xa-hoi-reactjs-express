import classNames from "classnames/bind";
import styles from './MessagerChat.module.scss'
import { LogoClose, LogoSend } from "../Icon";
import userNoneImg from './../Img/userNone.png';
import { deletetMessItem, zoomOutMessItem } from "../Reducer/useReducerMessager/actions";
import React, { useRef, useEffect, useState, useContext, memo } from "react";
import { LogoZoomOut } from "../Icon";
import { useDispatch } from "react-redux";
import * as ServiceUserApi from './../apiServices/userAPI'
import * as ServicePostApi from './../apiServices/postAPI'
import * as ServiceMessegerChatApi from './../apiServices/messegerChatAPI'
import * as ServiceCountChatApi from './../apiServices/countChatAPI'
import { MyContext } from "../App";
import { Link } from "react-router-dom";
import { MyContextSocket } from "..";
import HeadelessTippy from '@tippyjs/react/headless';
import { message } from "antd";

const cx = classNames.bind(styles)

function MessagerChat({ id, style, newMesseger }) {

    const {socket} = useContext(MyContextSocket)
    const {dataUser, ImageUrlPath} = useContext(MyContext)
    const dispatch = useDispatch()
    const contentRef = useRef(null);
    const inputRef = useRef(null)
    
    const [fullNameUser, setFullNameUser] = useState(null)
    const [avartarImg, setAvartarImg] = useState(null)
    //messeger
    const [inputMesseger, setInputMesseger] = useState('')
    //dataMessegerDatabase
    const [dataMesseger, setDataMesseger] = useState([])
  

    const handleCloseMessager = (id) => {
        // dispatch(setMess(false))
        dispatch(deletetMessItem(id))
    }
    const handleZoomOut = (id) => {
        dispatch(zoomOutMessItem(id))
    }
    const fecthNameUser = async (userId) => {
        const rs = await ServiceUserApi.getNameUser(userId)
        if(rs.success) {
            setFullNameUser(rs.data)
        }
    }
    const fecthAvartarUser = async (userId) => {
        const rs = await ServicePostApi.showPostByUserAvartarCover({userId, typePost: 'avartar'})
        if(rs.success) {
            setAvartarImg(rs.result.image[0]);
        }else {
            setAvartarImg(null)
        }
    }
    
    const fecthAllDataBetwenUsers = async (userId1, userId2) => {
        const formData = new FormData()
        formData.append('userId1', userId1)
        formData.append('userId2', userId2)
        const rs = await ServiceMessegerChatApi.Show(formData)
        if(rs.success) {
            setDataMesseger(rs.data)
        }
    }
    const CreateCountChat = async (dataUserId, senderId) => {
        return await ServiceCountChatApi.Create(dataUserId, senderId) 
    }
    //input messeger
    const handleInputMesseger = () => {
        setInputMesseger(inputRef.current.textContent)
    }  
    //submit
    const handleSubmitMesseger = async (senderId, receiverId) => {
        if(inputMesseger.length > 0) {
            const formData = new FormData()
            formData.append('senderId', senderId)
            formData.append('receiverId', receiverId)
            formData.append('content', inputMesseger)
            await CreateCountChat({userId: receiverId, senderId: senderId})
            socket.emit('newMesseger', inputMesseger);
            const rs = await ServiceMessegerChatApi.Create(formData)
            if(rs.success) {
                setInputMesseger('')
                inputRef.current.textContent = ''
            }
        }
    }
    //delete
    const handleDelete = async (userId1, userId2) => {
        const rs = await ServiceMessegerChatApi.Delete({userId1, userId2})
        if(rs.success) {
            message.success(rs.success)
            fecthAllDataBetwenUsers(userId1, userId2)
            await ServiceCountChatApi.delCountChat({userId: userId2,senderId:userId1})
        } 
    }
   
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [newMesseger, dataMesseger]);
    useEffect(() => {
        if(dataUser) {
            fecthAllDataBetwenUsers(dataUser._id, id)
        }
        fecthNameUser(id)
        fecthAvartarUser(id)
    }, [dataUser, id])
    useEffect(() => {
        if(newMesseger) {
            if ((newMesseger.receiverId === id && newMesseger.senderId === dataUser._id) 
                || (newMesseger.receiverId === dataUser._id && newMesseger.senderId === id)) {
                setDataMesseger(prev => {
                    return [
                        ...prev,
                        newMesseger
                    ]
                })
            }
        }
    },[newMesseger, id, dataUser])
    return ( 
        <div  className={cx('wrapper')} style={style}>
            <div className={cx('header-chat')}>
                <HeadelessTippy
                    render={attrs => (
                        <div className={cx('tippyHeadeless')} tabIndex="-1" {...attrs}>    
                            <Link 
                                to={fullNameUser && `userPost/${fullNameUser._id}`} 
                                className={cx('tippy-item')}
                                > Xem trang cá nhân 
                            </Link> 
                            {
                                dataUser &&
                                <div 
                                    className={cx('tippy-item')}
                                    onClick={() => handleDelete( dataUser._id, fullNameUser._id)} 
                                >  
                                    Xóa đoạn chat 
                                </div>
                            }
                        </div>
                )}
                    interactive   
                    placement="left"
                    trigger='click'
                >
                    <div  className={cx('chat-person')}>
                        <img src={avartarImg
                            ? ImageUrlPath + avartarImg.url
                            : userNoneImg} alt='img'/>
                        <span>{fullNameUser && fullNameUser.first_name + ' ' + fullNameUser.last_name}</span>
                    </div>
                </HeadelessTippy>
                <div className={cx('icon-header')}>
                    <div className={cx('icon-closeZoomOut')} onClick={() => handleZoomOut(id)}>
                        <LogoZoomOut className={cx('icon')}/>
                    </div>
                    <div className={cx('icon-closeZoomOut')}  onClick={() => handleCloseMessager(id) }>
                        <LogoClose className={cx('icon')} />
                    </div>
                </div>
            </div>
            <div className={cx('content-chat')} ref={contentRef} >
                {
                   dataMesseger.length > 0 && dataUser 
                   ?
                   dataMesseger.map((item, index) => (
                       <div  key={index} className={cx('contentChat-nav')}>
                           {(id === item.receiverId || id === item.senderId) &&
                               <div className={cx('contenChat-item' , {'contentChat-end': dataUser._id === item.senderId})}>
                                   {index === 0 || dataMesseger[index - 1].senderId !== item.senderId ? (
                                       dataUser._id !== item.senderId &&
                                           <div className={cx('chat-img')}>
                                               <img src={avartarImg
                                                   ? ImageUrlPath + avartarImg.url
                                                   : userNoneImg} alt='img'/>
                                           </div>
                                   ) : <div style={{marginRight: '34px'}}></div>}
                                   <div className={cx('chat-text')}>{ item.content }</div>
                               </div>
                           }
                       </div>
                       ))
                    :
                    <div className={cx('none-chat')}>
                        <div  className={cx('noneChat-nav')}>
                            <img src={avartarImg
                                ? ImageUrlPath + avartarImg.url
                                : userNoneImg} alt='img'/>
                            <span className={cx('fullname-noneChat')}>{fullNameUser && fullNameUser.first_name + ' ' + fullNameUser.last_name}</span>
                            <span>Facebook</span>
                            <span>Các bạn là bạn bè trên Facebook</span>
                        </div>
                    </div>
                }
            </div>
            <div className={cx('footer-chat')}>
                <div className={cx('chat-input')}>
                    <div
                        ref={inputRef}
                        className={cx('input')}
                        contentEditable="true"
                        onInput={handleInputMesseger}
                        suppressContentEditableWarning={true}
                    ></div>
                </div>
                {
                    inputMesseger.length === 0 &&
                    <div className={cx('placeholder-input')} >
                        Aa
                    </div>  
                }
                {
                    dataUser &&
                    <div className={cx('button-sendChat')} onClick={() => handleSubmitMesseger(dataUser._id, id)}>
                        <LogoSend className={cx('icon-send', {'icon-disable': inputMesseger.length === 0})}/>
                    </div>
                }
            </div>
              
               
            
        </div>
     );
}

export default memo(MessagerChat);