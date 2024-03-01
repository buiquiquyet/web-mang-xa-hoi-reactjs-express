import HeadelessTippy from '@tippyjs/react/headless';
import { Wrapper } from '../../../../Popper';
import classNames from 'classnames/bind';
import MenuUser from '../../../../MenuHeader/MenuUser';
import styles from './HeaderUserNavItem.module.scss'
import { memo } from 'react';
const cx = classNames.bind(styles);

function HeaderUserNavItem({children}) {
    return ( 
        <HeadelessTippy
            render={attrs => (
                <div className={cx('info-result')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        <MenuUser data={''}/>
                    </Wrapper>
                </div>
        )}
        interactive   
        placement="top"
        trigger='click'
    >
        {children}
    </HeadelessTippy>
     );
}

export default memo(HeaderUserNavItem);