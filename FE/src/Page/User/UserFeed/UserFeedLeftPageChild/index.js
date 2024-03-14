import classNames from 'classnames/bind';
import styles from './UserFeedLeftPageChild.module.scss';
import {  useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIndexImg, addText } from '../../../../Reducer/feedText/feedTextSlice';
import { imgFeedArr } from '../imgFeed';
import { FeedSlice } from '../../../../redux/selector';
const cx = classNames.bind(styles);



function UserFeedLeftPageChild() {

    const feedSlice = useSelector(FeedSlice)
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
    const handleSliceImgIndex = ( index) => {
        dispatch(addIndexImg(index))
    }
    return ( 
        <div className={cx('wrapper')}>
            <div  
                className={cx('inputText', 
                        {'activeInputText': focusInput},
                        {'activeInputTextError': feedSlice.text.length === 0 && feedSlice.checkInputText > 0 && !focusInput}
                        )}
            >
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
                    <div className={cx('placeholder-input')}   >
                        Bắt đầu nhập
                    </div>
                }     
            </div> 
            <div className={cx('inputText', 'input-post')}>
                <span>Phông nền</span>
                <div className={cx('color-feed')}>
                    {
                        imgFeedArr.map((item, index) => (
                            <div 
                                key={index} 
                                className={cx('colorFeed-img')} 
                                onClick={() => handleSliceImgIndex( index)}
                            >
                                <img className={cx({'activeImg': feedSlice.indexImg === index})} src={item} alt='img'/>
                            </div>
                        ))
                    }
                   
                </div>
            </div>
            
        </div>
     );
}

export default UserFeedLeftPageChild;