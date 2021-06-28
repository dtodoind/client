import React, { useEffect, useState } from 'react';
import './ProductCard.scss'
import { FaDollarSign} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'

function ProductCard(props){

	const [qty, setqty] = useState(1)
	const [prevcolor, setcolor] = useState([])
	const [prevsize, setsize] = useState([])
	const [colorselected, setcolorsel] = useState(0)
	const [sizeselected, setsizesel] = useState(0)
	const [bas] = useState(0)
	// const [qtyleft, setqtyeft] = useState(0)
	const { Products, basket, index, addbasket } = props
	
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
		for(let q=0; q<basket.length; q++) {
			if(JSON.parse(Products[index].Color)[colorselected] === basket[q].color && JSON.parse(Products[index].Size)[colorselected][sizeselected] === basket[q].size && basket[q].id === index) {
				if(qty >= basket[q].Stock) {
					setqty(basket[q].Stock)
					document.getElementsByClassName('plus'+index)[0].disabled = true
				}
			}
		}
	}, [basket, Products, colorselected, index, qty, sizeselected, bas, addbasket])

    const addToBasket = () => {
		//dispatch the item into the data layer
		var num = 0
		var s = prevsize
		var c = prevcolor
		var record = 0
		var q = 0
		var bas_id = 0
		Products.map(pro => 
			basket.map((item,i) => {
				// console.log(i + ': '+ pro.Product_id + ' ' + item.Product_id)
				// console.log(pro.Name + ' ' + Products[index].Name)
				// console.log(JSON.parse(Products[index].Size)[colorselected][sizeselected], item.size)
				// console.log(JSON.parse(Products[index].Color)[colorselected], item.color)
				if(pro.Product_id === item.Product_id && 
					pro.Name === Products[index].Name &&
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
					Product_id: props.id,
					title: props.name,
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
					Product_id: props.id,
					title: props.name,
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
			// console.log(qty, qtyleft)
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

	// console.log(basket)

	function colorbtn(u,j) {
		setcolorsel(u)
		for(let i=0; i<JSON.parse(Products[index].Color).length; i++) {
			if(i === u) {
				document.getElementsByClassName('col'+j+''+i)[0].style.border = '1px solid black'
			} else {
				document.getElementsByClassName('col'+j+''+i)[0].style.border = '1px solid rgba(0,0,0,0.5)'
			}
		}
	}

	function sizebtn(u,j,q) {
		setsizesel(j)
		for(let i=0; i<JSON.parse(Products[index].Size)[u].length-1; i++) {
			if(i === j) {
				document.getElementsByClassName('size'+q+''+i)[0].style.border = '1px solid black'
			} else {
				document.getElementsByClassName('size'+q+''+i)[0].style.border = '1px solid rgba(0,0,0,0.5)'
			}
		}
	}

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
							// console.log(JSON.parse(Products[index].Color)[colorselected], basket[v].color, 
							// 	JSON.parse(Products[index].Size)[colorselected][sizeselected], basket[v].size,
							// 	qty, basket[v].Stock)
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

	return(
		<div className="container-blue">
			<div className="img_content">
				<Link to={"/detail/"+index} style={{display: 'flex', alignItems: 'center'}}>				
					<div className="img-cont">
						<img src={'http://localhost:5000/'+JSON.parse(Products[index].Image)[colorselected][0]} alt="Apple" className="img-fruit" />
					</div>
				</Link>
				<div className="hovercontent">
					<div className="color">
						<h5>Color</h5>
						<div>
							{
								Products?.map((product,i) =>
									index === i
									? JSON.parse(product.Color)?.map((col, u) => 
										u === 0
										? <button className={`btn-color col${i}${u}`} style={{backgroundColor: 'white', border: '1px solid black'}} onClick={() => colorbtn(u,i)} key={u}>{col[0]}</button>
										: <button className={`btn-color col${i}${u}`} style={{backgroundColor: 'white'}} onClick={() => colorbtn(u,i)} key={u}>{col[0]}</button>
									)
									: null
								)
							}
						</div>
						<h5>Size</h5>
						<div>
							{
								Products?.map((product,i) =>
									index === i
									? JSON.parse(product.Size)?.map((pro, u) =>
										colorselected === u
										? pro?.map((p,j) => 
											j < pro.length - 1
											? j === sizeselected
												? <button className={`btn-color size${i}${j}`} style={{border: '1px solid black'}} onClick={() => sizebtn(u,j,i)} key={j} 
													disabled={JSON.parse(product.Stock)[u][j] === 0 ? true : false}>
														{
															p.split('').map(r => 
																r === r.toUpperCase()
																? r
																: null
															)
														}
													</button>
												: <button className={`btn-color size${i}${j}`} onClick={() => sizebtn(u,j,i)} key={j} 
													disabled={JSON.parse(product.Stock)[u][j] === 0 ? true : false}>
														{
															p.split('').map(r => 
																r === r.toUpperCase()
																? r
																: null
															)
														}
													</button>
											: null
										)
										: null
									)
									: null
								)
							}
						</div>
						<h5>Quantity</h5>
						<div>
							{
								Products?.map((product,i) =>
									index === i
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
					</div>
				</div>
			</div>
			<h3 className='title'>{props.name}</h3>
			<p className="category">
				{props.category}
			</p>
			<div className="properties">
				{/* <div className="quantity">
					<h4>Quantity</h4>
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<FaMinus className="min-plus" onClick={() => quantity()}/>
						<span className="number">{qty} Kg</span>
						<FaPlus className="min-plus" onClick={() => quantity('add')}/>
					</div>
				</div> */}
				<div className="price">
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<FaDollarSign/>
						<span className="price-icon">
							<span className="amount">{JSON.parse(Products[index].Price)[colorselected][sizeselected]}</span>
						</span>
						{
							Products?.map((product,i) =>
								index === i
								? JSON.parse(product.Size)?.map((pro, u) =>
									colorselected === u
									? pro?.map((p,j) => 
										j === sizeselected
										? JSON.parse(product.Stock)[u][j] === 0
											? <span key={j}><span style={{margin: '0px 10px'}}>&bull;</span>, <span style={{color: '#dc3545', fontWeight: '500'}}>Out of Stock</span></span>
											: null
										: null
									)
									: null
								)
								: null
							)
						}
						
						
					</div>
				</div>
			</div>
			<div className="btn-cont">
				{
					Products?.map((product,i) =>
						index === i
						? JSON.parse(product.Size)?.map((pro, u) =>
							colorselected === u
							? pro?.map((p,j) => 
								j === sizeselected
								? <button className="btn-cart" type="button" onClick={addToBasket} disabled={JSON.parse(product.Stock)[u][j] <= qty ? JSON.parse(product.Stock)[u][j] === 0 ? true : false : qty === 0 ? true : false} key={j}>Add to cart</button>
								: null
							)
							: null
						)
						: null
					)
				}
				{/* <button className="btn-cart" type="button" onClick={addToBasket}>Add to cart</button> */}
			</div>
		</div>
	)
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);