import classNames from 'classnames/bind';
import styles from './UserViewFeed.module.scss';
import { LogoPlus } from '../../../Icon';
import userNoneImg from './../../../Img/userNone.png'
import { Link, useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import * as ServiceFeedApi from './../../../apiServices/feedAPI'
import * as ServiceUserApi from './../../../apiServices/userAPI'
import * as ServicePostApi from './../../../apiServices/postAPI'
import { MyContext } from '../../../App';
import UserViewRightFeed from './UserViewRightFeed';
import { useDispatch, useSelector } from 'react-redux';
import {  LoadingIsCheckFeedSlice, LoadingStatusSlice } from '../../../redux/selector';
import { addIsCheckFeed, addLoadingDone, addTotalNewFeedCount } from '../../../Reducer/loadingSlice';

const cx = classNames.bind(styles);


function UserViewFeed() {
    const {idFeed} = useParams()
    const loadingStatusSlice = useSelector(LoadingStatusSlice)
    const loadingIsCheckFeedSlice = useSelector(LoadingIsCheckFeedSlice)
    const dispatch = useDispatch()
    const {dataUser,ImageUrlPath} = useContext(MyContext)
    const [dataFeedByUserId, setDataFeedByUserId] = useState([])
    const [dataNameUser, setDataNameUser] = useState([])
    const [totalFeed, setTotalFeed] = useState([])
    const [dataEachUser, setDataEachUser] = useState([])
    const [itemFeed, setItemFeed] = useState({})

    const handleShowViewRight = (item, index) => {
        setItemFeed(item)
        dispatch(addLoadingDone(index))
    }
    const fecthNameImageUser = async (userId) => {
        const names = await ServiceUserApi.getNameUser(userId)
        const imageAvartar = await ServicePostApi.showPostByUserAvartarCover({typePost: 'avartar', userId: userId})
        const status = await ServiceFeedApi.getByStatusFeed(userId)
        
        if(imageAvartar.success && names.success) {
            if(imageAvartar.result.image.length > 0) {
                return { idUser: userId,
                        name:  names.data.first_name +' ' +  names.data.last_name, 
                        image: imageAvartar.result.image[0].url,
                        isCheck: status.success ? false : true,
                        totalNewFeed: status.success ? status.total : 0
                    }
            }
        }
        return { idUser: userId,
                name: names.data.first_name +' ' +  names.data.last_name, image: null,
                isCheck: status.success ? false : true,
                totalNewFeed: status.success ? status.total : 0
            }
    }
    // useEffect(() => {
    //     const fecthNameImageFirst = async (idFeed) => {
    //         const rs = await fecthNameImageUser(idFeed)
    //         if(rs) {
    //             setItemFeed(rs)
    //         }
    //     }
    //     fecthNameImageFirst(idFeed)
    // }, [idFeed])
    useEffect(() => {
        if(dataUser){
            const fetchFeedByUserId = async (userId) => {
                const rs = await ServiceFeedApi.getByUserId(userId)
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
                   return fecthNameImageUser(item)
                })
                const totalFeed = idUser.map(async(item) => {
                    const total = await ServiceFeedApi.countByUserId(item)
                    if(total.success) {
                        return { idUser: item, total: total.total}
                    }
                })
                const [dataNameUser, totalFeeds] = await Promise.all([Promise.all(fullnames), Promise.all(totalFeed)]);
                if(totalFeeds) {
                    totalFeeds.forEach((item, index) => {
                        if(item.idUser === idFeed) {
                            const temp = totalFeeds[index];
                            totalFeeds[index] = totalFeeds[0];
                            totalFeeds[0] = temp;
                        }
                    })
                    setTotalFeed(totalFeeds)
                }
                if(dataNameUser) {
                    dataNameUser.forEach((item, index) => {
                        if(item.idUser === idFeed) {
                            const temp = dataNameUser[index];
                            dataNameUser[index] = dataNameUser[0];
                            dataNameUser[0] = temp;
                        }
                    })
                    setDataNameUser(dataNameUser)
                }
            }
        }
        fecthNamUser(dataFeedByUserId)
    }, [dataFeedByUserId, idFeed])
    useEffect(() => {
        console.log('data', dataNameUser);
        console.log('loadingIsCheckFeedSlice', loadingIsCheckFeedSlice);
        if(dataNameUser && dataNameUser.length > 0 && loadingIsCheckFeedSlice) {
            const newDataNameUser = dataNameUser.map(item => {
                if(item.idUser === loadingIsCheckFeedSlice  ) {
                    return { ...item, isCheck: true };
                }
                return item
            })
            if (JSON.stringify(newDataNameUser) !== JSON.stringify(dataNameUser)) {
                setDataNameUser(newDataNameUser);
            }
        }
    }, [dataNameUser, loadingIsCheckFeedSlice])
    console.log(dataNameUser);
    const renderRightViewFeed =  useCallback((itemFeed, totalFeed, length) => {
        if(dataEachUser.length > 0 && 
            itemFeed && Object.keys(itemFeed).length > 0 && 
            totalFeed && totalFeed.length > 0) 
            {
            const total = totalFeed.filter((item) => {
                return item.idUser === itemFeed.idUser && item.total
            })

            return  <UserViewRightFeed data={dataEachUser}  item={itemFeed} total={total[0].total} lengthFeed={length}  />
        }
    }, [ dataEachUser])
    useEffect(() => {
        const fecthByEachUserId = async (userId) => {
            const rs = await ServiceFeedApi.getByEachUserId(userId)
            if(rs.success) {
                setDataEachUser(rs.data)
            }
        }
        if(itemFeed && Object.keys(itemFeed).length > 0 ) {
            fecthByEachUserId(itemFeed.idUser)
        }
    }, [itemFeed])
    useEffect(() => {
        if(dataNameUser && dataNameUser.length > 0 
            && loadingStatusSlice < dataNameUser.length 
            && !loadingIsCheckFeedSlice) {
            setItemFeed(dataNameUser[loadingStatusSlice])
        }
       
    },[loadingStatusSlice, dataNameUser, dispatch, loadingIsCheckFeedSlice])
    useEffect(() => {
        return () => {
            dispatch(addLoadingDone(0))
            dispatch(addIsCheckFeed(''))
            dispatch(addTotalNewFeedCount(0))
        }
    }, [dispatch]); 
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('friend-left')}>
                <div className={cx('friendLeft-lable')}>
                    <span>Tin</span>
                </div>
                <Link to={'/feedPage'} className={cx('left-addSelf')}>
                    <div className={cx('add-feedSelf')}>
                        <LogoPlus />
                    </div>
                    <div className={cx('add-text')}>
                        <span className={cx('text-main')}>Tạo tin</span>
                        <span>Bạn có thể chia sẻ ảnh hoặc viết gì đó.</span>
                    </div>
                </Link>
                <div className={cx('left-navFeed')} >
                    <span className={cx('left-lableNav')}>Tất cả các tin</span>
                    {
                        dataNameUser.map((item, index) => (
                            <div 
                                key={index} 
                                className={cx('left-itemFeed',{'active-left': item.idUser === itemFeed.idUser})} 
                                onClick={() => handleShowViewRight(item, index)}
                            >
                                <div className={cx('item-img')}
                                    style={{border: `3px solid ${item.isCheck  ? '#CED0D4' : 'var(--primary)'}`}}
                                >
                                    <img src={item.image
                                    ? ImageUrlPath+item.image
                                    : userNoneImg} alt='img'/> 
                                </div>
                                <div className={cx('item-fullname')}>
                                    <span>{item.name}</span>
                                    <span  className={cx('item-total')}>
                                        {
                                            !item.isCheck  &&
                                            item.totalNewFeed + ' ' +
                                            'tin mới'
                                        }
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
           </div>
           {
                renderRightViewFeed(itemFeed, totalFeed, dataNameUser.length)
           }

            
           
        </div>
     );
}

export default UserViewFeed;