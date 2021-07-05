import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './CartTotal.scss'
import { FaDollarSign } from 'react-icons/fa';
// import StripeCheckoutButton from '../../component/Payment/strip-button'

import { connect } from 'react-redux'

function CartTotal(props) {
    const { Offer, delivery_charges, total, subtotal, after_total, promo } = props
    // console.log(total)
    const [promocode, setPromocode] = useState('')
    // var subtotal = 0
    // basket.map(item => subtotal = subtotal + item.totalprice);
    
    // var delivery = delivery_charges
    // if(basket.length !== 0) {
    //     if(Delivery[radioval-2] !== undefined) {
    //         delivery = Delivery[radioval-2].Charges
    //     } else {
    //     }
    // } else {
    //     console.log('its here')
    // }
    // useEffect(() => {
        
    // }, [Offer, alloffer, count])
    
    var discount = 0
    // var final_subtotal = 0
    if(Offer.length !== 0) {
        if(Offer[0].Promocode === '') {
            if(Offer[0].Price !== 0) {
                if(Offer[0].Price <= subtotal) {
                    discount = Offer[0].Discount
                    // final_subtotal = subtotal - (discount*100/subtotal)
                } else {
                    // final_subtotal = subtotal
                }
            }
        } else if(Offer.length !== '') {
            if(promocode === Offer[0].Promocode) {
                discount = Offer[0].Discount
            }
        }
    }

    // var total = final_subtotal + delivery_charges
    return (
        <div className="container-fluid px-0 carttotal">
            <div className="cart_inner">
                <div className="container-fluid px-0 arg" style={{overflow: 'hidden'}}>
                    <div className="row py-2 pt-4 px-3">
                        <div className="col">
                            <p style={{fontWeight: '500'}}>Cart Total</p>
                        </div>
                    </div>
                    <div className="row py-2 px-3">
                        <div className="col">
                            <p>Subtotal</p>
                        </div>
                        <div className="col">
                            <FaDollarSign/>
                            {subtotal}
                        </div>
                    </div>
                    {
                        Offer.length !== 0
                        ? Offer[0]?.Promocode === ''
                            ? Offer[0]?.Price !== 0
                                ? <>
                                    <div className="row py-2 px-3">
                                        <div className="col">
                                            <p>Discount</p>
                                        </div>
                                        <div className="col">
                                            <FaDollarSign/>
                                            {discount}%
                                        </div>
                                    </div>
                                </>
                                : null
                            : <>
                                <div className="row py-2 px-3">
                                    <div className="col">
                                        <p>Discount</p>
                                    </div>
                                    <div className="col">
                                        <FaDollarSign/>
                                        {discount}%
                                    </div>
                                </div>
                                <div className="row py-2 px-3">
                                    <div className="col">
                                        <p>Promo Code</p>
                                    </div>
                                    <div className="col">
                                        <input placeholder='#82928' className='input_prom' name="promocode" style={{textTransform: 'uppercase'}} onChange={(e) => {
                                            setPromocode(e.target.value.toUpperCase())
                                            promo(e.target.value.toUpperCase())
                                        }} />
                                    </div>
                                </div>
                            </>
                        : null
                    }
                    <div className="row py-2 px-3" style={{borderTop: '1px solid rgba(0,0,0,.2)'}}>
                        <div className="col">
                            <p></p>
                        </div>
                        <div className="col">
                            <div style={{fontWeight: '500'}}>
                                <FaDollarSign/>
                                {total.toFixed(2)}
                            </div>
                        </div>
                    </div>
                    {
                        after_total !== undefined
                        ? <>
                            <div className="row py-2 px-3">
                                <div className="col">
                                    <p>Delivery</p>
                                </div>
                                <div className="col">
                                    <FaDollarSign/>
                                    {delivery_charges}
                                </div>
                            </div>
                            <div className="row py-2 px-3" style={{borderTop: '1px solid rgba(0,0,0,.2)'}}>
                                <div className="col">
                                    <p>TOTAL</p>
                                </div>
                                <div className="col">
                                    <div style={{fontWeight: '500'}}>
                                        <FaDollarSign/>
                                        {after_total.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </>
                        : null
                    }
                    <div className="row py-2 px-3">
                        <div className="col">
                            {
                                props.cart !== 'checkout'
                                ? null
                                // ? <StripeCheckoutButton price={total.toFixed(0)} radioval={radioval} place_order={place_order} />
                                : <Link to="/checkout" className="checkout_btn">Checkout</Link>
                            }
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
        Offer: state.Offer,
        Delivery: state.Delivery
    }
}

export default connect(mapStateToProps)(CartTotal)
