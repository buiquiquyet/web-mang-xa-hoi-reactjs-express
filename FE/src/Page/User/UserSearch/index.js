import classNames from 'classnames/bind';
import styles from './UserSearch.module.scss';
import userNoneImg from './../../../Img/userNone.png'
import { Link, useParams } from 'react-router-dom';
import { memo, useContext, useEffect, useState } from 'react';
import * as ServiceUserApi from './../../../apiServices/userAPI'
import * as ServicePostApi from './../../../apiServices/postAPI'
import { MyContext } from '../../../App';
const cx = classNames.bind(styles);

function UserSearch() {
    const {nameUser} = useParams()
    const {ImageUrlPath} = useContext(MyContext)

    const [dataByUserIdFriendImg, setDataByUserIdFriendImg] = useState([])
    const [dataUsers, setDataUsers] = useState([])
    useEffect(() => {
        const fecthUsers = async (nameUser) => {
            const rs = await ServiceUserApi.searchUsers(nameUser)
            if(rs.success) {
                setDataUsers(rs.data)
            }
        }
        fecthUsers(nameUser)
    }, [nameUser])
    useEffect(() => {
        if(dataUsers.length > 0) {
            const fecthImageIntroduce = async (dataUsers) => {
                const profileUsers = await Promise.all(dataUsers.map(async (item) => {
                    const imagesAvartar = await ServicePostApi.showPostByUserAvartarCover( {typePost: 'avartar', userId: item})
                    if( imagesAvartar.success ) {
                        const image = imagesAvartar.result.image.flat()[0]
                        return { image}
                    }
                }))
                if(profileUsers) {
                    setDataByUserIdFriendImg(profileUsers)
                }
            }
            fecthImageIntroduce(dataUsers)
        }
    }, [dataUsers])
    return ( 
        <div className={cx('wrapper')}>
           <div className={cx('friend-left')}>
                <div className={cx('friendLeft-lable')}>
                    <span>Kết quả tìm kiếm cho</span>
                    <span className={cx('search-value')}>{nameUser}</span>
                </div>
                <div className={cx('friendLeft-nav')}>
                    <div className={cx('friendLeft-item', 'active' )} >
                        <div className={cx('friendLeft-div')}>
                            <div  className={cx('friendLeft-img')}>
                            </div>
                        </div>
                        <span>Tất cả</span>
                    </div>
                   
                </div>
           </div>
           <div className={cx('friend-right')}>
                <div className={cx('friendRight-app')}>
                    <div className={cx('friendRight-lable')}>
                        <span>Mọi người</span>
                    </div>
                    <div className={cx('friendRight-nav')}>
                        {
                            dataUsers.length > 0 &&
                            dataUsers.map((item, index) => (
                                <Link key={index} to={`/userPost/${item._id}`} className={cx('friendRight-item')}>
                                    <img src={dataByUserIdFriendImg[index]
                                        ? ImageUrlPath + dataByUserIdFriendImg[index].image.url
                                        : userNoneImg} alt='img'/>
                                    <div className={cx('friendRight-fullname')}>
                                        <span className={cx('fullname')}>
                                            {item.first_name + ' ' + item.last_name}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        }
                       
                    </div>
                </div>
           </div>
        </div>
     );
}

export default memo(UserSearch);