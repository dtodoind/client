import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import './Login_Register.scss'
import Login from '../../component/Login/Login'
import Register from '../../component/Register/Register'

import wave from '../../assets/wave.png'
import grocery from '../../assets/online_shopping.svg'

function Login_Register(props) {

    const [showhide, setShowHide] = useState(true)
    const [lop, setlop] = useState(true)

    const { Delivery, setdelivery } = props

    useEffect(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/delivery/all').then(res => {
            if(Delivery.length !== 0) {
                if(Delivery[Delivery.length - 1].Delivery_id !== res.data[res.data.length - 1].Delivery_id) {
                    setdelivery(res.data)
                }
                setlop(true)
            } else {
                if(lop) {
                    setdelivery(res.data)
                    setlop(false)
                }
            }
        })
    }, [Delivery, lop, setdelivery])

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

const mapStateToProps = (state) => {
    return {
        Delivery: state.Delivery
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setdelivery: (val) => { 
            dispatch({
                type: 'DELIVERY',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login_Register)
