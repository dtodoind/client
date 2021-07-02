import React, { useState, useEffect } from "react";
import "./CardDetail.scss";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBRow, MDBCol } from "mdbreact";
import { connect } from 'react-redux'
import { useParams } from "react-router";
import axios from 'axios';

function CardDetail(props) {

	const { Products, basket, addbasket, allproduct } = props
	const id = parseInt(useParams().id)
	const index = parseInt(useParams().id)
	const [qty, setqty] = useState(1)
	const [prevcolor, setcolor] = useState([])
	const [prevsize, setsize] = useState([])
	const [colorselected, setcolorsel] = useState(0)
	const [sizeselected, setsizesel] = useState(0)
	const [bas] = useState(0)
	// const [count, setCount] = useState(1)

	useEffect(() => {
		// console.log(JSON.parse(localStorage.getItem('basket')))
		// localStorage.removeItem('basket')
		// console.log(basket)
		// var last_val = 0
		var new_ind = parseInt(localStorage.getItem('ind'))
		if(bas === parseInt(localStorage.getItem('bas'))) {
			for(let v=0; v<basket.length; v++) {
				for(let b=0; b<JSON.parse(Products[new_ind].Color).length; b++) {
					for(let n=0; n<JSON.parse(Products[new_ind].Size)[b].length; n++) {
						if(JSON.parse(Products[new_ind].Color)[colorselected] === basket[v].color && 
							JSON.parse(Products[new_ind].Size)[colorselected][sizeselected] === basket[v].size &&
							new_ind === basket[v].id) {
							// console.log(JSON.parse(Products[new_ind].Stock)[colorselected][sizeselected], basket[v].qty)
							// last_val = JSON.parse(Products[new_ind].Stock)[colorselected][sizeselected] - basket[v].qty
							if(qty >= basket[v].Stock-1) {
								setqty(basket[v].Stock)
								document.getElementsByClassName('plus'+new_ind)[0].disabled = true
							}
						}
					}
				}
				// console.log(basket[v].qty + qty)
			} 
		}
		localStorage.removeItem('bas')
		localStorage.removeItem('ind')
		// for(let u=0; u<JSON.parse(Products[index].Color).length; u++) {
		// 	for(let p=0; p<JSON.parse(Products[index].Size)[u].length; p++) {
		// 		if(JSON.parse(Products[index].Color)[colorselected] === JSON.parse(Products[index].Color)[u] && JSON.parse(Products[index].Size)[colorselected][sizeselected] === JSON.parse(Products[index].Size)[u][p]) {
		// 			if(qty >= JSON.parse(Products[index].Stock)[colorselected][sizeselected]) {
		// 				setqty(JSON.parse(Products[index].Stock)[colorselected][sizeselected])
		// 				console.log(qty, JSON.parse(Products[index].Stock)[colorselected][sizeselected])
		// 				document.getElementsByClassName('plus'+index)[0].disabled = true
		// 			}
		// 		}
		// 	}
		// }
		if(Products.length === 0) {
			axios.get('http://localhost:5000/product/all').then(res => allproduct(res.data))
		} else {
			for(let q=0; q<basket.length; q++) {
				if(JSON.parse(Products[index].Color)[colorselected] === basket[q].color && JSON.parse(Products[index].Size)[colorselected][sizeselected] === basket[q].size && basket[q].id === index) {
					if(qty >= basket[q].Stock) {
						setqty(basket[q].Stock)
						document.getElementsByClassName('plus'+index)[0].disabled = true
					}
				}
			}
		}
	}, [basket, Products, colorselected, index, qty, sizeselected, bas, addbasket, allproduct])

	function counter(val) {
		if(val === 'add') {
			setqty(qty + 1)
			// var last_val = 0
			for(let v=0; v<basket.length; v++) {
				for(let b=0; b<JSON.parse(Products[index].Color).length; b++) {
					for(let n=0; n<JSON.parse(Products[index].Size)[b].length; n++) {
						if(JSON.parse(Products[index].Color)[colorselected] === basket[v].color && 
						JSON.parse(Products[index].Size)[colorselected][sizeselected] === basket[v].size &&
						props.id === basket[v].Product_id) {
							console.log(JSON.parse(Products[index].Color)[colorselected], basket[v].color, 
								JSON.parse(Products[index].Size)[colorselected][sizeselected], basket[v].size,
								props.id, basket[v].Product_id)
							// last_val = JSON.parse(Products[index].Stock)[colorselected][n] - basket[v].qty
							// console.log(basket[v].Stock)
							if(qty >= basket[v].Stock-1) {
								setqty(basket[v].Stock)
								document.getElementsByClassName('plus'+index)[0].disabled = true
							}
						}
					}
				}
				// console.log(basket[v].qty + qty)
			} 
		} else {
			if(qty !== 0) {
				setqty(qty - 1)
				document.getElementsByClassName('plus'+index)[0].disabled = false
			}
		}
	}

	const addtocart = () => {
		var num = 0
		var s = prevsize
		var c = prevcolor
		var record = 0
		var q = 0
		var bas_id = 0
		Products.map(pro => 
			basket.map((item,i) => {
				// console.log(i + ': '+ pro.Product_id + ' ' + item.Product_id)
				// console.log(JSON.parse(Products[index].Size)[colorselected][sizeselected], item.size)
				// console.log(JSON.parse(Products[index].Color)[colorselected], item.color)
				if(pro.Product_id === item.Product_id && 
					JSON.parse(Products[index].Size)[colorselected][sizeselected] === item.size && 
					JSON.parse(Products[index].Color)[colorselected] === item.color) {
					bas_id = item.id
					record = 1
				}
				if(item.id === bas_id) {
					num = 1
					q = item.qty + qty
				}
				
				// for(let k=0; k<s.length; k++) {
				// 	if(JSON.parse(Products[index].Size)[colorselected][sizeselected] === s[k]) {
				// 		record = 1
				// 	}
				// }
				return 0;
			})
		)
		let bask = basket.length
		if(num === 0 || record === 0) {
			var final = JSON.parse(Products[index].Stock)
			var st = final[colorselected][sizeselected] - qty
			final[colorselected][sizeselected] = st
			if(s.length === 0 || c.length === 0) {
				var item1 = {
					id: bask,
					img: JSON.parse(Products[index].Image)[colorselected][0],
					Stock: final[colorselected][sizeselected],
					allStock: JSON.stringify(final),
					oneSt: JSON.parse(Products[index].Stock)[colorselected][sizeselected],
					Product_id: Products[index].Product_id,
					title: Products[index].Name,
					price: JSON.parse(Products[index].Price)[colorselected][sizeselected],
					color: JSON.parse(Products[index].Color)[colorselected],
					size: JSON.parse(Products[index].Size)[colorselected][sizeselected],
					qty: qty,
					category: props.category,
					totalprice: JSON.parse(Products[index].Price)[colorselected][sizeselected]
				}
				c.push(JSON.parse(Products[index].Color)[colorselected])
				setcolor(c)
				s.push(JSON.parse(Products[index].Size)[colorselected][sizeselected])
				setsize(s)
				props.addbasket(item1)
				if(qty >= JSON.parse(Products[index].Stock)[colorselected][sizeselected] - qty) {
					setqty(JSON.parse(Products[index].Stock)[colorselected][sizeselected] - qty)
					document.getElementsByClassName('plus'+index)[0].disabled = true
				}
				return
			} else {
				var item = {
					id: bask,
					img: JSON.parse(Products[index].Image)[colorselected][0],
					Stock: final[colorselected][sizeselected],
					allStock: JSON.stringify(final),
					oneSt: JSON.parse(Products[index].Stock)[colorselected][sizeselected],
					Product_id: Products[index].Product_id,
					title: Products[index].name,
					price: JSON.parse(Products[index].Price)[colorselected][sizeselected],
					color: JSON.parse(Products[index].Color)[colorselected],
					size: JSON.parse(Products[index].Size)[colorselected][sizeselected],
					qty: qty,
					category: props.category,
					totalprice: JSON.parse(Products[index].Price)[colorselected][sizeselected]
				}
				c.push(JSON.parse(Products[index].Color)[colorselected])
				setcolor(c)
				s.push(JSON.parse(Products[index].Size)[colorselected][sizeselected])
				setsize(s)
				props.addbasket(item)
				JSON.parse(Products[index].Stock)[colorselected][sizeselected] = JSON.parse(Products[index].Stock)[colorselected][sizeselected] - qty
				if(qty >= JSON.parse(Products[index].Stock)[colorselected][sizeselected] - qty) {
					setqty(JSON.parse(Products[index].Stock)[colorselected][sizeselected] - qty)
					document.getElementsByClassName('plus'+index)[0].disabled = true
				}
				return
			}
		} else {
			var last = 0
			for(let v=0; v<basket.length; v++) {
				for(let b=0; b<JSON.parse(Products[index].Color).length; b++) {
					for(let n=0; n<JSON.parse(Products[index].Size)[b].length; n++) {
						if(JSON.parse(Products[index].Color)[colorselected] === basket[v].color && JSON.parse(Products[index].Size)[colorselected][sizeselected] === basket[v].size) {
							last = JSON.parse(Products[index].Stock)[colorselected][sizeselected] - basket[v].qty
							if(qty >= last-1) {
								setqty(JSON.parse(Products[index].Stock)[colorselected][sizeselected] - (basket[v].qty + qty))
								document.getElementsByClassName('plus'+index)[0].disabled = true
							}
						}
					}
				}
				// console.log(basket[v].qty + qty)
			}
			// if(qty >= qtyleft || qtyleft === 0) {
			// 	setqty(qtyleft - qty)
			// 	document.getElementsByClassName('plus'+index)[0].disabled = true
			// }
			props.quantity(q, bas_id)
		}
	}

	function colorbtn(u) {
		setcolorsel(u)
		for(let i=0; i<JSON.parse(Products[id].Color).length; i++) {
			if(i === u) {
				document.getElementsByClassName('col'+i)[0].style.border = '1px solid black'
			} else {
				document.getElementsByClassName('col'+i)[0].style.border = '1px solid white'
			}
		}
	}

	function sizebtn(u,j) {
		setsizesel(j)
		for(let i=0; i<JSON.parse(Products[id].Size)[u].length-1; i++) {
			if(i === j) {
				document.getElementsByClassName('size'+i)[0].style.border = '1px solid black'
			} else {
				document.getElementsByClassName('size'+i)[0].style.border = '1px solid white'
			}
		}
	}

	return (
		<div className="card-detail">
			<MDBRow className='row-all-detail'>
				<MDBCol className='col-detail-one'>
					<div className="d-flex justify-content-center">
						<Carousel className="card-carousel">
							{
								Products?.map((product,i) =>
									id === i
									? JSON.parse(product.Image)?.map((pro, u) =>
										colorselected === u
										? pro?.map((p,j) => 
											<Carousel.Item>
												<div className="w-100 h-100 d-flex justify-content-center">
													<img
														className="margin-auto h-100"
														src={p}
														alt={p}
													/>
												</div>
												<Carousel.Caption>
													{/* <h3>First slide label</h3>
													<p>
														Nulla vitae elit libero, span pharetra augue mollis interdum.
													</p> */}
												</Carousel.Caption>
											</Carousel.Item>
										
										)
										: null
									)
									: null
								)
							}
						</Carousel>
					</div>
				</MDBCol>
				<MDBCol>
					<div>
						{/* <p className="codigo-detail">codigo RANT</p> */}
						<h1 className="title-detail">{Products[id]?.Name}</h1>
						<p className="description-detail text-justify">{Products[id]?.Description}</p>
						<div>
							{
								Products?.map((product,i) =>
									id === i
									? JSON.parse(product.Price)?.map((pro, u) =>
										colorselected === u
										? pro?.map((price,j) => 
											j === sizeselected
											? JSON.parse(product.Stock)[u][j] === 0
												? <h3 style={{fontWeight: '500', color: '#dc3545'}} key={j}>Out of Stock</h3>
												: null
											: null
										)
										: null
									)
									: null
								)
							}
						</div>
						<div>
							{
								Products?.map((product,i) =>
									id === i
									? JSON.parse(product.Price)?.map((pro, u) =>
										colorselected === u
										? pro?.map((price,j) => 
											j === sizeselected
											? <h3 className="my-3" style={{fontWeight: '400'}} key={j}>${price}</h3>
											: null
										)
										: null
									)
									: null
								)
							}
						</div>
						<h4>Color</h4>
						<div className="allbtn">
							{
								Products?.map((product,i) =>
									id === i
									? JSON.parse(product.Color)?.map((col, u) => 
										u === 0
										? <button className={"btn col"+u} style={{border: '1px solid black'}} onClick={() => colorbtn(u)} key={u}>{col}</button>
										: <button className={"btn col"+u} onClick={() => colorbtn(u)} key={u}>{col}</button>
									)
									: null
								)
							}
						</div>
						<h4 className="mt-3">Size</h4>
						<div className="allbtn">
							{
								Products?.map((product,i) =>
									id === i
									? JSON.parse(product.Size)?.map((pro, u) =>
										colorselected === u
										? pro?.map((p,j) => 
											j < pro.length - 1
											? j === sizeselected
												? <button className={"btn size"+j} style={{border: '1px solid black'}} onClick={() => sizebtn(u,j)} key={j} 
													disabled={JSON.parse(product.Stock)[u][j] === 0 ? true : false}>
														{p}
													</button>
												: <button className={"btn size"+j} onClick={() => sizebtn(u,j)} key={j} 
													disabled={JSON.parse(product.Stock)[u][j] === 0 ? true : false}>
														{p}
													</button>
											: null
										)
										: null
									)
									: null
								)
							}
						</div>
						<div className="product-quantity-detail">
							<h4 className="m-0">Quantity</h4>
							{
								Products?.map((product,i) =>
									id === i
									? JSON.parse(product.Size)?.map((pro, u) =>
										colorselected === u
										? pro?.map((p,j) => 
											j === sizeselected
											? <div className="quantity-select" key={j}>
												<button className="counterbtn mr-2 px-2 minus" onClick={() => counter('sub')} disabled={JSON.parse(product.Stock)[u][j] === 0 ? true : qty === 0 ? true : false}>-</button>
												{
													JSON.parse(product.Stock)[u][j] !== 0
													? qty
													: 0
												}
												<button className={"counterbtn ml-2 px-2 plus"+i} onClick={() => counter('add')} disabled={JSON.parse(product.Stock)[u][j] <= qty ? true : JSON.parse(product.Stock)[u][j] === 0 ? true : false}>+</button>
											</div>
											: null
										)
										: null
									)
									: null
								)
							}
						</div>
						<button className="btn-buy" onClick={addtocart}>ADD TO CART</button>
					</div>
				</MDBCol>
			</MDBRow>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket,
        Products: state.Products
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addbasket: (val) => { 
            dispatch({
                type: 'ADD_TO_BASKET',
                item: val
            }) 
        },
		quantity: (q, id) => { 
			dispatch({
				type: 'QUANTITY',
				id: id,
				qty: q
			});
        },
		allproduct: (val) => {
            dispatch({
                type: 'PRODUCTS',
                item: val
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail);
