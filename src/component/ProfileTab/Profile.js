import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { connect } from "react-redux";
import EditProfile from "./EditProfile";
import AddAddress from '../AddAddress/AddAddress'
import axios from 'axios'

function Profile(props) {
	const { savedUser, settinguser } = props;
	const [lgShow, setLgShow] = useState(false);
	const [SingleUser, setSingleUser] = useState(JSON.parse(localStorage.getItem("SingleUser")));
	const [User, setUser] = useState(savedUser);
	const [addshow, setAddShow] = useState(true)
	
	function onChange(e) {

		if(e.target.name === 'image') {
			var reader = new FileReader();
			reader.onload = function (evt) {
				document.getElementById("profileEdit").src = evt.target.result;
			};
			reader.readAsDataURL(e.target.files[0]);

			setUser({
				...User,
				[e.target.name]: document.getElementById("image").files[0].name,
			});
		} else {
			setUser({
				...User,
				[e.target.name]: e.target.value,
			});
		}
	}

	useEffect(() => {
		settinguser(SingleUser)
	}, [settinguser, SingleUser])
	
	function edit() {
		// setUser({
		// 	id: SingleUser[0].Users_id,
		// 	username: SingleUser[0].Username,
		// 	firstname: SingleUser[0].FirstName,
		// 	lastname: SingleUser[0].LastName,
		// 	email: SingleUser[0].Email,
		// 	gender: SingleUser[0].Gender,
		// 	phone: SingleUser[0].Phoneno,
		// 	address: JSON.parse(SingleUser[0].Address),
		// });
		setLgShow(true);
	}

	async function EditUser(val) {
		// var val = {
		// 	id: User.id,
		// 	username: User.Username,
		// 	firstname: User.FirstName,
		// 	lastname: User.LastName,
		// 	email: User.Email,
		// 	gender: User.Gender,
		// 	phone: User.Phoneno,
		// 	// address: User.Address,
		// };

		if(val !== undefined) {
			var address = JSON.parse(SingleUser[0].Address)
			address.push(val.Address.split(/, /g))

			var formdata = new FormData()
			formdata.append('Address', JSON.stringify(address))
			formdata.append('Email', SingleUser[0].Email)
			formdata.append('FirstName', SingleUser[0].FirstName)
			formdata.append('Gender', SingleUser[0].Gender)
			formdata.append('Image', SingleUser[0].Image)
			formdata.append('LastName', SingleUser[0].LastName)
			formdata.append('Phoneno', SingleUser[0].Phoneno)
			formdata.append('Users_id', SingleUser[0].Users_id) 
			formdata.append('Username', SingleUser[0].Username.toLowerCase())

			await axios.put('http://localhost:5000/users/detailsupdate', formdata, {
				headers: {
					'x-auth-token': localStorage.getItem('token')
				}
			})
	
			localStorage.setItem('SingleUser', JSON.stringify([{
				...SingleUser[0],
				Address: JSON.stringify(address),
			}]))
			setSingleUser([{
				...SingleUser[0],
				Address: JSON.stringify(address),
			}])
			// setUser(JSON.parse(localStorage.getItem('SingleUser')))
			// console.log(JSON.parse(localStorage.getItem('SingleUser')))
		} else {
			User.Address = SingleUser[0].Address
			User.Image = document.getElementById("image").files.length === 0 ? User.Image : 'http://localhost:5000/'+document.getElementById("image").files[0].name
			var formdata2 = new FormData()
			formdata2.append('Address', SingleUser[0].Address)
			formdata2.append('Email', User.Email)
			formdata2.append('FirstName', User.FirstName)
			formdata2.append('Gender', User.Gender)
			formdata2.append('Image', document.getElementById("image").files.length === 0 ? User.Image : document.getElementById("image").files[0])
			formdata2.append('LastName', User.LastName)
			formdata2.append('Phoneno', User.Phoneno)
			formdata2.append('Users_id', User.Users_id) 
			formdata2.append('Username', User.Username.toLowerCase())
			
			await axios.put('http://localhost:5000/users/detailsupdate', formdata2, {
				headers: {
					'x-auth-token': localStorage.getItem('token')
				}
			})
			localStorage.setItem('SingleUser', JSON.stringify([User]))
			setSingleUser([User])
		}
		props.settinguser(JSON.parse(localStorage.getItem('SingleUser')))
		
		// localStorage.removeItem('SingleUser')
		
		// props.settinguser(val);//what do "settinguser"?
		
		setLgShow(false);
	}

	const removeAddress = async (val) => {
		var address = JSON.parse(SingleUser[0].Address)
		address.splice(val, 1)

		var details = {
			Address: JSON.stringify(address),
			Email: "sbhavesh760@gmail.com",
			FirstName: "Chetan",
			Gender: "Male",
			// Image: "http://localhost:5000/57c4a76e1040e_thumb900.jpg",
			LastName: "Solanki",
			Phoneno: "9909027254",
			// Status: "Inactive",
			Users_id: SingleUser[0].Users_id, 
			Username: "chetan007",
		}

		await axios.put('http://localhost:5000/users/detailsupdate', details, {
			headers: {
				'x-auth-token': localStorage.getItem('token')
			}
		})

		localStorage.setItem('SingleUser', JSON.stringify([{
			...SingleUser[0],
			Address: JSON.stringify(address),
		}]))
		setSingleUser(JSON.parse(localStorage.getItem('SingleUser')))
	}

	function addaddress() {
        if(addshow) {
            document.getElementsByClassName('drop_contain')[0].style.maxHeight = '5000px';
            document.getElementsByClassName('drop_contain')[0].style.border = '1px solid rgba(0, 0, 0, 0.1)';
            document.getElementsByClassName('drop_contain')[0].style.padding = '20px 15px';
            document.getElementsByClassName('drop_contain')[0].style.transition = "max-height 0.3s ease-in"
            setAddShow(false)
        } else {
            document.getElementsByClassName('drop_contain')[0].style.maxHeight = '0';
            document.getElementsByClassName('drop_contain')[0].style.border = '0px solid rgba(0, 0, 0, 0.1)';
            document.getElementsByClassName('drop_contain')[0].style.padding = '0px 15px';
            document.getElementsByClassName('drop_contain')[0].style.transition = "max-height 0.3s ease-out"
            setAddShow(true)
        }
    }

	return (
		<div className="profile mt-2">
			<div className="title1_out">
				<p className="title1_ins">Profile Details</p>
			</div>
			<div className="container-fluid mt-5">
				<div className="divp-1">
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-4 ar">
								<div className="img_outside">
									<img src={SingleUser[0].Image} alt="img" className="img_inside" />
								</div>
								<p style={{textAlign: "center", fontWeight: "500", fontSize: "25px"}}>
									{SingleUser[0].Username}{" "}
								</p>
							</div>
							<div className="col-sm-8">
								<div className="row m-2">
									<div className="col-4">
										<p className="font-weight-bold">First Name: </p>
									</div>
									<div className="col-8">
										<p className="col-data">{SingleUser[0].FirstName}</p>
									</div>
									<div className="col-4">
										<p className="font-weight-bold">Last Name: </p>
									</div>

									<div className="col-8">
										<p className="col-data">{SingleUser[0].LastName}</p>
									</div>

									<div className="col-4">
										<p className="font-weight-bold">Email: </p>
									</div>
									<div className="col-8">
										<p className="col-data">{SingleUser[0].Email}</p>
									</div>

									<div className="col-4">
										<p className="font-weight-bold">Phone: </p>
									</div>

									<div className="col-8">
										<p className="col-data">{SingleUser[0].Phoneno}</p>
									</div>
									<div className="col-4">
										<p className="font-weight-bold">Gender: </p>
									</div>
									<div className="col-8">
										<p className="col-data">{SingleUser[0].Gender}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="btn-edit-div">
					<button className="btn-edit" onClick={edit}>
						Edit
						<AiOutlineEdit className="icon-edit" />
					</button>
				</div>

				<EditProfile
					EditUser={EditUser}
					User={User}
					onChange={onChange}
					show={lgShow}
					onHide={() => setLgShow(false)}
				/>


				<div className="divp-2">
					<p className="title">Address</p>
					<AddAddress
						EditUser={EditUser}
						addaddress={addaddress}
					/>
					<div className="container-fluid">
						<div className="row rowp-2">
							{
								JSON.parse(SingleUser[0].Address).map((alladdress, i) => 
									<div className="col-sm-4 mb-3" key={i}>
										{/* <div className="input-label">
											<label> */}
												{/* <input
													type="radio"
													id="f-option"
													name="selector"
													className="input-r"
												/> */}
												<div className="colp-1">
													<span style={{margin: '5px 20px', fontSize: '21px', fontWeight: '500'}}>Address {i+1}</span>
													<div className="ad_dis">
														{
															alladdress.map((a, j) => (
																<p key={j} style={{margin: '0'}}>
																	{a}
																	<br />
																</p>
															))
														}
														<div className="btn_adj">
															<button className="btn-remove" onClick={() => removeAddress(i)}>Remove</button>
														</div>
													</div>
												</div>
											{/* </label>
										</div> */}
									</div>
								)
							}
						</div>
					</div>
					{/* <Col className="colp-2">
						<div className="input-label">
							<input
								type="radio"
								id="s-option"
								name="selector"
								className="input-r"
							/>
							<label>Address2</label>
						</div>
					</Col>
					<Col className="colp-3">
						{" "}
						<div className="input-label">
							<input
								type="radio"
								id="t-option"
								name="selector"
								className="input-r"
							/>
							<label>Adress3</label>
						</div>
					</Col> */}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		settinguser: (val) => {
			dispatch({
				type: "SET_USER",
				item: val,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
