import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import './Login.scss'

import { Formik } from "formik";
import * as Yup from "yup";

import profile from '../../assets/profile_pic.svg'
import axios from 'axios';
import { connect } from 'react-redux'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
// import googleIcon from '../../assets/google.svg'
import GoogleLogin from 'react-google-login';
import io from 'socket.io-client'

const socket = io('https://dtodo-indumentaria-server.herokuapp.com')

function Login(props) {

    // const { show } = props

    const [error, seterror] = useState()
    const [verify, setverify] = useState()
    const [hide, setHide] = useState(true)
    const [google_dis, setGoogle_dis] = useState(false)
    // const [message, setMessage] = useState('Inactive');
    useEffect(() => {
        const inputs = document.querySelectorAll(".input");
    
        function addcl(){
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }
    
        function remcl(){
            let parent = this.parentNode.parentNode;
            if(this.value === ""){
                parent.classList.remove("focus");
            }
        }
    
        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });

        if(localStorage.getItem('verify') === 'true') {
            document.getElementById('verify').classList.add('py-2')
            setverify('Email is sent. Please verify')
            localStorage.removeItem('verify')
        }
        
    }, [])

    const passhide = () => {
        if(!hide) {
            document.getElementsByClassName('see')[0].style.display = 'inherit'
            document.getElementsByClassName('hide')[0].style.display = 'none'
        } else {
            document.getElementsByClassName('see')[0].style.display = 'none'
            document.getElementsByClassName('hide')[0].style.display = 'inherit'
        }
        setHide(!hide)
    }

    const responseGoogle = async (response) => {
    //  console.log(response.profileObj)
        setGoogle_dis(true)
        if(response.error === 'popup_closed_by_user') {
            setGoogle_dis(false)
        } else {
            const formdata = new FormData();
            formdata.append("FirstName", response.profileObj.givenName);
            formdata.append("LastName", response.profileObj.familyName);
            formdata.append("Email", response.profileObj.email);
            formdata.append("Image", response.profileObj.imageUrl);
            formdata.append("confirmationCode", response.tokenId)
            formdata.append("Status", "Inactive");
            await axios
            .post("https://dtodo-indumentaria-server.herokuapp.com/users/new", formdata, {
                header: { "Content-Type": "multipart/form-data" },
            })
            .then(async (res) => {
                if (res.data.Users_id !== undefined) {
                    localStorage.setItem('verify', 'true')
                    window.location.href = '/loginregister'
                } else if (res.data === "Email is already registered") {            
                    // seterror(res.data);
                    var logindetails = {
                        Email: response.profileObj.email,
                        Password: null,
                        confirmationCode: response.tokenId
                    }
                    await axios.post(`https://dtodo-indumentaria-server.herokuapp.com/users/login`, logindetails).then(async (res) => {
                        if(res.data.loggedIn) {
                            var result = JSON.parse(res.data.result)
                            props.login(res.data)
                        
                            var db_val = {
                                Users_id: result[0].Users_id,
                                Status: 'Active',
                            }
                            await axios.put(`https://dtodo-indumentaria-server.herokuapp.com/users/status`, db_val)
                            socket.emit("toast", {
                                cat: "Status",
                            })
                            
                            if(localStorage.getItem('history') === '/resetpassword') {
                                localStorage.removeItem('history')
                                window.location.href = '/'
                            } else {
                                window.location.href = '/'
                                // console.log('you are loggedIn , great work')
                            }
                        } else {
                            document.getElementById('error').classList.add('py-2')
                            seterror(res.data.error)
                            setGoogle_dis(false)
                        }
                        return 0
                    })
                }
            }).catch(err => console.log(err))
            // localStorage.setItem('SingleUser', JSON.stringify(val))
            // console.log(JSON.parse(localStorage.getItem('SingleUser')))
        }
    }

    return (
        <div className="login-content">
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout( async() => {
                        setGoogle_dis(true)
                        var logindetails = {
                            Email: values.email.toLowerCase(),
                            Password: values.password
                        }
                        setverify('')
                        await axios.post(`https://dtodo-indumentaria-server.herokuapp.com/users/login`, logindetails).then(async (res) => {
                            if(res.data.loggedIn) {
                                var result = JSON.parse(res.data.result)
                                props.login(res.data)
                           
                                var db_val = {
                                    Users_id: result[0].Users_id,
                                    Status: 'Active',
                                }
                                await axios.put(`https://dtodo-indumentaria-server.herokuapp.com/users/status`, db_val, {
                                    headers: {
                                        'x-auth-token': localStorage.getItem('token')
                                    }
                                })
                                socket.emit("toast", {
                                    cat: "Status",
                                })
                             
                                if(localStorage.getItem('history') === '/resetpassword') {
                                    localStorage.removeItem('history')
                                    window.location.href = '/'
                                } else {
                                    window.location.href = '/'
                                    console.log('you are loggedIn , great work')
                                }
                            } else {
                                document.getElementById('error').classList.add('py-2')
                                seterror(res.data.error)
                                setGoogle_dis(false)
                            }
                            return 0
                        })
                        
                        setSubmitting(false);
                    }, 500);
                }}

                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required("Required"),
                    password: Yup.string()
                        .required("Required")
                })}
            >
                {
                    props => { const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <img src={profile} alt="profile" />
                            <h2 className="title">Welcome</h2>
                            <GoogleLogin className="btn google_btn"
                                clientId="131686820820-o2n7o0hssp8m13kqjvl91iujoq4kf3c0.apps.googleusercontent.com"
                                buttonText="Continue with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={"single_host_origin"}
                                disabled={google_dis}
                            />
                            { 
                                error !== '' 
                                ? <div className='bg-danger my-2' id="error"><p className="m-0" style={{color: 'white'}}>{error}</p></div> 
                                : null 
                            }
                            {
                                verify !== ''
                                ? <div className='bg-success my-2' id="verify"><p className="m-0" style={{color: 'white'}}>{verify}</p></div>
                                : null
                            }

                            <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    <h5>Email</h5>
                                    <input type="text" className="input" name="email" values={values.email} onChange={handleChange} onBlur={handleBlur} />
                                </div>
                            </div>
                            {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}
                            <div className="input-div pass">
                                <div className="i"> 
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <h5>Password</h5>
                                    <input type={hide ? "password" : "text"} className="input" name="password" values={values.password} onChange={handleChange} onBlur={handleBlur} />
                                    <div className="eyefill">
                                        <BsFillEyeFill className="see" fontSize="23px" style={{display: 'inherit', color: 'gray'}} onClick={passhide} />
                                        <BsFillEyeSlashFill className="hide" fontSize="23px" style={{display: 'none', color: 'gray'}} onClick={passhide} />
                                    </div>
                                </div>
                            </div>
                            {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}
                            <input type="submit" className="btn text-capitalize" value="Login" disabled={isSubmitting || google_dis} />
                            <Link to="/forgotpassword">Forgot Password?</Link>
                            
                            {/* <div style={{width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <hr style={{height: '10px', width: '100%'}} />
                                <p style={{margin: '0', position: 'absolute', top: '0', backgroundColor: 'white', padding: '5px 10px'}}>OR</p>
                            </div> */}
                            {/* <button className="btn google_btn"><img src={googleIcon} alt="" className="google_icon" />Google Sign In</button> */}
                            {/* <button className="btn m-0 text-capitalize" onClick={() => show('Register')}>Sign up</button> */}
                        </form>
                    )
                }
            }
            </Formik>
            <p style={{marginTop: '20px'}}>No estas registrado? <button onClick={() => props.show('Register')}>Sign up</button></p>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        login: (val) => { 
            console.log('Login')
            console.log(val)
            dispatch({
                type: 'LOGGEDIN',
                item: val
            }) 
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)