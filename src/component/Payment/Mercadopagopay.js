import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom'import {
// import { useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Select from "react-select";
import "./Mercadopagopay.scss";
import { connect } from "react-redux";

// const CARD_OPTIONS = {
// 	iconStyle: "solid",
// 	hidePostalCode: true,
// 	style: {
// 		base: {
// 			// iconColor: "#c4f0ff",
// 			// color: "#fff",
// 			fontWeight: 500,
// 			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
// 			fontSize: "16px",
// 			fontSmoothing: "antialiased",
// 			// ":-webkit-autofill": {
// 			// color: "#fce883"
// 			// },
// 			// "::placeholder": {
// 			// color: "#87bbfd"
// 			// }
// 		},
// 		invalid: {
// 			iconColor: "#ffc7ee",
// 			color: "#ffc7ee"
// 		}
// 	}
// };

// const CardField = ({ onChange }) => (
// 	<div className="FormRow">
// 		<CardElement options={CARD_OPTIONS} onChange={onChange} />
// 	</div>
// );

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
	onChange,
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

// const SubmitButton = ({ processing, error, children, disabled }) => (
// 	<button
// 		className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
// 		type="submit"
// 		disabled={processing || disabled}
// 	>
// 	  	{processing ? "Processing..." : children}
// 	</button>
// );

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

