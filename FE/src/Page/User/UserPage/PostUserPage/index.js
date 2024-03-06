import classNames from 'classnames/bind';
import styles from './PostUserPage.module.scss';
import LeftPostUserPage from './LeftPostUserPage';
import RightPostUserPage from './RightPostUserPage';
import StickyBox from 'react-sticky-box';
import { useParams } from 'react-router-dom';
import { memo, useContext } from 'react';
import { MyContext } from '../../../../App';

const cx = classNames.bind(styles);

function PostUserPage() {
    
    const { userId } = useParams()
    const { dataUser } = useContext(MyContext)
    return (
        <div className={cx('wrapper')}>
            {/* <StickyBox style={{width:'42%'}} offsetTop={116} > */}
            <StickyBox style={{width:'42%'}}  >
                <div className={cx('leftPostUser')}>
                    <LeftPostUserPage userId={userId} dataUser={dataUser} />
                </div>
            </StickyBox>
            <div className={cx('rightPostUser')}>
                <RightPostUserPage  userId={userId} dataUser={dataUser}/>
            </div>
        </div>
    );
}

export default memo(PostUserPage);
