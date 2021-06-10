import React, { useEffect, useState } from 'react'

import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'

import './NotificationTable.scss'

function NotificationTable(props) {

    const Message = props.Message
    const [notfload, setNotfload] = useState(10)
    const [Notf, setNotf] = useState([])
    const [loading, setLoading] = useState(true)

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(scrollHeight - scrollTop === clientHeight) {
            setNotfload(notfload + 10)
        }
    }

    useEffect(() => {
        const loadnotf = () => {
            setLoading(true)
            const load = []
            Message.map((ord, i) => {
                if(i < notfload) {
                    load.push(ord)
                }
                return 0;
            })
            setNotf(load)
            setLoading(false)
        }
        loadnotf()
    }, [Message, notfload])

    return (
        <div className="notify_table my-3">
            <div style={{overflowY: 'scroll', height: '400px'}} onScroll={handleScroll}>
                <Table striped hover bordered>
                    <thead className="heading">
                        <tr>
                            <td>Date</td>
                            <td>User</td>
                            <td>Subject</td>
                            <td>Message sent</td>
                            {/* <td>Reached Users</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Notf?.map((m,i) => 
                                <tr key={i}>
                                    <td style={{verticalAlign: 'middle'}}>{m.Date}</td>
                                    <td style={{verticalAlign: 'middle'}}>{m.Email}</td>
                                    <td className=" d-flex justify-content-center align-items-center">{m.Subject}</td>
                                    <td style={{verticalAlign: 'middle'}}>{m.Message}</td>
                                    {/* <td style={{verticalAlign: 'middle'}}>{m.reached}</td> */}
                                </tr>
                            )
                        }
                        {
                            loading && <tr><td colSpan="10" style={{textAlign: 'center'}}>Loading...</td></tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Message: state.Message
    }
}

export default connect(mapStateToProps)(NotificationTable)
