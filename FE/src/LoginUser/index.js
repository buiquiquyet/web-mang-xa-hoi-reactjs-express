import classNames from "classnames/bind";
import styles from './LoginUser.module.scss'
import logoLoginImg from './../Img/loginLogo.svg'
import { Link } from "react-router-dom";
import {  useRef, useState } from "react";
import { LogoClose } from "../Icon";
import * as ServiceUserApi from './../apiServices/userAPI/index'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)
const dayBirth = Array.from({ length: 31 }, (_, index) => index + 1);
const monthBirth = Array.from({ length: 12 }, (_, index) => index + 1);
const currentYear = new Date().getFullYear();
const yearBirth = [];
for (let year = 1930; year <= currentYear; year++) {
    yearBirth.push(year);
}
function LoginUser() {
    const navigate = useNavigate();
    const [showHidePass, setShowHidePass] = useState(true)
    const [showHideModal, setShowHideModal] = useState(false)
    const [genderSelect, setGenderSelect] = useState('');
    //login
    const usernameLoginRef = useRef()
    const passWordLoginRef = useRef()
    //register
    const dayRef = useRef()
    const monthRef = useRef()
    const yearRef = useRef()
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const passWordRef = useRef(null)
    const emailRef = useRef(null)
    const [checkEmailRegister, setCheckEmailRegister] = useState();
    const [checkFirstNameRegister, setCheckFirstNameRegister] = useState('');
    const [checkLastNameRegister, setCheckLastNameRegister] = useState('');
    const [checkPassRegister, setCheckPassRegister] = useState(true);
    
    const handleShowHidePass = () => {
        setShowHidePass(!showHidePass)
    }
    const handleShowModal = () => {
        setShowHideModal(!showHideModal)
    }
    const handleGenderSelect = (e) => {
        setGenderSelect(e.target.value)
    }
    const handleRegister = async () => {
        const birthDate = `${dayRef.current.value}-${monthRef.current.value}-${yearRef.current.value}`;
        const isGmail = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(emailRef.current.value);
        setCheckFirstNameRegister(firstNameRef.current.value)
        setCheckLastNameRegister(lastNameRef.current.value)
        setCheckPassRegister(passWordRef.current.value)
        if(isGmail) {
            const formData = new FormData()
            formData.append('first_name',firstNameRef.current.value);
            formData.append('last_name',lastNameRef.current.value);
            formData.append('email',emailRef.current.value);
            formData.append('password',passWordRef.current.value);
            formData.append('birthdate',birthDate);
            formData.append('gender',genderSelect);
            console.log(birthDate);
            for (const pair of formData.entries()) {
                const [key, value] = pair;
                if (value.length === 0) {
                    message.warning('Bạn cần nhập đủ các trường thông tin!');
                  return 
                } 
              }
            const rs = await ServiceUserApi.registerUser(formData)
            await message.success(rs);
            setShowHideModal(!showHideModal)
            setCheckEmailRegister(false)
        }else {
            setCheckEmailRegister(true)
        }
        
    }
    const handleLogin = async () => {
        const formData = new FormData()
        formData.append('email',usernameLoginRef.current.value);
        formData.append('password',passWordLoginRef.current.value);
        for (const pair of formData.entries()) {
            const [key, value] = pair;
            if (value.length === 0) {
                message.warning('Bạn cần nhập đủ các trường thông tin!');
              return 
            } 
          }
        const rs = await ServiceUserApi.loginUser(formData)
        if(rs.success === 'success') {
            localStorage.setItem('tokenFb', rs.token)
            navigate('/')
        }else {
            message.error(rs.error);
        }
    }
    
    return ( 
        <>
        <div className={cx('wrapper')}>
            <div className={cx('left-content')}>
                <div className={cx('left-imgLogoFb')}>
                    <img  src={logoLoginImg} alt="img"/>
                </div>
                <div className={cx('left-text')}>
                    <span>Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</span>
                </div>
            </div>
            <div className={cx('right-content')}>
                <div className={cx('right-form')}>
                    <form className={cx('form-input')}>
                        <input 
                            ref={usernameLoginRef}
                            placeholder="Email hoặc số điện thoại"/>
                        <input 
                            ref={passWordLoginRef}
                            style={{paddingRight:'50px'}} 
                            type={showHidePass ? 'password' : 'text'} 
                            placeholder="Mật khẩu"/>
                        {
                            showHidePass ? 
                            <div className={cx('showPass')} onClick={handleShowHidePass}></div>
                            :
                            <div className={cx('hidePass')}  onClick={handleShowHidePass}></div>
                        }
                    </form>
                    <div className={cx('form-button')} onClick={handleLogin}>
                        <button>Đăng nhập</button>
                    </div>
                    <div className={cx('forgot-pass')}>
                        <Link to={'/'}>Quên mật khẩu?</Link>
                    </div>
                </div>
                <div className={cx('create-account')} onClick={handleShowModal}>
                    <div  className={cx('link-create')}>Tạo tài khoản mới</div>
                </div>

            </div>
            
        </div>
        {
            showHideModal &&
            <div className={cx('register-modal')}>
                
                <div className={cx('content-modal')}>
                    <div className={cx('header-register')}>
                        <div >
                            <h1>Đăng ký</h1>
                            <span>Nhanh chóng và dễ dàng</span>
                        </div>
                        <div onClick={handleShowModal}>
                            <LogoClose className={cx('close-modal')}/>
                        </div>
                    </div>
                    <div className={cx('register-text')}>
                        <div className={cx('register-name')}>
                            <div className={cx('name-input')} style={{marginRight: '12px'}}>
                                <input ref={firstNameRef} 
                                    type="text" 
                                    placeholder="Họ"
                                    style={checkFirstNameRegister && checkFirstNameRegister === '' ? {borderColor:"red" } : {}}
                                    />
                                {/* {
                                    firstNameRef && firstNameRef.current.value === '' &&
                                    <div className={cx('check-email')}>
                                        <span>Nhập đầy đủ thông tin</span>
                                    </div>
                                } */}
                            </div>
                            <div className={cx('name-input')}>
                                <input ref={lastNameRef} 
                                    type="text" 
                                    placeholder="Tên"
                                    style={checkLastNameRegister && checkLastNameRegister === '' ? {borderColor:"red" } : {}}
                                    />
                                {/* {
                                    lastNameRef && lastNameRef.current.value === '' &&
                                    <div className={cx('check-email')}>
                                        <span>Nhập đầy đủ thông tin</span>
                                    </div>
                                } */}
                            </div>
                        </div>
                        <div className={cx('register-emailPass')}>
                            <div>
                                <input ref={emailRef} 
                                    type="text" 
                                    placeholder="Email" 
                                    style={checkEmailRegister ? {borderColor:"red" } : null}/>
                            </div>
                           {
                            checkEmailRegister &&  
                            <div className={cx('check-email')}>
                                <span>Email không hợp lệ!</span>
                            </div>
                           }
                        </div>
                        <div className={cx('register-emailPass')}>
                            <div>
                                <input ref={passWordRef} 
                                    type="password" 
                                    placeholder="Mật khẩu mới"
                                    style={checkPassRegister && checkPassRegister === '' ? {borderColor:"red" } : {}}
                                    />
                                {/* {
                                    passWordRef && passWordRef.current.value === '' &&
                                    <div className={cx('check-email')}>
                                        <span>Nhập đầy đủ thông tin</span>
                                    </div>
                                } */}
                            </div>
                        </div>
                    </div>
                    <div className={cx('register-birthGender')}>
                        <div className={cx('register-lableInput')}>
                            <span>Ngày sinh</span>
                            <div className={cx('lableBirth-icon')}></div>
                        </div>
                        <div className={cx('register-input')}>
                            <select ref={dayRef}>
                                {
                                    dayBirth.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))
                                }
                            </select>
                            <select ref={monthRef}>
                                {
                                    monthBirth.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))
                                }
                            </select>
                            <select ref={yearRef}>
                                {
                                    yearBirth.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div  className={cx('register-birthGender')}>
                        <div className={cx('register-lableInput')}>
                            <span>Giới tính</span>
                            <div className={cx('lableBirth-icon')}></div>
                        </div>
                        <div className={cx('register-input')} style={{justifyContent:'center'}}>
                            <div className={cx('gender-input')} style={{marginRight: '10px'}}>
                                <span>
                                    Nữ
                                </span>
                                <input type="radio" 
                                    checked={genderSelect === 'nu'}
                                    onChange={handleGenderSelect} 
                                    value="nu"/>

                            </div>
                            <div  className={cx('gender-input')} >
                                <span>
                                    Nam
                                </span>
                                <input type="radio" 
                                    checked={genderSelect === 'nam'}
                                    onChange={handleGenderSelect} 
                                    value="nam" />

                            </div>
                        </div>
                    </div>
                    <div className={cx('register-button')} onClick={handleRegister}>
                        <button>Đăng ký</button>
                    </div>
                </div>
            </div>
        }
        
    </>
     );
}

export default LoginUser;