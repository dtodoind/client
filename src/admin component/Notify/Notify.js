import React from 'react'

import { IoCloseCircle } from 'react-icons/io5'
import './Notify.scss'
import { connect } from 'react-redux'
import axios from 'axios'

function Notify({name, message, profile, cat, index, Notification_id, drop, notification}) {

    var color = ''
    if(cat === "Sales") color = 'success'
    if(cat === "Reviews") color = 'info'
    if(cat === "Return") color = 'danger'
    if(cat === "Subscriber") color = 'warning'

    const remove_notify = async () => {
        await axios.delete(`http://localhost:5000/notification/delete/${Notification_id}`)
        await axios.get('http://localhost:5000/notification/all').then(res => notification(res.data))
    }

    return (
        <div className={'notify p-3 my-2 rounded bg-'+color} style={{color: "white"}}>
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <img src={profile} alt="" className="img_size" style={{height: drop === 'true' ? "30px" : null }} />
                    <h3 className="mx-2 chname" style={{fontSize: drop === 'true' ? '15px' : null }}>{name}</h3>
                </div>
                <div className="d-flex">
                    {
                        drop === 'true'
                        ? <p className="m-0 mx-2" style={{fontSize: '10px' }}>5 min ago</p>
                        : <p className="chcat">{cat}</p>
                    }
                    {
                        drop === 'true'
                        ? null
                        : <IoCloseCircle className="cl_sty" fontSize="20px" style={{cursor: 'pointer'}} onClick={remove_notify} />
                    }
                </div>
            </div>
            <p className="m-0 mt-2 text_ch" style={{fontSize: drop === 'true' ? '15px' : null }}>{message}</p>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        notification: (val) => { 
            dispatch({
                type: 'NOTIFICATION',
                item: val
            }) 
        }
    }
}

export default connect(null, mapDispatchToProps)(Notify)
