
import classNames from "classnames/bind";
import styles from './DefaultLayout.module.scss'
import Header from "../Components/Header";
import SideBarLeft from "../Components/SideBarLeft";
import SideBarRight from "../Components/SideBarRight";
import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../../App";
import { MyContextSocket } from "../../..";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles)
function DefaultLayout({children}) {
    const location = useLocation()
    const scrollRef = useRef(null);
    const [checkUserOnline, setCheckUserOnline] = useState(false)

    const [newMesseger, setNewMesseger] = useState(null)

    const {socket } = useContext(MyContextSocket)

    const {dataUser } = useContext(MyContext)
     useEffect(() => {
        if (scrollRef.current ) {
            scrollRef.current.scrollIntoView({
                top: 0,
                behavior: 'smooth'
              });
        }
      }, [location]);
    useEffect(() => {
        if(dataUser) {
            socket.on('newMesseger', (messeger) => {
                if(messeger) {
                    setNewMesseger(messeger) 
                }
            });
           
            socket.on('userStatus', (status) => {
                if(status) {
                    setCheckUserOnline(!checkUserOnline)
                }});
            return () => {
                socket.off('newMesseger');
                socket.off('userStatus');
            };
        }
    }, [socket, dataUser, checkUserOnline]);
    return ( 
        <div className={cx('wrapper')} ref={scrollRef}>
            <div className={cx('header')}>
                <Header newMesseger={newMesseger}/>  
            </div>
            <div className={cx('app-content')}>
                <div className={cx('left')}>
                    <SideBarLeft/>
                </div>
                <div className={cx('content')}>
                    { children }
                </div>
                <div className={cx('right')}>
                    <SideBarRight newMesseger={newMesseger} checkUserOnline={checkUserOnline}/>
                </div>
            </div>
        </div>
     );
}

export default DefaultLayout;