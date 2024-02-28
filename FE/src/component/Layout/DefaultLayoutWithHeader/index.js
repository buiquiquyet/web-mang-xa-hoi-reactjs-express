
import classNames from "classnames/bind";
import styles from './DefaultLayoutWithHeader.module.scss'
import Header from "../Components/Header";
const cx = classNames.bind(styles)
function DefaultLayoutWithHeader({children}) {
    
    return ( 
        <div className={cx('wrapper')}>
            <Header/>  
            
            <div className={cx('content')}>
                { children }
            </div>
            
        </div>
     );
}

export default DefaultLayoutWithHeader;