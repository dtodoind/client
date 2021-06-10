import React from "react";
import "./Myaccount.scss";
import ProfileCard from './../../component/ProfileCard/ProfileCard'

import AccountOrders from './Orders'

function Myaccount() {

	return (
		<div className="Myaccount" id="account">
			<ul className="nav nav-pills tab-edit" role="tablist">
				<li className="nav-item">
					<a className="nav-link active" data-toggle="pill" href="#all">
						Profile
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" data-toggle="pill" href="#vegetables">
						Orders
					</a>
				</li>
			</ul>
			
			<div className="tab-content">
				<div id="all" className="container-fluid tab-pane active"><br/>
						<ProfileCard/>
				</div>
				<div id="vegetables" className="container-fluid tab-pane fade"><br/>
						<AccountOrders/>
				</div>			
			</div>
		</div>
	);
}
export default Myaccount;
