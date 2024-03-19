import classNames from 'classnames/bind';
import styles from './UserFriendPageChild.module.scss';
import userNoneImg from './../../../../Img/userNone.png'
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../../App';
import * as ServiceFriendApi from './../../../../apiServices/friendAPI'
import * as ServiceUserApi from './../../../../apiServices/userAPI'
import * as ServicePostApi from './../../../../apiServices/postAPI'
import { message } from 'antd';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function UserFriendPageChild({typeFriendPage}) {

    const {dataUser, ImageUrlPath} = useContext(MyContext)
    const [userIdFriends, setUserIdFriends] = useState([])
    const [dataByUserIdFriend, setDataByUserIdFriend] = useState([])

    //handle Cance add friend 
    const handleCancelAddFriend = async (userId1, userId2) => {
        const rs = await ServiceFriendApi.cancelAddFriend({userId1, userId2})
        if(rs.success) {
            message.success(rs.success)
            fecthGetAllFriend(dataUser._id, typeFriendPage)
        }
    }
    const fecthGetAllFriend = async (userId, typeFriendPage) => {
        const rs = await ServiceFriendApi.getAllFriend(userId, typeFriendPage)
        if(rs.success) {
            setUserIdFriends(rs.data)
            return
        }
        setUserIdFriends([])
    } 
    //handle Accepted add friend 
    const handleAcceptedAddFriend = async (userId1, userId2) => {
        const rs = await ServiceFriendApi.updateAcceptedFriend({userId1, userId2})
        if(rs.success) {
            message.success(rs.success)
            fecthGetAllFriend(dataUser._id, typeFriendPage)
            
        }
    }
    useEffect(() => {
        if(dataUser) {
            fecthGetAllFriend(dataUser._id, typeFriendPage)
        }
    }, [dataUser, typeFriendPage])
    useEffect(() => {
        const fecthProfileUsers = async (userIdFriends, dataUser) => {
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
        if(userIdFriends.length > 0 && dataUser) {
            fecthProfileUsers(userIdFriends, dataUser)
        }else {
            setDataByUserIdFriend([])
        }
    },[userIdFriends, dataUser])
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('lable')}>
                <span>{typeFriendPage === 'pending' ? 'Lời mời kết bạn' : 'Bạn bè' }</span>
            </div>
            <div className={cx('friend-nav')}>
                {
                    dataByUserIdFriend.length > 0 ?
                    dataByUserIdFriend.map((item, index) => (
                        <div key={index} className={cx('friend-item')}>
                            <Link to={`/userPost/${item.fullName._id}`} className={cx('item-img')}>
                                <img src={item.image 
                                            ? ImageUrlPath + item.image.url
                                            : userNoneImg} alt='img'/>
                            </Link>
                            <div className={cx('item-fullname')}>
                                <span className={cx('fullname-person')}>
                                    {item.fullName.first_name + ' ' + item.fullName.last_name}
                                </span>
                                {/* <span>1 bạn chung</span> */}
                            </div>
                            {
                                dataUser &&
                                <div className={cx('item-button')}>
                                    {
                                        typeFriendPage === 'pending' &&   
                                        <button className={cx('button-submit')} onClick={() => handleAcceptedAddFriend(dataUser._id, item.fullName._id)}>Xác nhận</button>
                                    }
                                    <button className={cx('button-del')} onClick={() => handleCancelAddFriend(dataUser._id, item.fullName._id)}>Xóa</button>
                                </div>
                            }
                        </div>

                    ))
                    :
                    <div className={cx('friend-none')}>
                        <span>Không có {typeFriendPage === 'accepted' ? 'bạn bè' : 'lời mời kết bạn' } nào!</span>
                    </div>
                }
                
            </div>
        </div>
     );
}

export default UserFriendPageChild;