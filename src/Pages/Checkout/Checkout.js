import React, { useState, useEffect } from 'react'
import TopBanner from '../../component/Top Banner/TopBanner'
import CartTotal from '../../component/Cart/CartTotal'
import Payment from '../../component/Payment/Payment'
import Billing from '../../component/Billing/Billing'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import './Checkout.scss'
import categoryimg from '../../assets/banner-girls.png'
import { connect } from 'react-redux'
import io from 'socket.io-client'

const socket = io('https://dtodo-indumentaria-server.herokuapp.com')


const stripePromise = loadStripe("pk_test_51HQ2BMGy8mg5bsSgU9YA0dPJKyBXpeYIer8swKXQOzPi085cqPGl1BuLQMznSQvSUO75mEVH4gVqahKr5MaPkOn600OgIK8DJJ");

function Checkout(props) {

    const [radioval, setRadioval] = useState('3')
    const [addresserr, setaddresserr] = useState('')
    const [count, setcount] = useState(0)
    const { basket, Offer, alloffer } = props
    const SingleUser = JSON.parse(localStorage.getItem('SingleUser'))

    var subtotal = 0
    basket.map(item => subtotal = subtotal + item.totalprice);
    
    var delivery = 0
    if(basket.length !== 0) {
        delivery = 5
    }
    useEffect(() => {
        if(Offer.length === 0) {
            axios.get('https://dtodo-indumentaria-server.herokuapp.com/offer/all').then(res => alloffer(res.data))
        }
    }, [Offer, alloffer])
    
    var discount = 0
    var final_subtotal = 0
    if(Offer.length !== 0) {
        if(Offer[0].Price <= subtotal) {
            discount = Offer[0].Discount
            final_subtotal = subtotal - (discount*100/subtotal)
        } else {
            final_subtotal = subtotal
        }
    }

    var total = final_subtotal + delivery

    const address = (e) => {
        setRadioval(e.target.value)
        setaddresserr('')
    }

    // address from stripe payment success

    const place_order = async (billing_details) => {
        var rad = radioval
        if(billing_details.email !== '') {
            rad = '3'
        }
        var subtotal = 0
        var discount = 0
        basket.map(item => subtotal = subtotal + item.totalprice);
        if(Offer[0].Price <= subtotal) {
            discount = Offer[0].Discount
        }
        var order_val
        var d = new Date()
        var lastdate = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()
        var date = 0
        var month = 0
        var year = 0
        var gap = 7
        if(d.getMonth()+1 > 12) {
            year = d.getFullYear() + 1
            month = 1
            date = (d.getDate()+gap) - lastdate
        } else if((d.getDate()+gap) > lastdate) {
            year = d.getFullYear()
            month = d.getMonth() + 2
            date = (d.getDate()+gap) - lastdate
        } else {
            date = d.getDate() + gap
            month = d.getMonth() + 1
            year = d.getFullYear()
        }
        if(month > 12) {
            year = year + 1
            month = 1
            date = (d.getDate()+gap) - lastdate
        } else if(date+1 > lastdate) {
            month = month + 1
            date = (d.getDate()+gap) - lastdate
        }
        if(rad === "1") {
            order_val = {
                Status: 'Pickup',
                Discount: discount,
                Address: SingleUser[0].Address,
                Delivery_date: new Date(`${month}/${date+1}/${year}`).toISOString(),
                ClientName: SingleUser[0].FirstName + ' ' + SingleUser[0].LastName,
                Email: SingleUser[0].Email,
                Phone: SingleUser[0].Phoneno,
                Users_id: SingleUser[0].Users_id
            }
            setaddresserr('')
        } else if(rad === "2") {
            order_val = {
                Status: 'Pending',
                Discount: discount,
                Address: SingleUser[0].Address,
                Delivery_date: new Date(`${month}/${date+1}/${year}`).toISOString(),
                ClientName: SingleUser[0].FirstName + ' ' + SingleUser[0].LastName,
                Email: SingleUser[0].Email,
                Phone: SingleUser[0].Phoneno,
                Users_id: SingleUser[0].Users_id
            }
            setaddresserr('')
        } else if(rad === "3") {
            var ad = billing_details.address.line1 + ', ' + billing_details.address.city + ', ' + billing_details.address.state
            var address = []
            address = ad.split(/, /g)
            order_val = {
                Status: 'Pending',
                Discount: discount,
                Address: JSON.stringify(address),
                Delivery_date: new Date(`${month}/${date+1}/${year}`).toISOString(),
                Email: billing_details.email,
                Phone: billing_details.phone,
                ClientName: billing_details.name,
                Users_id: SingleUser[0].Users_id
            }
            // console.log(details)
            // if(localStorage.getItem('Billing') !== null) {
            //     // window.location.replace('/')
            // } else {
            //     setaddresserr("Please enter details for Billing")
            // }
        } else {
            var last = rad.split('')[1]
            var addr = JSON.parse(SingleUser[0].Address)[parseInt(last)]
            order_val = {
                Status: 'Pending',
                Discount: discount,
                Address: JSON.stringify(addr),
                Delivery_date: new Date(`${month}/${date+1}/${year}`).toISOString(),
                ClientName: SingleUser[0].FirstName + ' ' + SingleUser[0].LastName,
                Email: SingleUser[0].Email,
                Phone: SingleUser[0].Phoneno,
                Users_id: SingleUser[0].Users_id
            }
        }
        if(order_val !== undefined) {
            setcount(count+1)
            socket.emit('toast', {
                id: 'S'+count,
                name: order_val.ClientName !== null ? order_val.ClientName : SingleUser[0].FirstName + ' ' + SingleUser[0].LastName,
                message: 'Purchase on '+ new Date() +' from '+JSON.parse(order_val.Address).join(', '),
                cat: 'Sales'
            })
            var notify = {
                FullName: order_val.ClientName === null ? order_val.ClientName : SingleUser[0].FirstName + ' ' + SingleUser[0].LastName,
                Message: 'Purchase on '+ new Date() +' from '+JSON.parse(order_val.Address).join(', '),
                Notify_cate: 'Sales'
            }
            await axios.post('https://dtodo-indumentaria-server.herokuapp.com/notification/new', notify).then(res => props.insertNotification({...notify, Notification_id: res.data.Notification_id}))
            await axios.post('https://dtodo-indumentaria-server.herokuapp.com/order/new', order_val).then(res => 
                basket?.map(async (item) => {
                    var order_item = {
                        Quantity: item.qty,
                        Orders_id: res.data.Orders_id,
                        Product_id: item.Product_id,
                        ProdcutName: item.title,
                        Color: item.color,
                        Category: item.category,
                        Price: item.price,
                        Size: item.size,
                        Image: item.img,
                        Status: res.data.Status === 'Pickup' ? "Pickup" : "Pending"
                    }
                    await axios.post('https://dtodo-indumentaria-server.herokuapp.com/orderitem/new', order_item)
                    await axios.put('https://dtodo-indumentaria-server.herokuapp.com/product/quantity', 
                    {
                        Stock: item.allStock,
                        Product_id: item.Product_id
                    })
                    localStorage.removeItem('basket')
                    return window.location.replace('/')
                })
            )
        }
        return 0
    }

    return (
        <div className="checkout">
            <TopBanner img={categoryimg} name={"CHECKOUT"} />
            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-8">
                        {
                            SingleUser === null
                            ? <>
                                <h2>You are not Logged In</h2>
                                <Link to='/loginregister' className="logincheckout">Login</Link>
                            </>
                            : <>
                                <Billing address={address} />
                                    <Elements stripe={stripePromise}>
                                    <Payment place_order={place_order} radioval={radioval} price={total.toFixed(2)} addresserr={addresserr} />
                                </Elements>
                            </>
                        }
                    </div>
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col">
                                <CartTotal cart='checkout' radioval={radioval} place_order={place_order} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket,
        SingleUser: state.SingleUser,
        Offer: state.Offer
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        insertNotification: (val) => { 
            dispatch({
                type: 'NOTIFICATION',
                item: val
            })
        },
        alloffer: (val) => { 
            dispatch({
                type: 'OFFERS',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
