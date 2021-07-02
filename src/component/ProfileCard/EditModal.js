import React from "react";
import "./EditModal.scss";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function EditModal({ User, EditUser, ...props }) {
	return (
		<div>
			{/* ---------------------------Modal Edit--------------------------------------- */}
			<Modal
				animation={false}
				size="sm"
				{...props}
				aria-labelledby="example-modal-sizes-title-sm"
				className="modal-edit"
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-sm">
						Editar perfil
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-body">
					<div className="form__group field">
						<input
							onChange={props.onChange}
							type="input"
							className="form__field"
							placeholder="UserName"
							name="username"
							id="name"
							required
							value={User.username}
						/>
						<label htmlFor="name" className="form__label">
							UserName
						</label>
					</div>
					<div className="form__group field">
						<input
							onChange={props.onChange}
							type="input"
							className="form__field"
							placeholder="FirstName"
							name="firstname"
							id="name"
							required
							value={User.firstname}
						/>
						<label htmlFor="name" className="form__label">
							FirstName
						</label>
					</div>
					<div className="form__group field">
						<input
							onChange={props.onChange}
							type="input"
							className="form__field"
							placeholder="LastName"
							name="lastname"
							id="name"
							required
							value={User.lastname}
						/>
						<label htmlFor="name" className="form__label">
							LastName
						</label>
					</div>
					<div className="form__group field">
						<input
							onChange={props.onChange}
							type="input"
							className="form__field"
							placeholder="Email"
							name="email"
							id="name"
							required
							value={User.email}
						/>
						<label htmlFor="name" className="form__label">
							Email
						</label>
					</div>
					<input type="file" className="input-edit-file" />
					<button className="btn-edit-account" onClick={EditUser}>
						Guardar Cambios
					</button>
				</Modal.Body>
			</Modal>
		</div>
	);
}
export default EditModal;
