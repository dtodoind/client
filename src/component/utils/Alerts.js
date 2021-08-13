import Swal from "sweetalert2";

function fatalError(api, reason) {
	return Swal.fire({
		icon: "error",
		title: "Oops...",
		text: "Encontramos un error y debemos reiniciar el registro",
	}).then(() => {
		if (api) {
			api.log(reason, "Fatal error");
		}
		window.location.reload();
	});
}

function commonError(reason, callback) {
	return Swal.fire({
		icon: "error",
		title: "Oops!",
		text: reason,
	}).then(() => {
		if (callback) callback();
		else window.location.reload();
	});
}

function successMessage(reason) {
	return Swal.fire({
		confirmButtonColor: '#1C2541',
		icon: "success",
		title: "",
		text: reason,
	});
}
// Este es un alert con el icono mas grande
function infoMessage(reason) {
	return Swal.fire({
		confirmButtonText: "ACEPTAR",

		title: "Información",
		text: reason,
	});
}

export { fatalError, commonError, infoMessage, successMessage };
