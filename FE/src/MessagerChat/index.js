import classNames from "classnames/bind";
import styles from './MessagerChat.module.scss'
import { LogoClose, LogoSend } from "../Icon";
import testImg from './../Img/test3.jpg';
import { deletetMessItem, zoomOutMessItem } from "../useReducerMessager/actions";
import { useRef, useEffect } from "react";
import { LogoZoomOut } from "../Icon";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles)
const newArray = Array.from({ length: 50 }, (_, index) => index + 1);

function MessagerChat({ id, style }) {
    const dispatch = useDispatch()
    const contentRef = useRef(null);
    const inputRef = useRef(null)
    useEffect(() => {

        if (contentRef.current) {
            inputRef.current.focus()
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, []);
    const handleCloseMessager = (id) => {
        // dispatch(setMess(false))
        dispatch(deletetMessItem(id))
    }
    const handleZoomOut = (id) => {
        dispatch(zoomOutMessItem(id))
    }
    return ( 
        <div  className={cx('wrapper')} style={style}>
            
            <div className={cx('header-chat')}>
                <div className={cx('chat-person')}>
                    <img src={testImg} alt="img"/>
                    <span>{id}</span>
                </div>
                <div className={cx('icon-header')}>
                    <div className={cx('icon-closeZoomOut')} onClick={() => handleZoomOut(id)}>
                        <LogoZoomOut className={cx('icon')}/>
                    </div>
                    <div className={cx('icon-closeZoomOut')}  onClick={() => handleCloseMessager(id) }>
                        <LogoClose className={cx('icon')} />
                    </div>
                </div>
            </div>
            <div className={cx('content-chat')} ref={contentRef} >
                {
                    newArray.map((item, index) => (
                        <div key={index}>
                            abcd
                        </div>
                    ))
                }
            </div>
            <div className={cx('footer-chat')}>
                <div className={cx('chat-input')}>
                    <div
                        ref={inputRef}
                        className={cx('input')}
                        contentEditable="true"
                        // onInput={handleChangeDivEdit}
                        suppressContentEditableWarning={true}
                        data-placeholder="Aa"
                        // dangerouslySetInnerHTML={{ __html: dataEditComment ? dataEditComment.Discriptions : '' }}
                    ></div>
                
                </div>
                <div className={cx('button-sendChat')}>
                    <LogoSend className={cx('icon-send')}/>
                </div>
            </div>
              
               
            
        </div>
     );
}

export default MessagerChat;