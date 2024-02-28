
import classNames from "classnames/bind";
import styles from './ImagePage.module.scss'
import * as ServicePostApi from './../../../../apiServices/postAPI'
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../../App";
import ImageGalleryImg from "../../../../ImageGalleryImg";
const cx = classNames.bind(styles)


function ImagePage() {
    const {ImageUrlPath} = useContext(MyContext)
    const [showDataPost, setShowDataPost] = useState({})

    const [imageSlide, setImageSlide] = useState([])
    const [isOpenSlide, setIsOpenSlide] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleCloseSlide = () => {
        setIsOpenSlide(false);
       
    };
    const handleShowImageSlide = (index, images) => {
        
        const galleryImages = images.map(item => ({
            original: ImageUrlPath+item.url,
            thumbnail: ImageUrlPath+item.url,
        }));
        setImageSlide(galleryImages)
        setCurrentIndex(index);
        setIsOpenSlide(true)
    }

    const fecthPostByUser = async ( token ) => {
        const rs = await ServicePostApi.showPostByUser(token)
        if(rs.result.posts.length > 0) {
            setShowDataPost(rs.result.images.flat())
        }
    }
    useEffect(() => {
        fecthPostByUser(localStorage.getItem('tokenFb'))
    },[])
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header-friend')}>
                    <div className={cx('header-lable')}>
                        <span>Ảnh</span>
                    </div>
                    
                </div>
                <div className={cx('all-friend')}>
                    <div className={cx('allFriend-lable')}>
                        <span>Ảnh của bạn</span>
                    </div>
                </div>
                <div className={cx('Image-nav')}>
                    {
                        showDataPost.length > 0 &&
                        showDataPost.map((item, index) => (
                            <div key={index} className={cx('Image-item')} onClick={() => handleShowImageSlide(index, showDataPost)}>
                                <img src={ImageUrlPath+item.url} alt="img"/>
                            </div>
                        ))
                    }
                    
                </div>
                
            </div>
            {
                        isOpenSlide && imageSlide.length > 0 &&
                        <ImageGalleryImg
                            handleCloseSlide={handleCloseSlide}
                            imageSlide={imageSlide}
                            currentIndex={currentIndex}
                            isOpenSlide={isOpenSlide}/>
                    }
        </div>
     );
}

export default ImagePage;