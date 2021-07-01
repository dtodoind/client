import React, { useEffect } from 'react';
import {FaInstagram, FaFacebook, FaPhoneAlt} from 'react-icons/fa';
import {MdLocationOn} from "react-icons/md"
import { Link } from 'react-router-dom'


import "./Footer.scss";

import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

function Footer(){

	useEffect(() => {
		var pad = document.getElementsByClassName('footer-container')[0].offsetHeight
		document.getElementsByClassName('App')[0].style.paddingBottom = (pad-20)+'px'
	})

	window.addEventListener('resize', () => {
		var loc = window.location.pathname
		if(loc !== '/loginregister') {
			var pad = document.getElementsByClassName('footer-container')[0].offsetHeight
			document.getElementsByClassName('App')[0].style.paddingBottom = (pad-20)+'px'
		}
	})
	
	return (
		
		<MDBFooter  className="font-small footer-container" >
			<MDBContainer fluid className="text-md-left">
				<MDBRow className='footer-row'>
					<MDBCol md="3" className="py-4">
						<h5 className="title">DTODO INDUMENTARIA</h5>
						{/* <p style={{width:'258px'}}>
							Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
						</p> */}

						<a href='https://www.instagram.com/dtodoind/'><FaInstagram  className='footer-icon'/></a>
						<a href='https://www.facebook.com/dtodoind'><FaFacebook className='footer-icon'/></a>
			
					</MDBCol>
					<MDBCol md="3" className="py-4">
						<h5 className="title">Menu</h5>
						<ul>
							<li className="list-unstyled">
								<Link to='/'>
									{/* Home */}
									Inicio
								</Link>
							</li>
							<li className="list-unstyled">
								<Link to="/category">Category</Link>
							</li>
							<li className="list-unstyled">
								<Link to="/aboutus">About us</Link>
							</li>
							<li className="list-unstyled">
								<Link to="/review">Review</Link>
							</li>
							<li className="list-unstyled">
								<Link to="/loginregister">Login</Link>
							</li>
						</ul>
					</MDBCol>
					<MDBCol md="3" className="py-4">
						<h5 className="title">Help</h5>
						<ul>
							<li className="list-unstyled">
								<Link to="/shipping">
									Shipping Information
								</Link>
							</li>
							<li className="list-unstyled">
							<Link to="/exchange">
								Returns & Exchange
								</Link>
							</li>
							<li className="list-unstyled">
								Privacy Policy
							</li>
						</ul>
					</MDBCol>
					<MDBCol md="3" className="py-4">
						<h5 className="title">Have a Questions?</h5>
						<ul>
							<li className="list-unstyled" style={{width:'270px'}}>
								<MdLocationOn/>
								<a href="#!">Zufriategui 830, local 26. Ituzaingo , Buenos Aires. Argentina.</a>
							</li>
							<li className="list-unstyled">
								<FaPhoneAlt/>
								<a href="#!">+54 115760-3236</a>
							</li>
						</ul>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
			<div className="footer-copyright text-center py-1">
				<MDBContainer fluid>
				Copyright &copy; {new Date().getFullYear()} All rights reserved | <a href={"#!"}>DTODO INDUMENTARIA </a>
				</MDBContainer>
			</div>
		</MDBFooter>



		
	)
}
export default Footer;
