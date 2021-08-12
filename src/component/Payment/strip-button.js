import React, { useEffect, useState } from 'react'
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout'
// import Logo from '../../assets/New_logo_edit.png'
import loader from '../../assets/Infinity-1s-200px.gif'

const StripeCheckoutButton = ({ place_order, price, radioval }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51HQ8G6AKKub6FeRVwHkGeDvuTa6dSwE1esMggOrsrt8xQbJIEPiVjiBrNcKIVvyQT0TmkbakjrFeuOpAMNKsnAn100EDtjCkPa'
    const [shipbill, setShipBill] = useState(true)
    
    useEffect(()=> {
        if(radioval === undefined) {
            setShipBill(true)
        } else {
            setShipBill(false)
        }
    }, [setShipBill, radioval])

    const onToken = token => {
        document.getElementById('payment_btn').innerHTML = `<div class="load"><div style="height: 100%"><img src=${loader} alt="loader" style="height: 50px;" /></div></div>`
        document.getElementById('payment_btn').style.backgroundColor = 'white'
        document.getElementById('payment_btn').disabled = true
        axios.post('https://dtodo-indumentaria-server.herokuapp.com/order/payment', {
            amount: priceForStripe,
            token
        }).then(res => {
            place_order(res.data)
            return
        })
        .catch(error => {
            console.log('Payment Error: ', JSON.parse(error))
            alert('There was an issue with your payment. Please make sure you have enter the correct details.')
        })
    }

    return (
        <StripeCheckout 
            name='DTODO INDUMENTARIA'
            billingAddress={shipbill}
            shippingAddress={shipbill}
            currency='INR'
            image={'https://dtodo-indumentaria-server.herokuapp.com/New_logo_edit.png'}
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Place Order'
            token={onToken}
            stripeKey={publishableKey}
        >
            <button id="payment_btn" className="btn" style={{width: '100%'}}>Place Order</button>
        </StripeCheckout>
    )
}

export default StripeCheckoutButton
