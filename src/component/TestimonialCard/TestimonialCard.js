import React from 'react'
import './TestimonialCard.scss'
import {IoMdQuote} from 'react-icons/io'
function TestimonialCard(){
    return (
        <div className='r-card'>
            <div className="r-box">
                <div className="r-content">
                    <p><IoMdQuote className="r-imgq"/></p>
                    <p>Calvin: Sometimes when I'm talking with others, my words can't keep up with my thoughts. I wonder why we think faster than we speak. Hobbes: Probably so we can think twice because all stay beautiful in this word . and the christmas come in america jojoj</p>
                    <div className="r-author">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample29.jpg" alt="avatar" className='r-user'/>
                        <h3>Jhon doe</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TestimonialCard;