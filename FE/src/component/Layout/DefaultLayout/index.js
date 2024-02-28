
import classNames from "classnames/bind";
import styles from './DefaultLayout.module.scss'
import Header from "../Components/Header";
import SideBarLeft from "../Components/SideBarLeft";
import SideBarRight from "../Components/SideBarRight";
const cx = classNames.bind(styles)
function DefaultLayout({children}) {
    
    return ( 
        <div className={cx('wrapper')}>
            <Header/>  
            <div className={cx('app-content')}>
                <SideBarLeft/>
                <div className={cx('content')}>
                    { children }
                </div>
                <SideBarRight/>
            </div>
        </div>
     );
}

export default DefaultLayout;