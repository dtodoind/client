import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { connect } from 'react-redux'

import './ProductSlider.scss'

import ProductCard from  '../ProductCard/ProductCard'

function ProductSlider(props) {
    
	const { Products } = props

    var slidesToShow
    if(window.innerWidth <= 600) {
        slidesToShow = 1
    } else if(window.innerWidth <= 900) {
        slidesToShow = 2
    } else if(window.innerWidth <= 1200) {
        slidesToShow = 3
    } else if(window.innerWidth <= 1800) {
        slidesToShow = 4
    } else {
        slidesToShow = 5
    }
    const [settings, setSettings] = useState({
        infinite: false,
        speed: 200,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
        cssEase: 'linear'
    })

    window.onresize = function() {
        if(window.innerWidth <= 600) {
            slidesToShow = 1
        }  else if(window.innerWidth <= 900) {
            slidesToShow = 2
        } else if(window.innerWidth <= 1200) {
            slidesToShow = 3
        } else if(window.innerWidth <= 1800) {
            slidesToShow = 4
        } else {
            slidesToShow = 5
        }
        setSettings({
            infinite: false,
            speed: 500,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToShow,
            cssEase: 'linear'
        })
    }

    return (
		<div className="product_container">
            <Slider {...settings}>
                {
                    Products?.map((product,i) => 
                        <ProductCard 
                            id={product.Product_id} 
                            index={i}
                            key={i}
                            img={JSON.parse(product.Image)[i] !== undefined ? `http://localhost:5000/${JSON.parse(product.Image)[i][0]}`: null} 
                            name={product.Name} 
                            category={product.Category.Name} 
                            price={JSON.parse(product.Price)[i] !== undefined ? JSON.parse(product.Price)[i][0]: null}
                            color={JSON.parse(product.Color)[i] !== undefined ? JSON.parse(product.Color)[i]: null}
                            size={JSON.parse(product.Size)[i] !== undefined ? JSON.parse(product.Size)[i][0]: null}
                        />
                    )
                }
                {/* <ProductCard id={0} img="https://m.media-amazon.com/images/I/71ApKNioIoL._AC_UL320_.jpg" name="Men's Cotton Collared Neck Cardigan" category="Teen" price={20}/>
                <ProductCard id={1} img="https://m.media-amazon.com/images/I/61ytUPjIG2L._AC_UL320_.jpg" name="Women's Cotton Dress Material" category="Women" price={35}/>
                <ProductCard id={2} img="https://m.media-amazon.com/images/I/61GYe5+nvhL._AC_UL320_.jpg" name="Women's Slim Fit Trouser" category="Women" price={15}/>
                <ProductCard id={3} img="https://m.media-amazon.com/images/I/71mc34pLRgL._AC_UL320_.jpg" name="Men's Regular Fit T-Shirt" category="Men" price={18}/>
                <ProductCard id={4} img="https://m.media-amazon.com/images/I/81FfzF0LWrL._AC_UL320_.jpg" name="Combo of Two Men's Regular Fit T-Shirt." category="Teen" price={10}/>
                <ProductCard id={5} img="https://m.media-amazon.com/images/I/61ytUPjIG2L._AC_UL320_.jpg" name="Women's Cotton Dress Material" category="Women" price={35}/>
                <ProductCard id={6} img="https://m.media-amazon.com/images/I/61GYe5+nvhL._AC_UL320_.jpg" name="Women's Slim Fit Trouser" category="Women" price={15}/>
                <ProductCard id={7} img="https://m.media-amazon.com/images/I/71mc34pLRgL._AC_UL320_.jpg" name="Men's Regular Fit T-Shirt" category="Men" price={18}/>
                <ProductCard id={8} img="https://m.media-amazon.com/images/I/81FfzF0LWrL._AC_UL320_.jpg" name="Combo of Two Men's Regular Fit T-Shirt." category="Teen" price={10}/>
                <ProductCard id={9} img="https://m.media-amazon.com/images/I/71ApKNioIoL._AC_UL320_.jpg" name="Men's Cotton Collared Neck Cardigan" category="Teen" price={20}/> */}
            </Slider>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
		Products: state.Products
    }
}

export default connect(mapStateToProps)(ProductSlider);
