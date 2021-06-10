import React from "react";
import "./CardGraphic.scss";
import { FaLongArrowAltDown } from "react-icons/fa";
// import { FaLongArrowAltUp } from "react-icons/fa";
import { MDBRow, MDBCol } from "mdbreact";
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'
// import Chart from "chart.js";

function CardGraphic({ titleU, amountU, perU, ...props }) {
	const TotalViews = props.TotalViews
	const ProductsSold = props.ProductsSold
	const TotalEarnings = props.TotalEarnings

	// window.addEventListener('load', () => {
		// for (var f=0; f < document.getElementsByClassName("MyGraphic").length; f++) {
		// 	var ctx = document.getElementsByClassName("MyGraphic")[f];
		// 	new Chart(ctx, {
		// 		type: "bar",
		// 		data: {
		// 			labels: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
		// 			datasets: [
		// 				{
		// 					data:
		// 						f === 0
		// 						? TotalViews[TotalViews.length - 1]
		// 						: f === 1
		// 							? ProductsSold[ProductsSold.length - 1]
		// 							: f === 2
		// 								? TotalEarnings[TotalEarnings.length - 1]
		// 								: null,
		// 					backgroundColor: [
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 						f === 1 ? "#69e091" :  f === 2 ? "#c29eff" : "#8df0eb",
		// 					],
		// 				},
		// 			],
		// 		},
		// 		options: {
		// 			legend: {
		// 				display: false,
		// 			},
		// 			scales: {
		// 				yAxes: [
		// 					{
		// 						gridLines: {
		// 							display: false,
		// 						},
		// 						ticks: {
		// 							display: false,
		// 							beginAtZero: true,
		// 						},
		// 					},
		// 				],
		// 				xAxes: [
		// 					{
		// 						gridLines: {
		// 							display: false,
		// 						},
		// 						ticks: {
		// 							display: false,
		// 						},
		// 					},
		// 				],
		// 			},
		
		// 		},
		// 	});
		// }
	// })
	return (
		<div className="cardgraphic-container">
			<div className="card-body">
				<p className='card-title'>{titleU}</p>

				<div className="card-body-two">
					<MDBRow>
						<MDBCol className="values">
							<p className='card-amount'>{amountU}</p>
							<p>
								<FaLongArrowAltDown className="icon-row" />
								<span className="number-porcent">{perU}%</span>{" "}
							</p>
						</MDBCol>
						<MDBCol className='graphic'>
							<Bar 
								data={{
									labels: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
									datasets: [
										{
											data:
												titleU === 'Total Views'
												? TotalViews[TotalViews.length - 1]
												: titleU === 'Products Sold'
													? ProductsSold[ProductsSold.length - 1]
													: titleU === 'Total Earnings'
														? TotalEarnings[TotalEarnings.length - 1]
														: null,
											backgroundColor: [
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
												titleU === 'Products Sold' ? "#69e091" :  titleU === 'Total Earnings' ? "#c29eff" : "#8df0eb",
											],
										},
									],
								}}
								options={{
									legend: {
										display: false,
									},
									scales: {
										yAxes: [
											{
												gridLines: {
													display: false,
												},
												ticks: {
													display: false,
													beginAtZero: true,
												},
											},
										],
										xAxes: [
											{
												gridLines: {
													display: false,
												},
												ticks: {
													display: false,
												},
											},
										],
									},
						
								}}
							/>
							{/* <canvas className="MyGraphic" style={{ width: "120%", height: "85px" }}></canvas> */}
						</MDBCol>
					</MDBRow>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        TotalViews: state.TotalViews,
        ProductsSold: state.ProductsSold,
        TotalEarnings: state.TotalEarnings
    }
}

export default connect(mapStateToProps)(CardGraphic);
