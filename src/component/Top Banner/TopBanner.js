import React, { useEffect } from 'react'

import './TopBanner.scss'
import { connect } from 'react-redux'
import axios from 'axios'

function TopBanner({ img, name, ...props}) {

    const { topimg } = props
    
    useEffect(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/topimages/all').then(res => topimg(res.data))
    }, [topimg])

    return (
        <div className="top_banner">
            <img src={props.Single !== null && props.Single.length !== 0 ? props.Single[0].Image: null} alt="category" className="banner_img" />
            <div className="banner_text">
                <h2>{name}</h2>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Single: state.Single
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        topimg: (val) => { 
            dispatch({
                type: 'TOPIMG',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBanner)