
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import PostItem from '../../ComponentPage/PostItem';
const cx = classNames.bind(styles);


function Main() {
    return ( 
        <div className={cx('wrapper')}>
           <PostItem/>
           <PostItem/>
           <PostItem/>
           <PostItem/>
           <PostItem/>
           <PostItem/>
           <PostItem/>
           <PostItem/>
           <PostItem/>
           <PostItem/>
           <PostItem/>
           <PostItem/>
           <PostItem/>
          
        </div>
     );
}

export default Main;