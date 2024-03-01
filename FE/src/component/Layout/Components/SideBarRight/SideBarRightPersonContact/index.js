import { useDispatch, useSelector } from 'react-redux'
import userNoneImg from './../../../../../Img/userNone.png'

import { setMessItem, zoomOutHideToMessItem } from '../../../../../useReducerMessager/actions'
import styles from './SideBarRightPersonContact.module.scss'
import classNames from 'classnames/bind';
import MessagerChat from '../../../../../MessagerChat'
import { memo, useContext, useEffect, useState } from 'react'
import * as ServiceFriendApi from './../../../../../apiServices/friendAPI'
import * as ServicePostApi from './../../../../../apiServices/postAPI'
import * as ServiceUserApi from './../../../../../apiServices/userAPI'
import { MyContext } from '../../../../../App'
const cx = classNames.bind(styles)

function SideBarRightPersonContact() {

    const { dataUser, ImageUrlPath } = useContext(MyContext)

    const messagerState = useSelector(state => state.messager)
    const { jobsZoomOut, jobs } = messagerState
    
    const dispatch = useDispatch();
   
    const [userIdFriends, setUserIdFriends] = useState([])
    const [dataByUserIdFriend, setDataByUserIdFriend] = useState([])
    //dispatch
    const handleShowMessLogorShowMess = (item) => {
       
        dispatch(setMessItem(item))
        if(jobsZoomOut.length > 0) {
            dispatch(zoomOutHideToMessItem(item))
        }
    }
    const fecthGetAllFriend = async (userId) => {
        const rs = await ServiceFriendApi.getAllFriend(userId, 'accepted')
        if(rs.success) {
            setUserIdFriends(rs.data)
        }
    }
    useEffect(() => {
        if(dataUser) {
            fecthGetAllFriend(dataUser._id);
        }
    },[dataUser])
    useEffect(() => {
        const fecthProfileUsers = async (userIdFriends) => {
            const IdUsers = userIdFriends.map((item) => {
                    if(item.userId1 === dataUser._id) return item.userId2
                    else return item.userId1
            })
            const profileUsers = await Promise.all(IdUsers.map(async (item) => {
                const fullNames = await ServiceUserApi.getNameUser(item)
                const imagesAvartar = await ServicePostApi.showPostByUserAvartarCover( {typePost: 'avartar', userId: item})
                if(fullNames.success && imagesAvartar.success) {
                    const fullName = fullNames.data
                    const image = imagesAvartar.result.image.flat()[0]
                    return {fullName, image}
                }
                return {fullName: fullNames.data}
            }))
            setDataByUserIdFriend(profileUsers)
        }
        if(userIdFriends.length > 0 && dataUser ) {
            fecthProfileUsers(userIdFriends)
        }else {
            setDataByUserIdFriend([])
        }
    },[userIdFriends, dataUser])
    return ( 
        <>
            <div  style={{paddingBottom:'10px'}} className={cx('siderbar-rightBirthDay')}>
                <div style={{ padding: '2px 8px 6px' }}className={cx('lable-add')}>Người liên hệ</div>
                {
                    dataByUserIdFriend.length > 0 &&
                    dataByUserIdFriend.map((item, index) => (
                    <div key={index} className={cx('rightPersonConnect')} onClick={() => handleShowMessLogorShowMess(item.fullName._id)}>
                        <img src={item.image 
                            ? ImageUrlPath + item.image.url
                            : userNoneImg} alt='img'/>
                        <span>{item.fullName.first_name + ' ' + item.fullName.last_name}</span>
                    </div>
                ))
                }
            </div>
            {
                jobs.slice(-2).map((item, index) => (
                    <MessagerChat 
                        key={index} 
                        id={item} 
                        style={index > 0 ? { right: `420px` } : null }
                       
                    />
                ))
            } 
        </>
     );
}

export default memo(SideBarRightPersonContact);