import React, {useEffect, useRef, useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import "./Navigation.scss";
import Searchbar from './Searchbar'
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { ImCross, ImHome, ImProfile } from "react-icons/im";
import { CgMenuGridO } from "react-icons/cg"
import { BsFillPeopleFill } from 'react-icons/bs'
// import { AiFillContacts } from 'react-icons/ai'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import { FaMinus, FaPlus, FaDollarSign, FaShoppingBag } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai'
import { MdRateReview } from 'react-icons/md'
import io from 'socket.io-client'
import axios from 'axios';
import { connect } from 'react-redux'

const socket = io('https://dtodo-indumentaria-server.herokuapp.com')

function Navigation(props) {

	const { insertProductAll, category } = props
	const [scrollPos, setScrollPos] = useState(0)
	const prevScroll = useRef()

    useEffect(() => {
		axios.get('https://dtodo-indumentaria-server.herokuapp.com/product/all').then(res => insertProductAll(res.data))
		axios.get('https://dtodo-indumentaria-server.herokuapp.com/category/all').then(res => category(res.data))
	}, [insertProductAll, category])
	
	window.addEventListener('resize', () => {
		var loc = window.location.pathname
		if(loc !== '/loginregister') {
			if(window.innerWidth <= 900) {
				document.getElementsByClassName('nav-items')[0].style.left = '-450px'
				document.getElementsByClassName('navbar-in')[0].style.backgroundColor = 'transparent'
				document.getElementsByClassName('navbar-in')[0].style.pointerEvents = 'none'
			} else {
				document.getElementsByClassName('navbar-in')[0].style.pointerEvents = 'inherit'
			}
		}
	})

	window.addEventListener('scroll', () => {
		if(window.innerWidth <= 900) {
			// console.log(document.getElementById('root').scrollTop)
			prevScroll.current = scrollPos
			setScrollPos(document.body.getBoundingClientRect().top)
			if(document.body.getBoundingClientRect().top > prevScroll.current) {
				document.getElementsByClassName("navigation")[0].style.top = '0px'
			} else {
				document.getElementsByClassName("navigation")[0].style.top = '-90px'
			}
		}
	})

	function sidebar(open) {
		if(window.innerWidth <= 900) {
			if(open) {
				document.getElementsByClassName('navbar-in')[0].style.backgroundColor = 'rgba(0,0,0,0.2)'
				document.getElementsByClassName('navbar-in')[0].style.pointerEvents = 'inherit'
				document.getElementsByClassName('nav-items')[0].style.left = '0'
			} else {
				document.getElementsByClassName('navbar-in')[0].style.backgroundColor = 'transparent'
				document.getElementsByClassName('navbar-in')[0].style.pointerEvents = 'none'
				document.getElementsByClassName('nav-items')[0].style.left = '-450px'
			}
		}
	}

	function searchchange(val) {
		var act = document.getElementsByClassName('nav-links')
		for(var i = 0; i < act.length; i++) {
			if(act[i].classList.contains("active")) {
				act[i].classList.remove("active")
				act[i].classList.add("hover")
			}
		}
		act[val].classList.remove('hover')
		act[val].classList.add('active')
		if(window.innerWidth <= 900) {
			document.getElementsByClassName('nav-items')[0].style.left = '-450px'
			document.getElementsByClassName('navbar-in')[0].style.backgroundColor = 'transparent'
			document.getElementsByClassName('navbar-in')[0].style.pointerEvents = 'none'
		} else {
			document.getElementsByClassName('navbar-in')[0].style.pointerEvents = 'inherit'
		}
	}
	
	var nav = ['/', '/category', '/review', '/aboutus', '/loginregister', '/search']
	var location = useLocation().pathname
	window.onload = function() {
		var act = document.getElementsByClassName('nav-links')
		nav.map((n,i) => {
			if(location === n) {
				act[i].classList.remove('hover')
				act[i].classList.add('active')
			}
			return 0;
		})
	}

	// localStorage.setItem('SingleUser', JSON.stringify([{
	// 	Address: "[\"Near KRC\",\"Subhashnagar\",\"Porbandar\"]",
	// 	Email: "sbhavesh760@gmail.com",
	// 	FirstName: "Chetan",
	// 	Gender: "Male",
	// 	Image: "https://dtodo-indumentaria-server.herokuapp.com/57c4a76e1040e_thumb900.jpg",
	// 	LastName: "Solanki",
	// 	Password: "$2b$10$mY7S12RbTCbOSYbTPC7cJu2f3q2m538snzF7ThJ0oQbfp3WM9pI..",
	// 	Phoneno: "9909027254",
	// 	Status: "Inactive",
	// 	Username: "chetan007",
	// 	Users_id: 3,
	// 	confirmationCode: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InNiaGF2ZXNoNzYwQGdtYWlsLmNvbSIsImlhdCI6MTYyMDEwMzMyM30.z4ZvA59aUzOFeKY3yFKTFECMSvOkFOM6VnR7xRvDMyw",
	// 	createdAt: "2021-05-04T04:42:03.000Z",
	// 	updatedAt: "2021-05-25T02:34:20.000Z"
	// }]))
	// console.log(localStorage)
	
	// localStorage.removeItem('SingleUser')
	
	const basket = props.basket;

	const Sing = JSON.parse(localStorage.getItem('SingleUser'))
	var qty = basket?.length
	var subtotal = 0
	basket.map(item => subtotal = subtotal + item.totalprice);

	return (
		<div className="navigationshow">
			<div className="container-fluid navigation d-flex">
				<div className="nav">
					<div className="d-flex justify-content-between align-items-center nav-side-display side-display">
						<button className="p-1 border-0 bg-transparent text-light side-display" onClick={() => sidebar(true)}>
							<FiMenu fontSize="25px" />
						</button>
						<div className="nav-logo"><Link to="/" className='manjares' onClick={() => searchchange(0)}> DTODO </Link>INDUMENTARIA</div>
						<div className="adj_cart">
							<Link to="/shopcart" style={{display: 'flex', alignItems: 'center'}}>
								<FaShoppingCart className='side-display'/>
								<div><p className="qty side-display">{qty}</p></div>
							</Link>
						</div>
					</div>

					<Searchbar/>

					<div className="navbar-in" onClick={() => sidebar(false)}>
						<ul className='nav-items m-0 p-0 h-100'>
							<li className="d-flex justify-content-end mx-2 my-2 side-display">
								<button className="p-1 border-0 bg-transparent text-light side-display" onClick={() => sidebar(false)}>
									<ImCross />
								</button>
							</li>
							<li className="nav-links hover">
								<Link to="/" className="links" onClick={() => searchchange(0)}>
									<ImHome className="side-display" style={{fontSize: '20px', marginRight: '20px'}} />Home
								</Link>
							</li>
							<li className="nav-links hover">
								<Link to="/category" className="links" onClick={() => searchchange(1)}>
									<CgMenuGridO className="side-display" style={{fontSize: '20px', marginRight: '20px'}} />
									Category
								</Link>
							</li>
							<li className="nav-links hover">
								<Link to="/review" className="links" onClick={() => searchchange(2)}>
									<MdRateReview className="side-display" style={{fontSize: '20px', marginRight: '20px'}} />
									Review
								</Link>
							</li>
							<li className="nav-links hover">
								<Link to="/aboutus" className="links" onClick={() => searchchange(3)}>
									<BsFillPeopleFill className="side-display" style={{fontSize: '20px', marginRight: '20px'}} />
									About Us
								</Link>
							</li>
							<hr className="linesidebar" />
								{
									Sing !== null
									? <>
										<li className="nav-links hover hide">
											<Link to="/account/profile" 
												className="links" 
												onMouseOver={() => {
													if(window.innerWidth <= 600) {
														document.getElementsByClassName('accountdetails')[0].style.display = 'none'
													} else {
														document.getElementsByClassName('accountdetails')[0].style.display = 'inherit'
													}
												}}
												onMouseOut={() => document.getElementsByClassName('accountdetails')[0].style.display = 'none'}
												id="account" 
												onClick={() => searchchange(4)}>
													<BiLogIn className="side-display" style={{fontSize: '20px', marginRight: '20px'}} />
													<div className="img_display">
														<img src={Sing[0].Image} alt="" className="account_img" />
													</div>
											</Link>
										</li>
										<li className="nav-links hover sideview">
											<Link to="/account/profile" className="links" onClick={() => searchchange(5)}>
												<ImProfile className="side-display" style={{fontSize: '20px', marginRight: '20px'}} />
												Profile
											</Link>
										</li>
										<li className="nav-links hover sideview">
											<Link to="/account/Order" className="links" onClick={() => searchchange(6)}>
												<FaShoppingBag className="side-display" style={{fontSize: '20px', marginRight: '20px'}} />
												Order
											</Link>
										</li>
										<hr className="linesidebar" />
										<li className="nav-links hover sideview">
											<button className="logout_btn links" onClick={async() => {
													var result = JSON.parse(localStorage.getItem("SingleUser"))
													var db_val = {
														Users_id: result[0].Users_id,
														Status: 'Inactive'
													}
													await axios.put(`https://dtodo-indumentaria-server.herokuapp.com/users/status`, db_val, {
														headers: {
															'x-auth-token': localStorage.getItem('token')
														}
													}).then(res => {
														if(res.data === 'success') {
															socket.emit("toast", {
																cat: "Status",
															});
															var url = window.location.href.split('/')
															if(url[url.length - 1] === 'profile' || url[url.length - 1] === 'Order') {
																window.location.href = '/'
															}
														}
													})
													props.loginchange('true')
												}}>
													<BiLogOut className="side-display" style={{fontSize: '20px', marginRight: '20px'}} />
													Logout
											</button>
										</li>
									</>
									: <li className="nav-links hover">
										<Link to="/loginregister" className="links" onClick={() => searchchange(4)}>
											<BiLogIn className="side-display" style={{fontSize: '20px', marginRight: '20px'}} />
											Login
										</Link>
									</li>
								}
						</ul>
						<div className="accountdetails p-2"
							onMouseOver={() => document.getElementsByClassName('accountdetails')[0].style.display = 'inherit'}
							onMouseOut={() => document.getElementsByClassName('accountdetails')[0].style.display = 'none'} 
						>
							<div className="point"></div>
							<div className="accountdropdown w-100">
								<div className="btn_all">
									<Link to="/account/profile" className="btn_pro">Profile</Link>
								</div>
								<div className="btn_all">
									<Link to="/account/Order" className="btn_pro">Order</Link>
								</div>
								<button className="logout_btn" onClick={async() => {
									var result = JSON.parse(localStorage.getItem("SingleUser"))
									var db_val = {
										Users_id: result[0].Users_id,
										Status: 'Inactive'
									}
									await axios.put(`https://dtodo-indumentaria-server.herokuapp.com/users/status`, db_val, {
										headers: {
											'x-auth-token': localStorage.getItem('token')
										}
									}).then(res => {
										if(res.data === 'success') {
											socket.emit("toast", {
												cat: "Status",
											});
											var url = window.location.href.split('/')
											if(url[url.length - 1] === 'profile' || url[url.length - 1] === 'Order') {
												window.location.href = '/'
											}
										}
									})
									props.loginchange('true')
								}}>Logout</button>
							</div>
						</div>
						<div className="shoping_cart h-100 d-flex align-items-center side-display-none">
							<div className="shop_cart side-display-none">
								<Link to="/shopcart">
									<FaShoppingCart className="nav-cart side-display-none"/>
									<div><p className="qty side-display-none">{qty}</p></div>
								</Link>
							</div>
							<div className="display_cart side-display-none">
								<div className="point side-display-none"></div>
								<div className="cart side-display-none">
									{/* <p className="cart_text">Cart</p> */}
									{/* <hr /> */}
									<div className="items side-display-none">
										{
											basket?.map((item,i) => 
											<div className="container-fluid my-2" key={i}>
													<div className="row">
														<div className="col-3 p-0 text-center">
															<div className="img-cart">
																<img src={'https://dtodo-indumentaria-server.herokuapp.com/'+item.img} alt="cart_prod" className="cart_prod" />
															</div>
														</div>
														<div className="col-6">
															<div className="names">
																{item.title}<br/>
																<FaDollarSign/>
																{item.totalprice} &middot; <small>{item.color}</small> &middot; <small>{item.size}</small>
															</div>
														</div>
														<div className="col-2 p-0 d-flex align-items-center justify-content-center">
															<div className="quantity">
																<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
																	<FaMinus className="min-plus" onClick={() => props.quantity('sub', item.qty, item.id, item.oneSt, i)}/>
																	<span className="number">{item.qty}</span>
																	<FaPlus className="min-plus" onClick={() => props.quantity('add', item.qty, item.id, item.oneSt)}/>
																</div>
															</div>
														</div>
														<div className="col-1 p-0 d-flex align-items-center justify-content-center">
															<AiFillDelete className="delete" onClick={() => props.del(item.id)} />
														</div>
													</div>
													<hr className="somecolor" />
												</div>
											)
										}
										
									</div>
									{/* <hr /> */}
									<p style={{margin: '0', fontWeight: '500'}}>SubTotal: ${subtotal}</p>
									<Link to="/shopcart" className=" btn view_button">View Cart</Link>
									<Link to="/checkout" className="btn checkout_button">Checkout</Link>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket,
		SingleUser: state.SingleUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        quantity: (val, q, id, st) => {
			localStorage.setItem('bas', 0)
			localStorage.setItem('ind', id)
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
		},
		loginchange: (val) => {
			dispatch({
				type: 'LOGGEDIN',
				item: val
			})
		},
		insertProductAll: (val) => {
            dispatch({
                type: 'PRODUCTS',
                item: val
            }) 
        },
		category: (val) => {
            dispatch({
                type: 'CATEGORYADD',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);