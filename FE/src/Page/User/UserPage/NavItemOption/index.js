import classNames from "classnames/bind";
import styles from './NavItemOption.module.scss'
import { useContext, useEffect, useRef, useState } from "react";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import userNoneImg from './../../../../Img/userNone.png'

import { MyContext } from "../../../../App";
import * as ServicePostApi from './../../../../apiServices/postAPI'

const cx = classNames.bind(styles)
function NavItemOption() {
    const {ImageUrlPath} = useContext(MyContext)
    const {typePage, dataUser} = useContext(MyContext)
    
    const [isSticky, setIsSticky] = useState(false);
    const componentRef = useRef(null);

    const [imageAvartar, setImageAvartar] = useState({})

    const handleScroll = () => {
        const { top } = componentRef.current.getBoundingClientRect();
        setIsSticky(top === 54);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const fecthImageAvartarCover = async (userId) => {
            const imageAvartar = await ServicePostApi.showPostByUserAvartarCover(userId, {typePost: 'avartar'})
            if(imageAvartar.success) {
                if(imageAvartar.result.image.length > 0) {
                    setImageAvartar(imageAvartar.result.image[0])
                }
            }
        }
        fecthImageAvartarCover(localStorage.getItem('tokenFb'))
    },[])
    return ( 
       <StickyBox   offsetTop={54} style={{backgroundColor:'white', zIndex:1 }}>
            <div ref={componentRef} className={cx('navbar-option')}>
                {
                    isSticky ? 
                    <div className={cx('nav-list')}>
                        <div className={cx('headerFixed-person')}>
                            <img  
                                src={Object.keys(imageAvartar).length > 0 
                                ? ImageUrlPath+imageAvartar.url
                                : userNoneImg} 
                                alt="img"
                                
                                />
                            <span>{ dataUser && dataUser.first_name + ' ' + dataUser.last_name}</span>
                        </div>
                    </div>
                    :
                    <div className={cx('nav-list')}>
                        <Link to={'/userPost'} className={cx('list-item', {'ative-item': 'userPost' === typePage})} >
                            <span>Bài viết</span>
                        </Link>
                        <Link to={''} className={cx('list-item', {'ative-item': '' === typePage})}>
                            <span>Giới thiệu</span>
                        </Link>
                        <Link to={'/userFriend'} className={cx('list-item', {'ative-item': 'userFriend' === typePage})}>
                            <span>Bạn bè</span>
                        </Link>
                        <Link to={'/userImage'} className={cx('list-item', {'ative-item': 'userImage' === typePage})}>
                            <span>Ảnh</span>
                        </Link>
                        <Link to={'/userVideo'} className={cx('list-item', {'ative-item': 'userVideo' === typePage})}>
                            <span>Video</span>
                        </Link>
                    </div>
                }
            </div>
       </StickyBox>
     );
}

export default NavItemOption;