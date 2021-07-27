
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { Table, Modal } from 'react-bootstrap'
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
    const [popshow, setPopshow] = useState(false)
    const [orderitem_id, setOrderitem_id] = useState('')

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

    const cal_delivery = (val) => {
        var d = new Date(val)
        var lastdate = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()
        var date = 0
        var month = 0
        var year = 0
        var gap = 3
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
        // console.log(d.toISOString().substr(0,10), new Date(`${month}/${date+1}/${year}`).toISOString().substr(0,10))
        return new Date(`${month}/${date+1}/${year}`).toISOString()
    }
    
	const tot = (i) => {
        var OverallPay = []
        for(var q=0; q<Orders.length; q++) {
            var Overall = 0
            var total_price = 0
            var len_orderitem = 0
            // var qty = 0
            var discount = 0
            var delivery_charges = 0
            var final_delivery = 0
            var final_discount = 0
            var final_refund_amount = []
            var price = []
            var single_qty = []
            for(var e=0; e<Orders[q].OrderItems.length; e++) {
                total_price = total_price + (Orders[q].OrderItems[e].Price * Orders[q].OrderItems[e].Quantity)
                len_orderitem = Orders[q].OrderItems[e].Quantity + len_orderitem
                // qty = Orders[q].OrderItems[e].Quantity
                discount = parseInt(Orders[q].Discount)
                delivery_charges = parseInt(Orders[q].Delivery_charges)
                if(Orders[q].OrderItems[e].Status !== 'Return' && Orders[q].OrderItems[e].Status !== 'Refunded') {
                    Overall = Overall + (Orders[q].OrderItems[e].Price * Orders[q].OrderItems[e].Quantity)
                } else {
                    price.push(Orders[q].OrderItems[e].Price)
                    single_qty.push(Orders[q].OrderItems[e].Quantity)
                }
            }

            final_delivery = delivery_charges/len_orderitem
            final_discount = parseFloat(((total_price * discount / 100) / len_orderitem).toFixed(2))
            // delivery.push(delivery_charges - parseFloat(((delivery_charges/len_orderitem) * price.length).toFixed(2)))
            if(price.length !== 0) {
                for(var l = 0; l < price.length; l++) {
                    if(Orders[q].Status !== 'Return' && Orders[q].Status !== 'Refunded') {
                        final_refund_amount.push(((price[l] * single_qty[l]) - final_discount) + (final_delivery * single_qty[l]))
                        // console.log(`Order ${Orders[q].Orders_id} ${Orders[q].Status}`)
                        // console.log(price[l], single_qty[l], final_refund_amount)
                    }
                }
            }
            var amount = 0
            var t = 0
            if(Orders[q].Status !== 'Return' && Orders[q].Status !== 'Refunded') {
                amount = final_refund_amount.reduce((a,b) => a + b, 0)
                t = parseFloat((total_price - (total_price * discount / 100) + delivery_charges).toFixed(2)) - amount
                // console.log(`Order ${Orders[q].Orders_id} ${Orders[q].Status}`)
                // console.log(parseFloat((total_price - (total_price * discount / 100) + delivery_charges).toFixed(2)), amount)
            } else {
                // console.log(`-> Order ${Orders[q].Orders_id} ${Orders[q].Status}`)
                // console.log(t)
            }
            OverallPay.push(t)
        }

        return OverallPay[i]
    }

    const changestatus = async (e) => {
        var order_val = {
            OrderItem_id: parseInt(orderitem_id),
            Status: 'Return'
        }
        await axios.put('https://dtodo-indumentaria-server.herokuapp.com/orderitem/status', order_val).then(async (res) => {
            if(res.data === 'successfully Updated') {
                await axios.get('https://dtodo-indumentaria-server.herokuapp.com/order/all').then(res1 => allorders(res1.data))
            }
            // document.getElementById('change_text'+parseInt(orderitem_id)).innerHTML = `<p>You have Return this Product. Refund will be done after the product reaches to our store.</p>`
            // document.getElementById('btn_change'+parseInt(orderitem_id)).innerHTML = `
            //     <div style="background-color: #E63946; font-weight: 500; color: white" class="p-2 rounded">
            //         Return
            //     </div>
            // `
            Orders.map(async (order, i) => {
                if(order.Orders_id === parseInt(e.target.name)) {
                    var order_len = order.OrderItems.length
                    var count = 0
                    
                    order.OrderItems.map(item1 => {
                        // console.log(item1.Status)
                        if(item1.OrderItem_id === parseInt(orderitem_id)) {
                            count += 1
                        } else if(item1.Status === 'Refunded') {
                            // console.log('Refunded')
                            count += 1
                        } else if(item1.Status === 'Return') {
                            // console.log('Return')
                            count += 1
                        }
                        return 0
                    })
                    if(order_len !== 0) {
                        // console.log(order_len, count)
                        if(count === order_len) {
                            var order_val = {
                                Orders_id: order.Orders_id,
                                Status: 'Return'
                            }
                            // console.log(order_val)
                            await axios.put('https://dtodo-indumentaria-server.herokuapp.com/order/status', order_val)
                            await axios.get('https://dtodo-indumentaria-server.herokuapp.com/order/all').then(res1 => allorders(res1.data))
                        }
                    }
                }
                return 0
            })
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
                                    <td>{typeof JSON.parse(o.Address)[0] === "object" ? JSON.parse(o.Address)[0].join(', ') : JSON.parse(o.Address).join(', ')}</td>
                                    <td><div style={{backgroundColor: o.Status === 'Delivered' ? 'green' : o.Status === 'Pending' ? '#F77F00' : o.Status === 'Shipping' ? '#5BC0BE' : o.Status === 'Pickup' ? '#281a91' : o.Status === 'Refunded' ? 'black' : '#E63946', fontWeight: '500', color: 'white'}} className="p-2 rounded">{o.Status}</div></td>
                                </tr>,
                                <tr key={'inner'+i} className="hide-table-padding">
                                    <td colSpan='6' className="table_inner px-2">
                                        <div id={"collap"+i} className="collapse">
                                            {
                                                Orders.length === 0
                                                ? null
                                                : o.OrderItems.map((p,j) => 
                                                    <div className='container-fluid my-2 border-top border-bottom' key={j}>
                                                        <div className='row'>
                                                            <div className='col-md-6 d-flex align-items-center'>
                                                                <div className="order_img">
                                                                    <img src={p.Image} alt='' className="order_img_inner" />
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6 d-flex align-items-center'>
                                                                <div className="container-fluid">
                                                                    <div className='row'>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Date</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'>{o.createdAt.substr(0,10)}</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Product Name</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'>{p.ProdcutName}</div>
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
                                                                                <div style={{backgroundColor: p.Status === 'Delivered' ? 'green' : p.Status === 'Pending' ? '#F77F00' : p.Status === 'Shipping' ? '#5BC0BE' : o.Status === 'Pickup' ? '#281a91' :  o.Status === 'Refunded' ? 'black' : '#E63946', fontWeight: '500', color: 'white'}} className="p-2 rounded">
                                                                                    {p.Status}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Do you want to Return?</div>
                                                                        <div className='col-6 text-left py-2'>
                                                                            {
                                                                                p.Status === "Return"
                                                                                ? <p>You have Return this Product. Refund will be done after the product reaches to our store.</p>
                                                                                : p.Status !== "Delivered"
                                                                                    ? p.Status === "Shipping"
                                                                                        ? <p>Product is Not yet Delivered</p>
                                                                                        : p.Status === "Refunded"
                                                                                            ? <p>
                                                                                                We have successfully made the request of refund. It will take 5-10 days for the Refund.
                                                                                                If you don't get the refund within 5-10 days email us.
                                                                                            </p>
                                                                                            : <p id={"change_text"+p.OrderItem_id}>
                                                                                                <button className="btn" name={p.OrderItem_id} 
                                                                                                    onClick={() => {
                                                                                                        setOrderitem_id(p.OrderItem_id)
                                                                                                        setPopshow(true)
                                                                                                    }} style={{backgroundColor: '#E63946', color: 'white'}}>
                                                                                                    Return
                                                                                                </button>
                                                                                                <Modal show={popshow}>
                                                                                                    <Modal.Header>Nota Importante</Modal.Header>
                                                                                                    <Modal.Body>
                                                                                                    Si devuelve el producto, no debería estar dañado. Si desea devolver este producto, debe enviárnoslo por mensajería o correo. Si vive cerca de la tienda, puede venir a la tienda y devolverlo. Si lo envía por mensajería o correo, cuando el producto nos llegue lo inspeccionaremos y si el producto no está dañado, le reembolsaremos el dinero, lo que demorará entre 5 y 10 días.
                                                                                                    </Modal.Body>
                                                                                                    <Modal.Footer>
                                                                                                        <button className="btn btn-danger" onClick={() => setPopshow(false)}>No Acepto</button>
                                                                                                        <button className="btn btn-success" name={o.Orders_id}
                                                                                                            onClick={(e) => {
                                                                                                                changestatus(e)
                                                                                                                setPopshow(false)
                                                                                                            }} 
                                                                                                        >
                                                                                                            OK
                                                                                                        </button>
                                                                                                    </Modal.Footer>
                                                                                                </Modal>
                                                                                                
                                                                                            </p>
                                                                                    : new Date().toISOString().substr(0,10) === cal_delivery(o.Delivery_date.substr(0,10)).substr(0,10)
                                                                                        ? <p>
                                                                                        Ahora no puedes devolver el producto</p>
                                                                                        : <p style={{fontWeight: '500'}}>
                                                                                            Si desea devolvernos el producto, puede enviarnos un correo electrónico o contactarnos por Whatsapp
                                                                                            con los detalles como su nombre de usuario, identificación de pedido, nombre del producto que desea devolver y
                                                                                            si es necesario adjunte fotos del producto.
                                                                                        </p>
                                                                                        // : <>
                                                                                        //     <p style={{fontWeight: '500'}}>Return within 3 days. After that you will not be able to return.</p>
                                                                                        //     <p id={"change_text"+p.OrderItem_id}>
                                                                                        //         <button className="btn" name={p.OrderItem_id} 
                                                                                        //             onClick={() => {
                                                                                        //                 setOrderitem_id(p.OrderItem_id)
                                                                                        //                 setPopshow(true)
                                                                                        //             }} style={{backgroundColor: '#E63946', color: 'white'}}>
                                                                                        //             Return
                                                                                        //         </button>
                                                                                        //         <Modal show={popshow}>
                                                                                        //             <Modal.Header>Important Note</Modal.Header>
                                                                                        //             <Modal.Body>
                                                                                        //                 If you are returning the product then it should not be damage. 
                                                                                        //                 If you want to Return this Product, you have to sent to us by courier or mail. 
                                                                                        //                 If you are living nearby the store then you can come to the store and return it.
                                                                                        //                 If you are sending it by courier or mail then when the product reaches us 
                                                                                        //                 we will inspect it and if the product is not damage then we will refund you 
                                                                                        //                 which will take 5-10 days.
                                                                                        //             </Modal.Body>
                                                                                        //             <Modal.Footer>
                                                                                        //                 <button className="btn btn-danger" onClick={() => setPopshow(false)}>Disagree</button>
                                                                                        //                 <button className="btn btn-success" name={Orders[i].Orders_id}
                                                                                        //                     onClick={(e) => {
                                                                                        //                         changestatus(e)
                                                                                        //                         setPopshow(false)
                                                                                        //                     }} 
                                                                                        //                 >
                                                                                        //                     Agree
                                                                                        //                 </button>
                                                                                        //             </Modal.Footer>
                                                                                        //         </Modal>
                                                                                                
                                                                                        //     </p>
                                                                                        // </>
                                                                            }
                                                                        </div>
                                                                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                            <div className="modal-dialog" role="document">
                                                                                <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                    </button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    ...
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                                    <button type="button" className="btn btn-primary">Guardar Cambios</button>
                                                                                </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center' style={{fontWeight: '500'}}>Precio Total</div>
                                                                        <div className='col-6 text-left py-2 d-flex align-items-center'><b>${p.Status !== "Refunded" ? p.Price * p.Quantity : 0}</b></div>
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
                                                {/* {
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
                                                } */}
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