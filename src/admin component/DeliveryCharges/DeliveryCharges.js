import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";
import axios from "axios";
import Select from "react-select";
import "./DeliveryCharges.scss";

function DeliveryCharges(props) {
	const [zip, setZip] = useState("");
	const [states, setStates] = useState({state:'', state2:''});
	const [charges, setCharges] = useState("");
	const [lop, setlop] = useState(true);
	const [ziperror, setZiperror] = useState();
	const [chargeserror, setChargeserror] = useState();
	const [insert, setInsert] = useState(true);
	const { Delivery, setdelivery } = props;
	const [lop2, setLop2] = useState(true);
	const [prov, setProv] = useState();
	const [prov2, setProv2] = useState();

	const [state_selected, setState_selected] = useState()
	const [state2_selected, setState2_selected] = useState()

	useEffect(() => {
		axios
			.get(
				`https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&aplanar=true&campos=basico&max=5000&exacto=true&formato=json`
			)
			.then((response) => {
				setProv(response.data);
			})
			.then(() => {
				axios.get("http://localhost:5000/delivery/all").then((res) => {
					if (Delivery.length !== 0) {
						if (
							Delivery[Delivery.length - 1].Delivery_id !==
							res.data[res.data.length - 1].Delivery_id
						) {
							setdelivery(res.data);
						}
						setlop(true);
					} else {
						if (lop) {
							setdelivery(res.data);
							setlop(false);
						}
					}
				});
			});
	}, [Delivery, lop, setdelivery]);

	const GetApiState = (n) => {
		if (!n) {
			return;
		}
		// console.log(prov, 'PROV')
		if (lop2) {
			if (n !== "") {
				axios
					.get(
						`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${n}&orden=nombre&aplanar=true&campos=basico&max=5000&exacto=true&formato=json`
					)
					.then((response) => {
						setProv2(response.data);
					})
					.catch((err) => console.log(err));
				setLop2(false);
			}
		}
	};

	const options = prov?.provincias.map((i) => ({
		label: i.nombre,
		value: i.nombre,
	}));
	const options2 = prov2?.departamentos.map((i) => ({
		label: i.nombre,
		value: i.nombre,
	}));

	const region = (e) => {
		const re = /^[0-9\b]+$/;
		console.log("2");

		if (e.target.value === "" || re.test(e.target.value)) {
			if (e.target.name === "zip") {
				setZip(e.target.value);
				setZiperror("");
			}
			if (e.target.name === "charges") {
				setCharges(e.target.value);
				setChargeserror("");
			}
		}
	};

	const different_rec = async (e) => {
		if (e.key === "Enter") {
	 /*    if (e.target.name === "zip") {
				if (e.target.value !== "") {
					if (e.target.value.length === 4) {
						for (var i = 0; i < Delivery.length; i++) {
							if (Delivery[i].Region === parseInt(zip)) {
								setInsert(false);
								setZiperror("The Region is already inserted");
								return;
							} else {
								setInsert(true);
							}
						}
						document.getElementsByName("charges")[0].focus();
						setZiperror("");
					} else {
						setZiperror("Zip should be atleast 4 digits long");
					}
				} else {
					setZiperror("Required");
				}
			} */
			if (e.target.name === "charges") {
				/* if (e.target.value !== "") {
					if (states) { */
						setChargeserror("");
						var val = {
							State: states.state,
							State2: states.state2,
							Charges: charges,
						};
						if (insert) {
							await axios.post("http://localhost:5000/delivery/new", val).then(res => {
								setState_selected(null)
								setState2_selected(null)
							});
							await axios
								.get("http://localhost:5000/delivery/all")
								.then((res) => {
									setdelivery(res.data);
								});
						//  setZip("");
							setCharges("");
						//   document.getElementsByName("zip")[0].focus();
						}
					}  /* else {
						setZiperror("Zip should be atleast 4 digits long");
					}
				} else {
					setChargeserror("Required");
				}
			} */
		}
	};

	const remove_delivery = async (id) => {
		await axios.delete(`http://localhost:5000/delivery/delete/${id}`);
		await axios.get("http://localhost:5000/delivery/all").then((res) => {
			if (Delivery.length !== 0) {
				if (Delivery.length !== res.data.length) {
					setdelivery(res.data);
				}
			}
		});
	};

	return (
		<div className="deliverycharges">
			<table className="table">
				<thead>
					<tr>
					<th scope="col">Provincia</th>
						<th scope="col">Departamento</th>
						<th scope="col">Charges</th>
						<th scope="col" className="text-center">
							Remove
						</th>
					</tr>
				</thead>
				<tbody id="delivery_input">
					{Delivery?.map((d, i) => (
						<tr key={i}>
							<td>{d.State}</td>
							<td>{d.State2}</td>
							<td>${d.Charges}</td>
							<td className="text-center">
								<IoCloseCircle
									fontSize="20"
									style={{ cursor: "pointer" }}
									onClick={() => remove_delivery(d.Delivery_id)}
								/>
							</td>
						</tr>
					))}
					<tr>
						<td className="td-select">
							<Select
								value={state_selected}
								options={options}
								onChange={(val) => {
									setStates({ ...states, state: val.value });
									setState_selected(val)
									setState2_selected(null)
									setLop2(true);
								}}
							/>
					 
							{GetApiState(states.state)}
							{/* <input type="text" value={zip} name="zip" onChange={region} onKeyUp={different_rec} maxLength="4" /> */}
							{/* <p style={{ margin: "0", color: "red" }}>{ziperror}</p> */}
						</td>
						<td className="td-select">
							<Select 
								options={options2} 
								value={state2_selected} 
								onChange={(val) => {
									setStates({ ...states, state2: val.value });
									setState2_selected(val)
								}}
							/>
						 
						</td>
						<td>
						<input type="text" value={charges} name="charges" onChange={region} onKeyUp={different_rec} />
							<p style={{ margin: "0", color: "red" }}>{chargeserror}</p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		Delivery: state.Delivery,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setdelivery: (val) => {
			dispatch({
				type: "DELIVERY",
				item: val,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryCharges);
