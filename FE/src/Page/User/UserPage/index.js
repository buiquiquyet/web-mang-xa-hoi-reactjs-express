import classNames from "classnames/bind";
import styles from './UserPage.module.scss'

import NavItemOption from "./NavItemOption";
import HeaderUserPage from "./HeaderUserPage";
const cx = classNames.bind(styles)

function UserPage({children}) {
   
    return ( 
        <div className={cx('wrapper')}>
            
            <HeaderUserPage/>  
            <NavItemOption/>
            {children}
        </div>
     );
}

export default UserPage;