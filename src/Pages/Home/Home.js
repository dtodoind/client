import React from 'react'

import ProductSlider from '../../component/Product Slider/ProductSlider'
import Hero from '../../component/Hero/Hero'
import Services from '../../component/Services/Services'
import Banner from '../../component/Banner/Banner'

import './Home.scss'
import { connect } from 'react-redux'
// import { BsPersonPlusFill } from 'react-icons/bs'

function Home(props) {

    return (
        <div className="home">
            <Hero />
            <Services />
            <Banner />
            <div className="featured_product">
                <div className="content">
                    <h6>Featured Products</h6>
                    <h1>Shop Now</h1>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
                </div>
                <ProductSlider />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps)(Home)
