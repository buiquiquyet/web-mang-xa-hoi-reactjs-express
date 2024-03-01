import classNames from "classnames/bind";
import styles from './MenuMessager.module.scss'
import userNoneImg from './../../Img/userNone.png'

import { LogoSearch } from "../../Icon";
import { setMessLog, setMessItem, zoomOutHideToMessItem } from "../../useReducerMessager/actions";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import * as ServiceUserApi from './../../apiServices/userAPI'
import * as ServicePostApi from './../../apiServices/postAPI'
import * as ServiceFriendApi from './../../apiServices/friendAPI'
import * as ServiceMessegerApi from './../../apiServices/messegerChatAPI'

const cx = classNames.bind(styles)

function MenuMessager() {
    const {ImageUrlPath, dataUser} = useContext(MyContext)

    const messagerState = useSelector(state => state.messager)
    const { jobsZoomOut } = messagerState
    const dispatch = useDispatch()

    const [userIdFriends, setUserIdFriends] = useState([])
    const [dataByUserIdFriend, setDataByUserIdFriend] = useState([])
    //lastest messeger
    const [lastestMesseger, setLastestMesseger] = useState([])
    const handleShowMessLogorShowMess = (item) => {
        dispatch(setMessLog(false))
        // dispatch(setMess(true))
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
            if(profileUsers) {
                setDataByUserIdFriend(profileUsers)
            }
        }
        const fecthLastestMesseger = async (userIdFriends) => {
            const IdUsers = userIdFriends.map((item) => {
                if(item.userId1 === dataUser._id) return item.userId2
                else return item.userId1
            })
            const lastestMessegersArr = await Promise.all(IdUsers.map(async (item) => {
                const messager = await ServiceMessegerApi.ShowLastest({userId1: item, userId2: dataUser._id})
                if(messager.success) {
                    return messager.data
                }
            }))
            if(lastestMessegersArr) {
                setLastestMesseger(lastestMessegersArr)
            }
        }
        if(userIdFriends.length > 0 && dataUser ) {
            fecthProfileUsers(userIdFriends)
            fecthLastestMesseger(userIdFriends)
        }else {
            setDataByUserIdFriend([])
        }
    },[userIdFriends, dataUser])
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('messager-lable')}>Đoạn chat</div>
            <div className={cx('messager-search')}>
                <LogoSearch classsName={cx('iconSearch')}/>
                <input placeholder="Tìm kiếm trên Messager"/>
            </div>
            <div className={cx('messager-content')}>
            {
            dataByUserIdFriend.length > 0 && lastestMesseger.length > 0 &&
            dataByUserIdFriend.map((item, index) => (
                lastestMesseger[index] !== null &&
                <div key={index}  className={cx('messager-item')} onClick={() => handleShowMessLogorShowMess(item.fullName._id)} >
                    <img src={item.image 
                            ? ImageUrlPath + item.image.url
                            : userNoneImg} alt='img'/>
                    <div className={cx('item-content')}>
                        <span className={cx('item-text')}>{item.fullName.first_name + ' ' + item.fullName.last_name}</span>
                        <div>
                            {lastestMesseger[index].senderId === dataUser._id &&
                            <span>Bạn: </span>
                            } 
                            <span >{lastestMesseger[index].content}</span> 
                        </div>
                    </div>
                </div>
                
                
            ))}
                
            </div>
            
        </div>
     );
}

export default MenuMessager;