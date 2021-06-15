import React from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import "./EditProfile.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImCross, ImCamera } from "react-icons/im";

function EditProfile({ User, showornot, EditUser, ...props }) {

	return (
		<Modal
			className="modaledit"
			{...props}
			size="xl"
			aria-labelledby="example-modal-sizes-title-lg"
			centered
		>
			<Modal.Header closebutton="true">
				<div className="editp-text">
					<p>Edit profile</p>
				</div>
				<ImCross fontSize="15px" onClick={showornot} />
			</Modal.Header>   
			{/* <p style={{fontWeight: '500', fontSize: '20px'}}>Edit profile</p>  */}
			<Modal.Body closebutton="true">
				<Container  className='cont-edit'>
					<Row>
						<Col sm={4} className="col1-edit">
							<div>
								<div className="d-flex flex-column align-items-center text-center p-3 py-5">
									<div className="whole_image">
										<label for="image" className="edit_btn">
											<ImCamera />
										</label>
										<div className="img_outside">
											<img src={User.Image} alt="img" id="profileEdit" className="img_inside" />
										</div>
									</div>
									{/* <img
										src={User.Image}
										
										width="90"
										alt="img"
									/> */}
									<span className="font-weight-bold">{User.Username}</span>
									<span className="text-black-50">{User.Email}</span>
									{/* <span>{JSON.parse(User.Address)}</span> */}
								</div>
							</div>
						</Col>
						<Col sm={8}>
							{" "}
							<div className="row mt-2">
								<div className="col-md-6">
									<input
										onChange={props.onChange}
										type="text"
										className="form-control"
										placeholder="Username"
										name="Username"
										value={User.Username}
									/>
								</div>
								<div className="col-md-6">
									<input
										onChange={props.onChange}
										type="text"
										className="form-control"
										placeholder="FirstName"
										name="FirstName"
										value={User.FirstName}
									/>
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-md-6">
									<input
										onChange={props.onChange}
										type="text"
										className="form-control"
										placeholder="LastName"
										name="LastName"
										value={User.LastName}
									/>
								</div>
								<div className="col-md-6">
									<input
										onChange={props.onChange}
										type="text"
										className="form-control"
										placeholder="Phone"
										name="Phoneno"
										required
										value={User.Phoneno}
									/>
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-md-6">
									{/* <input
										onChange={props.onChange}
										type="text"
										className="form-control"
										placeholder="Gender"
										name="Gender"
										required
										value={User.Gender}
									/> */}
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
															name="Gender"
															onChange={props.onChange}
															defaultChecked={User.Gender === "Male" ? true : false}
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
															name="Gender"
															onChange={props.onChange}
															defaultChecked={User.Gender === "Female" ? true : false}
														/>
														Female
													</label>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<input
										type="file"
										name="image"
										id="image"
										onChange={props.onChange}
										// onChange={(event) => {
										// 	setFieldValue("image", event.target.files[0]);
										// 	imageload(event.target.files[0]);
										// }}
										style={{
											width: "100%",
											margin: "0px 0px 15px 0px",
											fontSize: "15px",
										}}
									/>
								</div>
							</div>
							<div className="btnp-edit-div">
								<button className="btnp-edit" onClick={() => EditUser()}>
									Save changes
								</button>
							</div>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
		</Modal>
	);
}

export default EditProfile;
