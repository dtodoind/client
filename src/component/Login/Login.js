import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import './Login.scss'

import { Formik } from "formik";
import * as Yup from "yup";

import profile from '../../assets/profile_pic.svg'
import axios from 'axios';
import { connect } from 'react-redux'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

function Login(props) {

    const [error, seterror] = useState()
    const [verify, setverify] = useState()
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

    return (
        <div className="login-content">
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout( async() => {
                        var logindetails = {
                            Email: values.email.toLowerCase(),
                            Password: values.password
                        }
                        setverify('')
                        await axios.post(`http://localhost:5000/users/login`, logindetails).then(async (res) => {
                            if(res.data.loggedIn) {
                                var result = JSON.parse(res.data.result)
                                props.login(res.data)
                           
                                var db_val = {
                                    Users_id: result[0].Users_id,
                                    Status: 'Active',
                                }
                                await axios.put(`http://localhost:5000/users/status`, db_val, {
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
                                    <input type="password" className="input" name="password" values={values.password} onChange={handleChange} onBlur={handleBlur} />
                                </div>
                            </div>
                            {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}
                            <Link to="/forgotpassword">Forgot Password?</Link>
                            <input type="submit" className="btn" value="Login" disabled={isSubmitting} />
                            
                        </form>
                    )
                }
            }
            </Formik>
            <p>Not Register? <button onClick={() => props.show('Register')}>Sign up</button></p>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        login: (val) => { 
            dispatch({
                type: 'LOGGEDIN',
                item: val
            }) 
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)
