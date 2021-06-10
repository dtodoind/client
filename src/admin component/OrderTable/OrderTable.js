import React, { useCallback, useEffect, useState } from 'react'

import Table from 'react-bootstrap/Table'
import { IoAddCircle, IoRemoveCircleSharp } from 'react-icons/io5'
import { connect } from 'react-redux'
import axios from 'axios'

import './OrderTable.scss'

function OrderTable(props) {

    const { Orders, allorders } = props
    const [orderload, setOrderload] = useState(5)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    // console.log(Orders)
    
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

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(scrollHeight - scrollTop === clientHeight) {
            setOrderload(orderload + 5)
        }
    }

    const loadUsers = useCallback(async () => {
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
        Orders.map(async (order) => {
            var order_len = order.OrderItems.length
            var count = 0
            order.OrderItems.map(item => {
                if(item.Status === 'Return') {
                    count += 1
                }
                return 0
            })
            // console.log(order_len, count)
            if(order_len !== 0) {
                if(count === order_len) {
                    var order_val = {
                        Orders_id: order.Orders_id,
                        Status: 'Return'
                    }
                    await axios.put('http://localhost:5000/order/status', order_val)
                }
            }
            // document.getElementsByName(order.Orders_id)[0].defaultValue = order.Status
            return 0
        })

        loadUsers()
    }, [Orders, loadUsers])

    const changestatus = async (e) => {
        var order_val = {
            Orders_id: parseInt(e.target.name),
            Status: e.target.value
        }
        await axios.put('http://localhost:5000/order/status', order_val).then(async (res) => {
            if(res.data === 'successfully Updated') {
                await axios.get('http://localhost:5000/order/all').then(res => allorders(res.data))
            }
        })
        Orders.map((order, i) => {
            if(order.Orders_id === parseInt(e.target.name)) {
                Orders[i].OrderItems.map(item => {
                    if(item.Status !== 'Return') {
                        var order_val1 = {
                            OrderItem_id: item.OrderItem_id,
                            Status: e.target.value
                        }
                        axios.put('http://localhost:5000/orderitem/status', order_val1)
                    }
                    return 0
                })
            }
            return 0
        })
    }

    return (
        <div className="order-table">
            <h2>Orders</h2>
            <div style={{overflowY: 'scroll', height: '380px'}} onScroll={handleScroll}>
                <Table striped hover className="fixed_header">
                    <thead>
                        <tr className="head">
                            <th>#</th>
                            <th>Date</th>
                            <th>Delivery Date</th>
                            <th>Total Item</th>
                            <th>Client Name</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Update Status</th>
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
                                    <td>{o.Phone}</td>
                                    <td>{o.Email}</td>
                                    <td><div style={{textAlign: 'left'}}>{JSON.parse(o.Address).map((a, i) => <p key={i} style={{margin: '0'}}>{i !== JSON.parse(o.Address).length-1 ? a+',' : a}<br /></p>)}</div></td>
                                    <td>
                                        <select name={o.Orders_id} onChange={changestatus} defaultValue={o.Status}>
                                            <option value="Pending">Pending</option>
                                            <option value="Shipping">Shipping</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Pickup">Pickup</option>
                                            <option value="Return">Return</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div style={{backgroundColor: o.Status === 'Delivered' ? 'green' : o.Status === 'Pending' ? '#F77F00' : o.Status === 'Shipping' ? '#5BC0BE' : o.Status === 'Pickup' ? '#281a91' : '#E63946', fontWeight: '500', color: 'white'}} className="p-2 rounded">
                                            {o.Status}
                                        </div>
                                    </td>
                                </tr>,
                                <tr key={'inner'+i} className="hide-table-padding">
                                    <td colSpan='9' className="table_inner px-2">
                                        <div id={"collap"+i} className="collapse">
                                            {
                                                Orders.length === 0
                                                ? null
                                                : Orders[i].OrderItems.map((p,j) => 
                                                    <div className='container-fluid my-2 border-top border-bottom' key={j}>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <div className="order_img">
                                                                    <img src={'http://localhost:5000/'+p.Image} alt='' className="order_img_inner" />
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6 d-flex align-items-center'>
                                                                <div className="container-fluid">
                                                                    <div className='row'>
                                                                        <div className='col-6 text-left py-2' style={{fontWeight: '500'}}>Date</div>
                                                                        <div className='col-6 text-left py-2'>{o.createdAt.substr(0,10)}</div>
                                                                        <div className='col-6 text-left py-2' style={{fontWeight: '500'}}>Product Name</div>
                                                                        <div className='col-6 text-left py-2'>{p.ProdcutName}</div>
                                                                        <div className='col-6 text-left py-2' style={{fontWeight: '500'}}>Color</div>
                                                                        <div className='col-6 text-left py-2'>{p.Color}</div>
                                                                        <div className='col-6 text-left py-2' style={{fontWeight: '500'}}>Size</div>
                                                                        <div className='col-6 text-left py-2'>{p.Size}</div>
                                                                        <div className='col-6 text-left py-2' style={{fontWeight: '500'}}>Price</div>
                                                                        <div className='col-6 text-left py-2'>${p.Price}</div>
                                                                        <div className='col-6 text-left py-2' style={{fontWeight: '500'}}>Quantity</div>
                                                                        <div className='col-6 text-left py-2'>{p.Quantity}</div>
                                                                        <div className='col-6 text-left py-2' style={{fontWeight: '500'}}>Status</div>
                                                                        <div className='col-6 text-left py-2'>
                                                                            <span style={{
                                                                                backgroundColor: p.Status === 'Delivered' 
                                                                                                ? 'green' 
                                                                                                : p.Status === 'Pending' 
                                                                                                    ? '#F77F00' 
                                                                                                    : p.Status === 'Shipping' 
                                                                                                        ? '#5BC0BE' 
                                                                                                        : o.Status === 'Pickup' 
                                                                                                            ? '#281a91' 
                                                                                                            : '#E63946', 
                                                                                fontWeight: '500', 
                                                                                color: 'white',
                                                                                padding: '5px 10px'}}>
                                                                                {p.Status}
                                                                            </span>
                                                                        </div>
                                                                        <div className='col-6 text-left py-2' style={{fontWeight: '500'}}>Total Price</div>
                                                                        <div className='col-6 text-left py-2'>${p.Price * p.Quantity}</div>
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
    )
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable)
