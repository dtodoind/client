import React from "react";
// import Chart from "chart.js";
import { Doughnut } from 'react-chartjs-2'

import { BiBarChart } from "react-icons/bi";
import "./GraphicSale.scss";

const GraphicSale = ({ number, Doughnut_data }) => {

	// window.addEventListener('load', () => {
	// 	var dtx = document.getElementById("Donut");
	// 	new Chart(dtx, {
	// 		type: "doughnut",
	// 		data: {
	// 			labels: ["Pending", "Shipping", "Delivery", "Pickup"],
	// 			datasets: [
	// 				{
	// 					data: data,
	// 					backgroundColor: ["#F77F00", "#5BC0BE", "green", "#281a91"],
	// 				},
	// 			],
	// 		},
	// 		options: {
	// 			cutoutPercentage: 80,
	// 			legend: {
	// 				display: true,
	// 				position: "bottom",
	// 				labels: {
	// 					fontColor: "#333",
	// 					fontSize: 13,
	// 				},
	// 			},
	// 		},
	// 	});
	// })

	const data = () => {
		return{
			labels: ["Pending", "Shipping", "Delivery", "Pickup"],
			datasets: [
				{
					data: Doughnut_data,
					backgroundColor: ["#F77F00", "#5BC0BE", "green", "#281a91"],
				},
			]
		}
	}

	return (
		<div className="graphic-container-donut">
			<div className="div-header">
				<p>Sale</p>
				{/* <p className="this-month">this Month</p> */}
			</div>
			<div className="div-body">
				<div className="number_pos">
					<BiBarChart className="donut-icon" />

					<p className="donut-number">{number}</p>
				</div>
				<div className="graph_donut">
					<Doughnut
						width={70}
						height={60}
						data={data} 
						options={{
							cutoutPercentage: 80,
							maintainAspectRatio: true,
							legend: {
								display: true,
								position: "bottom",
								labels: {
									fontColor: "#333",
									fontSize: 13,
								},
							},
						}} 
					/>
					{/* <canvas id="Donut" width="70px" height="60px"></canvas> */}
				</div>
			</div>
		</div>
	);
}

export default GraphicSale;
