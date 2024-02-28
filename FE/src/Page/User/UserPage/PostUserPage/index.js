import classNames from 'classnames/bind';
import styles from './PostUserPage.module.scss';
import LeftPostUserPage from './LeftPostUserPage';
import RightPostUserPage from './RightPostUserPage';
import StickyBox from 'react-sticky-box';

const cx = classNames.bind(styles);

function PostUserPage() {
    

    return (
        <div className={cx('wrapper')}>
            {/* <StickyBox style={{width:'42%'}} offsetTop={116} > */}
            <StickyBox style={{width:'42%'}}  >
                <div className={cx('leftPostUser')}>
                    <LeftPostUserPage />
                </div>
            </StickyBox>
            <div className={cx('rightPostUser')}>
                <RightPostUserPage />
            </div>
        </div>
    );
}

export default PostUserPage;
