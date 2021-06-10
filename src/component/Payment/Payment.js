import React, {useState} from 'react'
// import { Link } from 'react-router-dom'import {
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from 'axios'

import './Payment.scss'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			// iconColor: "#c4f0ff",
			// color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			// ":-webkit-autofill": {
			// color: "#fce883"
			// },
			// "::placeholder": {
			// color: "#87bbfd"
			// }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
};

const CardField = ({ onChange }) => (
	<div className="FormRow">
		<CardElement options={CARD_OPTIONS} onChange={onChange} />
	</div>
);

const Field = ({
	label,
	id,
	type,
	placeholder,
	required,
	onKeyPress,
	maxLength,
	autoComplete,
	value,
	onChange
}) => (
	<div className="FormRow">
	<label htmlFor={id} className="FormRowLabel">
		{label}
	</label>
	<input
		className="FormRowInput"
		id={id}
		type={type}
		placeholder={placeholder}
		required={required}
		onKeyPress={onKeyPress}
		maxLength={maxLength}
		autoComplete={autoComplete}
		value={value}
		onChange={onChange}
	/>
	</div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
	<button
		className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
		type="submit"
		disabled={processing || disabled}
	>
	  	{processing ? "Processing..." : children}
	</button>
);
  
const ErrorMessage = ({ children }) => (
	<div className="ErrorMessage bg-danger" role="alert">
		{/* <svg width="16" height="16" viewBox="0 0 17 17">
			<path
				fill="#FFF"
				d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
			/>
			<path
				fill="#6772e5"
				d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
			/>
		</svg> */}
		{children}
	</div>
);

function Payment({place_order, price, radioval, addresserr }) {
	const stripe = useStripe();
	const elements = useElements();
	const [enterval, setEnterVal] = useState(true);
	const [isProcessing, setProcessingTo] = useState(false);
  	const [checkoutError, setCheckoutError] = useState();
	const [billingDetails, setBillingDetails] = useState({
		email: "",
		phone: "",
		name: "",
		address: {
			city: "",
			line1: "",
			state: "",
			postal_code: ""
		}
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
	
		// if (!stripe || !elements) {
		//   // Stripe.js has not loaded yet. Make sure to disable
		//   // form submission until Stripe.js has loaded.
		//   return;
		// }
	
		// if (error) {
		//   	elements.getElement("card").focus();
		//   	return;
		// }
	
		// if (cardComplete) {
		//   setProcessing(true);
		// }

		// axios.post('https://dtodo-indumentaria-server.herokuapp.com/order/payment', {
		// 	amount: price * 100,
        //     token: payload,
		// }).then(res => {
		// 	console.log(res.data)
        //     // place_order(res.data)
        //     return
        // })
        // .catch(error => {
        //     console.log('Payment Error: ', JSON.parse(error))
        //     alert('There was an issue with your payment. Please make sure you have enter the correct details.')
        // })

		setProcessingTo(true);

		try {
			const {data: clientSecret} = await axios.post("https://dtodo-indumentaria-server.herokuapp.com/order/payment", {
				amount: price * 100
			});
		
			var payment_details
			if(radioval === '3') {
				payment_details = {
					type: "card",
					card: elements.getElement(CardElement),
					billing_details: billingDetails
				}
			} else {
				payment_details = {
					type: "card",
					card: elements.getElement(CardElement)
				}
			}
			const paymentMethodReq = await stripe.createPaymentMethod(payment_details);

			if (paymentMethodReq.error) {
				setCheckoutError(paymentMethodReq.error.message);
				setProcessingTo(false);
				return;
			}
			const { error } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: paymentMethodReq.paymentMethod.id
			});

			if (error) {
				setCheckoutError(error.message);
				setProcessingTo(false);
				return;
			}
			place_order(billingDetails)
			// setProcessingTo(false)
		} catch (error) {
			setCheckoutError(error.message)
		}

		// setProcessing(false);
	
		// if (payload.error) {
		//   	setError(payload.error);
		// } else {
		//   	setPaymentMethod(payload.paymentMethod);
		// }
	};

	function onlyNumberKey(evt) {
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
			setEnterVal(false)
		} else {
			setEnterVal(true)
		}
    }
	
	return (
		<div className="payment">
			<div className="title">Payment Method</div>
			<form className="Form" onSubmit={handleSubmit}>
				{
					radioval === undefined || radioval === '3'
					? <fieldset className="FormGroup">
						<Field
							label="Name"
							id="name"
							type="text"
							placeholder="Enter Full Name"
							required
							autoComplete="name"
							value={billingDetails.name}
							onChange={(e) => {
								setBillingDetails({ ...billingDetails, name: e.target.value });
							}}
						/>
						<Field
							label="Email"
							id="email"
							type="email"
							placeholder="Enter Email"
							required
							autoComplete="email"
							value={billingDetails.email}
							onChange={(e) => {
								setBillingDetails({ ...billingDetails, email: e.target.value });
							}}
						/>
						<Field
							label="Phone"
							id="phone"
							type="tel"
							placeholder="Enter Phone number"
							required
							onKeyPress={(event) => onlyNumberKey(event)}
							maxLength='10'
							autoComplete="tel"
							value={billingDetails.phone}
							onChange={(e) => {
								setBillingDetails({ ...billingDetails, phone: e.target.value });
							}}
						/>
						<Field
							label="Address 1"
							id="address"
							type="text"
							placeholder="Enter Address"
							required
							autoComplete="address"
							value={billingDetails.address.line1}
							onChange={(e) => {
								setBillingDetails({ ...billingDetails, address: {
										...billingDetails.address,
										line1: e.target.value
									}
								});
							}}
						/>
							<Field
								label="City"
								id="city"
								type="text"
								placeholder="Enter City"
								required
								autoComplete="city"
								value={billingDetails.address.city}
								onChange={(e) => {
									setBillingDetails({ ...billingDetails, address: {
											...billingDetails.address,
											city: e.target.value
										}
									});
								}}
							/>
						<Field
							label="State"
							id="state"
							type="text"
							placeholder="Enter State"
							required
							autoComplete="state"
							value={billingDetails.address.state}
							onChange={(e) => {
								setBillingDetails({ ...billingDetails, address: {
										...billingDetails.address,
										state: e.target.value
									}
								});
							}}
						/>
						<Field
							label="ZIP"
							id="zip"
							type="text"
							placeholder="Enter Postal Code"
							required
							onKeyPress={(event) => onlyNumberKey(event)}
							maxLength='6'
							autoComplete="zip"
							value={billingDetails.address.postal_code}
							onChange={(e) => {
								if(enterval) {
									setBillingDetails({ ...billingDetails, address: {
											...billingDetails.address,
											postal_code: e.target.value
										}
									});
								}
							}}
						/>
					</fieldset>
					: null
				}
				<fieldset className="FormGroup">
					<CardField
						onChange={(e) => {
							if(e.error) {
								setCheckoutError(e.error.message);
							}
						}}
					/>
				</fieldset>
				{checkoutError && <ErrorMessage>{checkoutError}</ErrorMessage>}
				<SubmitButton disabled={isProcessing || !stripe}>
					{isProcessing ? "Processing..." : `Pay $${price}`}
				</SubmitButton>
			</form>
			{/* <Link className="btn">Place Order</Link> */}
			{/* <button id="payment_btn" className="btn" onClick={place_order}>Place Order</button> */}
			
			<div className="input-feedback" style={{margin: "0"}}>{addresserr}</div>
		</div>
	)
}

export default Payment
