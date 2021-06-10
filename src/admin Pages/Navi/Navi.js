import React, { useEffect, useState } from 'react'

import Dashboard from '../Dashboard/Dashboard'
import Product from '../Product/Product'
import Orders from '../Orders/Orders'
import Reviews from '../Reviews/Reviews'
import Content from '../Content/Content'
import Users from '../Users/Users'
import Notifications from '../Notification/Notification'
import male from '../../assets/profile_pic.svg'
import { IoBagAdd } from 'react-icons/io5';
import { ImFolderOpen } from 'react-icons/im';
import { MdRateReview, MdContentPaste } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { AiFillDashboard, AiTwotoneBell } from "react-icons/ai";
import { connect } from 'react-redux'
import io from 'socket.io-client'
import axios from 'axios'

import Sidebar from '../../admin component/Sidebar/Sidebar'

import './Navi.scss'
import Notify from '../../admin component/Notify/Notify'

const socket = io('http://localhost:5000')
function Navi(props) {
    
    const { Notification, insertReviewAll, allorders, allUser, allnotification } = props
    const [loop, setLoop] = useState(0)

    var nav = {
        icons: [
            <AiFillDashboard />,
            <ImFolderOpen />,
            <IoBagAdd />,
            <MdRateReview />,
            <MdContentPaste />,
            <FaUsers />,
            <AiTwotoneBell />
        ],
        name: [
            'Dashboard',
            'Product',
            'Orders',
            'Reviews',
            'Content',
            'Users',
            'Notification'
        ]
    }

    useEffect(() => {
        if(Notification.length !== 0) {
            if(localStorage.getItem('countNotification') === null) {
                localStorage.setItem('countNotification', Notification.length)
            }
            if(parseInt(localStorage.getItem('countNotification')) !== Notification.length) {
                document.getElementsByClassName('reddot')[0].style.display = 'block'
            }
        }
        if(loop === 0) {
            socket.on('toast', (data) => {
                document.getElementsByClassName('reddot')[0].style.display = 'block'
                if(data.cat === 'Status') {
                    setTimeout(() => {
                        axios.get('http://localhost:5000/users/all').then(res => allUser(res.data))
                    }, 3000)
                } else {
                    setTimeout(() => {
                        if(data.cat === "Sales") axios.get(`http://localhost:5000/order/all`).then(res => allorders(res.data))
                        if(data.cat === "Reviews") axios.get('http://localhost:5000/review/all').then(res => insertReviewAll(res.data))
                        if(data.cat === "Return") axios.get(`http://localhost:5000/order/all`).then(res => allorders(res.data))
                        if(data.cat === "Subscriber") axios.get('http://localhost:5000/users/all').then(res => allUser(res.data))
                        axios.get('http://localhost:5000/notification/all').then(res => allnotification(res.data))
                        
                        if(document.getElementById(data.id) !== null) {
                            document.getElementById(data.id).classList.remove('show')
                            document.getElementById(data.id).classList.add('unshow')
                        }
                    }, 5000)
                    setTimeout(() => {
                        if(document.getElementById(data.id) !== null) {
                            document.getElementById(data.id).style.maxHeight = '0px'
                            document.getElementById(data.id).style.marginBottom = '0px'
                            document.getElementById(data.id).remove()
                        }
                    }, 6000)
                    var color = ''
                    if(data.cat === "Sales") color = 'success'
                    if(data.cat === "Reviews") color = 'info'
                    if(data.cat === "Return") color = 'danger'
                    if(data.cat === "Subscriber") color = 'warning'
            
                    document.getElementById('toasts').innerHTML += `
                        <div class="toast show" id="${data.id}">
                            <div class="toast-header bg-${color}" style="color: white">
                                <strong class="mr-auto">${data.name}</strong>
                                <small>${data.cat}</small>
                            </div>
                            <div class="toast-body">
                                ${data.message}
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    `;
                }
            })
            setLoop(1)
        }
    }, [insertReviewAll, allorders, allUser, allnotification, loop, Notification.length])

    function act(val) {
        document.getElementsByClassName('dis-none')[val].classList.add('act')
    }

    function selected(val) {
        var tab = document.getElementsByClassName('dis-none')
        for(var i=0; i<tab.length; i++) {
            if(tab[i].classList.contains('act')) {
                tab[i].classList.remove('act')
            }
            if(tab[i].id === val) {
                tab[i].classList.add('act')
            }
        }
    }

    const show_notification = () => {
        if(window.innerWidth >= 900) {
            document.getElementsByClassName('notify_dropdown')[0].style.display = 'block'
        }
        document.getElementsByClassName('reddot')[0].style.display = 'none'
        localStorage.setItem('countNotification', Notification.length)
    }

    function item_active(val) {
        if(window.innerWidth <=900) {
            document.getElementsByClassName('small_sidebar')[0].style.transform = 'translateX(-251px)'
        }
        for(var i=0; i<nav.name.length; i++) {
            if(i !== val) {
                document.getElementsByClassName('sel')[i].classList.remove('active')
                document.getElementsByClassName('showu')[i].classList.add('active_show')
                document.getElementsByClassName('icon')[i].classList.add('icon_area2')
                document.getElementsByClassName('icon')[i].classList.remove('icon_area')
                document.getElementsByClassName('hov')[i].style.backgroundColor = '#3A506B00'
                document.getElementsByClassName('hov1')[i].style.backgroundColor = '#3A506B00'
            } else {
                document.getElementsByClassName('sel')[i].classList.add('active')
                document.getElementsByClassName('showu')[i].classList.remove('active_show')
                document.getElementsByClassName('icon')[i].classList.remove('icon_area2')
                document.getElementsByClassName('icon')[i].classList.add('icon_area')
                document.getElementsByClassName('hov')[i].style.backgroundColor = '#3A506B66'
                document.getElementsByClassName('hov1')[i].style.backgroundColor = '#3A506B66'
            }
        }
    }

    return (
        <div className="navi">
            <div className="grid-container">
                <Sidebar selected={selected} act={act} />
                <div className="grid-item" style={{width: '100%', overflow: 'auto'}}>
                    <div className="naviga">
                        <div className="icon_bell"
                            onMouseOver={show_notification} 
                            onMouseOut={() => document.getElementsByClassName('notify_dropdown')[0].style.display = 'none'}
                        >
                            <AiTwotoneBell style={{cursor: 'pointer', height: '100%'}} onClick={() => {
                                selected(6)
                                act(6)
                                item_active(6)
                            }} />
                            <div className='reddot' style={{display: 'none'}}></div>
                            <div className="notify_dropdown rounded" style={{display: 'none', zIndex: '5'}}>
                                <div className="text-dark mx-2" style={{fontSize: '20px'}}>Notification</div>
                                {
                                    Notification?.slice(0).reverse().map((m, i) =>
                                        i < 5
										? <Notify name={m.FullName} key={i} message={m.Message} profile={male} cat={m.Notify_cate} index={i} drop='true'/>
										: null
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <a href={'#!'} className="btn btn_all">Preview</a>
                            <a href={'#!'} className="btn btn_all">Publish</a>
                        </div>
                    </div>
                    <div>
                        <div id="dashboard" className="dis-none">
                            <Dashboard />
                        </div>
                        <div id="product" className="dis-none">
                            <Product />
                        </div>
                        <div id="orders" className="dis-none">
                            <Orders />
                        </div>
                        <div id="reviews" className="dis-none">
                            <Reviews />
                        </div>
                        <div id="content" className="dis-none">
                            <Content />
                        </div>
                        <div id="users" className="dis-none">
                            <Users />
                        </div>
                        <div id="notification" className="dis-none">
                            <Notifications />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Notification: state.Notification
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        insertReviewAll: (val) => { 
            dispatch({
                type: 'REVIEWS',
                item: val
            }) 
        },
        allorders: (val) => { 
            dispatch({
                type: 'ORDERS',
                item: val
            }) 
        },
        allUser: (val) => { 
            dispatch({
                type: 'SET_USER',
                item: val
            })
        },
        allnotification: (val) => { 
            dispatch({
                type: 'NOTIFICATION',
                item: val
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi)
