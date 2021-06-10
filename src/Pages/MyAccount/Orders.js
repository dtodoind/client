import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import { IoAddCircle, IoRemoveCircleSharp } from 'react-icons/io5'
import io from 'socket.io-client'

import './Orders.scss'

const socket = io('https://dtodo-indumentaria-server.herokuapp.com')
function AccountOrders(props) {

	const { Orders, allorders } = props    
    const SingleUser = JSON.parse(localStorage.getItem('SingleUser'))
    const [count, setcount] = useState(0)
    const [ordercount, setOrderCount] = useState(0)
    const [orderload, setOrderload] = useState(10)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [repeat, setRepeat] = useState(0)

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(scrollHeight - scrollTop === clientHeight) {
            setOrderload(orderload + 5)
        }
    }

    const loadOrder = useCallback(async () => {
        setLoading(true)
        const load = []
        Orders.map((ord, i) => {
            if(i < orderload) {
                load.push(ord)
            }
            return 0;
        })
        setOrders(load)
        setLoading(false)
    }, [Orders, orderload])

	useEffect(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/order/all/'+JSON.parse(localStorage.getItem('SingleUser'))[0].Users_id, 
        {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        }
        ).then(res => {
            if(Orders.length === 0) {
                if(repeat === 0) {
                    allorders(res.data)
                    setOrderCount(Orders.length)
                    setRepeat(1)
                }
            } else {
                if(Orders.length !== ordercount) {
                    allorders(res.data)
                    setOrderCount(Orders.length)
                }
            }
        })
        loadOrder()
	}, [Orders.length, allorders, loadOrder, ordercount, repeat])

	const tot = (i) => {
        var OverallPay = []
        for(var q=0; q<Orders.length; q++) {
            var Overall = 0
            for(var e=0; e<Orders[q].OrderItems.length; e++) {
                if(Orders[q].OrderItems[e].Status !== 'Return') {
                    Overall = Overall + (Orders[q].OrderItems[e].Price * Orders[q].OrderItems[e].Quantity)
                }
            }
            OverallPay.push(Overall)
        }

        return OverallPay[i]
    }

    const changestatus = async (e) => {
        var order_val = {
            OrderItem_id: parseInt(e.target.name),
            Status: 'Return'
        }
        await axios.put('https://dtodo-indumentaria-server.herokuapp.com/orderitem/status', order_val).then(res => {
            document.getElementById('change_text'+parseInt(e.target.name)).innerHTML = `<p>You have Return this Product</p>`
            document.getElementById('btn_change'+parseInt(e.target.name)).innerHTML = `
                <div style="background-color: #E63946; font-weight: 500; color: white" class="p-2 rounded">
                    Return
                </div>
            `
        })
        setcount(count + 1);
        socket.emit('toast', {
            id: "Return" + count,
            name: SingleUser[0].FirstName + ' ' + SingleUser[0].LastName,
            message:
                "The Product was Returned on " +
                new Date(),
            cat: 'Return'
        })
        var notify = {
            FullName: SingleUser[0].FirstName + ' ' + SingleUser[0].LastName,
            Message:
                "The Product was Returned on " +
                new Date(),
            Notify_cate: "Return",
        }
        await axios.post('https://dtodo-indumentaria-server.herokuapp.com/notification/new', notify).then(res => props.insertNotification({...notify, Notification_id: res.data.Notification_id}))
    }

	return (
		<div className="order-client">
            <div className="title1_out">
				<p className="title1_ins">Orders</p>
			</div>
            <div style={{overflowY: 'scroll', height: '750px'}} onScroll={handleScroll}>
                <Table striped hover>
                    <thead>
                        <tr className="head">
                            <th>#</th>
                            <th>Date</th>
                            <th>Delivery Date</th>
                            <th>Total Product</th>
                            <th>Client Name</th>
                            <th>Delivery Address</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody style={{textAlign: 'center'}}>
                        {
                            orders.length === 0
                            ? null
                            : orders.map((o,i) => 
                                [<tr key={i}>
                                    <td className="accordion-toggle collapsed" id={"accordion"+i} data-toggle="collapse" data-parent={"#accordion"+i} href={"#collap"+i}>
                                        <div style={{position: 'relative'}}>
                                            <IoAddCircle style={{display: 'inline'}} className="p icon_ind" onClick={() => {
                                                document.getElementsByClassName('p')[i].style.display = 'none'
                                                document.getElementsByClassName('c')[i].style.display = 'inherit'
                                                }}
                                            />
                                            <IoRemoveCircleSharp style={{display: 'none'}} className="c icon_ind" onClick={() => {
                                                document.getElementsByClassName('p')[i].style.display = 'inherit'
                                                document.getElementsByClassName('c')[i].style.display = 'none'
                                                }} />
                                        </div>
                                    </td>
                                    <td>{o.createdAt.substr(0,10)}</td>
                                    <td>{o.Delivery_date.substr(0,10)}</td>
                                    <td>{o.OrderItems.length}</td>
                                    <td>{o.ClientName}</td>
                                    <td>{JSON.parse(o.Address).join(', ')}</td>
                                    <td><div style={{backgroundColor: o.Status === 'Delivered' ? 'green' : o.Status === 'Pending' ? '#F77F00' : o.Status === 'Shipping' ? '#5BC0BE' : o.Status === 'Pickup' ? '#281a91' : '#E63946', fontWeight: '500', color: 'white'}} className="p-2 rounded">{o.Status}</div></td>
                                </tr>,
                                <tr key={'inner'+i} className="hide-table-padding">
                                    <td colSpan='6' className="table_inner px-2">
                                        <div id={"collap"+i} className="collapse">
                                            {
                                                Orders.length === 0
                                                ? null
                                                : Orders[i].OrderItems.map((p,j) => 
                                                    <div className='container-fluid my-2 border-top border-bottom' key={j}>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <div className="order_img">
                                                                    <img src={'https://dtodo-indumentaria-server.herokuapp.com/'+p.Image} alt='' className="order_img_inner" />
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6 d-flex align-items-center'>
                                                                <div className="container-fluid">
                                                                    <div className='row'>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Date</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'>{o.createdAt.substr(0,10)}</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Product Name</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'>{p.Product.Name}</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Color</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'>{p.Color}</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Size</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'>{p.Size}</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Price</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'>${p.Price}</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Quantity</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'>{p.Quantity}</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Status</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'>
                                                                            <div id={"btn_change"+p.OrderItem_id}>
                                                                                <div style={{backgroundColor: p.Status === 'Delivered' ? 'green' : p.Status === 'Pending' ? '#F77F00' : p.Status === 'Shipping' ? '#5BC0BE' : o.Status === 'Pickup' ? '#281a91' : '#E63946', fontWeight: '500', color: 'white'}} className="p-2 rounded">
                                                                                    {p.Status}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Do you want to Return?</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'>
                                                                            {
                                                                                p.Status === "Return"
                                                                                ? <p>You have Return this Product</p>
                                                                                : p.Status === "Delivered"
                                                                                    ? <p>If you want to Return this Product, you have come to the Store</p>
                                                                                    : <p id={"change_text"+p.OrderItem_id}><button className="btn" name={p.OrderItem_id} onClick={changestatus} style={{backgroundColor: '#E63946', color: 'white'}}>Return</button></p>
                                                                            }
                                                                        </div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Total Price</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'><b>${p.Price * p.Quantity}</b></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div className='container-fluid my-2 border-top border-bottom'>
                                                <div className='row'>
                                                    <div className='col-md-6'></div>
                                                    <div className='col-md-6 d-flex align-items-center'>
                                                        <div className="container-fluid">
                                                            <div className='row'>
                                                                <div className='col-6 text-left py-2' style={{fontWeight: '500', fontSize: '20px'}}>Overall Payment</div>
                                                                <div className='col-6 text-left py-2' style={{fontWeight: '500', fontSize: '20px'}}>${tot(i)}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                ]
                            )
                        }
                        {
                            loading && <tr><td colSpan="10" style={{textAlign: 'center'}}>Loading...</td></tr>
                        }
                    </tbody>
                </Table>
            </div>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        Orders: state.Orders
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
        insertNotification: (val) => { 
            dispatch({
                type: 'NOTIFICATION',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrders);
