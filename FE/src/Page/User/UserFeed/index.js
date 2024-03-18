
import classNames from 'classnames/bind';
import styles from './UserFeed.module.scss';
import userNoneImg from './../../../Img/userNone.png'

import imgImg from './../../../Img/imageImg.png'
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from '../../../App';
import * as ServicePostApi from './../../../apiServices/postAPI'
import UserFeedLeftPageChild from './UserFeedLeftPageChild';
import UserFeedRightPageChild from './UserFeedRightPageChild';
import { useDispatch, useSelector } from 'react-redux';
import { addCheckInputText, addIndexImg, addText } from '../../../Reducer/feedText/feedTextSlice';
import { FeedSlice } from '../../../redux/selector';
import * as ServiceFeedApi from './../../../apiServices/feedAPI'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);


function UserFeed() {
    const navigate = useNavigate()
    const {dataUser, ImageUrlPath} = useContext(MyContext)
    const feedSlice = useSelector(FeedSlice)
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState('')
    const [checkShowAddFeed, setCheckShowAddFeed] = useState(false)
    const [btnNoneAfAdd, setBtnNoneAfAdd] = useState(false)
    const [checkShowAddFeedImg, setCheckShowAddFeedImg] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [typeFriendPage, setTypeFriendPage] = useState('pending')
    const fileInputRef = useRef(null);
    const handleSetTypePageFriend = (type) => {
        setTypeFriendPage(type)
    }
    const handleShowAddFeedText = () => {
        setCheckShowAddFeed(true)
        if(checkShowAddFeed === false) {
            dispatch(addText(''))
        }
    }
    const handleShowAddFeedTextHide = () => {
        setCheckShowAddFeed(false)
        setCheckShowAddFeedImg(false)
        setSelectedFile(null)
        if(feedSlice.text.length > 0) {
            dispatch(addText(''))
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setCheckShowAddFeedImg(true)
    };
    const handleSubmitFeedText = async  () => {
        if(feedSlice.text.length === 0 && !selectedFile) {
            dispatch(addCheckInputText(1))
            return
        }
        if(feedSlice.img.length === 0) {
            const formData = new FormData() 
            if(selectedFile) {
                formData.append('type', 'image')
                formData.append('image', selectedFile)
            }
            else {
                formData.append('type', 'text')
                formData.append('indexImg', feedSlice.indexImg)
            }
            formData.append('userId', dataUser._id)
            formData.append('content', feedSlice.text)
            if(!selectedFile) {
                const rs = await ServiceFeedApi.create(formData)
                if(rs.success) {
                    setBtnNoneAfAdd(true)
                    await message.success(rs.success)
                    dispatch(addIndexImg(0))
                    navigate('/')
                }
            }else {
                const rs = await ServiceFeedApi.createImage(formData)
                if(rs.success) {
                    setBtnNoneAfAdd(true)
                    await message.success(rs.success)
                    navigate('/')
                }
            }
        }
    }
    useEffect(() => {
        const fecthImgAvatar = async (userId) => {
            const rs = await ServicePostApi.showPostByUserAvartarCover( {typePost: 'avartar', userId})
            if(rs.success) {
                setAvatar(rs.result.image.flat()[0])
                return
            }
            setAvatar('')
        }
        if(dataUser) {
            fecthImgAvatar(dataUser._id)
        }
    }, [dataUser])
    return ( 
        <div className={cx('wrapper')}>
           <div className={cx('friend-left')}>
                <div className={cx('friendLeft-lable')}>
                    <span>Tin của bạn</span>
                </div>
                <div className={cx('friendLeft-nav')}>
                    <div className={cx('friendLeft-item',{ 'active' : typeFriendPage === 'pending'})} onClick={() => handleSetTypePageFriend('pending')}>
                        <div  className={cx('friendLeft-img')}>
                            <img src={Object.keys(avatar).length > 0 
                                ? ImageUrlPath + avatar.url
                                : userNoneImg} alt='img'/>
                        </div>
                        <span>
                            {
                                dataUser && dataUser.first_name + ' ' + dataUser.last_name
                            }
                        </span>
                    </div>
                </div>
                {
                    (checkShowAddFeed || checkShowAddFeedImg) &&
                    <>
                        {
                            (checkShowAddFeed || checkShowAddFeedImg) &&
                            <UserFeedLeftPageChild type={selectedFile ? selectedFile : 'text'}/>
                        }
                        <div className={cx('left-button')}>
                            <button  className={cx({'btnDisabled': btnNoneAfAdd})} onClick={!btnNoneAfAdd ? handleShowAddFeedTextHide : null}>Bỏ</button>
                            <button 
                                className={cx({'btnDisabled': btnNoneAfAdd})}
                                style={{backgroundColor:'var(--primary)', color:'white'}}
                                onClick={!btnNoneAfAdd ? handleSubmitFeedText : null}

                            >Chia sẻ lên tin</button>
                        </div>
                    </>
                }
           </div>
           <div className={cx('friend-right')}>
                {
                    !checkShowAddFeedImg && !checkShowAddFeed  
                    ?
                    <>
                        <div className={cx('right-item', 'item1')}>
                            <div className={cx('item-img')}>
                                <img src={imgImg} alt='img'/>
                            </div>
                            <span>Tạo tin ảnh</span>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className={cx('right-item', 'item2')} onClick={handleShowAddFeedText}>
                            <div className={cx('item-img')}>
                                <span style={{color:'var(--color-text)'}}>Aa</span>
                            </div>
                            <span>Tạo tin dạng văn bản</span>
                        </div>
                    </>
                    :
                    <UserFeedRightPageChild type={selectedFile ? selectedFile : 'text'}/>
                }
           </div>
        </div>
     );
}

export default memo(UserFeed);