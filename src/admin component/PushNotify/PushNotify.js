import React, { useEffect, useState } from 'react'

import NotificationTable from '../NotificationTable/NotificationTable';
import { connect } from 'react-redux'
import loader from '../../assets/Infinity.gif'

import './PushNotify.scss'
import axios from 'axios';

function PushNotify(props) {

    const { allmessage, user, Message } = props
    const [radiochange, setradiochange] = useState('')
    const [emailchange, setemailchange] = useState('')
    const [subchange, setsubchange] = useState('')
    const [msgchange, setmsgchange] = useState('')
    const [radioerror] = useState('Required')
    const [subjecterror] = useState('Required')
    const [msgerror] = useState('Required')
    const [emailerror] = useState('Required')
    const [lop, setlop] = useState(true)

    useEffect(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/pushnotify/all').then(res => {
            if(Message.length !== 0) {
                if(Message[0].Notify_id !== res.data[0].Notify_id) {
                    allmessage(res.data)
                }
                setlop(true)
            } else {
                if(lop) {
                    allmessage(res.data)
                    setlop(false)
                }
            }
        })
    }, [Message, allmessage, lop])
    
    const selectedchange = (e) => {
        if(e.target.name === 'email_radio') {
            setradiochange(e.target.value)
            document.getElementsByClassName('radioerr')[0].style.display = 'none'
            if(radiochange === 'Specific User') {
                document.getElementsByClassName('emailerr')[0].style.display = 'none'
            }
        } 
        if(e.target.name === 'email_box') {
            setemailchange(e.target.value)
            document.getElementsByClassName('emailerr')[0].style.display = 'none'
        }
        if(e.target.name === 'subject_box') {
            setsubchange(e.target.value)
            document.getElementsByClassName('suberr')[0].style.display = 'none'
        }
        if(e.target.name === 'message') {
            setmsgchange(e.target.value)
            document.getElementsByClassName('msgerr')[0].style.display = 'none'
        }
    }

    const sendnotify = async () => {
        if(radiochange === '') {
            document.getElementsByClassName('radioerr')[0].style.display = 'inherit'
        }
        if(document.getElementById('email_box').disabled === false) {
            if(emailchange === '') {
                document.getElementsByClassName('emailerr')[0].style.display = 'inherit'
            }
        }
        if(subchange === '') {
            document.getElementsByClassName('suberr')[0].style.display = 'inherit'
        }
        if(msgchange === '') {
            document.getElementsByClassName('msgerr')[0].style.display = 'inherit'
        }
        var d = new Date()
        var date_format = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        if(radiochange === 'All') {
            if(radiochange !== '' && msgchange !== '' && subchange !== '') {
                // var msg = Message
                document.getElementById('send_btn').innerHTML = `<div class="load"><div style="height: 100%"><img src=${loader} alt="loader" style="height: 100%;" /></div></div>`
                document.getElementById('send_btn').disabled = true
                document.getElementById('send_btn').style.padding = '0px 20px'
                for(var i=0; i<user.length; i++) {
                    var ins = {
                        Message: msgchange,
                        Email: user[i].Email,
                        Subject: subchange,
                        Date: date_format
                    }
                    await axios.post('https://dtodo-indumentaria-server.herokuapp.com/pushnotify/new', ins)
                    await axios.get('https://dtodo-indumentaria-server.herokuapp.com/pushnotify/all').then(res => allmessage(res.data))
                }
                document.getElementById('send_btn').innerHTML = `Send`
                document.getElementById('send_btn').disabled = false
                document.getElementById('send_btn').style.padding = '10px 20px'
                // msg.push(ins)
                // props.message(msg)
                document.getElementsByName('email_box')[0].value = ''
                document.getElementsByName('subject_box')[0].value = ''
                document.getElementsByName('message')[0].value = ''
            }
        } else {
            if(radiochange !== '' && msgchange !== '' && emailchange !== '' && subchange !== '') {
                // var msg1 = Message
                document.getElementById('send_btn').innerHTML = `<div class="load"><div style="height: 100%"><img src=${loader} alt="loader" style="height: 100%;" /></div></div>`
                document.getElementById('send_btn').disabled = true
                document.getElementById('send_btn').style.padding = '0px 20px'
                var ins1 = {
                    Message: msgchange,
                    Email: emailchange,
                    Subject: subchange,
                    Date: date_format
                }
                await axios.post('https://dtodo-indumentaria-server.herokuapp.com/pushnotify/new', ins1)
                await axios.get('https://dtodo-indumentaria-server.herokuapp.com/pushnotify/all').then(res => allmessage(res.data))
                document.getElementById('send_btn').innerHTML = `Send`
                document.getElementById('send_btn').disabled = false
                document.getElementById('send_btn').style.padding = '10px 20px'
                // msg1.push(ins1)
                // props.message(msg1)
                document.getElementsByName('email_box')[0].value = ''
                document.getElementsByName('subject_box')[0].value = ''
                document.getElementsByName('message')[0].value = ''
            }
        }
    }

    return (
        <div className="push_notify">
            <div className="send_notify">
                <div className="border-bottom">
                    <h4>Send Push Notification Message</h4>
                </div>
                <div className="my-3">
                    <div className="form-check-inline">
                        <label className="form-check-label">
                            <input type="radio" name="email_radio" value="All" className="form-check-input" onChange={selectedchange} />All
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <label className="form-check-label">
                            <input type="radio" name="email_radio" value="Specific User" className="form-check-input" onChange={selectedchange} />Specific User
                        </label>
                    </div>
                    <div className="radioerr" style={{display: 'none', color: 'red'}}>{radioerror}</div>
                </div>
                <input 
                    type="text" 
                    name="email_box" 
                    id="email_box" 
                    className="form-control form-control-sm" 
                    placeholder="Enter Email"
                    onChange={selectedchange}
                    disabled={radiochange === 'All' ? true : radiochange === '' ? true : false } 
                />
                <div className="emailerr" style={{display: 'none', color: 'red'}}>{emailerror}</div>
                <input 
                    type="text" 
                    name="subject_box" 
                    id="subject_box" 
                    className="form-control form-control-sm" 
                    placeholder="Enter Subject"
                    onChange={selectedchange}
                    // disabled={radiochange === 'All' ? true : radiochange === '' ? true : false } 
                />
                <div className="suberr" style={{display: 'none', color: 'red'}}>{subjecterror}</div>
                <div className="form-group py-3">
                    <label htmlFor="comment">Message</label>
                    <textarea className="form-control" rows="5" name="message" onChange={selectedchange}></textarea>
                    <div className="msgerr" style={{display: 'none', color: 'red'}}>{msgerror}</div>
                </div>
                <div className="w-100 text-right my-3">
                    <button id="send_btn" className="btn_push" onClick={sendnotify}>Send</button>
                </div>
            </div>
            <NotificationTable />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Message: state.Message,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        allmessage: (val) => { 
            dispatch({
                type: 'MESSAGE',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PushNotify)
