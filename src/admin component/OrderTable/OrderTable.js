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
        // for(var q=0; q<Orders.length; q++) {
        //     for(var h=0; h<Orders[q].OrderItems.length; h++) {
        //         if(Orders[q].Orders_id === parseInt(e.target.name)) {
        //             total_price = total_price + (Orders[q].OrderItems[h].Price * Orders[q].OrderItems[h].Quantity)
        //             len_orderitem = Orders[q].OrderItems[h].Quantity + len_orderitem
        //             if(Orders[q].OrderItems[h].OrderItem_id === OrderItem_id) {
        //                 qty = Orders[q].OrderItems[h].Quantity
        //                 discount = Orders[q].Discount
        //                 delivery_charges = Orders[q].Delivery_charges
        //                 // for(var t=0; t<Delivery.length; t++) {
        //                 //     if(Delivery[t].Region === parseInt(zip)) {
        //                 //         delivery_charges = parseInt(Delivery[t].Charges)
        //                 //     }
        //                 // }
        //             }
        //         }
        //     }
        // }
        for(var q=0; q<Orders.length; q++) {
            var Overall = 0
            // var total_price = 0
            // var len_orderitem = 0
            // var qty = 0
            // var discount = 0
            // var delivery_charges = 0
            // var final_delivery = 0
            // var final_discount = 0
            // var final_refund_amount = 0
            // var price = 0
            for(var e=0; e<Orders[q].OrderItems.length; e++) {
                // total_price = total_price + (Orders[q].OrderItems[e].Price * Orders[q].OrderItems[e].Quantity)
                // len_orderitem = Orders[q].OrderItems[e].Quantity + len_orderitem
                // qty = Orders[q].OrderItems[e].Quantity
                // discount = parseInt(Orders[q].Discount)
                // delivery_charges = parseInt(Orders[q].Delivery_charges)
                if(Orders[q].OrderItems[e].Status !== 'Return' && Orders[q].OrderItems[e].Status !== 'Refunded') {
                    Overall = Overall + (Orders[q].OrderItems[e].Price * Orders[q].OrderItems[e].Quantity)
                } else {
                    price = Orders[q].OrderItems[e].Price
                }
            }
            // if(Orders[q].Status !== 'Return' && Orders[q].Status !== 'Refunded') {
            //     if(price !== 0) {
            //         final_delivery = parseFloat(((delivery_charges/len_orderitem) * qty).toFixed(2))
            //         final_discount = parseFloat((((total_price * discount / 100) / len_orderitem) * qty).toFixed(2))
            //         final_refund_amount = ((price - final_discount) + final_delivery)
            //         // console.log(`Order ${Orders[q].Orders_id} ${Orders[q].Status}`)
            //         // console.log(final_refund_amount)
            //     } else {
            //         // console.log(`Order ${Orders[q].Orders_id} ${Orders[q].Status}`)
            //         // console.log('Price is: ', price)
            //     }
            // }
            
            if(Orders[q].Discount !== 0) {
                Overall = Overall - (parseInt(Orders[q].Discount) * Overall / 100) + JSON.parse(Orders[q].Delivery_charges)
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
        // Orders.map(async (order) => {
        //     var order_len = order.OrderItems.length
        //     var count_refund = 0
        //     var count_return = 0
        //     order.OrderItems.map(item => {
        //         if(item.Status === 'Refunded') {
        //             // console.log(item.OrderItem_id)
        //             count_refund += 1
        //         }
        //         if(item.Status === 'Return') {
        //             // console.log(item.OrderItem_id)
        //             count_return += 1
        //         }
        //         return 0
        //     })
        //     var count = count_refund + count_return
        //     // console.log(order_len, count, count_refund, count_return)
        //     if(order_len !== 0) {
        //         if(count === order_len) {
        //             if(count_return > 0) {
        //                 var order_val = {
        //                     Orders_id: order.Orders_id,
        //                     Status: 'Return'
        //                 }
        //                 await axios.put('https://dtodo-indumentaria-server.herokuapp.com/order/status', order_val)
        //             } else {
        //                 var order_val2 = {
        //                     Orders_id: order.Orders_id,
        //                     Status: 'Refunded'
        //                 }
        //                 await axios.put('https://dtodo-indumentaria-server.herokuapp.com/order/status', order_val2)
        //             }
        //         }
        //     }
        //     return 0
        // })

        loadUsers()
    }, [Orders, loadUsers])

    const changestatus = async (e) => {
        var change_delivery = ''
        if(e.target.value === "Delivered") {
            change_delivery = new Date().toISOString()
        } else {
            Orders.map((order, i) => {
                if(order.Orders_id === parseInt(e.target.name)) {
                    var d = new Date(parseInt(order.createdAt.substr(0,4)), parseInt(order.createdAt.substr(5,8))-1, parseInt(order.createdAt.substr(8,10)))
                    var lastdate = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()
                    var date = 0
                    var month = 0
                    var year = 0
                    var gap = 7
                    if(d.getMonth()+1 > 12) {
                        year = d.getFullYear() + 1
                        month = 1
                        date = (d.getDate()+gap) - lastdate
                    } else if((d.getDate()+gap) > lastdate) {
                        year = d.getFullYear()
                        month = d.getMonth() + 2
                        date = (d.getDate()+gap) - lastdate
                    } else {
                        date = d.getDate() + gap
                        month = d.getMonth() + 1
                        year = d.getFullYear()
                    }
                    if(month > 12) {
                        year = year + 1
                        month = 1
                        date = (d.getDate()+gap) - lastdate
                    } else if(date+1 > lastdate) {
                        month = month + 1
                        date = (d.getDate()+gap) - lastdate
                    }
                    change_delivery = new Date(`${month}/${date+1}/${year}`).toISOString()
                }
                return 0
            })
        }
        var order_val = {
            Orders_id: parseInt(e.target.name),
            Status: e.target.value,
            Delivery_date: change_delivery
        }

        await axios.put('https://dtodo-indumentaria-server.herokuapp.com/order/status', order_val).then(async (res) => {
            if(res.data === 'successfully Updated') {
                await axios.get('https://dtodo-indumentaria-server.herokuapp.com/order/all').then(res1 => allorders(res1.data))
            }
        })
        Orders.map((order, i) => {
            if(order.Orders_id === parseInt(e.target.name)) {
                Orders[i].OrderItems.map(async (item) => {
                    var order_val1 = {
                        OrderItem_id: item.OrderItem_id,
                        Status: e.target.value,
                        Delivery_date: change_delivery
                    }
                    await axios.put('https://dtodo-indumentaria-server.herokuapp.com/orderitem/status', order_val1)
                    return 0
                })
            }
            return 0
        })
    }

    const Refund = async (e, id, refund_amount, OrderItem_id) => {
        var len_orderitem = 0
        var qty = 0
        var delivery_charges = 0
        var discount = 0
        var total_price = 0
        for(var q=0; q<Orders.length; q++) {
            for(var h=0; h<Orders[q].OrderItems.length; h++) {
                if(Orders[q].Orders_id === parseInt(e.target.name)) {
                    total_price = total_price + (Orders[q].OrderItems[h].Price * Orders[q].OrderItems[h].Quantity)
                    len_orderitem = Orders[q].OrderItems[h].Quantity + len_orderitem
                    if(Orders[q].OrderItems[h].OrderItem_id === OrderItem_id) {
                        qty = Orders[q].OrderItems[h].Quantity
                        discount = Orders[q].Discount
                        delivery_charges = Orders[q].Delivery_charges
                        // for(var t=0; t<Delivery.length; t++) {
                        //     if(Delivery[t].Region === parseInt(zip)) {
                        //         delivery_charges = parseInt(Delivery[t].Charges)
                        //     }
                        // }
                    }
                }
            }
        }

        var final_delivery = parseFloat(((delivery_charges/len_orderitem) * qty).toFixed(2))
        var final_discount = parseFloat((((total_price * discount / 100) / len_orderitem) * qty).toFixed(2))

        var final_refund_amount = (refund_amount - final_discount) + final_delivery

        // console.log(refund_amount, final_delivery, final_discount, total_price+delivery_charges)
        // console.log((refund_amount - final_discount) + final_delivery)
        if(refund_amount === undefined) {
            // console.log('Only Refund')
            // price of the product + (Delivery charges / total number of product purchase) - ((Total price * discount / 100) / total number of product purchase)
            var order_val = {
                Orders_id: parseInt(e.target.name),
                Status: 'Refunded'
            }
    
            await axios.put('https://dtodo-indumentaria-server.herokuapp.com/order/status', order_val).then(async (res) => {
                if(res.data === 'successfully Updated') {
                    await axios.get('https://dtodo-indumentaria-server.herokuapp.com/order/all').then(res1 => allorders(res1.data))
                }
            })
            await axios.post('https://dtodo-indumentaria-server.herokuapp.com/order/refund', {payment_id: id}).then(res => {
                if(res.data.status === "succeeded") {
                    Orders.map((order, i) => {
                        if(order.Orders_id === parseInt(e.target.name)) {
                            Orders[i].OrderItems.map(async (item) => {
                                var order_val1 = {
                                    OrderItem_id: item.OrderItem_id,
                                    Status: 'Refunded'
                                }
                                await axios.put('https://dtodo-indumentaria-server.herokuapp.com/orderitem/status', order_val1).then(async (res) => {
                                    if(res.data === 'successfully Updated') {
                                        await axios.get('https://dtodo-indumentaria-server.herokuapp.com/order/all').then(res1 => allorders(res1.data))
                                    }
                                })
                                return 0
                            })
                        }
                        return 0
                    })
                }
            })
        } else {
            // var order_val = {
            //     Orders_id: parseInt(e.target.name),
            //     Status: 'Refunded'
            // }
    
            // await axios.put('https://dtodo-indumentaria-server.herokuapp.com/order/status', order_val).then(async (res) => {
            //     if(res.data === 'successfully Updated') {
            //         await axios.get('https://dtodo-indumentaria-server.herokuapp.com/order/all').then(res1 => allorders(res1.data))
            //     }
            // })
            await axios.post('https://dtodo-indumentaria-server.herokuapp.com/order/refund', {payment_id: id, refund_amount: final_refund_amount*100}).then(res => {
                if(res.data.status === "succeeded") {
                    Orders.map((order, i) => {
                        if(order.Orders_id === parseInt(e.target.name)) {
                            Orders[i].OrderItems.map(async (item) => {
                                var order_len = order.OrderItems.length
                                var count_refund = 0
                                var count_return = 0
                                if(item.OrderItem_id === OrderItem_id) {
                                    var order_val1 = {
                                        OrderItem_id: OrderItem_id,
                                        Status: 'Refunded'
                                    }
                                    await axios.put('https://dtodo-indumentaria-server.herokuapp.com/orderitem/status', order_val1).then(async (res) => {
                                        if(res.data === 'successfully Updated') {
                                            await axios.get('https://dtodo-indumentaria-server.herokuapp.com/order/all').then(res1 => allorders(res1.data))
                                        }
                                    })
                                }
                                order.OrderItems.map(item1 => {
                                    if(item1.OrderItem_id === OrderItem_id) {
                                        count_refund += 1
                                    } else if(item1.Status === 'Refunded') {
                                        // console.log(item.OrderItem_id)
                                        count_refund += 1
                                    } else if(item1.Status === 'Return') {
                                        // console.log(item.OrderItem_id)
                                        count_return += 1
                                    }
                                    return 0
                                })
                                // console.log(order_len, count_refund, count_return)
                                var count = count_refund + count_return
                                if(order_len !== 0) {
                                    if(count === order_len) {
                                        // console.log(order_len, count, count_refund, count_return)
                                        if(count_return > 0) {
                                            // console.log('Return')
                                            var order_val = {
                                                Orders_id: order.Orders_id,
                                                Status: 'Return'
                                            }
                                            await axios.put('https://dtodo-indumentaria-server.herokuapp.com/order/status', order_val)
                                        } else {
                                            // console.log('Refunded')
                                            var order_val2 = {
                                                Orders_id: order.Orders_id,
                                                Status: 'Refunded'
                                            }
                                            await axios.put('https://dtodo-indumentaria-server.herokuapp.com/order/status', order_val2)
                                        }
                                    }
                                }
                            })
                        }
                        return 0
                    })
                }
            })
        }
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
                                        {
                                            o.Status === 'Refunded'
                                            ? null
                                            : <select name={o.Orders_id} onChange={(e) => changestatus(e)} defaultValue={o.Status}>
                                                <option value="Pending">Pending</option>
                                                <option value="Shipping">Shipping</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Pickup">Pickup</option>
                                                <option value="Return">Return</option>
                                            </select>
                                        }
                                    </td>
                                    <td>
                                        <div style={{backgroundColor: o.Status === 'Delivered' ? 'green' : o.Status === 'Pending' ? '#F77F00' : o.Status === 'Shipping' ? '#5BC0BE' : o.Status === 'Pickup' ? '#281a91' : o.Status === 'Refunded' ? 'black' : '#E63946', fontWeight: '500', color: 'white'}} className="p-2 rounded">
                                            {o.Status}
                                        </div>
                                        {
                                            o.Status === "Return"
                                            ? <button className="p-2 w-100 rounded refund_btn" name={o.Orders_id} onClick={(e) => Refund(e, o.PaymentSuccess_id)}>Refund</button>
                                            : null
                                        }
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
                                                                    <img src={p.Image} alt='' className="order_img_inner" />
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
                                                                            <div style={{
                                                                                backgroundColor: p.Status === 'Delivered' 
                                                                                                ? 'green' 
                                                                                                : p.Status === 'Pending' 
                                                                                                    ? '#F77F00' 
                                                                                                    : p.Status === 'Shipping' 
                                                                                                        ? '#5BC0BE' 
                                                                                                        : o.Status === 'Pickup' 
                                                                                                            ? '#281a91' 
                                                                                                            : o.Status === 'Refunded' 
                                                                                                                ? 'black' 
                                                                                                                :'#E63946', 
                                                                                fontWeight: '500', 
                                                                                color: 'white', width: 'fit-content'}} className="p-2 rounded">
                                                                                {p.Status}
                                                                            </div>
                                                                            {
                                                                                o.Status === "Return" || o.Status === "Refunded"
                                                                                ? null
                                                                                : p.Status === "Return"
                                                                                    ? <button className="p-2 rounded refund_btn" name={o.Orders_id} onClick={(e) => Refund(e, o.PaymentSuccess_id, p.Price * p.Quantity, p.OrderItem_id)}>Refund</button>
                                                                                    : null
                                                                            }
                                                                            {/* {
                                                                                p.Status === "Return"
                                                                                ? <button className="p-2 rounded refund_btn" name={o.Orders_id} onClick={(e) => Refund(e, o.PaymentSuccess_id, p.Price, p.OrderItem_id)}>Refund</button>
                                                                                : null
                                                                            } */}
                                                                        </div>
                                                                        <div className='col-6 text-left py-2' style={{fontWeight: '500'}}>Total Price</div>
                                                                        <div className='col-6 text-left py-2'>${p.Status !== "Refunded" ? p.Price * p.Quantity : 0}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div className='container-fluid my-2 border-top border-bottom'>
                                                {
                                                    o.Discount === "0"
                                                    ? null
                                                    : <div className='row'>
                                                        <div className='col-md-6'></div>
                                                        <div className='col-md-6 d-flex align-items-center'>
                                                            <div className="container-fluid">
                                                                <div className='row'>
                                                                    <div className='col-6 text-left py-2' style={{fontWeight: '500', fontSize: '20px'}}>Discount</div>
                                                                    <div className='col-6 text-left py-2' style={{fontWeight: '500', fontSize: '20px'}}>{o.Discount}%</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    o.Delivery_charges === "0"
                                                    ? null
                                                    : <div className='row'>
                                                        <div className='col-md-6'></div>
                                                        <div className='col-md-6 d-flex align-items-center'>
                                                            <div className="container-fluid">
                                                                <div className='row'>
                                                                    <div className='col-6 text-left py-2' style={{fontWeight: '500', fontSize: '20px'}}>Delivery Charges</div>
                                                                    <div className='col-6 text-left py-2' style={{fontWeight: '500', fontSize: '20px'}}>${o.Delivery_charges}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                <div className='row'>
                                                    <div className='col-md-6'></div>
                                                    <div className='col-md-6 d-flex align-items-center'>
                                                        <div className="container-fluid">
                                                            <div className='row'>
                                                                <div className='col-6 text-left py-2' style={{fontWeight: '500', fontSize: '20px'}}>Overall Payment</div>
                                                                <div className='col-6 text-left py-2' style={{fontWeight: '500', fontSize: '20px'}}>${tot(i).toFixed(2)}</div>
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
        Orders: state.Orders,
        Delivery: state.Delivery
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