function Mercadopagopay({
	place_order,
	price,
	subtotal,
	radioval,
	deliv,
	payment_addr,
	addresserr,
	...props
}) {
	const { Delivery, basket } = props;
	const SingleUser = JSON.parse(localStorage.getItem("SingleUser"));

	// const stripe = useStripe();
	// const elements = useElements();
	const [, setProcessingTo] = useState(false);
	const [, setErrorzip] = useState(false);
	const [, setErrorPhone] = useState(false);
	const [checkoutError, setCheckoutError] = useState();
	const [ziperror, setZiperror] = useState("");
	const [phoneerror, setPhoneError] = useState("");
	const [billingDetails, setBillingDetails] = useState({
		email: SingleUser[0].Email,
		phone: "",
		name: SingleUser[0].FirstName + " " + SingleUser[0].LastName,
		address: {
			line1: "",
			postal_code: "",
			state: "",
		state2:"",
			city: "",
		},
	});

	// console.log(billingDetails.address, "DATA");

	const [province, setProvince] = useState();
	const [locality, setLocality] = useState();
	const [lop, setLop] = useState(true)

	useEffect(() => {
		axios
			.get(
				`https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&aplanar=true&campos=basico&max=5000&exacto=true&formato=json`
			)
			.then((response) => {
				setProvince(response.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const GetCities = (prov) => {
		if (!prov){ return }
		// console.log(prov, 'PROV')
		if(lop) {
			if(prov !== '') {
				axios
					.get(
						`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${prov}&orden=nombre&aplanar=true&campos=basico&max=5000&exacto=true&formato=json`
					)
					.then((response) => {
						setLocality(response.data)
					})
					.catch((err) => console.log(err));
					setLop(false)
			}
		}
		// console.log(dep, 'DEPARTAMENTO')
	};
/* 
	const GetLocality = (provincia, departamento) => {
	if (!departamento){ return }
	axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&departamento=${departamento}&aplanar=true&campos=basico&max=5000&exacto=true&formato=json
	`)
	.then( response => {
		setLocality(response.data.localidades);
		}
	).catch( err => console.log(err))
}
 */


	// console.log(province)
	const options = province?.provincias.map((i) => ({
		label: i.nombre,
		value: i.nombre,
	}));
/*   const options2 = province?.departamentos.map((i) => ({
		label: i.nombre,
		value: i.nombre,
	})); */

	const options3 = locality?.departamentos.map((i) => ({
		label: i.nombre,
		value: i.nombre,
	}));

	const parseURLParams = (url) => {
		var queryStart = url.indexOf("?") + 1,
			queryEnd = url.indexOf("#") + 1 || url.length + 1,
			query = url.slice(queryStart, queryEnd - 1),
			pairs = query.replace(/\+/g, " ").split("&"),
			parms = {},
			i,
			n,
			v,
			nv;

		if (query === url || query === "") return;

		for (i = 0; i < pairs.length; i++) {
			nv = pairs[i].split("=", 2);
			n = decodeURIComponent(nv[0]);
			v = decodeURIComponent(nv[1]);

			if (!parms.hasOwnProperty(n)) parms[n] = [];
			parms[n] = nv.length === 2 ? v : null;
		}
		// console.log(parms)
		if (parms.status === "approved") {
			console.log(JSON.parse(localStorage.getItem("billingDetails")));
		}
		// return window.location.replace('/account/Order');
	};
	if (JSON.parse(localStorage.getItem("billingDetails")) !== null) {
		console.log("its here");
		place_order(JSON.parse(localStorage.getItem("billingDetails")));
		localStorage.removeItem("billingDetails");
		// window.location.replace('/account/Order')
	}

	useEffect(() => {
		if (JSON.parse(localStorage.getItem("billingDetails")) !== null) {
			console.log("its here");
			parseURLParams(window.location.href);
		}
		if (subtotal === 0) {
			setErrorzip(true);
		} else {
			setErrorzip(false);
		}
	}, [subtotal]);

	const handleSubmit = async (event) => {
		event.preventDefault();


		if (ziperror === "" && phoneerror === "") {
			setProcessingTo(true);

			try {
				// const {data: clientSecret} = await axios.post("http://localhost:5000/order/payment", {
				// 	amount: parseInt(price * 100)
				// });
				console.log("mercado pago");

				var item = [];
				for (var i = 0; i < basket.length; i++) {
					item.push({
						title: basket[i].title,
						unit_price: basket[i].price,
						quantity: basket[i].qty,
					});
				}
				var payer = {
					name: "Test",
					surname: "User",
					email: "test_user_2502054@testuser.com",
					phone: {
						area_code: "",
						number: 9909027254,
					},
					identification: {
						type: "DNI",
						number: "12345678",
					},
					address: {
						street_name: "Cuesta Miguel Armendáriz",
						street_number: 1004,
						zip_code: "1714",
					},
				};
				var all_data = {
					item: item,
					payer: payer,
				};
				await axios
					.post("http://localhost:5000/order/payment", all_data)
					.then(function (preference) {
						localStorage.setItem(
							"billingDetails",
							JSON.stringify(billingDetails)
						);
						window.location.replace(preference.data.body.init_point);
					});

 
			} catch (error) {
				if (price === "0.00") {
					setCheckoutError("Please add some Product in the cart");
				} else {
					setCheckoutError(error.message);
				}
			}

			// setProcessing(false);

			// if (payload.error) {
			//   	setError(payload.error);
			// } else {
			//   	setPaymentMethod(payload.paymentMethod);
			// }
		}
	};

	const onlyNumberKey = (e) => {
		var a = [];
		var k = e.which;

		for (let i = 48; i < 58; i++) a.push(i);

		if (!(a.indexOf(k) >= 0)) e.preventDefault();
	};

	return (
		<div className="payment">
			<div className="title">Método de pago</div>
			<form className="Form" onSubmit={handleSubmit}>
				{radioval === undefined || radioval === "payment" ? (
					<fieldset className="FormGroup">
			
						<Field
							label="Celular"
							id="phone"
							type="tel"
							placeholder="Enter Phone number"
							required
							onKeyPress={(event) => onlyNumberKey(event)}
							maxLength="10"
							autoComplete="tel"
							value={billingDetails.phone}
							onChange={(e) => {
								setBillingDetails({ ...billingDetails, phone: e.target.value });
								if (e.target.value === "") {
									setErrorPhone(true);
									setPhoneError("Required");
								} else if (e.target.value.length !== 10) {
									setErrorPhone(true);
									setPhoneError("atleast 10 digit");
								} else {
									setErrorPhone(false);
									setPhoneError("");
								}
							}}
						/>
						{phoneerror === "" ? null : (
							<div className="input-feedback">{phoneerror}</div>
						)}
						<Field
							label="Dirección 1"
							id="address"
							type="text"
							placeholder="Enter Address"
							required
							autoComplete="address"
							value={billingDetails.address.line1}
							onChange={(e) => {
								setBillingDetails({
									...billingDetails,
									address: {
										...billingDetails.address,
										line1: e.target.value,
									},
								});
							}}
						/>
						<Field
							label="Postal"
							id="zip"
							type="text"
							placeholder="Codigo Postal"
							required
							onKeyPress={(event) => onlyNumberKey(event)}
							maxLength="4"
							autoComplete="zip"
							value={billingDetails.address.postal_code}
							onChange={(e) => {
								setBillingDetails({
									...billingDetails,
									address: {
										...billingDetails.address,
										postal_code: e.target.value,
									},
								});
								if (e.target.value === "") {
									setZiperror("Requerido");
									setErrorzip(true);
								} else if (e.target.value.length === 4) {
									for (var i = 0; i < Delivery.length; i++) {
										if (Delivery[i].Region === parseInt(e.target.value)) {
											setZiperror("");
											deliv(e.target.value);
											setErrorzip(false);
											return;
										} else {
											setZiperror(
												"Nosotros no estamos entregando en esta region"
											);
											setErrorzip(true);
										}
									}
								} else {
									setZiperror("atleast 4 digit");
									setErrorzip(true);
								}
							}}
						/>
						<div className="div-select-direction">
							<p>Provincia</p>
							<div className="div-select-only">
								<Select
									options={options}
									onChange={(val) => {
										setBillingDetails({
											...billingDetails,
					
											address: {
												...billingDetails.address,
												state: val.value,
											},
										})
										setLop(true)
									}}
								/>
									{GetCities(billingDetails.address.state)}
							</div>
						</div>
						<div className="div-select-direction">
							<p>Ciudad</p>

							<div className="div-select-only2">
								<Select 
									options={options3}
									onChange={(val) =>
										setBillingDetails({
											...billingDetails,
											address: {
												state2: val.value,
											},
										})
									}
								/>
					
							</div>
						</div>

						{/* 			<Field
								label="Ciudad"
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
							label="Estado"
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
						/> */}

						{ziperror === "" ? null : (
							<div className="input-feedback">{ziperror}</div>
						)}
					</fieldset>
				) : null}
				{/* <fieldset className="FormGroup">
					<CardField
						onChange={(e) => {
							if(e.error) {
								setCheckoutError(e.error.message);
							}
						}}
					/>
				</fieldset> */}
				{checkoutError && <ErrorMessage>{checkoutError}</ErrorMessage>}
				{/* <SubmitButton disabled={errorzip || isProcessing || !stripe || errorphone}>
					{isProcessing ? "Procesando..." : `Pagar $${price}`}
				</SubmitButton> */}
				<button id="button-checkout" onClick={handleSubmit}>
					Handle Submit
				</button>
				{/* <h3 style={{textAlign: 'center', marginTop: '40px', fontSize: '24px', color: 'red'}}>
					*Please use the following test credit card for payments*
					<br />
					4242 4242 4242 4242 - Exp: 04/24 - CVV: 242
				</h3> */}
			</form>
			{/* <Link className="btn">Place Order</Link> */}
			{/* <button id="payment_btn" className="btn" onClick={place_order}>Place Order</button> */}

			<div className="input-feedback" style={{ margin: "0" }}>
				{addresserr}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		Delivery: state.Delivery,
		basket: state.basket,
	};
};

export default connect(mapStateToProps)(Mercadopagopay);
