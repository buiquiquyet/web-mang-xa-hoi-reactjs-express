import classNames from 'classnames/bind';
import styles from './PostBoxFb.module.scss';
import { LogoClose } from '../Icon';
import { Upload, message } from 'antd';
import { useContext, useRef, useState } from 'react';
import userNoneImg from './../Img/userNone.png'
import imageImg from './../Img/imageImg.png'
import { MyContext } from '../App';
import ImgCrop from 'antd-img-crop';
import * as ServicePostApi from './../apiServices/postAPI'
const cx = classNames.bind(styles);
function PostBoxFb({ImageUrlPath, imageAvartar, onClickShowHideModal, onClickCheckToFecth, typePost}) {
    const {dataUser} = useContext(MyContext)
    const [dataPost, setDataPost] = useState('')
    const [fileList, setFileList] = useState([ ]);
    const inputRef = useRef()
    
    const handleInputComment = () => {
       
        setDataPost(inputRef.current.textContent)
    }  
    const onChange = ({ fileList: newFileList }) => {
        // console.log(1, newFileList);
        if(typePost === 'avartar' || typePost === 'cover') {
            setFileList(newFileList.slice(0, 1));
            return 
        }
        setFileList(newFileList.slice(0, 8));
      };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src && file.preview) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const imgWindow = window.open(src);
        imgWindow?.document.write(`<img src="${src}" alt="Preview" style="max-width: 100%; max-height: 100%;" />`);
      };
     
    const handleUpload = async () => {
       
        if(fileList.length === 0) {
            const rs = await ServicePostApi.postText(localStorage.getItem('tokenFb'), {content: dataPost, typePost: typePost})
            onClickCheckToFecth()
            onClickShowHideModal()
            if(rs.success) {
                message.success(rs.success)
                return 
            }
            message.error(rs.error)
            return
        }else {
            const formData = new FormData();
            formData.append('content', dataPost)
            formData.append('typePost', typePost)

            fileList.forEach((file) => {
                formData.append('images', file.originFileObj);
            });
            if(fileList.length === 1) {
                const rs = await ServicePostApi.postSingleImage(localStorage.getItem('tokenFb'), formData)
                onClickCheckToFecth()    
                onClickShowHideModal()
                if(rs.success) {
                    message.success(rs.success)
                    return 
                }
                message.error(rs.error)
                return
            }
            const rs = await ServicePostApi.postMultipleImage(localStorage.getItem('tokenFb'), formData)
            onClickCheckToFecth()
            onClickShowHideModal()
            if(rs.success) {
                message.success(rs.success)
                return 
            }
            message.error(rs.error)
            return
        }
    }; 
   
    
    return ( 
        <div className={cx('posts-modal')}>
                
            <div className={cx('content-modal')}>
                <div className={cx('headerModal-post')}>
                    <div className={cx('headerModal-lable')}>
                        <span>Tạo bài viết</span>
                    </div>
                    <div className={cx('headerModal-close')} onClick={onClickShowHideModal}>
                        <LogoClose className={cx('headerModal-icon')}/>
                    </div>
                </div>
                <div className={cx('Modal-person')}>
                    <div className={cx('ModalPerson-img')}>
                        <img  src={imageAvartar && Object.keys(imageAvartar).length > 0 
                                    ? ImageUrlPath+imageAvartar.url
                                    : userNoneImg}  
                                    alt='img'
                        />
                    </div>
                    <div className={cx('ModalPerson-fullname')}>
                        {dataUser && <span>{dataUser.first_name+ ' ' +dataUser.last_name}</span>}
                    </div>
                </div>
                <div className={cx('Modal-contentPost')}>
                    <div
                    contentEditable="true"
                    className={cx('input-postModal')}
                    
                    suppressContentEditableWarning={true}
                    onInput={handleInputComment}
                    ref={inputRef}
                        />
                    {
                        dataPost.length === 0 &&
                        <div className={cx('placeholder-input')}>
                            Bạn đang nghĩ gì?
                        </div>  
                    }
                    
                        {/* isCheckAddImgModal &&
                        <div className={cx('modal-loadImgVideo')}>
                            <div className={cx('loadImgVideo-app')}>
                                <div className={cx('loadImg-div')}>
                                    <div className={cx('loadImg-iconImg')}>

                                    </div>
                                </div>
                                <div className={cx('loadImg-lable')}>
                                    <span>Thêm ảnh/video</span>
                                </div>
                                <div className={cx('loadImg-close')}  onClick={() => handleShowHideAddImgModal(false)}>
                                    <LogoClose  className={cx('loadImg-icon')}/>
                                </div>
                            </div>
                        </div> */}
                    
                            
                        <div style={{width: '100%', textAlign:'center'}}>
                            <ImgCrop>
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    multiple 
                                    accept="image/*,video/*"
                                >
                                    {
                                        fileList.length < (typePost !=='normal' ? 1 : 8) && 
                                        <div className="custom-upload-button">
                                            <span>+ Ảnh/Video</span>
                                        </div>
                                    }
                                   
                                
                                </Upload>
                            </ImgCrop>
                        </div>
                        
                    
                </div>
                <div className={cx('modal-addImg')}>
                    <span>Thêm vào bài viết của bạn</span>
                    <div className={cx('modal-img')} >
                        <img src={imageImg} alt='img'/>
                    </div>
                </div>
                <div className={cx('modal-submitBtn', {'modal-submitBtn--disabled': dataPost.length === 0 && fileList.length === 0})}
                    onClick={ dataPost.length === 0 && fileList.length === 0 ? null : handleUpload}>
                    <span>Đăng</span>
                </div>
            </div>
        </div>
     );
}

export default PostBoxFb;