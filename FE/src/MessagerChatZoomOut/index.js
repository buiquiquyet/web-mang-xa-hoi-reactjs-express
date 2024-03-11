import classNames from "classnames/bind";
import styles from './MessagerChatZoomOut.module.scss'
import { LogoClose } from "../Icon";
import userNoneImg from './../Img/userNone.png'
import { setMessItem, zoomOutHideToMessItem } from "../Reducer/useReducerMessager/actions";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import * as ServiceUserApi from './../apiServices/userAPI'
import * as ServicePostApi from './../apiServices/postAPI'
import { MyContext } from "../App";
import Tippy from "@tippyjs/react";
const cx = classNames.bind(styles)

function MessagerChatZoomOut({style, id}) {
    const dispatch = useDispatch()
    const {ImageUrlPath} = useContext(MyContext)
    const [fullNameUser, setFullNameUser] = useState(null)
    const [avartarImg, setAvartarImg] = useState(null)

    const handleCloseZoomOutHide = (id) => {
        dispatch(zoomOutHideToMessItem(id))
        dispatch(setMessItem(id))
    }
    const handleCloseZoomOut = (id) => {
        dispatch(zoomOutHideToMessItem(id))
    }

    const fecthNameUser = async (userId) => {
        const rs = await ServiceUserApi.getNameUser(userId)
        if(rs.success) {
            setFullNameUser(rs.data)
        }
    }
    const fecthAvartarUser = async (userId) => {
        const rs = await ServicePostApi.showPostByUserAvartarCover({userId, typePost: 'avartar'})
        if(rs.success) {
            setAvartarImg(rs.result.image[0]);
        }
    }
    useEffect(() => {
        fecthNameUser(id)
        fecthAvartarUser(id)
    }, [id])
    return ( 
        <div style={style} className={cx('messager-zoomOut')}>
                <div className={cx('zoomOut-icon')} onClick={() => handleCloseZoomOut(id)} >
                        <LogoClose className={cx('icon')}/>
                </div>
                <Tippy
                    content={
                        <span>{fullNameUser && fullNameUser.first_name + ' ' + fullNameUser.last_name}</span>
                    }
                >
                    <div className={cx('zoomOut-img')} onClick={() => handleCloseZoomOutHide(id)}>
                        <img src={avartarImg
                            ? ImageUrlPath + avartarImg.url
                            : userNoneImg} alt='img'/>
                    </div>
                </Tippy>
        </div>
     );

}

export default MessagerChatZoomOut;