import React, { useEffect } from "react";
import "./Account.scss";
import Profile from "../../component/ProfileTab/Profile";
import AccountOrders from './Orders'
import { useParams } from "react-router";
import { connect } from 'react-redux'

function Account(props) {

	const { settinguser, user } = props
	var tabs = useParams()

	useEffect(() => {
		settinguser(JSON.parse(localStorage.getItem("SingleUser")))
	}, [settinguser])

	const taburl = (val) => {
		window.history.pushState(val, val, `/account/${val}`)
	}

	if(user.length !== 0) {
		return (
			<div className="account">
				<div className="menu">
					<header>
						<div className="img_outside">
							<img src={user[0].Image} alt="img" className="img_inside" />
						</div>
						 <p style={{color: 'white'}}>{user[0].Username}</p>
					</header>
					<div className="container-fluid mt-5">
						<div className="row" style={{color: 'white'}}>
							<div className="col-4 py-3 py-3 d-flex align-items-center col-color" style={{fontWeight: '400'}}>
								Full Name
							</div>
							<div className="col-8 py-3 py-3 d-flex align-items-center col-color">
								<p className="m-0">{user[0].FirstName} {user[0].LastName}</p>
							</div>
							<div className="col-4 py-3 d-flex align-items-center" style={{fontWeight: '400'}}>
								Email
							</div>
							<div className="col-8 py-3 d-flex align-items-center">
								<p className="m-0">{user[0].Email}</p>
							</div>
							<div className="col-4 py-3 d-flex align-items-center col-color" style={{fontWeight: '400'}}>
								Celular
							</div>
							<div className="col-8 py-3 d-flex align-items-center col-color">
								<p className="m-0">{user[0].Phoneno}</p>
							</div>
							<div className="col-4 py-3 d-flex align-items-center" style={{fontWeight: '400'}}>
								Género
							</div>
							<div className="col-8 py-3 d-flex align-items-center">
								<p className="m-0">{user[0].Gender}</p>
							</div>
							<div className="col-4 py-3 d-flex align-items-center col-color" style={{fontWeight: '400'}}>
								Dirección
							</div>
							<div className="col-8 py-3 col-color">
								{JSON.parse(user[0].Address)[0].map((a, i) => <p key={i} style={{margin: '0'}}>{a}<br /></p>)}
							</div>
						</div>
					</div>
				</div>
				<div className="tab-menuu">
					<div className="tab-menu-nav" id="account">
						<ul className="nav nav-pills tab-edit" role="tablist">
							<li className="nav-item">
								<a className={`nav-link ${tabs.tabs === 'profile' ? 'active' : null}`} data-toggle="pill" href="#profile" onClick={() => taburl('profile')}>
									Profile
								</a>
							</li>
							<li className="nav-item">
								<a className={`nav-link ${tabs.tabs === 'Order' ? 'active' : null}`} data-toggle="pill" href="#Orders" onClick={() => taburl('Order')}>
									Orders
								</a>
							</li>
						</ul>
	
						<div className="tab-content">
							<div id="profile" className={`container-fluid tab-pane ${tabs.tabs === 'profile' ? 'active' : 'fade'}`}>
								<br />
								<Profile savedUser={user[0]} />
							</div>
							<div id="Orders" className={`container-fluid tab-pane  ${tabs.tabs === 'Order' ? 'active' : 'fade'}`}>
								<br />
								<AccountOrders/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return null
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		SingleUser: state.SingleUser
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		settinguser: (val) => {
			dispatch({
				type: "SET_USER",
				item: val,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
