import React, { useEffect } from 'react'

import './Banner.scss'
import { connect } from 'react-redux'
import axios from 'axios'

function Banner(props) {

    const { Offer, offer } = props

    useEffect(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/offer/all').then(res => offer(res.data))
    }, [offer])

    if(Offer.length === 0 || Offer[0]?.Price === 0) {
        return null
    } else {
        return (
            <div className="banner">
                <img src={Offer[0]?.Offer_Image} alt="banner" className="banner_img" />
                <div className="offer_badge">
                    <p className="offer">Offer</p>
                </div>
                <div className="offer_content">
                    <div className="content_text">
                        <h2>{Offer[0]?.Discount}% Off</h2>
                        <p>{Offer[0]?.Description} ${Offer[0]?.Price}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Offer: state.Offer
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        offer: (val) => { 
            dispatch({
                type: 'OFFERS',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
