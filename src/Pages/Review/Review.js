import React, { useEffect, useState, useCallback } from 'react'

import TopBanner from '../../component/Top Banner/TopBanner'
import ReviewInput from '../../component/Review/ReviewInput'
import ReviewDisplay from '../../component/Review/ReviewDisplay'

import './Review.scss'
import categoryimg from '../../assets/banner-girls.png'
import female from '../../assets/female.svg'
// import male from '../../assets/profile_pic.svg'
// import { useStateValue } from '../../Redux/StateProvider'
import axios from 'axios'
import { connect } from 'react-redux'

function Review(props) {

    const reviews = props.reviews
    const [reviewcount, setReviewCount] = useState(0)
    const [reviewload, setReviewload] = useState(5)
    const [review, setReview] = useState([])
    const [loading, setLoading] = useState(true)

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(scrollHeight - scrollTop === clientHeight) {
            setReviewload(reviewload + 5)
        }
    }

    const loadReview = useCallback(async () => {
        setLoading(true)
        const load = []
        reviews.map((rev, i) => {
            if(i < reviewload) {
                load.push(rev)
            }
            return 0;
        })
        setReview(load)
        setLoading(false)
    }, [reviews, reviewload])

    const { insertReviewAll } = props
    useEffect(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/review/all').then(res => {
            if(reviews.length === 0) {
                insertReviewAll(res.data)
                setReviewCount(reviews.length)
            } else {
                if(reviews.length !== reviewcount) {
                    insertReviewAll(res.data)
                    setReviewCount(reviews.length)
                }
            }
        })
        loadReview()
    }, [reviews.length, insertReviewAll, loadReview, reviewcount])

    return (
        <div className="review">
            <TopBanner img={categoryimg} name=" CLIENTES" />
            <div className="container-fluid adj">
                <div className="container inner_contain">
                    <div className="container">
                        <ReviewInput />
                    </div>
                    <div className="container" style={{overflowY: 'scroll', height: '500px'}} onScroll={handleScroll}>
                        {
                            review?.map(review =>
                                <ReviewDisplay 
                                    key={review.Review_id} 
                                    name={review.Username} 
                                    profile={review.User === null ? female : review.User.Image }
                                    date={review.createdAt.substr(0,10)} 
                                    des={review.Message} />
                            )
                        }
                        {
                            loading && <div style={{textAlign: 'center'}}>Loading...</div>
                        }
                        {/* <ReviewDisplay name="Ayelen" profile={female} date="16 Dec 2020" />
                        <ReviewDisplay name="Bhavesh" profile={male} date="17 Dec 2020" /> */}
                    </div>
                </div>
            </div>
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Review)
