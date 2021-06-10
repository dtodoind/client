import React from 'react'
import { connect } from 'react-redux'

import './ReviewDisplay.scss'

function ReviewDisplay({ name, profile, date, des, ...props }) {
    
    return (
        <div className="review_display">
            <div className="top_part">
                <div>
                    <div className="protop">
                        {/* {console.log(profile)} */}
                        <img src={profile} alt="profile" className="profile_pic" />
                    </div>
                </div>
                <div className="details">
                    <p className="name">{name}</p>
                    <p className="date">{date}</p>
                </div>
            </div>
            <div className="bottom_part">
                <div className="message">
                    {des}
                    {/* <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Scripta periculis 
                        ei eam, te pro movet reformidans. Vivendum intellegat et qui, ei denique consequuntur vix.
                    </p> */}
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

export default connect(mapStateToProps)(ReviewDisplay)
