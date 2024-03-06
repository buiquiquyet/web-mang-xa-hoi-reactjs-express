import classNames from 'classnames/bind';
import styles from './FriendPage.module.scss';
import { LogoNavMore, LogoSearch } from '../../../../Icon';
import userNoneImg from './../../../../Img/userNone.png'
import HeadelessTippy from '@tippyjs/react/headless';
import * as ServiceFriendApi from './../../../../apiServices/friendAPI'
import * as ServicePostApi from './../../../../apiServices/postAPI'
import * as ServiceUserApi from './../../../../apiServices/userAPI'
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from '../../../../App';
import { Link, useParams } from 'react-router-dom';
import { message } from 'antd';

const cx = classNames.bind(styles);

function FriendPage() {

    const {userId} = useParams()
    const { dataUser, ImageUrlPath } = useContext(MyContext)
    const [statusFriend, setStatusFriend] = useState(false)
    const [userIdFriends, setUserIdFriends] = useState([])
    const [dataByUserIdFriend, setDataByUserIdFriend] = useState([])
    const [inputSearch, setInputSearch] = useState('')
    const handleChangeInputSearch = (e) => {
        setInputSearch(e.target.value)
    }
    //handle Cance add friend 
    const handleCancelAddFriend = async (userId1, userId2) => {
        const rs = await ServiceFriendApi.cancelAddFriend({userId1, userId2})
        if(rs.success) {
            message.success(rs.success)
            setStatusFriend(!statusFriend)
        }
    }
    const fecthGetAllFriend = async (userId) => {
        const rs = await ServiceFriendApi.getAllFriend(userId, 'accepted')
        if(rs.success) {
            setUserIdFriends(rs.data)
        }
    }
    useEffect(() => {
        fecthGetAllFriend(userId);
    },[userId, statusFriend])
    useEffect(() => {
        const fecthProfileUsers = async (userIdFriends) => {
            const IdUsers = userIdFriends.map((item) => {
                    if(item.userId1 === userId) return item.userId2
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
        if(userIdFriends.length > 0 ) {
            fecthProfileUsers(userIdFriends)
        }else {
            setDataByUserIdFriend([])
        }
    },[userIdFriends, userId])
    
    const filteredData = inputSearch !== '' 
    ? dataByUserIdFriend.filter(item => {
        const fullName = item.fullName;
        const fullNameString = fullName.first_name + ' ' + fullName.last_name;
        return fullNameString.toLowerCase().includes(inputSearch.toLowerCase());
    })
    : dataByUserIdFriend;

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header-friend')}>
                    <div className={cx('header-lable')}>
                        <span>Bạn bè</span>
                    </div>
                    <div className={cx('header-searchSendFriend')}>
                        <div className={cx('header-search')}>
                            <LogoSearch className={cx('search-icon')}/>
                            <input 
                                value={inputSearch}
                                onChange={handleChangeInputSearch} 
                                placeholder='Tìm kiếm...'/>
                        </div>
                        <Link to={`/friendPage`} className={cx('header-SendFriend')}>
                            <span>Lời mời kết bạn</span>
                        </Link>
                    </div>
                </div>
                <div className={cx('all-friend')}>
                    <div className={cx('allFriend-lable')}>
                        <span>Tất cả bạn bè</span>
                    </div>
                </div>
                <div className={cx('friend-nav')}>
                    {
                        filteredData.length > 0 &&
                        filteredData.map((item, index) => (
                            <div key={index} className={cx('friend-item')}>
                                <Link to={`/userPost/${item.fullName._id}`} className={cx('friend-infoPerson')}>
                                    <div className={cx('friend-img')}>
                                        <img src={item.image 
                                            ? ImageUrlPath + item.image.url
                                            : userNoneImg} alt='img'/>
                                    </div>
                                    <div className={cx('friend-name')}>
                                        <span>{item.fullName.first_name + ' ' + item.fullName.last_name}</span>
                                    </div>
                                </Link>
                                {
                                    dataUser && dataUser._id === userId &&
                                    <HeadelessTippy
                                        render={attrs => (
                                            <div className={cx('unFriend')} tabIndex="-1" {...attrs}>
                                                <div className={cx('unFriend-item')} onClick={() => handleCancelAddFriend(dataUser._id, item.fullName._id)} >
                                                    <div className={cx('unFriend-icon')}></div>
                                                    <span>Hủy kết bạn</span>
                                                </div>
                                            </div>
                                        )}
                                        interactive   
                                        trigger='click'
                                        placement="top"
                                        arrow={true}
                                    >
                                        <div className={cx('friend-icon')}>
                                            <LogoNavMore className={cx('icon')}/>
                                        </div>
                                    </HeadelessTippy>
                                }
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </div>
     );
}

export default memo(FriendPage);