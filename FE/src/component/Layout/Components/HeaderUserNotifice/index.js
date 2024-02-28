import HeadelessTippy from '@tippyjs/react/headless';
import { Wrapper } from '../../../../Popper';
import classNames from 'classnames/bind';
import MenuNotif from '../../../../MenuHeader/MenuNotif';
import styles from './HeaderUserNotifice.module.scss'
const cx = classNames.bind(styles);

function HeaderUserNotifice({children}) {
    return ( 
        <HeadelessTippy
            render={attrs => (
                <div className={cx('info-result')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        <MenuNotif data={''}/>
                    </Wrapper>
                </div>
        )}
        interactiveBorder={1}
        interactive   
        placement="top"
        trigger='click'
    >
        {children}
    </HeadelessTippy>
     );
}

export default HeaderUserNotifice;