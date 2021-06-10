import React from 'react'

import { IoAnalyticsSharp } from 'react-icons/io5'
// import Chart from 'chart.js';
import { connect } from 'react-redux'
import { Bar, Line } from 'react-chartjs-2'

import './OrderMainbox.scss'

function OrderMainbox({ title, amount, growth, per, ...props }) {

    const Revenue = props.Revenue
    const Completed = props.Completed
    const Pending = props.Pending
    var data = {
        labels: ['', '', '', '', '', '', ''],
        datasets: [{
            data: 
                title === 'Total Revenue'
                ? Revenue[Revenue.length - 1] 
                : title === 'Total Completed'
                    ? Completed[Completed.length - 1]
                    : title === 'Total Pending'
                        ? Pending[Pending.length - 1]
                        : null,
            backgroundColor: [
                title === 'Total Pending' ? '#E63946' : '#5BC0BE',
                title === 'Total Pending' ? '#E63946' : '#5BC0BE',
                title === 'Total Pending' ? '#E63946' : '#5BC0BE',
                title === 'Total Pending' ? '#E63946' : '#5BC0BE',
                title === 'Total Pending' ? '#E63946' : '#5BC0BE',
                title === 'Total Pending' ? '#E63946' : '#5BC0BE',
                title === 'Total Pending' ? '#E63946' : '#5BC0BE',
            ]
        }]
    }

    var line_data = {
        labels: ["", "", "", "", "", "", "", ""],
        datasets: [{
            label: "Car Speed",
            data: [0, 59, 75, 20, 20, 55, 40, 22],
            fill: false,
            borderColor: '#5BC0BE',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#5BC0BE',
        }]
    }

    var line_option = {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    display: false,
                }
            }]
        },
    
    }

    // window.addEventListener('load', () => {
        // for(var f=0; f<document.getElementsByClassName('myChart').length; f++) {

        //     var ctx = document.getElementsByClassName('myChart')[f];
        //     new Chart(ctx, {
        //         type: 'bar',
        //         data: {
        //             labels: ['', '', '', '', '', '', ''],
        //             datasets: [{
        //                 data: 
        //                     f === 0 
        //                     ? Revenue[Revenue.length - 1] 
        //                     : f === 1
        //                         ? Completed[Completed.length - 1]
        //                         : f === 2
        //                             ? Pending[Pending.length - 1]
        //                             : null,
        //                 backgroundColor: [
        //                     f === 2 ? '#E63946' : '#5BC0BE',
        //                     f === 2 ? '#E63946' : '#5BC0BE',
        //                     f === 2 ? '#E63946' : '#5BC0BE',
        //                     f === 2 ? '#E63946' : '#5BC0BE',
        //                     f === 2 ? '#E63946' : '#5BC0BE',
        //                     f === 2 ? '#E63946' : '#5BC0BE',
        //                     f === 2 ? '#E63946' : '#5BC0BE',
        //                 ]
        //             }]
        //         },
        //         options: {
        //             legend: {
        //                 display: false,
        //             },
        //             scales: {
        //                 yAxes: [{
        //                     gridLines: {
        //                         display: false
        //                     },
        //                     ticks: {
        //                         display: false,
        //                         beginAtZero: true
        //                     }
        //                 }],
        //                 xAxes: [{
        //                     gridLines: {
        //                         display: false
        //                     },
        //                     ticks: {
        //                         display: false,
        //                     }
        //                 }]
        //             },
             
        //         }
        //     });
        // }
        
        // for(var m=0; m<document.getElementsByClassName('myLine').length; m++) {
        //     var ctx1 = document.getElementsByClassName('myLine')[m];
        //     new Chart(ctx1, {
        //         type: 'line',
        //         data: {
        //             labels: ["", "", "", "", "", "", "", ""],
        //             datasets: [{
        //                 label: "Car Speed",
        //                 data: [0, 59, 75, 20, 20, 55, 40, 22],
        //                 fill: false,
        //                 borderColor: '#5BC0BE',
        //                 backgroundColor: 'transparent',
        //                 pointBackgroundColor: '#5BC0BE',
        //             }]
        //         },
        //         options: {
        //             legend: {
        //                 display: false
        //             },
        //             scales: {
        //                 yAxes: [{
        //                     ticks: {
        //                         beginAtZero: true
        //                     }
        //                 }],
        //                 xAxes: [{
        //                     gridLines: {
        //                         display: false
        //                     },
        //                     ticks: {
        //                         display: false,
        //                     }
        //                 }]
        //             },
               
        //         }
        //     });
        // }
    // })

    function nFormatter(num, digits) {
        var si = [
            { value: 1, symbol: "" },
            { value: 1E3, symbol: "k" },
            { value: 1E6, symbol: "M" },
            { value: 1E9, symbol: "G" },
            { value: 1E12, symbol: "T" },
            { value: 1E15, symbol: "P" },
            { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }

    return (
        title !== 'Total Orders'
        ? <div className="order_main_box" style={{backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '15px 10px'}}>
            <p>{title}</p>
            <h1 data-toggle="tooltip" data-placement="top" title={amount}>{nFormatter(amount, 1)}</h1>
            <p className="bottom"><IoAnalyticsSharp style={{color: growth === 'true' ? 'green' : 'red', fontSize: '20px'}} /> {per}% of planned</p>
            <div style={{width: '100%', height: '100%', marginTop: '15px'}}>
                <Bar 
                    data={data}
                    options={{
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [{
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    display: false,
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    display: false,
                                }
                            }]
                        },
                    }}
                />
                {/* <canvas className="myChart" style={{width: '100%', height: '100px'}}></canvas> */}
            </div>
        </div>
        : <div className="order_main_box" style={{backgroundColor: 'rgb(25,45,62)', border: '1px solid rgb(220,220,220)', overflow: 'hidden', padding: '15px 0px 0px 0px'}}>
            <p className="order_title pl-3">Orders</p>
            <p className="order_des pl-3">Lifetime sum of your orders</p>
            <div className="container-fluid my-4">
                <div className="row">
                    <div className="col p-0 pl-3">
                        <h1 className="order_amount">{amount}</h1>
                    </div>
                    <div className="col p-0 d-flex align-items-end">
                        <p className="order_growth"><IoAnalyticsSharp style={{color: growth === 'true' ? 'green' : 'red', fontSize: '20px'}} /> 321 ({per}%)</p>
                    </div>
                </div>
            </div>
            <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="pill" href="#day">1 DAY</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#week">1 WEEK</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#month">1 MONTH</a>
                </li>
            </ul>
            <div className="tab-content">
                <div id="day" className="container tab-pane active"><br/>
                    <div style={{width: '100%', height: '100%'}}>
                        <Line data={line_data} options={line_option} />
                        {/* <canvas className="myLine" style={{width: '100%', height: '150px'}}></canvas> */}
                    </div>
                </div>
                <div id="week" className="container tab-pane fade"><br/>
                    <div style={{width: '100%', height: '100%'}}>
                        <Line data={line_data} options={line_option} />
                        {/* <canvas className="myLine" style={{width: '100%', height: '150px'}}></canvas> */}
                    </div>
                </div>
                <div id="month" className="container tab-pane fade"><br/>
                    <div style={{width: '100%', height: '100%'}}>
                        <Line data={line_data} options={line_option} />
                        {/* <canvas className="myLine" style={{width: '100%', height: '150px'}}></canvas> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        Revenue: state.Revenue,
        Completed: state.Completed,
        Pending: state.Pending
    }
}
export default connect(mapStateToProps)(OrderMainbox)
