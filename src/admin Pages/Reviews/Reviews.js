import React, { useEffect, useState } from "react";

// import { MDBCol, MDBRow } from "mdbreact";
// import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { MdRateReview } from "react-icons/md";
// import { GoSearch } from "react-icons/go";
import Page from '../../admin component/OrderPaging/OrderPaging';
import CardReview from "./../../admin component/CardReview/CardReview";
// import { useStateValue } from '../../Redux/StateProvider'
import { connect } from 'react-redux'
import axios from 'axios'

import "./Reviews.scss";


function Reviews(props) {

	const { reviews, insertReviewAll } = props
	const [se, setse] = useState(false)
	const [cardview, setcardview] = useState([])
	const [search, setsearch] = useState('')
    const [lop, setlop] = useState(true)
	
	useEffect(() => {
		async function upda1() {
			await axios.get('http://localhost:5000/review/all').then(res => {
				if(reviews.length !== 0) {
					if(reviews[0].Review_id === res.data[0].Review_id ) {
						// console.log('its not change')
					} else {
						insertReviewAll(res.data)
					}
					setlop(true)
				} else {
					if(lop) {
						insertReviewAll(res.data)
						setlop(false)
					}
				}
			})
			var card = []
			if(reviews.length !== 0) {
				for(var b=0; b<reviews.length; b++) {
					if(se) {
						if(reviews[b].Username.toLowerCase().split(' ').join('').includes(search.toLowerCase().split(' ').join(''))) {
							card.push(<CardReview review={reviews[b]} index={reviews[b].Review_id} />)
						}
					} else {
						if(card.length === 0) {
							card = []
							for(var w=0; w<reviews.length; w++) {
								card.push(<CardReview review={reviews[w]} index={reviews[w].Review_id} />)
							}
						}
					}
				}
			}
			setcardview(card)
		}
		upda1()
	}, [reviews, search, se, insertReviewAll, lop])


	const onchange = (e) => {
		if(e.target.value.length > 0) {
			setse(true)
			setsearch(e.target.value)
		} else {
			setse(false)
		}
	}

	return (
		<div className="reviews">
			<div className="tag">
				<div className="dash_icon">
					<MdRateReview />
				</div>
				<p style={{ fontSize: "18px", margin: "0", fontWeight: "400" }}>
					Reviews
				</p>
			</div>

			<div className="review-container">
				<div className="review-square">
					<div className="header-review">
						<div className="searchbar-review">
							{/* <GoSearch className="icon-search" /> */}
							<Form.Control
								placeholder="User Name"
								className="searchbar-input"
								name='search'
								onChange={onchange}
							/>
						</div>
						<div>
							{/* <Pagination className="pagination-review">
								<Pagination.First />
								<Pagination.Prev />

								<Pagination.Item>{10}</Pagination.Item>
								<Pagination.Item >{11}</Pagination.Item>
								<Pagination.Item active>{12}</Pagination.Item>
								<Pagination.Item>{13}</Pagination.Item>

								<Pagination.Next />
								<Pagination.Last />
							</Pagination> */}
						</div>
					</div>
					<div>
						<Page todos={cardview} totalnumber={3} itemDisplay={4} />
						{/* <MDBRow className="row-review">
							{
								reviews.length === 0
								? null
								: se
									? reviews.map((r,i) =>
										<MDBCol md="6" className="col-review" key={i}>
											<CardReview review={r} index={i} />
										</MDBCol>
									)
									: search.length === 0
										? <MDBCol md="6" className="col-review">
											<div>No Search Result</div>
										</MDBCol>
										: search.map((s,i) => 
											<MDBCol md="6" className="col-review" key={i}>
												<CardReview review={s} index={i} />
											</MDBCol>
										)
							}
						</MDBRow> */}
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviews
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        insertReviewAll: (val) => { 
            dispatch({
                type: 'REVIEWS',
                item: val
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
