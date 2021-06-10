import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import ProductCard from '../../component/ProductCard/ProductCard'
import TopBanner from '../../component/Top Banner/TopBanner'
import Page from "../../component/Paging/Paging";

import './Search.scss'
import categoryimg from '../../assets/banner-girls.png'
import { connect } from 'react-redux'
import axios from 'axios'

function Search(props) {
    var search = useParams()
    
    // const [productcard, setproductcard] = useState([]);
	const { Products, insertProductAll } = props;
    const [productcount, setProductCount] = useState(0)
    // console.log(search.searchitem.split(' '))

	useEffect(() => {
        axios.get('http://localhost:5000/product/all').then(res => {
            if(Products.length === 0) {
                insertProductAll(res.data)
                setProductCount(Products.length)
            } else {
                if(productcount !== Products.length) {
                    insertProductAll(res.data)
                    setProductCount(Products.length)
                }
            }
        })
		// var p = [];
		// Products?.map((product, i) =>
        //     p.push(
        //         <ProductCard
        //             id={product.Product_id} 
        //             index={i}
        //             key={i}
        //             img={JSON.parse(product.Image)[i] !== undefined ? `http://localhost:5000/${JSON.parse(product.Image)[i][0]}`: null} 
        //             name={product.Name} 
        //             category={product.Category.Name} 
        //             price={JSON.parse(product.Price)[i] !== undefined ? JSON.parse(product.Price)[i][0]: null}
        //             color={JSON.parse(product.Color)[i] !== undefined ? JSON.parse(product.Color)[i]: null}
        //             size={JSON.parse(product.Size)[i] !== undefined ? JSON.parse(product.Size)[i][0]: null}
        //         />
        //     )
		// );
		// setproductcard(p);
	}, [Products.length, insertProductAll, productcount]);

	const categ = () => {
		var p = [];
		Products.map((product, i) => 
			product.Name.toLowerCase().includes(search.searchitem.toLowerCase())
            ? p.push(
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
            : null
		)
        if(p.length === 0) {
            return <div>No Product Found</div>
        } else {
            return <Page todos={p} totalnumber={3} itemDisplay={15} />
        }
	};
    
    return (
        <div className="search_page">
            <TopBanner img={categoryimg} name={search.searchitem} />
            <div className="container-fluid search_display w-100">
                <div className="row w-100">
                    <div className="col one">
                        {categ()}
                        {/* <ProductCard /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
		Products: state.Products
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        insertProductAll: (val) => {
            dispatch({
                type: 'PRODUCTS',
                item: val
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
