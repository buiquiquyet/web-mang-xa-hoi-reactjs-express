import classNames from 'classnames/bind';
import styles from './UserFeedLeftPageChild.module.scss';

const cx = classNames.bind(styles);
function UserFeedLeftPageChild() {

    
    return ( 
        <div className={cx('wrapper')}>
            <div
                contentEditable="true"
                className={cx('input-post', 'input-post--focus')}
                // onFocus={handleFocusComment}
                suppressContentEditableWarning={true}
                // onInput={handleInputComment}
                // ref={inputRef}
            />
            <div>

            </div>
            <div>

            </div>
            
        </div>
     );
}

export default UserFeedLeftPageChild;