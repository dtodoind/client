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
	const { basket } = props;
	const SingleUser = JSON.parse(localStorage.getItem("SingleUser"));

	// const stripe = useStripe();
	// const elements = useElements();
	const [isProcessing, setProcessingTo] = useState(false);
	const [, setErrorline1] = useState(false);
	const [, setErrorPhone] = useState(false);
	const [checkoutError, setCheckoutError] = useState();
	const [line1error, setLine1error] = useState("");
	const [phoneerror, setPhoneError] = useState("");
	const [stateerror, setStateerror] = useState("")
	const [state2error, setState2error] = useState("")
	const [cityerror, setCityerror] = useState("")
	const [billingDetails, setBillingDetails] = useState({
		email: SingleUser[0].Email,
		phone: "",
		name: SingleUser[0].FirstName + " " + SingleUser[0].LastName,
		address: {
			line1: "",
			// postal_code: "",
			state: "",
			state2:"",
			city: "",
		},
	});


	const [province, setProvince] = useState();
	const [dep, setDep] = useState()
	const [locality, setLocality] = useState();
	const [lop, setLop] = useState(true)
	const [lop2, setLop2] = useState(true)

	const [pro_selected, setPro_selected] = useState(null)
	const [dep_selected, setDep_selected] = useState(null)
	const [loc_selected, setLoc_selected] = useState(null)

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
						setDep(response.data)
					})
					.catch((err) => console.log(err));
					setLop(false)
			}
		}
	
	};
 
	const GetLocality = (pr, dep) => {
		if (!dep){ return }
		if(lop2) {
			axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${pr}&departamento=${dep}&aplanar=true&campos=basico&max=5000&exacto=true&formato=json`)
			.then( response => {
				setLocality(response.data);
			}
			).catch( err => console.log(err))
			setLop2(false)
		}
	}
 


	// console.log(province)
	const options = province?.provincias.map((i) => ({
		label: i.nombre,
		value: i.nombre,
	}));
	const options2 = dep?.departamentos.map((i) => ({
		label: i.nombre,
		value: i.nombre,
	}));
	const options3 = locality?.localidades.map((i) => ({
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
			// console.log(JSON.parse(localStorage.getItem("billingDetails")));
		}
		// return window.location.replace('/account/Order');
	};
	if (JSON.parse(localStorage.getItem("billingDetails")) !== null) {
		place_order(JSON.parse(localStorage.getItem("billingDetails")));
		localStorage.removeItem("billingDetails");
		// window.location.replace('/account/Order')
	}

	useEffect(() => {
		if (JSON.parse(localStorage.getItem("billingDetails")) !== null) {
			parseURLParams(window.location.href);
		}
		if (subtotal === 0) {
			setErrorline1(true);
		} else {
			setErrorline1(false);
		}
	}, [subtotal]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		var item = [];
		for (var i = 0; i < basket.length; i++) {
			item.push({
				title: basket[i].title,
				unit_price: basket[i].price,
				quantity: basket[i].qty,
			});
		}
		// var payer = {
		// 	name: "Test",
		// 	surname: "User",
		// 	email: "test_user_2502054@testuser.com",
		// 	// phone: {
		// 	// 	area_code: "",
		// 	// 	number: 9909027254,
		// 	// },
		// 	// address: {
		// 	// 	street_name: "Cuesta Miguel Armendáriz",
		// 	// 	street_number: 1004,
		// 	// 	zip_code: "1714",
		// 	// },
		// };
		var all_data = {
			item: item,
			// payer: payer,
		};

		if(radioval === 'payment') {

			var phone = document.getElementById('phone').value
			var line1 = document.getElementById('address').value
			
			if(phone === '') setPhoneError('Requerido')
			if(line1 === '') setLine1error('Requerido')
			if(pro_selected === null) setStateerror('Requerido')
			if(dep_selected === null) setState2error('Requerido')
			if(loc_selected === null) setCityerror('Requerido')
	
			if (phone !== "" && line1 !== "" && pro_selected !== null && dep_selected !== null && loc_selected !== null && stateerror === "" && state2error === "" && cityerror === "") {
				setProcessingTo(true);
	
				try {
					// const {data: clientSecret} = await axios.post("https://dtodo-indumentaria-server.herokuapp.com/order/payment", {
					// 	amount: parseInt(price * 100)
					// });

					await axios
						.post("https://dtodo-indumentaria-server.herokuapp.com/order/payment", all_data)
						.then(function (preference) {
							localStorage.setItem(
								"billingDetails",
								JSON.stringify(billingDetails)
							);
							// console.log(localStorage.getItem('billingDetails'))
							var address1 = []
							var phoneno1 = []
							var addr = []
							addr.push(billingDetails.address.line1)
							addr.push(billingDetails.address.city)
							addr.push(billingDetails.address.state2)
							addr.push(billingDetails.address.state)
							var phone = billingDetails.phone
							if(SingleUser[0].Address !== null) {
								address1 = JSON.parse(SingleUser[0].Address)
								phoneno1 = JSON.parse(SingleUser[0].Phoneno)
								address1.push(addr)
								phoneno1.push(phone)
							} else {
								address1.push(addr)
								phoneno1.push(phone)
							}
			
							var details = {
								Users_id: SingleUser[0].Users_id,
								Address: JSON.stringify(address1),
								Email: SingleUser[0].Email,
								FirstName: SingleUser[0].FirstName,
								Image: SingleUser[0].Image,
								LastName: SingleUser[0].LastName,
								Phoneno: JSON.stringify(phoneno1),
							}
							axios.put('https://dtodo-indumentaria-server.herokuapp.com/users/detailsupdate', details).then(res => console.log(res.data))
							localStorage.setItem('SingleUser', JSON.stringify([{
								...SingleUser[0],
								Address: JSON.stringify(address1),
								Phoneno: JSON.stringify(phoneno1)
							}]))
							window.location.replace(preference.data.body.init_point);
						})
						.catch(err => console.log(err))
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
		} else {
			setProcessingTo(true);
	
			try {
				// const {data: clientSecret} = await axios.post("https://dtodo-indumentaria-server.herokuapp.com/order/payment", {
				// 	amount: parseInt(price * 100)
				// });
				// console.log("mercado pago else");

				await axios
				.post("https://dtodo-indumentaria-server.herokuapp.com/order/payment", all_data)
				.then(function (preference) {
						localStorage.setItem(
							"billingDetails",
							JSON.stringify(payment_addr)
						);
						// console.log(localStorage.getItem('billingDetails'))
						window.location.replace(preference.data.body.init_point);
					})
					.catch(err => console.log(err))
			} catch (error) {
				if (price === "0.00") {
					setCheckoutError("Please add some Product in the cart");
				} else {
					setCheckoutError(error.message);
				}
			}
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
									setPhoneError("Requerido");
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
								if (e.target.value === "") {
									setLine1error("Requerido");
									setErrorline1(true);
								} else {
									setLine1error("");
									setErrorline1(false);
								}
							}}
						/>
						{line1error === "" ? null : (
							<div className="input-feedback">{line1error}</div>
						)}
						{/* <Field
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
						{ziperror === "" ? null : (
							<div className="input-feedback">{ziperror}</div>
						)} */}
						<div className="div-select-direction">
							<p>Provincia</p>
							<div className="div-select-only">
								<Select
									value={pro_selected}
									id="state"
									options={options}
									onChange={(val) => {
										setBillingDetails({
											...billingDetails,
					
											address: {
												...billingDetails.address,
												state: val.value,
											},
										})
										setPro_selected(val)
										setDep_selected(null)
										setLoc_selected(null)
										setStateerror("")
										setLop(true)
										
										for (var i = 0; i < props.Delivery.length; i++) {
											if (props.Delivery[i].State === val.value) {
												setStateerror("");
												deliv(val.value, null)
												// setErrorzip(false);
												return;
											} else {
												setStateerror(
													"Nosotros no estamos entregando en esta Provincia"
												);
												// setErrorzip(true);
											}
										}
										// if(document.getElementsByClassName('css-1uccc91-singleValue').length !== 0) {
										// 	console.log(document.getElementsByClassName('css-1uccc91-singleValue')[1])
										// 	if(document.getElementsByClassName('css-1uccc91-singleValue')[1] !== undefined) {
										// 		document.getElementsByClassName('css-1uccc91-singleValue')[1].innerHTML = 'Select...'
										// 		document.getElementsByClassName('css-1uccc91-singleValue')[1].classList.add('css-1wa3eu0-placeholder')
										// 		document.getElementsByClassName('css-1uccc91-singleValue')[1].classList.remove('css-1uccc91-singleValue')
										// 	} else {
										// 		document.getElementsByClassName('css-1wa3eu0-placeholder')[0].classList.add('css-1uccc91-singleValue')
										// 		document.getElementsByClassName('css-1wa3eu0-placeholder')[0].classList.remove('css-1wa3eu0-placeholder')
										// 	}
										// } 
									}}
								/>
									{GetCities(billingDetails.address.state)}
							</div>
						</div>
						{stateerror === "" ? null : (
							<div className="input-feedback">{stateerror}</div>
						)}
						<div className="div-select-direction">
							<p>Ciudad</p>

							<div className="div-select-only2">
								<Select 
									value={dep_selected}
									options={options2}
									onChange={(val) => {
										setBillingDetails({
											...billingDetails,
											address: {
												...billingDetails.address,
												state2: val.value,
											},
										})
										setDep_selected(val)
										setLoc_selected(null)
										setState2error("")
										setLop2(true)
										
										for (var i = 0; i < props.Delivery.length; i++) {
											if (props.Delivery[i].State2 === val.value) {
												setState2error("");
												deliv(pro_selected.value, val.value)
												// setErrorzip(false);
												return;
											} else {
												setState2error(
													"Nosotros no estamos entregando en esta Ciudad"
												);
												// setErrorzip(true);
											}
										}
									}}
								/>
									{GetLocality(billingDetails.address.state, billingDetails.address.state2)}
							</div>
						</div>
						{state2error === "" ? null : (
							<div className="input-feedback">{state2error}</div>
						)}
						<div className="div-select-direction">
							<p>Localidad</p>

							<div className="div-select-only3">
								<Select 
									value={loc_selected}
									options={options3}
									onChange={(val) => {
										setBillingDetails({
											...billingDetails,
											address: {
												...billingDetails.address,
												city: val.value,
											},
										})
										setLoc_selected(val)
										setCityerror("")
									}}
								/>
					
							</div>
						</div>
						{cityerror === "" ? null : (
							<div className="input-feedback">{cityerror}</div>
						)}
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
				<button className="SubmitButton" onClick={handleSubmit} disabled={isProcessing}>
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
