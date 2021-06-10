import React from 'react'

import TopBanner from '../../component/Top Banner/TopBanner'
import CartTable from '../../component/Cart/CartTable'
import CartTotal from '../../component/Cart/CartTotal'

import './Shopcart.scss'
import categoryimg from '../../assets/banner-girls.png'

function Shopcart() {
    return (
        <div className="shopcart">
            <TopBanner img={categoryimg} name="ShopCart" />
            <div className="container-fluid py-0 my-4">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="container">
                            <CartTable />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="container px-0">
                            <CartTotal />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shopcart
