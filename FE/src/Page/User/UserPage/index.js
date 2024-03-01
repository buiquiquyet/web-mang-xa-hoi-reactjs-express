import classNames from "classnames/bind";
import styles from './UserPage.module.scss'

import NavItemOption from "./NavItemOption";
import HeaderUserPage from "./HeaderUserPage";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles)

function UserPage({children}) {
    const { userId } = useParams()
    return ( 
        <div className={cx('wrapper')}>
                
            <HeaderUserPage userId={userId}/>  
            <NavItemOption userId={userId}/>
            {children}
        </div>
     );
}

export default UserPage;