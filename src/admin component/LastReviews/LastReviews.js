import React from "react";

import "./LastReviews.scss";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from 'react-redux'

function LastReviews(props) {

	const { Reviews } = props

	return (
		<div className="lastreviews-container">
			<div className="review-header">
				<p>Latest Ratings & Reviews</p>
			</div>
			<Scrollbars style={{ width: "100%", height: "300px" }}>
				{
					Reviews?.map((review,i) => 
						i < 3
						? <div className="reviews-items" key={i}>
							<div className="r-img-item">
								<p style={{marginRight: '5px'}}>{i+1}. </p> <p className="r-name">{review.Username}</p>
								{/* <img src={data.img} alt="profile" /> */}
							</div>
							<p style={{marginTop: '5px'}}>{review.Message}</p>
						</div>
						: null
					)
				}
			</Scrollbars>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
		Reviews: state.reviews
    }
}

export default connect(mapStateToProps)(LastReviews);
