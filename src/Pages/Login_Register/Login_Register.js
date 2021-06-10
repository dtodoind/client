import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import './Login_Register.scss'
import Login from '../../component/Login/Login'
import Register from '../../component/Register/Register'

import wave from '../../assets/wave.png'
import grocery from '../../assets/online_shopping.svg'

function Login_Register() {

    const [showhide, setShowHide] = useState(true)

    const handleshow = (arg) => {
        // e.preventDefault();
        if(arg === 'Register') {
            setShowHide(false)
        } else {
            setShowHide(true)
        }
    }

    var location = useLocation().pathname
    window.addEventListener('resize', () => {
        
        if(document.getElementsByClassName('App')[0] !== undefined) {
            if(location === '/loginregister') {
                document.getElementsByClassName('App')[0].style.paddingBottom = '0px'
            }
        }
    })
    if(document.getElementsByClassName('App')[0] !== undefined) {
        if(location === '/loginregister') {
            document.getElementsByClassName('App')[0].style.paddingBottom = '0px'
        }
    }

    return (
        <div className="login_register">
            <img className="wave" src={wave} alt="wave" />
            <div className="login_container">
                <div className="img">
                    <img src={grocery} alt='grocery' />
                    <img className="gro_shadow" src={grocery} alt='grocery' />
                </div>
                {
                    showhide ? <Login show={handleshow} /> : <Register show={handleshow} />
                }
            </div>
        </div>
    )
}

export default Login_Register
