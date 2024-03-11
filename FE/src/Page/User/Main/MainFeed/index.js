import classNames from 'classnames/bind';
import styles from './MainFeed.module.scss';
import UserNoneImg from './../../../../Img/userNone.png'
import testImg from './../../../../Img/test.jpg'
import testImg2 from './../../../../Img/test1.jpg'
import testImg1 from './../../../../Img/test2.jpg'
import { LogoFeed, LogoNext, LogoPrev } from '../../../../Icon';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function MainFeed() {

    const navigate = useNavigate()
    const swiperRef = useRef(null);
    const [indexSlideImg, setIndexSlideImg] = useState(1)
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
    const slide_img = [
        1, testImg, testImg2, testImg1,testImg1
      ];
    const handleShowFeed = (index) => {
        if(index === 0) {
            navigate('feedPage')
        }
    }
    const handleStateSlide = (swiper) => {
        setIndexSlideImg(swiper.realIndex  + 1)
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content-slide')}>
                <Swiper
                    grabCursor={true}
                    // centeredSlides={true}
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
                    {slide_img.map((img, i) => {
                    return (
                        <SwiperSlide className={cx('swiper-slide')} key={i} onClick={() => handleShowFeed(i)}>
                            {
                                i === 0 
                                ?
                                <div className={cx('feed-item')}>
                                    <div className={cx('feedSelf')} style={{ backgroundImage: `url(${UserNoneImg})`, filter:'brightness(86%)' }}>
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
                                :
                                <div className={cx('feed-item')}>
                                    <div className={cx('feedSelf')} style={{ backgroundImage: `url(${img})`, height:'100%' }}>
                                    </div>
                                </div>
                            }
                        </SwiperSlide>
                    );
                    })}
                </Swiper>
                {
                    slide_img && slide_img.length > 4 &&
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