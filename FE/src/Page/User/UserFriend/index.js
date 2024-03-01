
import classNames from 'classnames/bind';
import styles from './UserFriend.module.scss';
import PendingFriendImg from './../../../Img/addFriend.png'
import FriendImg from './../../../Img/friend.png'
import UserFriendPageChild from './UserFriendPageChild';
import { useState } from 'react';
const cx = classNames.bind(styles);


function UserFriend() {
    const [typeFriendPage, setTypeFriendPage] = useState('pending')
    const handleSetTypePageFriend = (type) => {
        setTypeFriendPage(type)
    }
    return ( 
        <div className={cx('wrapper')}>
           <div className={cx('friend-left')}>
                <div className={cx('friendLeft-lable')}>
                    <span>Bạn bè</span>
                </div>
                <div className={cx('friendLeft-nav')}>
                    <div className={cx('friendLeft-item',{ 'active' : typeFriendPage === 'pending'})} onClick={() => handleSetTypePageFriend('pending')}>
                        <div  className={cx('friendLeft-img')}>
                            <img src={PendingFriendImg} alt='img'/>
                        </div>
                        <span>Lời mời kết bạn</span>
                    </div>
                    <div className={cx('friendLeft-item', { 'active' : typeFriendPage === 'accepted'})}  onClick={() => handleSetTypePageFriend('accepted')}>
                        <div className={cx('friendLeft-img')}>
                            <img src={FriendImg} alt='img'/>
                        </div>
                        <span>Tất cả bạn bè</span>
                    </div>
                </div>
           </div>
           <div className={cx('friend-right')}>
                <UserFriendPageChild typeFriendPage={typeFriendPage}/>
           </div>
           
          
        </div>
     );
}

export default UserFriend;