import React from "react";
import "./GraphicPayment.scss";
// import Chart from "chart.js";
// import { useStateValue } from "../../Redux/StateProvider";
import { Bar } from 'react-chartjs-2'

function GraphicPayment() {
	var inner_data = [20, 30, 20, 320, 390, 20, 20, 20, 30, 20, 320, 390, 20, 20]
	var max = Math.max.apply(null, inner_data)
	
	// window.addEventListener('load', () => {
		// var inner_data = [20, 30, 20, 320, 390, 20, 20, 20, 30, 20, 320, 390, 20, 20]
		// var max = Math.max.apply(null, data)

		// Chart.defaults.global.legend.display = false;
		// Chart.plugins.register({
		// 	// need to manipulate tooltip visibility before its drawn (but after update)
		// 	beforeDraw: function(chartInstance, easing) {
		// 		// check and see if the plugin is active (its active if the option exists)
		// 		if (chartInstance.config.options.tooltips.onlyShowForDatasetIndex) {
		// 		// get the plugin configuration
		// 		var tooltipsToDisplay = chartInstance.config.options.tooltips.onlyShowForDatasetIndex;
				
		// 		// get the active tooltip (if there is one)
		// 		var active = chartInstance.tooltip._active || [];

		// 		// only manipulate the tooltip if its just about to be drawn
		// 		if (active.length > 0) {
		// 			// first check if the tooltip relates to a dataset index we don't want to show
		// 			if (tooltipsToDisplay.indexOf(active[0]._datasetIndex) === -1) {
		// 			// we don't want to show this tooltip so set it's opacity back to 0
		// 			// which causes the tooltip draw method to do nothing
		// 			chartInstance.tooltip._model.opacity = 0;
		// 			}
		// 		}
		// 		}
		// 	}
		// });
		

		// var ntx = document.getElementById("barchart").getContext('2d');
		// var gradient = ntx.createLinearGradient(0, 0, 0, 450);
		// gradient.addColorStop(0, 'rgb(161, 211, 252)');
		// gradient.addColorStop(1, 'rgb(116, 143, 222)');

		// new Chart(ntx , {
			
		// 	type: "bar",
		// 	data: {
		// 		labels: ["S", "M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S"],
		// 		datasets: [
		// 			{
		// 				label: "Test",
		// 				type: 'bar',
		// 				backgroundColor: gradient,
		// 				data: data,
		// 			},
		// 			{
		// 				label: "Test2",
		// 				type: 'bar',
		// 				backgroundColor: "rgb(233, 237, 240)",
		// 				data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		// 			},
		// 			{
		// 				label: "",
		// 				type: 'bar',
		// 				tooltip: false,
		// 				backgroundColor: "rgb(233, 237, 240)",
		// 				data: [max - data[0], max - data[1], max - data[2], max - data[3], max - data[4], max - data[5], max - data[6], max - data[7], max - data[8], max - data[9], max - data[10], max - data[11], max - data[12], max - data[13]]
		// 			}
		// 		]
		// 	},
	
		// 	options: {
		// 		tooltips: {
		// 			enabled: true,
		// 			mode: 'single',
		// 			// new property from our plugin
		// 			// configure with an array of datasetIndexes that the tooltip should display for
		// 			// to get the datasetIndex, just use it's position in the dataset [] above in the data property
		// 			onlyShowForDatasetIndex: [0,1],
		// 			callbacks: {
		// 				label: function(tooltipItems, data) {
		// 					return tooltipItems.yLabel;
		// 				}
		// 			}
		// 		},
		// 		legend: {
		// 			display: false,
		// 		},
		// 		scales: {
		// 			yAxes: [
		// 				{
		// 					stacked: true,
		// 					gridLines: {
		// 						display: false,
		// 					},
		// 				},
		// 			],
		// 			xAxes: [
		// 				{
		// 					// barPercentage: 0.7,
		// 					stacked: true,
		// 					gridLines: {
		// 						display: false,
		// 					},
		// 				},
		// 			],
		// 		},
		// 	},
		// });
	// })

	const customtooltip = function (tooltipModel) {
		// Tooltip Element
		var tooltipEl = document.getElementById('chartjs-tooltip');

		// Create element on first render
		if (!tooltipEl) {
			tooltipEl = document.createElement('div');
			tooltipEl.id = 'chartjs-tooltip';
			tooltipEl.innerHTML = '<table></table>';
			document.body.appendChild(tooltipEl);
		}

		// Hide if no tooltip
		if (tooltipModel.opacity === 0) {
			tooltipEl.style.opacity = 0;
			return;
		}

		// Set caret Position
		tooltipEl.classList.remove('above', 'below', 'no-transform');
		if (tooltipModel.yAlign) {
			tooltipEl.classList.add(tooltipModel.yAlign);
		} else {
			tooltipEl.classList.add('no-transform');
		}

		function getBody(bodyItem) {
			return bodyItem.lines;
		}

		// Set Text
		if (tooltipModel.body) {
			var titleLines = tooltipModel.title || [];
			var bodyLines = tooltipModel.body.map(getBody);

			var innerHtml = '<thead>';

			titleLines.forEach(function(title) {
				innerHtml += '<tr><th>' + title + '</th></tr>';
			});
			innerHtml += '</thead><tbody>';

			bodyLines.forEach(function(body, i) {
				var colors = tooltipModel.labelColors[i];
				var style = 'background:' + colors.backgroundColor;
				style += '; border-color:' + colors.borderColor;
				style += '; border-width: 2px';
				var span = '<span style="' + style + '"></span>';
				innerHtml += '<tr><td>' + span + body + '</td></tr>';
			});
			innerHtml += '</tbody>';

			var tableRoot = tooltipEl.querySelector('table');
			tableRoot.innerHTML = innerHtml;
		}

		// `this` will be the overall tooltip
		var position = this._chart.canvas.getBoundingClientRect();

		// Display, position, and set styles for font
		if(tooltipModel.dataPoints[0].datasetIndex === 0) {
			tooltipEl.style.opacity = 1;
			tooltipEl.style.position = 'absolute';
			tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
			tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
			tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
			tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
			tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
			tooltipEl.style.pointerEvents = 'none';
			tooltipEl.style.backgroundColor = 'rgba(0,0,0,0.8)'
			tooltipEl.style.borderRadius = '10px'
			tooltipEl.style.color = 'white'
			tooltipEl.style.transition = '0.2s opacity'
		} else {
			tooltipEl.style.opacity = 0;
		}
	}
	
	return (
		<div className="graphic-container-payment">
			<div className="payment-header">
				<p>Payments</p>
				{/* <p>this Month</p> */}
			</div>
			<div className="pay_pos">
				<Bar 
					id="payment"
					width={70}
					height={41}
					data={{
						labels: ["S", "M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S"],
						datasets: [
							{
								label: "Test",
								// backgroundColor: gradient,
								data: inner_data,
							},
							{
								label: "Test2",
								backgroundColor: "rgb(233, 237, 240)",
								data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
							},
							{
								label: "Test3",
								backgroundColor: "rgb(233, 237, 240)",
								data: [max - inner_data[0], max - inner_data[1], max - inner_data[2], max - inner_data[3], max - inner_data[4], max - inner_data[5], max - inner_data[6], max - inner_data[7], max - inner_data[8], max - inner_data[9], max - inner_data[10], max - inner_data[11], max - inner_data[12], max - inner_data[13]]
							}
						]
					}}
					options={{
						tooltips: {
							enabled: false,
							// mode: 'single',
							// new property from our plugin
							// configure with an array of datasetIndexes that the tooltip should display for
							// to get the datasetIndex, just use it's position in the dataset [] above in the data property
							// onlyShowForDatasetIndex: [0,1],
							custom: customtooltip,
							callbacks: {
								label: function(tooltipItems, data) {
									if(tooltipItems.datasetIndex === 0) {
										return tooltipItems.yLabel;
									}
								},
								title: function(tooltipItems) {
									if(tooltipItems.datasetIndex === 0) {
										return tooltipItems.label;
									}
								},
							}
						},
						legend: {
							display: false,
						},
						scales: {
							yAxes: [
								{
									stacked: true,
									gridLines: {
										display: false,
									},
								},
							],
							xAxes: [
								{
									// barPercentage: 0.7,
									stacked: true,
									gridLines: {
										display: false,
									},
								},
							],
						},
					}}
				/>
				{/* <canvas id="barchart" width="70px" height="41px"></canvas> */}
			</div>
		</div>
	);
}
export default GraphicPayment;
