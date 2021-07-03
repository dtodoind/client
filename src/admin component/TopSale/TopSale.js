import React from "react";
import "./TopSale.scss";
import { Scrollbars } from "react-custom-scrollbars";

import { connect } from 'react-redux'

function TopSale(props) {

	const { Products } = props

	window.addEventListener('resize', () => {
		if(window.innerWidth >= 768) {
			document.getElementsByClassName('scrollheiTop')[0].style.height = 'calc(100% - 55px)'
		} else {
			document.getElementsByClassName('scrollheiTop')[0].style.height = '400px'
		}
	})

	return (
		<div className="topsale-container">
			<div className="topsale-header">
				<p>Out of Stock Products</p>
			</div>
			<Scrollbars style={{ width: "100%", height: window.innerWidth >= 900 ? 'calc(100% - 40px)' : '400px'}} className="scrollheiTop">
				{
					Products?.map((data,i) => (
						JSON.parse(data.Stock)?.map((stock,j) => 
							stock?.map((s,k) => 
								s === 0
								?	<div className="topsale-item container-fluid" key={k}>
										<div className="row">	
											<div className="col-1 p-0">
												<div className="img_resize">
													<img src={'https://dtodo-indumentaria-server.herokuapp.com/'+JSON.parse(data.Image)[j][0]} alt="clothes" />
												</div>
											</div>
											<div className='col sale-col-one' size="6">
												<p className='sale-name m-0'>{data.Name}</p>
												<div className="d-flex align-items-center">
													<p className='sale-price m-0'>${JSON.parse(data.Price)[j][k]}</p>
													<span style={{fontSize: '25px', margin: '0px 5px'}}> &middot; </span>
													<span style={{fontSize: '12px'}}>{JSON.parse(data.Color)[j]}</span>
													<span style={{fontSize: '25px', margin: '0px 5px'}}> &middot; </span>
													<span style={{fontSize: '12px'}}>{JSON.parse(data.Size)[j][k]}</span>
												</div>
											</div>
											<div className='col-3 sale-col-two'>
												<div className='sale-stock'>
													<p className="m-0">Out of Stock</p>
												</div>
											</div>
										</div>
									</div>
								: null
							)
						)
					))
				}
			</Scrollbars>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
		Products: state.Products
    }
}

export default connect(mapStateToProps)(TopSale);
