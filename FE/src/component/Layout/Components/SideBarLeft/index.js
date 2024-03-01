
import style from './SideBarLeft.module.scss'
import classNames from 'classnames/bind';
import ImgFeed from './../../../../Img/ImgFeed.png'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../../App';
import * as ServicePostApi from './../../../../apiServices/postAPI'
import UserImg from './../../../../Img/userNone.png'
const cx = classNames.bind(style)
function SideBarLeft() {
    const { dataUser, ImageUrlPath } = useContext(MyContext)
    const [imageAvartar, setImageAvartar] = useState('')
    useEffect(() => {
        const fecthImgUser = async (token) => {
            const rs = await ServicePostApi.showPostByUserAvartarImg(token)
            if(rs.image && rs.image.length > 0) {
                setImageAvartar(rs.image.flat()[0].url)
               
            }
        }
        fecthImgUser(localStorage.getItem('tokenFb'))
    },[])
    return ( 
        <div className={cx('wrapper')}>
            <ul className={cx('sidebarLeft-app')}>
                <Link to={dataUser && `/userPost/${dataUser._id}`} className={cx('item-app')}>
                    <div className={cx('item-iconUser')}>
                        <img src={imageAvartar !== '' ? ImageUrlPath + imageAvartar : UserImg} alt='img'/>
                    </div>
                    <div  className={cx('item-text')}>
                        {dataUser  && <span>{dataUser.first_name + ' ' +  dataUser.last_name} </span>}
                    </div>
                </Link>
                <Link to={`/friendPage`}className={cx('item-app')}>
                    <div className={cx('item-iconFriend')}>
                    </div>
                    <div className={cx('item-text')}>
                        <span>Bạn bè</span>
                    </div>
                </Link>
                <Link to={''} className={cx('item-app')}>
                    <div className={cx('item-iconSave')}>
                    </div>
                    <div className={cx('item-text')}>
                        <span>Đã lưu</span>
                    </div>
                </Link>
                <Link to={''}className={cx('item-app')}>
                    <div className={cx('item-iconMemory')}>
                    </div>
                    <div className={cx('item-text')}>
                        <span>Kỷ niệm</span>
                    </div>
                </Link>
                <Link to={''} className={cx('item-app')}>
                    <div className={cx('item-iconGroup')}>

                    </div>
                    <div className={cx('item-text')}>
                        <span>Nhóm</span>
                    </div>
                </Link>
                <Link to={''}className={cx('item-app')}>
                    <div className={cx('item-iconVideo')}>
                    </div>
                    <div className={cx('item-text')}>
                        <span>Video</span>
                    </div>
                </Link>
                <Link to={''} className={cx('item-app')}>
                    <div className={cx('item-iconMarket')}>
                    </div>
                    <div className={cx('item-text')}>
                        <span>Marketplace</span>
                    </div>
                </Link>
                <Link to={''} className={cx('item-app')}>
                    <div className={cx('item-iconFeed')}>
                        <img style={{ width: '36px', height:'36px'}} src={ImgFeed} alt='img'/>

                    </div>
                    <div className={cx('item-text')}>
                        <span>Bảng feed</span>
                    </div>
                </Link>
                <Link to={''} className={cx('item-app')}>
                    <div className={cx('item-iconEvent')}>
                    </div>
                    <div className={cx('item-text')}>
                        <span>Sự kiện</span>
                    </div>
                </Link>
            </ul>
        </div>
     );
}

export default SideBarLeft;