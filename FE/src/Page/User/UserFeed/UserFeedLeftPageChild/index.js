import classNames from 'classnames/bind';
import styles from './UserFeedLeftPageChild.module.scss';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addText } from '../../../../Reducer/feedText/feedTextSlice';
import blueImg from './../../../../Img/feed/blue.jpg'
const cx = classNames.bind(styles);
function UserFeedLeftPageChild() {

    const dispatch = useDispatch()
    const [focusInput, setFocusInput] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef()
    const handleFocusInput = () => {
        setFocusInput(!focusInput)
    }
    const handleInput = () => {
        setInputValue(inputRef.current.textContent)
        dispatch(addText(inputRef.current.textContent))
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inputText', {'activeInputText': focusInput})}>
                <div
                    contentEditable="true"
                    className={cx('input-post', 'input-post--focus')}
                    onFocus={handleFocusInput}
                    onBlur={handleFocusInput}
                    suppressContentEditableWarning={true}
                    onInput={handleInput}
                    ref={inputRef}
                />
                {
                    inputValue.length === 0 &&
                    <div className={cx('placeholder-input')}  >
                        Bắt đầu nhập
                    </div>
                }     
            </div> 
            <div className={cx('inputText', 'input-post')}>
                <span>Phông nền</span>
                <div className={cx('color-feed')}>
                    <div className={cx('colorFeed-img')}>
                        <img className={cx('activeImg')} src={blueImg} alt='img'/>
                    </div>
                    <div className={cx('colorFeed-img')}>
                        <img src={blueImg} alt='img'/>
                    </div>
                    <div className={cx('colorFeed-img')}>
                        <img src={blueImg} alt='img'/>
                    </div>
                    <div className={cx('colorFeed-img')}>
                        <img src={blueImg} alt='img'/>
                    </div>
                    <div className={cx('colorFeed-img')}>
                        <img src={blueImg} alt='img'/>
                    </div>
                    <div className={cx('colorFeed-img')}>
                        <img src={blueImg} alt='img'/>
                    </div>
                    <div className={cx('colorFeed-img')}>
                        <img src={blueImg} alt='img'/>
                    </div>
                    <div className={cx('colorFeed-img')}>
                        <img src={blueImg} alt='img'/>
                    </div>
                    <div className={cx('colorFeed-img')}>
                        <img src={blueImg} alt='img'/>
                    </div>
                </div>
            </div>
            
        </div>
     );
}

export default UserFeedLeftPageChild;