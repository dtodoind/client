import React, { useEffect, useState } from "react";

import "./Register.scss";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import profile from "../../assets/profile_pic.svg";
import io from "socket.io-client";
import { connect } from "react-redux";

const socket = io("https://dtodo-indumentaria-server.herokuapp.com");

function Register({ show, ...props }) {
	const [emailerror, setEmailerror] = useState("");
	const [usererror, setUsererror] = useState("");
	const [count, setcount] = useState(0);

	useEffect(() => {
		const inputs = document.querySelectorAll(".input");

		function addcl() {
			let parent = this.parentNode.parentNode;
			parent.classList.add("focus");
		}

		function remcl() {
			let parent = this.parentNode.parentNode;
			if (this.value === "") {
				parent.classList.remove("focus");
			}
		}

		inputs.forEach((input) => {
			input.addEventListener("focus", addcl);
			input.addEventListener("blur", remcl);
		});
	}, []);

	const imageload = (img) => {
		var reader = new FileReader();
		reader.onload = function (evt) {
			document.getElementById("profile").src = evt.target.result;
		};
		reader.readAsDataURL(img);
	};

	const checkdigit = (e) => {
		var a = [];
		var k = e.which;

		for (let i = 48; i < 58; i++)
			a.push(i);

		if (!(a.indexOf(k)>=0))
			e.preventDefault();
	}

	return (
		<div className="Register-content">
			<Formik
				initialValues={{
					fname: "",
					lname: "",
					uname: "",
					email: "",
					password: "",
					conpassword: "",
					address: "",
					gender: "",
					phno: 0,
					image: null,
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(async () => {
						const formdata = new FormData();
						formdata.append("FirstName", values.fname);
						formdata.append("LastName", values.lname);
						formdata.append("Username", values.uname.toLowerCase());
						formdata.append("Email", values.email.toLowerCase());
						formdata.append("Password", values.password);
						formdata.append("Address", [values.address]);
						formdata.append("Gender", values.gender);
						formdata.append("Phoneno", parseInt(values.phno));
						formdata.append("Image", document.getElementById("image").files[0]);
						formdata.append("Status", "Not Activated");

						setcount(count + 1);
						socket.emit("toast", {
							id: "R" + count,
							name: values.fname + " " + values.lname,
							message:
								values.fname +
								" " +
								values.lname +
								"just Subscribe on " +
								new Date(),
							cat: "Subscriber",
						});

						var notify = {
							FullName: values.fname + " " + values.lname,
							Message:
								values.fname +
								" " +
								values.lname +
								"just Subscribe on " +
								new Date(),
							Notify_cate: "Subscriber",
						};

						await axios
							.post("https://dtodo-indumentaria-server.herokuapp.com/users/new", formdata, {
								header: { "Content-Type": "multipart/form-data" },
							})
							.then(async (res) => {
								if (res.data.Users_id !== undefined) {
									localStorage.setItem('verify', 'true')
									await axios
										.post("https://dtodo-indumentaria-server.herokuapp.com/notification/new", notify)
										.then((res) =>
											props.insertNotification({
												...notify,
												Notification_id: res.data.Notification_id,
											})
										);
									window.location.href = '/loginregister'
								} else if (res.data === "Email is already registered") {
									setEmailerror(res.data);
								} else if (res.data === "Username is already registered") {
									setUsererror(res.data);
								}
		 
							});



						setSubmitting(false);
					}, 500);
				}}
				validationSchema={Yup.object().shape({
					fname: Yup.string().required("Required"),
					lname: Yup.string().required("Required"),
					uname: Yup.string()
						.required("Required")
						.matches(/(?=.*[0-9])/, "Should contain atleast one number"),
					email: Yup.string().email().required("Required"),
					password: Yup.string()
						.required("Required")
						.min(8, "Password is too short - should be 8 chars minimum.")
						.matches(/(?=.*[0-9])/, "Password must contain a number."),
					conpassword: Yup.string()
						.required("Required")
						.oneOf([Yup.ref("password"), null], "Passwords must match"),
					address: Yup.string().required("Required"),
					gender: Yup.string().required("Required"),
					phno: Yup.string()
						.min(10, "Atleast 10 digits")
						.required("Required"),
					image: Yup.mixed().required("Required"),
				})}
			>
				{(props) => {
					const {
						values,
						touched,
						errors,
						isSubmitting,
						setFieldValue,
						handleChange,
						handleBlur,
						handleSubmit,
					} = props;
					return (
						<form onSubmit={handleSubmit}>
							<div className="img_size">
								<img src={profile} alt="profile" id="profile" />
							</div>
							<h2 className="title">Register</h2>
							<div className="input-div one">
								<div className="div">
									<h5>First Name</h5>
									<input
										type="text"
										className="input"
										name="fname"
										values={values.fname}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							</div>
							{errors.fname && touched.fname && (
								<div className="input-feedback">{errors.fname}</div>
							)}
							<div className="input-div one">
								<div className="div">
									<h5>Last Name</h5>
									<input
										type="text"
										className="input"
										name="lname"
										values={values.lname}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							</div>
							{errors.lname && touched.lname && (
								<div className="input-feedback">{errors.lname}</div>
							)}
							<div className="input-div one">
								<div className="div">
									<h5>Username</h5>
									<input
										type="text"
										className="input"
										name="uname"
										values={values.uname}
										onChange={(e) => {
											handleChange(e);
											setUsererror("");
										}}
										onBlur={handleBlur}
									/>
								</div>
							</div>
							{usererror === "" ? null : (
								<div className="input-feedback">{usererror}</div>
							)}
							{errors.uname && touched.uname && (
								<div className="input-feedback">{errors.uname}</div>
							)}
							<div className="input-div one">
								<div className="div">
									<h5>Email</h5>
									<input
										type="text"
										className="input"
										name="email"
										values={values.email}
										onChange={(e) => {
											handleChange(e);
											setEmailerror("");
										}}
										onBlur={handleBlur}
									/>
								</div>
							</div>
							{emailerror === "" ? null : (
								<div className="input-feedback">{emailerror}</div>
							)}
							{errors.email && touched.email && (
								<div className="input-feedback">{errors.email}</div>
							)}
							<div className="input-div pass">
								<div className="div">
									<h5>Password</h5>
									<input
										type="password"
										className="input"
										name="password"
										values={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							</div>
							{errors.password && touched.password && (
								<div className="input-feedback">{errors.password}</div>
							)}
							<div className="input-div pass">
								<div className="div">
									<h5>Confirm Password</h5>
									<input
										type="password"
										className="input"
										name="conpassword"
										values={values.conpassword}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							</div>
							{errors.conpassword && touched.conpassword && (
								<div className="input-feedback">{errors.conpassword}</div>
							)}
							<div className="input-div one">
								<div className="div">
									<h5>Phone Number</h5>
									<input
										type="text"
										className="input"
										name="phno"
										values={values.phno}
										onChange={handleChange}
										onBlur={handleBlur}
										maxLength="10"
										onKeyPress={checkdigit}
									/>
								</div>
							</div>
							{errors.phno && touched.phno && (
								<div className="input-feedback">{errors.phno}</div>
							)}
							<div className="input-div one">
								<div className="div">
									<h5>Address</h5>
									<input
										type="text"
										className="input"
										name="address"
										values={values.address}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							</div>
							{errors.address && touched.address && (
								<div className="input-feedback">{errors.address}</div>
							)}
							<div className="input-radio one">
								<div className="div">
									<div className="container-fluid">
										<div className="row d-flex align-items-center">
											<div className="col-3">
												<h5 className="m-0">Gender</h5>
											</div>
											<div className="col-9">
												<div className="form-check-inline">
													<label className="form-check-label">
														<input
															type="radio"
															className="form-check-input"
															value="Male"
															name="gender"
															onChange={handleChange}
															onBlur={handleBlur}
														/>
														Male
													</label>
												</div>
												<div className="form-check-inline">
													<label className="form-check-label">
														<input
															type="radio"
															className="form-check-input"
															value="Female"
															name="gender"
															onChange={handleChange}
															onBlur={handleBlur}
														/>
														Female
													</label>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{errors.gender && touched.gender && (
								<div className="input-feedback">{errors.gender}</div>
							)}
							<input
								type="file"
								name="image"
								id="image"
								onChange={(event) => {
									setFieldValue("image", event.target.files[0]);
									imageload(event.target.files[0]);
								}}
								onBlur={handleBlur}
								style={{
									width: "100%",
									margin: "0px 0px 15px 0px",
									fontSize: "15px",
								}}
							/>
							{errors.image && touched.image && (
								<div className="input-feedback">{errors.image}</div>
							)}

							<input
								type="submit"
								className="btn"
								value="Register"
								disabled={isSubmitting}
							/>
						</form>
					);
				}}
			</Formik>
			<p>
				Already Register? <button onClick={() => show("login")}>Login</button>
			</p>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		insertNotification: (val) => {
			dispatch({
				type: "NOTIFICATION",
				item: val,
			});
		},
	};
};

export default connect(null, mapDispatchToProps)(Register);
