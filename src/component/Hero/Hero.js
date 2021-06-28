import React, { useEffect } from 'react'

import './Hero.scss'
import Logo from '../../assets/New_logo_edit.png'

import { Carousel } from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'

function Hero(props) {

    const { Hero_img, heroimg } = props

    useEffect(() => {
        axios.get('http://localhost:5000/heroimages/all').then(res => heroimg(res.data))
    }, [heroimg])

    return (
        <div className="hero">

            <div className="hero-images">
                <Carousel controls={false} fade={true} slide={false} indicators={false} style={{height: "100%"}}>
                    {
                        Hero_img?.map(hero => 
                            <Carousel.Item style={{height: "100%"}} animation="false" key={hero.HeroImages_id}>
                                <img
                                    className="hero-img"
                                    src={'http://localhost:5000/'+hero.Image}
                                    alt={hero.HeroImages_id+"slide"}
                                />
                            </Carousel.Item>
                        )
                    }
                    {/* <Carousel.Item style={{height: "100%"}} animation="false">
                        <img
                            className="hero-img"
                            src={hero1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item style={{height: "100%"}} animation="false">
                        <img
                            className="hero-img"
                            src={hero2}
                            alt="Third slide"
                        />
                    </Carousel.Item> */}
                </Carousel>
            </div>
            <div className="hero-text">
                <div className='arrange'>
                    <img src={Logo} alt="logo" className="logo" />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Hero_img: state.Hero_img,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        heroimg: (val) => { 
            dispatch({
                type: 'HEROIMG',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hero)
