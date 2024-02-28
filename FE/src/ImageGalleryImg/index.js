import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { LogoClose } from '../Icon';
import classNames from 'classnames/bind';
import styles from './ImageGalleryImg.module.scss';
import { memo } from 'react';
const cx = classNames.bind(styles);

function ImageGalleryImg({handleCloseSlide, imageSlide, currentIndex, isOpenSlide}) {
    console.log(imageSlide);
    return ( 
        <div  className={cx('image-gallery-slide')}>
            <div className={cx('image-slide--logo')} onClick={handleCloseSlide}>
                <LogoClose className={cx('logo')}/>
            </div>
            <ImageGallery
                className={cx('image-gallery-slide')}
                items={imageSlide}
                showFullscreenButton={false} // Ẩn nút toàn màn hình
                showPlayButton={false} // Ẩn nút chạy tự động
                showThumbnails={false} // Ẩn các thumbnails
                autoPlay={false} // Tắt chế độ chạy tự động
                slideInterval={2000} // Thời gian chuyển ảnh trong slide (đơn vị là miliseconds)
                startIndex={currentIndex} // Chỉ số ảnh mặc định khi mở slide
                isOpen={isOpenSlide} // Trạng thái mở của slide show
                useBrowserFullscreen={true}
            />
        </div>
     );
}

export default memo(ImageGalleryImg);