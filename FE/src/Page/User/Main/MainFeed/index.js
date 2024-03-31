import classNames from 'classnames/bind';
import styles from './MainFeed.module.scss';
import UserNoneImg from './../../../../Img/userNone.png'

import { LogoFeed, LogoNext, LogoPrev } from '../../../../Icon';
import { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 
import { useNavigate } from 'react-router-dom';
import * as ServiceFeedApi from './../../../../apiServices/feedAPI'
import { MyContext } from '../../../../App';
import { imgFeedArr } from '../../UserFeed/imgFeed';
import * as ServiceUserApi from './../../../../apiServices/userAPI'
import * as ServicePostApi from './../../../../apiServices/postAPI'
const cx = classNames.bind(styles);

function MainFeed() {

    const navigate = useNavigate()
    const {dataUser, ImageUrlPath} = useContext(MyContext)
    const swiperRef = useRef(null);
    const [indexSlideImg, setIndexSlideImg] = useState(1)
    const [dataNameUser, setDataNameUser] = useState([])
    const [avartarImg, setAvartarImg] = useState(null)

    const [dataFeedByUserId, setDataFeedByUserId] = useState([])
    const goNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideNext();
        }
    };
    const goPrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slidePrev();
        }
    };
    const handleShowFeed = (index, userId) => {
        if(index === 0 && userId === '') {
            navigate('feedPage')
            return
        }
        navigate(`/viewFeedPage/${userId}`)
    }
    const handleStateSlide = (swiper) => {
        setIndexSlideImg(swiper.realIndex  + 1)
    }
    useEffect(() => {
        if(dataUser){
            const fetchFeedByUserId = async (userId) => {
                const rs = await ServiceFeedApi.getByUserId(userId)
                const rsAvatar = await ServicePostApi.showPostByUserAvartarCover({userId, typePost: 'avartar'})
                if(rsAvatar.success) {
                    setAvartarImg(rsAvatar.result.image[0]);
                }else {
                    setAvartarImg(null)
                }
                if(rs.success) {
                    setDataFeedByUserId(rs.data)
                }
            }
            fetchFeedByUserId(dataUser._id)
        }
    }, [dataUser])
    useEffect(() => {
        const fecthNamUser = async (dataFeedByUserId) => {
            if(dataFeedByUserId && dataFeedByUserId.length > 0 ) {
                const idUser = dataFeedByUserId.map(item => item.userId)
                const fullnames = idUser.map(async(item) => {
                    const names = await ServiceUserApi.getNameUser(item)
                    const imageAvartar = await ServicePostApi.showPostByUserAvartarCover( {typePost: 'avartar', userId: item})
                    if(imageAvartar.success && names.success) {
                        if(imageAvartar.result.image.length > 0) {
                            return { idUser: item,
                                    name:  names.data.first_name +' ' +  names.data.last_name, 
                                    image: imageAvartar.result.image[0].url,
                                }
                        }
                    }
                    return { idUser: item,
                            name: names.data.first_name +' ' +  names.data.last_name, image: null,
                        }
                })
                const dataNameUser = await Promise.all(fullnames)
                    setDataNameUser(dataNameUser)
                }
            }
        fecthNamUser(dataFeedByUserId)
    }, [dataFeedByUserId, dataUser])
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content-slide')}>
                <Swiper
                    grabCursor={true}
                    loop={false}
                    slidesPerView={4}
                    coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: false,
                    }}
                    spaceBetween={0}
                    pagination={true}
                    autoplay={{ delay: 2000 }}
                    className={cx('swiper')}
                    ref={swiperRef}
                    onSlideChange={handleStateSlide}
                >
                    <SwiperSlide className={cx('swiper-slide')}  onClick={() => handleShowFeed(0,'')} >
                        <div className={cx('feed-item')}>
                            <div className={cx('feedSelf')} style={{ backgroundImage: `url(${avartarImg ? ImageUrlPath + avartarImg.url : UserNoneImg})`, filter:'brightness(86%)' }}>
                            </div>
                            <div className={cx('feedDiv')}>
                                    <span>Tạo tin</span>
                                    <div className={cx('add-feed')}>
                                        <div className={cx('logo-feed')}>
                                            <LogoFeed className={cx('logoFeed-icon')}/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    {
                    dataFeedByUserId.length > 0 && 
                    dataFeedByUserId.map((item, i) => {
                    return (
                        <SwiperSlide  className={cx('swiper-slide')} key={i}  onClick={() => handleShowFeed(i, item.userId)}>
                            {
                                <div className={cx('feed-item')}>
                                    <div className={cx('feed-img')}
                                    >
                                        <img src={dataNameUser.length > 0 &&
                                        dataNameUser[i].image
                                        ? ImageUrlPath + dataNameUser[i].image
                                        : UserNoneImg} alt='img'/> 
                                    </div>
                                    <div className={cx('feedSelf')} 
                                        style={{ backgroundImage: item.type === 'text' 
                                                ? `url(${imgFeedArr[item.indexImg]})`
                                                : `url(${ImageUrlPath + item.image})`, 
                                                height:'100%' }}>
                                        {
                                            item.content &&
                                            <span>{item.content}</span>
                                        }
                                    </div>
                                    <div className={cx('feed-name')}>
                                        {dataNameUser.length > 0 && dataNameUser[i].name}
                                    </div>
                                </div>
                            }
                        </SwiperSlide>
                    );
                    })}
                </Swiper>
                {
                    dataFeedByUserId && dataFeedByUserId.length > 3 &&
                    <>
                        {
                            indexSlideImg > 1 && 
                            <button className={cx('buttonSlidePrev')} onClick={goPrev}><LogoPrev className={cx('iconSlide')}/></button>
                        }
                        <button className={cx('buttonSlideNext')} onClick={goNext}> <LogoNext className={cx('iconSlide')}/></button>
                    </>
                }
            </div>
        </div>
     );
}

export default MainFeed;