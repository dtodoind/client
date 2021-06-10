import React, { useState } from "react";
import "./ProfileCard.scss";
import { BiEdit } from "react-icons/bi";
import EditModal from "./EditModal";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useStateValue } from '../../Redux/StateProvider'
import { connect } from "react-redux";

function ProfileCard(props) {
	const [smShow, setSmShow] = useState(false);
	const user = props.user;
	const [User, setUser] = useState(user);
	var SingleUser = JSON.parse(localStorage.getItem("SingleUser"));

	function onChange(e) {
		setUser({
			...SingleUser[0],
			[e.target.name]: e.target.value,
		});
	}
	function edit() {
		setUser({
			id: SingleUser[0].Users_id,
			username: SingleUser[0].Username,
			firstname: SingleUser[0].FirstName,
			lastname: SingleUser[0].LastName,
			email: SingleUser[0].Email,
		});
		setSmShow(true);
	}

	function EditUser() {
		var val = {
			id: User.id,
			username: User.username,
			firstname: User.firstname,
			lastname: User.lastname,
			email: User.email,
		};

		props.settinguser(val);

		setSmShow(false);
	}
	return (
		<div>
			<div className="User-card">
				{" "}
				<BiEdit className="button-account" onClick={edit} />
				{/* <h1>{user?.username}</h1> */}
				<div className="w-100 d-flex justify-content-center">
					<div className="image-account">
						<img
							src={SingleUser[0].Image}
							alt="avatar"
							className="avatar-account"
						/>
					</div>
				</div>
				<div className="bio-account">
					<div className="container-fluid">
						<div className="row">
							<div className="col-4">
								<p className="font-weight-bold">FirstName: </p>
							</div>
							<div className="col-8">
								<p>{SingleUser[0].FirstName}</p>
							</div>
							<div className="col-4">
								<p className="font-weight-bold">LastName: </p>
							</div>
							<div className="col-8">
								<p>{SingleUser[0].LastName}</p>
							</div>
							<div className="col-4">
								<p className="font-weight-bold">Email: </p>
							</div>
							<div className="col-8">
								<p>{SingleUser[0].Email}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<EditModal
				EditUser={EditUser}
				User={User}
				onChange={onChange}
				show={smShow}
				onHide={() => setSmShow(false)}
			/>
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
				user: val,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
