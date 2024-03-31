
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import * as ServicePostApi from './../../../apiServices/postAPI'
import { useContext, useEffect, useState } from 'react';
import PostItem from '../../ComponentPage/PostItem';
import { MyContext } from '../../../App';
import PostYouThink from '../../../PostYouThink';
import PostBoxFb from '../../../PostBoxFb';
import MainFeed from './MainFeed';
// import { useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);


function Main() {
    // const location = useLocation()
    
    const [showDataPost, setShowDataPost] = useState([])
    const {  dataUser,ImageUrlPath } = useContext(MyContext)
    const [ImageAvartarUsers, setImageAvartarUsers] = useState([])

    const fecthPostByUser = async (  ) => {
        const rs = await ServicePostApi.showAllPost()
        if(rs.success) {
            setShowDataPost(rs.result)
        }
    }
    const [isCheckModal, setIsCheckModal] = useState(false)
    const [imageAvartar, setImageAvartar] = useState({})
    const [isCheckToFecth, setIsCheckToFecth] = useState(false)

    const filterImagesByPost = (images, postId) => {
        const imageByPost = images.filter((item) =>  item.postId === postId);
        return imageByPost.flat();
    };
    const handleShowHideModal = () => {
        setIsCheckModal(!isCheckModal)
    }
    const handleCheckToFecth = () => {
        setIsCheckToFecth(!isCheckToFecth)
    }
    useEffect(() => {
        fecthPostByUser()
    },[isCheckToFecth])
    useEffect(() => {
        const fecthProfileUsers = async (showDataPost) => {
            const IdUsers = showDataPost.map((item) => {
                    return item.user._id
            })
            const profileUsers = await Promise.all(IdUsers.map(async (item) => {
                const imagesAvartar = await ServicePostApi.showPostByUserAvartarCover( {typePost: 'avartar', userId: item})
                if(imagesAvartar.success) {
                    if(imagesAvartar.result.image.length > 0) {
                        const image = imagesAvartar.result.image.flat()[0]
                        return { image }
                    }
                }
            }))
            setImageAvartarUsers(profileUsers)
        }
        if(showDataPost.length > 0 ) {
            fecthProfileUsers(showDataPost)
        }
    },[showDataPost])
    
    useEffect(() => {
        if(dataUser) {
            const fecthImageAvartar = async (userId) => {
                const imageAvartar = await ServicePostApi.showPostByUserAvartarCover( {typePost: 'avartar', userId: userId})
                if(imageAvartar.success) {
                    if(imageAvartar.result.image.length > 0) {
                        setImageAvartar(imageAvartar.result.image[0])
                    }
                }
            }
            fecthImageAvartar(dataUser._id)
        }
    }, [dataUser])
    return ( 
        <div className={cx('wrapper')} >
            <MainFeed/>
            <div className={cx('postAdd')}>
                <PostYouThink 
                    ImageUrlPath={ImageUrlPath}
                    onClickShowHideModal={handleShowHideModal}
                    imageAvartar={imageAvartar} 
                />
            </div>
            {
                showDataPost && showDataPost.length > 0 && 
                showDataPost.map((item, index1) => (
                    item && Object.keys(item).length > 0 && item.posts.length > 0 && (
                        item.posts.map((value, index) => (
                            <PostItem 
                                key={index}
                                imageAvartar={ImageAvartarUsers[index1]?.image || {} } 
                                ImageUrlPath={ImageUrlPath}
                                dataUser={item.user} 
                                post={value} 
                                onClickCheckToFecth={handleCheckToFecth}
                                images={filterImagesByPost(item.images, value._id)} 
                                placeShow={'main'}
                            />
                        ))
                    )    
                ))
            }
            {
                isCheckModal && 
                <PostBoxFb
                    imageAvartar={imageAvartar} 
                    ImageUrlPath={ImageUrlPath}
                    typePost={'normal'}
                    onClickCheckToFecth={handleCheckToFecth}
                    onClickShowHideModal={handleShowHideModal}
                    placeShow={'user'}
                    />
            }
        </div>
     );
}

export default Main;