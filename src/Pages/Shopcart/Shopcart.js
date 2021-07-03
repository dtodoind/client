import React, { useEffect, useState } from 'react'

import TopBanner from '../../component/Top Banner/TopBanner'
import CartTable from '../../component/Cart/CartTable'
import CartTotal from '../../component/Cart/CartTotal'
import axios from 'axios'
import { connect } from 'react-redux'

import './Shopcart.scss'
import categoryimg from '../../assets/banner-girls.png'

function Shopcart(props) {

    const [lop, setlop] = useState(true)
    const [count, setCount] = useState(0)
    const [promocode, setPromocode] = useState('')

    const { Delivery, setdelivery, basket, Offer, alloffer } = props

    useEffect(() => {
        if(Delivery.length === 0) {
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
        }
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/offer/all').then(res => {
            if(Offer.length === 0){
                if(count === 0) {
                    alloffer(res.data)
                    setCount(1)
                }
            } else {
                if(count === 1){
                    alloffer(res.data)
                } 
                setCount(0)
            }
        })
    }, [Delivery, lop, setdelivery, Offer, alloffer, count])

    const promo = (val) => {
        setPromocode(val)
    }

    var subtotal = 0
    basket.map(item => subtotal = subtotal + item.totalprice);
    
    var discount = 0
    var final_subtotal = 0
    if(Offer.length !== 0) {
        if(Offer[0].Promocode === "") {
            if(Offer[0].Price !== 0) {
                if(Offer[0].Price <= subtotal) {
                    discount = Offer[0].Discount
                    final_subtotal = subtotal - (discount*subtotal/100)
                } else {
                    final_subtotal = subtotal
                }
            }
        } else if(Offer.length !== '') {
            if(promocode === Offer[0].Promocode) {
                discount = Offer[0].Discount
                final_subtotal = subtotal - (discount*subtotal/100)
            } else {
                final_subtotal = subtotal
            }
        }
    }

    var total = final_subtotal

    return (
        <div className="shopcart">
            <TopBanner img={categoryimg} name="ShopCart" />
            <div className="container-fluid py-0 my-4">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="container">
                            <CartTable />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="container px-0">
                            <CartTotal cart='checkout' subtotal={subtotal} total={total} promo={promo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Delivery: state.Delivery,
        basket: state.basket,
        Offer: state.Offer
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setdelivery: (val) => { 
            dispatch({
                type: 'DELIVERY',
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

export default connect(mapStateToProps, mapDispatchToProps)(Shopcart)
