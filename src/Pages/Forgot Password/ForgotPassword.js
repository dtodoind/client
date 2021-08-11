import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios'

import './ForgotPassword.scss'

function ForgotPassword() {

    const [emailerr, setemailerr] = useState()

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

        if(localStorage.getItem('SingleUser') !== null) {
            window.history.back()
        }
        
    }, [])

    return (
        <div className="forgotpassword">
            <div className="inner_box">
                <div className="top_text">
                    <h3>Olvide mi contraseña</h3>
                    <p>Podes recuperar tu contraseña, ingresando el email con el que te registraste</p>
                </div>
                <div className="emailerr" style={{display: 'none'}}>{emailerr}</div>
                <div className="input_box">
                    <Formik
                        initialValues={{ email: "" }}
                        onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            localStorage.setItem('emailreset', values.email)
                            axios.post('http://localhost:5000/users/resetpass', {email: values.email}).then(res => {
                                if(res.data === '') {
                                    setemailerr('Email is not registered')
                                    document.getElementsByClassName('emailerr')[0].style.display = 'inherit'
                                    document.getElementsByClassName('emailerr')[0].style.backgroundColor = 'rgba(255,0,0,0.2)'
                                } else {
                                    setemailerr('Email is sent')
                                    document.getElementsByClassName('emailerr')[0].style.display = 'inherit'
                                    document.getElementsByClassName('emailerr')[0].style.backgroundColor = 'rgba(0,255,0,0.2)'
                                }
                            })

                            setSubmitting(false);
                        }, 500);
                        }}

                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email()
                                .required("Required")
                        })}
                    >
                        {
                            props => { const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="input-div one">
                                        <div className="div">
                                            <h5>Email</h5>
                                            <input type="text" className="input" name="email" values={values.email} onChange={handleChange} onBlur={handleBlur} />
                                        </div>
                                    </div>
                                    {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}

                                    <div className="butt">
                                        <input type="submit" className="btn" value="Submit" disabled={isSubmitting} />
                                        <p style={{margin: '0'}}>o</p>
                                        <Link to="/loginregister">ir a Login</Link>
                                    </div>
                                    
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

export default ForgotPassword
