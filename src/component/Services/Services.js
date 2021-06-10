import React, { useEffect } from 'react'

import './Services.scss'
import { GiTruck, GiAchievement, GiCardboardBox, GiClothes } from 'react-icons/gi'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { BiSupport, BiCreditCard, BiHomeAlt } from 'react-icons/bi'
import { connect } from 'react-redux'
import axios from 'axios'

function Services(props) {

    const { Services, services } = props

    useEffect(() => {
        axios.get('http://localhost:5000/service/all').then(res => services(res.data))
    }, [services])

    return (
        <div className="services">
            <div className="container">
                <div className="row">
                    {
                        Services?.map((s,i) => 
                            <div className="col-sm" key={i}>
                                <div className="change-color">
                                    <div className="service-icon">
                                        <div className="outer_box delivery-color">
                                            <div className="inner_box">
                                                {
                                                    s.Select === 'Support'
                                                    ? <BiSupport fontSize="50px" color="white" />
                                                    : s.Select === 'Truck'
                                                    ? <GiTruck fontSize="50px" color="white" />
                                                    : s.Select === 'Achievement'
                                                    ? <GiAchievement fontSize="50px" color="white" />
                                                    :s.Select === 'CreditCard'
                                                    ? <BiCreditCard fontSize="50px" color="white" />
                                                    :s.Select === 'HomeAlt'
                                                    ? <BiHomeAlt fontSize="50px" color="white" />
                                                    :s.Select === 'CardboardBox'
                                                    ? <GiCardboardBox fontSize="50px" color="white" />
                                                    :s.Select === 'Clothes'
                                                    ? <GiClothes fontSize="50px" color="white" />
                                                    :s.Select === 'FillSafetyCertificate'
                                                    ? <AiFillSafetyCertificate fontSize="50px" color="white" />
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-content">
                                        <p className="tit-text">{s.Title}</p>
                                        <p className="des-text">{s.Description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Services: state.Services
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        services: (val) => { 
            dispatch({
                type:'SERVICES',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)
