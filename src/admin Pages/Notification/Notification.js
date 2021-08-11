import React, { useEffect, useState, useCallback } from 'react'

import { AiTwotoneBell } from "react-icons/ai";
import Notify from '../../admin component/Notify/Notify';
import PushNotify from '../../admin component/PushNotify/PushNotify';
// import female from '../../assets/female.svg'
import male from '../../assets/profile_pic.svg'
import axios from 'axios'

import './Notification.scss'
import { connect } from 'react-redux'

function Notifications(props) {

    const { Notification, allnotification } = props

    const [allnotify, setAllnotify] = useState()
    const [allnotifyload, setallnotifyload] = useState(10)
    const [sale, setSale] = useState()
    const [saleload, setSaleload] = useState(10)
    const [returns, setReturns] = useState()
    const [returnload, setReturnload] = useState(10)
    const [subscribers, setSubscribers] = useState()
    const [subscribersload, setSubscribersload] = useState(10)
    const [reviews, setReviews] = useState()
    const [reviewsload, setReviewsload] = useState(10)
    const [loading, setLoading] = useState(true)
    const [lop, setlop] = useState(true)

    const allnotifyScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(scrollHeight - scrollTop === clientHeight) {
            setallnotifyload(allnotifyload + 10)
        }
    }

    const loadNotify = useCallback(async () => {
        setLoading(true)
        const load = []
        Notification.slice(0).reverse().map((ord, i) => {
            if(i < allnotifyload) {
                load.push(ord)
            }
            return 0;
        })
        setAllnotify(load)
        setLoading(false)
    }, [Notification, allnotifyload])

    const saleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(scrollHeight - scrollTop === clientHeight) {
            setSaleload(saleload + 10)
        }
    }

    const loadSale = useCallback(async () => {
        setLoading(true)
        const load = []
        var num = 0
        Notification.slice(0).reverse().map((sal, i) => {
            if(sal.Notify_cate === 'Sales') {
                if(num < saleload) {
                    load.push(sal)
                    num = num + 1
                }
            }
            return 0
        })
        setSale(load)
        setLoading(false)
    }, [Notification, saleload])

    const returnScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(scrollHeight - scrollTop === clientHeight) {
            setReturnload(returnload + 10)
        }
    }

    const loadReturn = useCallback(async () => {
        setLoading(true)
        const load = []
        var num = 0
        Notification.slice(0).reverse().map((sal, i) => {
            if(sal.Notify_cate === 'Return') {
                if(num < returnload) {
                    load.push(sal)
                    num = num + 1
                }
            }
            return 0
        })
        setReturns(load)
        setLoading(false)
    }, [Notification, returnload])

    const subscribersScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(scrollHeight - scrollTop === clientHeight) {
            setSubscribersload(subscribersload + 10)
        }
    }

    const loadSubscribers = useCallback(async () => {
        setLoading(true)
        const load = []
        var num = 0
        Notification.slice(0).reverse().map((sal, i) => {
            if(sal.Notify_cate === 'Subscriber') {
                if(num < subscribersload) {
                    load.push(sal)
                    num = num + 1
                }
            }
            return 0
        })
        setSubscribers(load)
        setLoading(false)
    }, [Notification, subscribersload])

    const reviewsScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(scrollHeight - scrollTop === clientHeight) {
            setReviewsload(reviewsload + 10)
        }
    }

    const loadReviews = useCallback(async () => {
        setLoading(true)
        const load = []
        var num = 0
        Notification.slice(0).reverse().map((sal, i) => {
            if(sal.Notify_cate === 'Reviews') {
                if(num < reviewsload) {
                    load.push(sal)
                    num = num + 1
                }
            }
            return 0
        })
        setReviews(load)
        setLoading(false)
    }, [Notification, reviewsload])

    useEffect(() => {
        axios.get('http://localhost:5000/notification/all').then(res => {
            if(Notification.length !== 0) {
                if(Notification[Notification.length - 1].Notification_id !== res.data[res.data.length - 1].Notification_id) {
                    allnotification(res.data)
                }
                setlop(true)
            } else {
                if(lop) {
                    allnotification(res.data)
                    setlop(false)
                }
            }
        })

        loadNotify()
        loadSale()
        loadReturn()
        loadSubscribers()
        loadReviews()
    }, [Notification, allnotification, loadNotify, loadSale, loadReturn, loadSubscribers, loadReviews, lop])

    return (
        <div className="notification">
            <div className="tag">
                <div className="dash_icon">
                    <AiTwotoneBell />
                </div>
                <p style={{fontSize: '18px', margin: '0', fontWeight: '400'}}>Notification</p>
            </div>

            <div className="container-fluid my-2">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#all">All</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#sales">Sales</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#returns">Returns</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#subscriber">Subscribers</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#review">Reviews</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#pushnot">Push Notification</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="all" className="container tab-pane active"><br/>
                        <h3>All Notification</h3>
                        <div style={{height: '700px', overflowY: 'scroll'}} onScroll={allnotifyScroll}>
                            {
                                allnotify?.map((n,i) => 
                                    <Notify name={n.FullName} message={n.Message} cat={n.Notify_cate} Notification_id={n.Notification_id} profile={male} key={i} index={i} />
                                )
                            }
                            {loading && <div style={{width: '100%', textAlign: 'center'}}>Loading...</div>}
                        </div>
                    </div>
                    <div id="sales" className="container tab-pane fade"><br/>
                        <h3>Sales</h3>
                        <div style={{height: '700px', overflowY: 'scroll'}} onScroll={saleScroll}>
                            {
                                sale?.map((n,i) =>
                                    n.Notify_cate === 'Sales'
                                    ? <Notify name={n.FullName} message={n.Message} cat={n.Notify_cate} Notification_id={n.Notification_id} profile={male} key={i} index={i} />
                                    : null
                                )
                            }
                        </div>
                    </div>
                    <div id="returns" className="container tab-pane fade"><br/>
                        <h3>Returns</h3>
                        <div style={{height: '700px', overflowY: 'scroll'}} onScroll={returnScroll}>
                            {
                                returns?.map((n,i) =>
                                    <Notify name={n.FullName} message={n.Message} cat={n.Notify_cate} Notification_id={n.Notification_id} profile={male} key={i} index={i} />
                                )
                            }
                        </div>
                    </div>
                    <div id="subscriber" className="container tab-pane fade"><br/>
                        <h3>Subscriber</h3>
                        <div style={{height: '700px', overflowY: 'scroll'}} onScroll={subscribersScroll}>
                            {
                                subscribers?.map((n,i) =>
                                    <Notify name={n.FullName} message={n.Message} cat={n.Notify_cate} Notification_id={n.Notification_id} profile={male} key={i} index={i} />
                                )
                            }
                        </div>
                    </div>
                    <div id="review" className="container tab-pane fade"><br/>
                        <h3>Reviews</h3>
                        <div style={{height: '700px', overflowY: 'scroll'}} onScroll={reviewsScroll}>
                            {
                                reviews?.map((n,i) =>
                                    <Notify name={n.FullName} message={n.Message} cat={n.Notify_cate} Notification_id={n.Notification_id} profile={male} key={i} index={i} />
                                )
                            }
                        </div>
                    </div>
                    <div id="pushnot" className="container tab-pane fade"><br/>
                        <h3>Push Notification</h3>
                        <PushNotify />
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
        allnotification: (val) => { 
            dispatch({
                type: 'NOTIFICATION',
                item: val
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
