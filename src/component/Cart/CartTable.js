import React from 'react'

import './CartTable.scss'
import { AiFillDelete } from 'react-icons/ai'
import { FaMinus, FaPlus, FaDollarSign } from 'react-icons/fa';
import { Table } from 'react-bootstrap';

import { connect } from 'react-redux'

function CartTable(props) {
    const basket = props.basket

    // function quantity(val, q, id) {
	// 	if(val === 'add') {
	// 		dispatch({
	// 			type: 'QUANTITY',
	// 			id: id,
	// 			qty: q + 1
	// 		});
	// 	} else {
	// 		if(q !== 0) {
	// 			dispatch({
	// 				type: 'QUANTITY',
	// 				id: id,
	// 				qty: q - 1
	// 			});
	// 		}
	// 	}
	// }

    // function del(id) {
	// 	dispatch({
    //         type: 'REMOVE_FROM_BASKET',
    //         id: id
    //     })
    // }
    
    return (
        <div className="carttable">
            <Table striped hover>
                <thead className="head">
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        basket.length === 0
                        ? <tr>
                            <td colSpan="7" style={{textAlign: 'center'}}>No Items</td>
                        </tr>
                        : basket.map((item, i) => 
                            <tr key={i}>
                                <td className="cart_prod">
                                    <div className="cart_prod_img">
                                        <img src={item.img} alt="cart_prod" style={{width: '100%'}} />
                                    </div>
                                </td>
                                <td>
                                    <div className="content">
                                        <h3 className="title">{item.title}</h3>
                                        <p>{item.description}</p>
                                        <div>
                                            <FaDollarSign/>
                                            {item.price}
                                        </div>
                                    </div>
                                </td>
                                <td className="ali">
                                    <p style={{margin: '0'}}>{item.color}</p>
                                </td>
                                <td className="ali">
                                    <p style={{margin: '0'}}>{item.size}</p>
                                </td>
                                <td className="ali">
                                    <FaMinus className="min-plus" onClick={() => props.quantity('sub', item.qty, item.id, item.oneSt)}/>
                                    <span className="number">{item.qty}</span>
                                    <FaPlus className="min-plus" onClick={() => props.quantity('add', item.qty, item.id, item.oneSt)}/>
                                </td>
                                <td className="ali">
                                    <div className="names">
                                        <FaDollarSign/>
                                        {item.totalprice}
                                    </div>
                                </td>
                                <td className="ali">
                                    <AiFillDelete className="delete" onClick={() => props.del(item.id)} />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        quantity: (val, q, id, st) => { 
            if(val === 'add') {
				if(q < st) {
					dispatch({
						type: 'QUANTITY',
						id: id,
						qty: q + 1
					});
				}
			} else {
				if(q > 1) {
					dispatch({
						type: 'QUANTITY',
						id: id,
						qty: q - 1
					});
				}
				// if(q-1 === 0) {
				// 	del(id)
				// }
			}
        },
		del: (id) => {
			dispatch({
				type: 'REMOVE_FROM_BASKET',
				id: id
			})
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable)
