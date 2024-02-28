
import classNames from 'classnames/bind';
import styles from './PageNotFound.module.scss';


import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function PageNotFound() {
    
    return ( 
        <div className={cx('wrapper')}>
            <section className={cx('page_404')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>	
                    <div className={cx('col-sm-12')}>
                    <div className={cx('col-sm-10 col-sm-offset-1  text-center')}>
                    <div className={cx('four_zero_four_bg')}>
                        <h1 className={cx('text-center')}>404</h1>
                    
                    
                    </div>
                    
                    <div className={cx('contant_box_404')}>
                    <h3 className={cx('h2')}>
                    Look like you're lost
                    </h3>
                    
                    <p>the page you are looking for not avaible!</p>
                    
                    <Link to={'/'} className={cx('link_404')}>Go To Home </Link>
                    
                </div>
                    </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
     );
}

export default PageNotFound;