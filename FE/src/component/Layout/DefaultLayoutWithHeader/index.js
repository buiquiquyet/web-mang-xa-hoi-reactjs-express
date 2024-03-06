
import classNames from "classnames/bind";
import styles from './DefaultLayoutWithHeader.module.scss'
import Header from "../Components/Header";
import { useContext, useEffect, useState } from "react";
import { MyContextSocket } from "../../..";
import { MyContext } from "../../../App";
const cx = classNames.bind(styles)
function DefaultLayoutWithHeader({children}) {
    

    const [newMesseger, setNewMesseger] = useState(null)

    const {socket } = useContext(MyContextSocket)

    const {dataUser } = useContext(MyContext)
    
    useEffect(() => {
        if(dataUser) {
            socket.on('newMesseger', (messeger) => {
                if(messeger) {
                    setNewMesseger(messeger) 
                }
            });
            return () => {
                socket.off('newMesseger');
            };
        }
    }, [socket, dataUser]);
    return ( 
        <div className={cx('wrapper')}>
            <Header newMesseger={newMesseger}/>  
            <div className={cx('content')}>
                { children }
            </div>
            
        </div>
     );
}

export default DefaultLayoutWithHeader;