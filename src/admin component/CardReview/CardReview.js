import React from "react";
import "./CardReview.scss";
import { AiOutlineMail } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { connect } from 'react-redux'
import axios from "axios";

function CardReview({review, index, ...props}) {
	
	const remove_review = async () => {
		// var rev = Review
		// rev.splice(index, 1)
		// props.editReview(rev)
		// console.log(rev)
		await axios.delete(`http://localhost:5000/review/delete/${index}`)
		await axios.get('http://localhost:5000/review/all').then(res => props.editReview(res.data))
		// console.log(props.reviews)
	}

	return (
		<div className="rev">
			<div className="card-review">
				<div className="card-container">
					<div className="container-fluid">
						<div className="row mt-3">
							<div className="col d-flex align-items-center justify-content-start img_style">
								<div className="img_review">
									{
										review.User === null
										? <img 
											src="https://i.pinimg.com/originals/19/87/90/198790eb7e08830027c1ae1686496c72.png"
											className="img-admin-review"
											alt="profile"
										/>
										: <img
											src={review.User.Image}
											className="img-admin-review"
											alt="profile"
										/>
									}
								</div>
							</div>
							<div className="col p-0">
								<div className="card-body">
									<div className="card-header-review">
										<p className='card-title m-0'>{review.Username}</p>
										{
											review.User === null
											? <p style={{fontSize: '14px'}}>Guest</p>
											: <p style={{fontSize: '14px'}}>{review.User.FirstName} {review.User.LastName}</p>
										}
									</div>
									<div className="icons-header">
										<MdDelete className="icon-delete" onClick={remove_review} />
									</div>
								</div>
							</div>
						</div>
						<div className="card-text-body m-3 text-justify">
							<p className="m-0">
								"{review.Message}"
							</p>
						</div>
					</div>
				</div>

				<div className="social-links">
					<div className="d-flex align-items-center">
						<AiOutlineMail className="icon-email mx-2"/>
						{
							review.User === null
							? <p className="social-email">Guest</p>
							: <p className="social-email">{review.User.Email}</p>
						}
					</div>
					<div className="d-flex align-items-center text-right p-0 mr-2">
						<p className="m-0 rev_date">{review.createdAt.substring(0,10)}</p>
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
        editReview: (val) => { 
            dispatch({
                type: 'REVIEWS',
                item: val
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardReview);
