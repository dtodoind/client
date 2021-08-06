import React, { useEffect, useState } from 'react'

import './Sidebar.scss'

import profiledesign from '../../assets/profile_design.png'
import { FiMenu } from "react-icons/fi";
import { AiFillDashboard, AiTwotoneBell } from "react-icons/ai";
import { IoBagAdd } from 'react-icons/io5';
import { ImFolderOpen } from 'react-icons/im';
import { MdRateReview, MdContentPaste } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
// import Toast from '../../admin component/Toast/Toast'
import { connect } from 'react-redux'

function Sidebar({ selected, act, ...props }) {

    const [preactive, setPreActive] = useState(4)
    // const Notification = props.Notification
    // const [tos, settos] = useState(false)
    // const [notlen, setnotlen] = useState()
    // const [notlendot, setnotlendot] = useState(Notification.length)



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
        act(preactive)
        if(window.innerWidth <= 900) {
            if(document.getElementsByClassName("grid-container")[0] !== undefined){
                document.getElementsByClassName("grid-container")[0].classList.add('grid-container_adj')
                document.getElementsByClassName("grid-container")[0].classList.remove('grid-container')
                document.getElementsByClassName("menu")[0].classList.add('menu_adj')
                document.getElementsByClassName("menu")[0].classList.remove('menu')
                document.getElementsByClassName("side_display")[0].style.display = 'none'
    
                var icon = document.getElementsByClassName("icon")
                var showu = document.getElementsByClassName("showu")
                var name = document.getElementsByClassName("names")
                for(var j=0; j<icon.length; j++) {
                    icon[j].classList.add('icon_adj')
                    showu[j].classList.add('show_adj')
                    name[j].classList.add('names_adj')
                }
            }
        }
        for(var i=0; i<nav.name.length; i++) {
            if(i !== preactive) {
                document.getElementsByClassName('sel')[i].classList.remove('active')
                document.getElementsByClassName('showu')[i].classList.add('active_show')
                document.getElementsByClassName('icon')[i].classList.add('icon_area2')
                document.getElementsByClassName('icon')[i].classList.remove('icon_area')
                document.getElementsByClassName('hov')[i].style.backgroundColor = 'rgba($color: $color4, $alpha: 0.2)'
                document.getElementsByClassName('hov1')[i].style.backgroundColor = 'rgba($color: $color4, $alpha: 0.2)'
            } else {
                document.getElementsByClassName('sel')[i].classList.add('active')
                document.getElementsByClassName('showu')[i].classList.remove('active_show')
                document.getElementsByClassName('icon')[i].classList.remove('icon_area2')
                document.getElementsByClassName('icon')[i].classList.add('icon_area')
                document.getElementsByClassName('hov')[i].style.backgroundColor = 'rgba($color: $color4, $alpha: 0.4)'
                document.getElementsByClassName('hov1')[i].style.backgroundColor = 'rgba($color: $color4, $alpha: 0.4)'
            }
        }
    }, [nav.name.length, preactive, act])

    window.addEventListener('resize', () => {
        if(window.innerWidth <= 900) {
            if(document.getElementsByClassName("grid-container")[0] !== undefined){
                document.getElementsByClassName("grid-container")[0].classList.add('grid-container_adj')
                document.getElementsByClassName("grid-container")[0].classList.remove('grid-container')
                document.getElementsByClassName("menu")[0].classList.add('menu_adj')
                document.getElementsByClassName("menu")[0].classList.remove('menu')
                document.getElementsByClassName("side_display")[0].style.display = 'none'
    
                var icon = document.getElementsByClassName("icon")
                var showu = document.getElementsByClassName("showu")
                var name = document.getElementsByClassName("names")
                for(var j=0; j<icon.length; j++) {
                    icon[j].classList.add('icon_adj')
                    showu[j].classList.add('show_adj')
                    name[j].classList.add('names_adj')
                }
            }
        } else {
            if(document.getElementsByClassName("grid-container")[0] === undefined){
                document.getElementsByClassName("grid-container_adj")[0].classList.add('grid-container')
                document.getElementsByClassName("grid-container_adj")[0].classList.remove('grid-container_adj')
                document.getElementsByClassName("menu_adj")[0].classList.add('menu')
                document.getElementsByClassName("menu_adj")[0].classList.remove('menu_adj')
                document.getElementsByClassName("side_display")[0].style.display = 'inherit'

                var icon1 = document.getElementsByClassName("icon")
                var show1 = document.getElementsByClassName("showu")
                var name1 = document.getElementsByClassName("names")
                for(var v=0; v<icon1.length; v++) {
                    icon1[v].classList.remove('icon_adj')
                    show1[v].classList.remove('show_adj')
                    name1[v].classList.remove('names_adj')
                }
            }
        }
    })

    function adj_over() {
        if(window.innerWidth <=900) {
            document.getElementsByClassName('small_sidebar')[0].style.transform = 'translateX(0px)'
        }
    }
    function adj_leave() {
        if(window.innerWidth <=900) {
            document.getElementsByClassName('small_sidebar')[0].style.transform = 'translateX(-251px)'
        }
    }

    function small_over(val) {
        if(window.innerWidth <=900) {
            if(!document.getElementsByClassName('sel')[val].classList.contains('active')) {
                document.getElementsByClassName('hov')[val].style.backgroundColor = '#3A506B66'
                document.getElementsByClassName('hov1')[val].style.backgroundColor = '#3A506B66'
            }
        }
    }
    function small_leave(val) {
        if(window.innerWidth <=900) {
            if(!document.getElementsByClassName('sel')[val].classList.contains('active')) {
                document.getElementsByClassName('hov')[val].style.backgroundColor = '#3A506B00'
                document.getElementsByClassName('hov1')[val].style.backgroundColor = '#3A506B00'
            }
        }
    }

    function middle_over(val) {
        if(window.innerWidth <=900) {
            if(!document.getElementsByClassName('sel')[val].classList.contains('active')) {
                document.getElementsByClassName('hov')[val].style.backgroundColor = '#3A506B66'
                document.getElementsByClassName('hov1')[val].style.backgroundColor = '#3A506B66'
            }
        } else {
            document.getElementsByClassName('hov')[val].style.backgroundColor = '#3A506B66'
        }
    }
    function middle_leave(val) {
        if(window.innerWidth <=900) {
            if(!document.getElementsByClassName('sel')[val].classList.contains('active')) {
                document.getElementsByClassName('hov')[val].style.backgroundColor = '#3A506B00'
                document.getElementsByClassName('hov1')[val].style.backgroundColor = '#3A506B00'
            }
        } else {
            if(!document.getElementsByClassName('sel')[val].classList.contains('active')) {
                document.getElementsByClassName('hov')[val].style.backgroundColor = '#3A506B00'
                document.getElementsByClassName('hov1')[val].style.backgroundColor = '#3A506B00'
            }
        }
    }

    function navishow() {
        if(document.getElementsByClassName("grid-container")[0] === undefined) {
            if(window.innerWidth >= 900) {
                document.getElementsByClassName("grid-container_adj")[0].classList.add('grid-container')
                document.getElementsByClassName("grid-container_adj")[0].classList.remove('grid-container_adj')
                document.getElementsByClassName("menu_adj")[0].classList.add('menu')
                document.getElementsByClassName("menu_adj")[0].classList.remove('menu_adj')
                document.getElementsByClassName("side_display")[0].style.display = 'inherit'
    
                var icon1 = document.getElementsByClassName("icon")
                var show1 = document.getElementsByClassName("showu")
                var name1 = document.getElementsByClassName("names")
                for(var v=0; v<icon1.length; v++) {
                    icon1[v].classList.remove('icon_adj')
                    show1[v].classList.remove('show_adj')
                    name1[v].classList.remove('names_adj')
                }
            }
        } else {
            document.getElementsByClassName("grid-container")[0].classList.add('grid-container_adj')
            document.getElementsByClassName("grid-container")[0].classList.remove('grid-container')
            document.getElementsByClassName("menu")[0].classList.add('menu_adj')
            document.getElementsByClassName("menu")[0].classList.remove('menu')
            document.getElementsByClassName("side_display")[0].style.display = 'none'

            var icon = document.getElementsByClassName("icon")
            var showu = document.getElementsByClassName("showu")
            var name = document.getElementsByClassName("names")
            for(var j=0; j<icon.length; j++) {
                icon[j].classList.add('icon_adj')
                showu[j].classList.add('show_adj')
                name[j].classList.add('names_adj')
            }
        }
    }

    function item_active(val) {
        setPreActive(val)
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

    // function toasting() {
    //     var counter = 0
    //     if(tos) {
    //         if(Notification.length > notlen) {
    //             for(let t=0; t<Notification.length; t++) {
    //                 if(Notification.length > notlendot) {
    //                     document.getElementsByClassName('reddot')[0].style.display = 'block'
    //                     setnotlendot(Notification.length)
    //                 }
    //                 if(t >= notlen) {
    //                     counter++
    //                 }
    //             }
    //         }
    //         return (
    //             Notification?.map((m, i) => 
    //                 i-1 < (Notification.length - counter - 1)
    //                 ? <Toast key={i} dis='false' index={i} />
    //                 : <Toast key={i} dis='true' index={i} />
    //             )
    //         )
    //     } else {
    //         setnotlen(Notification.length)
    //         setnotlendot(Notification.length)
    //         settos(true)
    //     }
    // }

    return (
        <div className="grid-item" onMouseOver={adj_over} onMouseLeave={adj_leave} style={{backgroundColor: 'rgb(215,220,225)', boxShadow: '0 0 10px black'}}>
            <div className="toasts" id="toasts">
                {/* {toasting()} */}
            </div>
            <div className="sha">
                <div className="profile">
                    <div className="top">
                        <div className="menu" onClick={navishow}>
                            <FiMenu color="white" />
                        </div>
                        <div className="side_display">
                            <div className="profile_info">
                                <div className="profile_img">
                                    <img src="https://drive.google.com/uc?id=1EVA3KUBLxCXF2EGmTf4LUB8F4yAvBrjl" alt="prof" style={{width: '100%'}} />
                                </div>
                                <div className="name">
                                    <p style={{fontWeight: '500', margin: '0'}}>John Wick</p>
                                    <p style={{margin: '0'}}>Belarus</p>
                                </div>
                            </div>
                            <div className="design">
                                <img src={profiledesign} alt="des" style={{width: '100%'}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="middle">
                    <div className="back-color"></div>
                    <div className="container-fluid">
                        {
                            nav.name.map((n,i) => {
                                let low_n = n.toLowerCase()
                                return <div className="row" key={i} onClick={() => selected(low_n)}>
                                        <div className="col hov p-0 sel" onClick={() => item_active(i)} onMouseOver={() => middle_over(i)} onMouseLeave={() => middle_leave(i)}>
                                            <div className="row">
                                                <div className="col p-0">
                                                    <div className="icon icon_area">
                                                        <div className="showu"></div>
                                                        {nav.icons[i]}
                                                    </div>
                                                </div>
                                                <div className="col-8 p-0 names">
                                                    <div className="navi_name">
                                                        <p>{n}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                            })
                        }
                    </div>
                </div>
                <div className="small_sidebar">
                    <div className="back-color"></div>
                    <div className="small_top"></div>
                    <div className="container-fluid small_middle">
                        {
                            nav.name.map((n,i) => {
                                let low_n
                                if(preactive === i) {
                                    low_n = n.toLowerCase()
                                    return <div className="row" key={i} onClick={() => selected(low_n)}>
                                        <div className="col hov1 p-0 sel active" onClick={() => item_active(i)} onMouseOver={() => small_over(i)} onMouseLeave={() => small_leave(i)}>
                                            <div className="row">
                                                <div className="col-3 p-0">
                                                </div>
                                                <div className="col-9 p-0 names">
                                                    <div className="navi_name">
                                                        <p>{n}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                } else {
                                    return <div className="row" key={i} onClick={() => selected(low_n)}>
                                        <div className="col hov1 p-0 sel" onClick={() => item_active(i)} onMouseOver={() => small_over(i)} onMouseLeave={() => small_leave(i)}>
                                            <div className="row">
                                                <div className="col-3 p-0">
                                                </div>
                                                <div className="col-9 p-0 names">
                                                    <div className="navi_name">
                                                        <p>{n}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            })
                        }
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

export default connect(mapStateToProps)(Sidebar)
