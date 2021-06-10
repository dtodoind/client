import React, { useEffect, useState } from "react";

import { IoBagAdd } from "react-icons/io5";

import OrderMainbox from '../../admin component/OrderMainbox/OrderMainbox'
import OrderTable from "../../admin component/OrderTable/OrderTable";
import { connect } from 'react-redux'
import axios from 'axios'

import "./Orders.scss";

function Orders(props) {

	const { Orders, allorders, allcount } = props
    const [lop, setlop] = useState(true)
	// const [runone, setrunone] = useState(0)
	// console.log(Revenue[-1])

	const tot = () => {
        var OverallPay = 0
        for(var q=0; q<Orders.length; q++) {
            for(var e=0; e<Orders[q].OrderItems.length; e++) {
				if(Orders[q].OrderItems[e].Status !== 'Return') {
					// console.log(JSON.parse(Orders[q].OrderItems[e].Product.Price)[q][e])
					OverallPay = OverallPay + (Orders[q].OrderItems[e].Price * Orders[q].OrderItems[e].Quantity)
				} else {
					// OverallPay = OverallPay - (Orders[q].OrderItems[e].Price * Orders[q].OrderItems[e].Quantity)
				}
            }
        }
		return OverallPay
    }

	const status = (val) => {
		var count = 0
		for(var q=0; q<Orders.length; q++) {
			if(val === 'Pending') {
				if(Orders[q].Status === 'Pending') count++
			} else if(val === 'Delivered') {
				if(Orders[q].Status === 'Delivered') count++
			}
		}
		return count
	}

    useEffect(() => {
		async function ord() {
			// var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
			var count = {
				PendingD: 0,
				ShippingD: 0,
				DeliveryD: 0,
				PickupD: 0
			}
			await axios.get(`https://dtodo-indumentaria-server.herokuapp.com/order/all`).then(res => {
				// console.log(Orders, res.data)
				if(Orders.length !== 0) {
					if(Orders[0].Orders_id !== res.data[0].Orders_id) {
						allorders(res.data)
					}
					setlop(true)
				} else {
					if(lop) {
						allorders(res.data)
						setlop(false)
					}
				}
				res.data.map(order => 
					order.Status === 'Pending'
					? count.PendingD += 1
					: order.Status === 'Shipping'
						? count.ShippingD += 1
						: order.Status === 'Delivered'
							? count.DeliveryD += 1
							: order.Status === 'Pickup'
								? count.PickupD += 1
								: null
				)

			})
			allcount(count)
			// var previndex = null
			// var prevtot = 0
			// var tot = 0
			// var re = Revenue
			// var d = new Date()
			
			// if(runone === 0) {
			// 	days.map((day,i) => {
			// 		var lastdate = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()
			// 		var date = 0
			// 		var month = 0
			// 		var year = 0
			// 		var gap = i
			// 		if(d.getMonth()+1 > 12) {
			// 			year = d.getFullYear() + 1
			// 			month = 1
			// 			date = (d.getDate()+gap) - lastdate
			// 		} else if((d.getDate()+gap) > lastdate) {
			// 			year = d.getFullYear()
			// 			month = d.getMonth() + 2
			// 			date = (d.getDate()+gap) - lastdate
			// 		} else {
			// 			date = d.getDate() + gap
			// 			month = d.getMonth() + 1
			// 			year = d.getFullYear()
			// 		}
			// 		var w = new Date(year, month-1, date)
			// 		if(String(w).substr(0,3) === "Fri") {
			// 			// console.log(w)
			// 			localStorage.setItem('sundate', w)
			// 			setrunone(re.length)
			// 			return 0
			// 		}
			// 		return 0
			// 	})
			// }
			// if(localStorage.getItem('sundate')) {
			// 	if(runone !== 0) {
			// 		re[runone] = [0,0,0,0,0,0,0]
			// 		Orders?.map((order,i) => {
			// 			var dat = new Date(order.createdAt.substr(0,10))
			// 			var index = days.indexOf(String(dat).substr(0,3))
			// 			if(previndex !== index) {
			// 				tot = 0
			// 			} else {
			// 				tot = prevtot
			// 			}
			// 			var pricetot = 0
			// 			order.OrderItems?.map(item => pricetot = pricetot + (item.Price * item.Quantity))
			// 			tot = tot + pricetot
			// 			if(index === i) {
			// 				re[re.length - 1][index] = tot
			// 				// console.log(re)
			// 			}
			// 			previndex = index
			// 			prevtot = tot
			// 			return 0
			// 		})
			// 	}
			// 	if(localStorage.getItem('sundate').substr(0,15) === String(d).substr(0,15)) {
			// 		var lastdate = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()
			// 		var date = 0
			// 		var month = 0
			// 		var year = 0
			// 		var gap = 7
			// 		if(d.getMonth()+1 > 12) {
			// 			year = d.getFullYear() + 1
			// 			month = 1
			// 			date = (d.getDate()+gap) - lastdate
			// 		} else if((d.getDate()+gap) > lastdate) {
			// 			year = d.getFullYear()
			// 			month = d.getMonth() + 2
			// 			date = (d.getDate()+gap) - lastdate
			// 		} else {
			// 			date = d.getDate() + gap
			// 			month = d.getMonth() + 1
			// 			year = d.getFullYear()
			// 		}
			// 		var w = new Date(year, month-1, date)
			// 		localStorage.setItem('sundate', w)
			// 	}
			// }
			// // console.log(count)
		}
		ord()
    }, [Orders, allorders, allcount, lop])

	return (
		<div className="orders">
			<div className="tag">
				<div className="dash_icon">
					<IoBagAdd />
				</div>
				<p style={{ fontSize: "18px", margin: "0", fontWeight: "400" }}>
					Orders
				</p>
			</div>

			<div className="container-fluid">
				<div className="row">
					<div className="col">
						<div className="row" style={{textAlign: 'center'}}>
							<div className="col-md-3 py-3"><OrderMainbox title='Total Revenue' amount={tot()} growth='false' per='-9' data={[12, 19, 3, 5, 2, 3, 9]} /></div>
							<div className="col-md-3 py-3"><OrderMainbox title='Total Completed' amount={status('Delivered')} growth='true' per='2' data={[6, 39, 20, 10, 8, 1, 4]} /></div>
							<div className="col-md-3 py-3"><OrderMainbox title='Total Pending' amount={status('Pending')} growth='true' per='15' /></div>
							<div className="col-md-3 py-3"><OrderMainbox title='Total Orders' amount={Orders.length} growth='true' per='20' /></div>
						</div>
					</div>
				</div>
				<OrderTable />
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        Orders: state.Orders,
		Revenue: state.Revenue
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        allorders: (val) => { 
            dispatch({
                type: 'ORDERS',
                item: val
            }) 
        },
		allcount: (val) => { 
            dispatch({
                type: 'COUNT',
                item: val
            }) 
        },
		allrevenue: (val) => {
			dispatch({
				type: 'REVENUE',
				item: val
			})
		}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);
