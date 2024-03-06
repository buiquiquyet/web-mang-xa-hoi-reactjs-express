
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import * as ServicePostApi from './../../../apiServices/postAPI'
import { useContext, useEffect, useState } from 'react';
import PostItem from '../../ComponentPage/PostItem';
import { MyContext } from '../../../App';
const cx = classNames.bind(styles);


function Main() {
    const [showDataPost, setShowDataPost] = useState([])
    const {  ImageUrlPath } = useContext(MyContext)
    const [ImageAvartarUser, setImageAvartarUser] = useState([])

    const fecthPostByUser = async (  ) => {
        const rs = await ServicePostApi.showAllPost()
        if(rs.success) {
            setShowDataPost(rs.result)
        }
    }
    const filterImagesByPost = (images, postId) => {
        const imageByPost = images.filter((item) =>  item.postId === postId);
        return imageByPost.flat();
    };
    useEffect(() => {
        fecthPostByUser()
    },[])
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
            setImageAvartarUser(profileUsers)
        }
        if(showDataPost.length > 0 ) {
            fecthProfileUsers(showDataPost)
        }
    },[showDataPost])

    return ( 
        <div className={cx('wrapper')}>
            {
                showDataPost && showDataPost.length > 0 && 
                showDataPost.map((item, index1) => (
                    item && Object.keys(item).length > 0 && item.posts.length > 0 && (
                        item.posts.map((value, index) => (
                            <PostItem 
                                key={index}
                                imageAvartar={ImageAvartarUser[index1]?.image || {} } 
                                ImageUrlPath={ImageUrlPath}
                                dataUser={item.user} 
                                post={value} 
                                images={filterImagesByPost(item.images, value._id)} 
                                placeShow={'main'}
                            />
                        ))
                    )    

                ))
            }
        </div>
     );
}

export default Main;