import React, {useEffect, useState, useCallback } from 'react'

import ProductTable from '../../admin component/ProductTable/ProductTable'
import AddProduct from '../../admin component/AddProduct/AddProduct'
import axios from 'axios'

import './Product.scss'

import { ImFolderOpen } from 'react-icons/im';
import { connect } from 'react-redux'

function Product(props) {

    const [addshow, setAddShow] = useState(true)
    const { Products, allproduct } = props
    const [lop, setlop] = useState(true)

    const inspro = useCallback(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/product/all').then(res => allproduct(res.data))
        // return Products
    }, [allproduct])
    
    useEffect(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/product/all').then(res => {
            if(Products.length !== 0) {
                if(Products[Products.length - 1].Product_id !== res.data[res.data.length - 1].Product_id) {
                    allproduct(res.data)
                } 
                // else {
                //     if(u !== undefined) {
                //         allproduct(res.data)
                //     }
                // }
                setlop(true)
            } else {
                if(lop) {
                    allproduct(res.data)
                    setlop(false)
                }
            }
        })
    }, [Products, allproduct, lop])

    function addproduct() {
        if(addshow) {
            document.getElementsByClassName('contain')[0].style.maxHeight = '5000px';
            document.getElementsByClassName('contain')[0].style.border = '1px solid rgba(0, 0, 0, 0.1)';
            document.getElementsByClassName('contain')[0].style.padding = '20px 15px';
            document.getElementsByClassName('contain')[0].style.transition = "max-height 0.3s ease-in"
            setAddShow(false)
        } else {
            document.getElementsByClassName('contain')[0].style.maxHeight = '0';
            document.getElementsByClassName('contain')[0].style.border = '0px solid rgba(0, 0, 0, 0.1)';
            document.getElementsByClassName('contain')[0].style.padding = '0px 15px';
            document.getElementsByClassName('contain')[0].style.transition = "max-height 0.3s ease-out"
            setAddShow(true)
        }
    }

    return (
        <div className="product">
            <div className="tag">
                <div className="dash_icon">
                    <ImFolderOpen />
                </div>
                <p style={{fontSize: '18px', margin: '0', fontWeight: '400'}}>Product</p>
            </div>

            <div className="product_det">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="add_product">
                                <button className="butt" onClick={() => addproduct()}>Add Product</button>
                                <AddProduct inspro={inspro} />
                            </div>
                        </div>
                        <div className="col-lg-12 p-0">
                            <div className="container-fluid px-0">
                                <ProductTable inspro={inspro} />
                            </div>
                        </div>
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
        allproduct: (val) => { 
            dispatch({
                type: 'PRODUCTS',
                item: val
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
