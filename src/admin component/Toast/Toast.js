import React from 'react'
import { connect } from 'react-redux'

import './Toast.scss'

function Toast({dis, new_toast, ...props}) {
    console.log(new_toast)

    // const Notification = props.Notification

    // const remove_toast = () => {
    //     if(document.getElementById(index) !== null) {
    //         document.getElementById(index).classList.remove('show')
    //         document.getElementById(index).classList.add('unshow')
    //         document.getElementById(index).style.maxHeight = '0'
    //     }
    // }
    
    var color = ''
    if(new_toast.cat === "Sales") color = 'success'
    if(new_toast.cat === "Reviews") color = 'info'
    if(new_toast.cat === "Returns") color = 'danger'
    if(new_toast.cat === "Subscriber") color = 'warning'

    if(dis === 'true') {
        // setTimeout(() => {
        //     if(document.getElementById(index) !== null) {
        //         document.getElementById(index).classList.remove('show')
        //         document.getElementById(index).classList.add('unshow')
        //     }
        // }, 5000)
        // setTimeout(() => {
        //     if(document.getElementById(index) !== null) {
        //         document.getElementById(index).style.maxHeight = '0px'
        //         document.getElementById(index).style.marginBottom = '0px'
        //     }
        // }, 6000)
        console.log('its shown')
        return (
            <div className="toast show">
                <div className={"toast-header bg-"+color} style={{color: 'white'}}>
                    <strong className="mr-auto">{new_toast.name}</strong>
                    <small>5 mins ago</small>
                    {/* <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" onClick={remove_toast}>&times;</button> */}
                </div>
                <div className="toast-body">
                    {new_toast.message}
                </div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

const mapStateToProps = (state) => {
    return {
        Notification: state.Notification
    }
}

export default connect(mapStateToProps)(Toast)
