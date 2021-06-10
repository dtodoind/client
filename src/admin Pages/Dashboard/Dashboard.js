import React from "react";

import { AiFillDashboard } from "react-icons/ai";
import { MDBRow, MDBCol } from "mdbreact";
import GraphicSale from "./../../admin component/GraphicSale/GraphicSale";
import GraphicPayment from "./../../admin component/GraphicPayment/GraphicPayment";
import Activities from "./../../admin component/Activities/Activities";
import LastReviews from "./../../admin component/LastReviews/LastReviews";
import TopSale from "./../../admin component/TopSale/TopSale";
import { connect } from 'react-redux'
import "./Dashboard.scss";

function Dashboard(props) {

	const { PendingD, ShippingD, DeliveryD, PickupD, Orders } = props

	return (
		<div className="dashboard">
			<div className="tag">
				<div className="dash_icon">
					<AiFillDashboard />
				</div>
				<p style={{ fontSize: "18px", margin: "0", fontWeight: "400" }}>
					Dashboard
				</p>
			</div>

			<div>
				<div className="container-dashboard">
					<MDBRow>
						<MDBCol md="9">
							<MDBRow>
								<MDBCol md='5' className="my-3 content_dashboard">
									<GraphicSale number={Orders.length} Doughnut_data={[PendingD, ShippingD, DeliveryD, PickupD]} />
								</MDBCol>
								<MDBCol  md='7' className="my-3 content_dashboard">
									<GraphicPayment />
								</MDBCol>
							</MDBRow>
							<MDBRow>
								<MDBCol  md='5' className="my-3">
									<LastReviews />
								</MDBCol>
								<MDBCol  md='7' className="my-3">
									<TopSale />
								</MDBCol>
							</MDBRow>
						</MDBCol>
						<MDBCol md="3" className="my-3">
							<Activities />
						</MDBCol>
					</MDBRow>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        PendingD: state.PendingD,
        ShippingD: state.ShippingD,
        DeliveryD: state.DeliveryD,
		PickupD: state.PickupD,
		Orders: state.Orders
    }
}

export default connect(mapStateToProps)(Dashboard);
