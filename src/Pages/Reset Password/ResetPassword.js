import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios'

import './ResetPassword.scss'

function ResetPassword() {

    const [passerr, setpasserr] = useState()

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
        
    }, [])

    return (
        <div className="resetpass">
            <div className="inner_box">
                <div className="top_text">
                    <h3>Reset Password</h3>
                    <p>Type your New Password</p>
                </div>
                <div className="passerr" style={{display: 'none'}}>{passerr}</div>
                <div className="input_box">
                    <Formik
                        initialValues={{ password: "", conpassword: "" }}
                        onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            axios.put('http://localhost:5000/users/passwordreset', {email: localStorage.getItem('emailreset'), Password: values.password}).then(res => {
                                if(res.data === 'success') {
                                    localStorage.removeItem('emailreset')
                                    localStorage.setItem('history', '/resetpassword')
                                    window.location.href = '/loginregister'
                                } else {
                                    setpasserr(res.data)
                                    document.getElementsByClassName('passerr')[0].style.display = 'inherit'
                                    document.getElementsByClassName('passerr')[0].style.backgroundColor = 'rgba(255,0,0,0.2)'
                                }
                            })

                            setSubmitting(false);
                        }, 500);
                        }}

                        validationSchema={Yup.object().shape({
                            password: Yup.string()
                                .required("Required")
                                .min(8, "Password is too short - should be 8 chars minimum.")
                                .matches(/(?=.*[0-9])/, "Password must contain a number."),
                            conpassword: Yup.string()
                                .required("Required")
                                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                        })}
                    >
                        {
                            props => { const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-div pass">
                                            <div className="div">
                                                <h5>Password</h5>
                                                <input type="password" className="input" name="password" values={values.password} onChange={handleChange} onBlur={handleBlur} />
                                            </div>
                                        </div>
                                        {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}
                                        <div className="input-div pass">
                                            <div className="div">
                                                <h5>Confirm Password</h5>
                                                <input type="password" className="input" name="conpassword" values={values.conpassword} onChange={handleChange} onBlur={handleBlur} />
                                            </div>
                                        </div>
                                        {errors.conpassword && touched.conpassword && (<div className="input-feedback">{errors.conpassword}</div>)}

                                        <input type="submit" className="btn" value="Submit" disabled={isSubmitting} />
                                        
                                    </form>
                                )
                            }
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
