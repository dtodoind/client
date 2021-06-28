import React, { useEffect, useState } from 'react'

import { GiTruck, GiAchievement, GiCardboardBox, GiClothes } from 'react-icons/gi'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { IoCloseCircle } from 'react-icons/io5'
import { BiSupport, BiCreditCard, BiHomeAlt } from 'react-icons/bi'
import { connect } from 'react-redux'

import './ServicesAdd.scss'
import axios from 'axios'

function ServicesAdd(props) {

    const { Services, services } = props
    const [icon, seticon] = useState()
    const [title, settitle] = useState('[Sample Title]')
    const [description, setdescription] = useState('[Sample Description]')
    const [lop, setlop] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:5000/service/all').then(res => {
            if(Services.length !== 0) {
                if(Services[Services.length - 1].Service_id !== res.data[res.data.length - 1].Service_id) {
                    services(res.data)
                }
                setlop(true)
            } else {
                if(lop) {
                    services(res.data)
                    setlop(false)
                }
            }
        })
    }, [Services, services, lop])

    function changeicon(e) {
        seticon(e.target.value)
    }

    const iconset = (icon1) => {
        if(document.getElementsByClassName('iconerror')[0]) {
            if(icon1 === '') {
                document.getElementsByClassName('iconerror')[0].style.display = 'block'
            } else if(icon1 === 'Support') {
                document.getElementsByClassName('iconerror')[0].style.display = 'none'
                return(<BiSupport fontSize="50px" color="white" />)
            } else if(icon1 === 'Truck') {
                document.getElementsByClassName('iconerror')[0].style.display = 'none'
                return(<GiTruck fontSize="50px" color="white" />)
            } else if(icon1 === 'Achievement') {
                document.getElementsByClassName('iconerror')[0].style.display = 'none'
                return(<GiAchievement fontSize="50px" color="white" />)
            } else if(icon1 === 'CreditCard') {
                document.getElementsByClassName('iconerror')[0].style.display = 'none'
                return(<BiCreditCard fontSize="50px" color="white" />)
            } else if(icon1 === 'HomeAlt') {
                document.getElementsByClassName('iconerror')[0].style.display = 'none'
                return(<BiHomeAlt fontSize="50px" color="white" />)
            } else if(icon1 === 'CardboardBox') {
                document.getElementsByClassName('iconerror')[0].style.display = 'none'
                return(<GiCardboardBox fontSize="50px" color="white" />)
            } else if(icon1 === 'Clothes') {
                document.getElementsByClassName('iconerror')[0].style.display = 'none'
                return(<GiClothes fontSize="50px" color="white" />)
            } else if(icon1 === 'FillSafetyCertificate') {
                document.getElementsByClassName('iconerror')[0].style.display = 'none'
                return(<AiFillSafetyCertificate fontSize="50px" color="white" />)
            }
        }
    }

    function textchange(e) {
        if(e.target.name === 'title') {
            if(e.target.value === '') {
                settitle('[Sample Title]')
                document.getElementsByClassName('titleerror')[0].style.display = 'block'
            } else {
                document.getElementsByClassName('titleerror')[0].style.display = 'none'
                settitle(e.target.value.toUpperCase())
            }
        }
        if(e.target.name === 'desc') {
            if(e.target.value === '') {
                setdescription('[Sample Description]')
                document.getElementsByClassName('descerror')[0].style.display = 'block'
            } else {
                document.getElementsByClassName('descerror')[0].style.display = 'none'
                setdescription(e.target.value.toUpperCase())
            }
        }
    }

    async function save_service() {
        if(icon !== '' && title !== '[Sample Title]' && description !== '[Sample Description]') {
            var s = {}
            s.icons = icon
            s.title = title
            s.desc = description
            // var se = Services
            // se.push(s)
            // props.services(Services)
            await axios.post('http://localhost:5000/service/new', s)
            await axios.get('http://localhost:5000/service/all').then(res => services(res.data))
            seticon('')
            document.getElementsByClassName('selectpicker')[0].selectedIndex = "0"
            document.getElementsByName('title')[0].value = ''
            document.getElementsByName('desc')[0].value = ''
            settitle('[Sample Title]')
            setdescription('[Sample Description]')
        }
    }

    async function remove_service(i) {
        // var serv = Services
        // serv.splice(i, 1)
        // props.services(Services)
        await axios.delete(`http://localhost:5000/service/delete/${i}`)
        await axios.get('http://localhost:5000/service/all').then(res => services(res.data))
    }

    return (
        <div className="service_add">
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="container-fluid">
                            <div className="row">
                                    {
                                        Services.length === 0
                                        ? <div className="w-100 text-center" style={{backgroundColor: 'rgba(0,0,0,0.05)'}}>No Service</div>
                                        : Services?.map((s,i) => 
                                            <div className="col-sm-4" key={i}>
                                                <div className="service_img_outter my-3">
                                                    <IoCloseCircle className="close_btn" onClick={() => remove_service(s.Service_id)} />
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
                                            </div>
                                        )
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p>
                <button className="btn_service btn-primary" data-toggle="collapse" href="#addservice" aria-expanded="false" aria-controls="addservice">
                    Add Services
                </button>
            </p>
            <div className="collapse" id="addservice">
                <div className="card card-body">
                    <div className="service_images">
                        
                        {/* <input type="file" /> */}
                        <div className="service_img_outter my-3">
                            <div className="service_img_outter my-3">
                                <div className="change-color">
                                    <div className="service-icon">
                                        <div className="outer_box delivery-color">
                                            <div className="inner_box_select">
                                                {iconset(icon)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-content">
                                        <p className="tit-text">{title}</p>
                                        <p className="des-text">{description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col-sm-6 p-0">

                                    <select title="Select your surfboard" style={{width: '100%'}} className="selectpicker" onChange={changeicon}>
                                        <option value="">Select...</option>
                                        <option value="Support">BiSupport</option>
                                        <option value="CreditCard">BiCreditCard</option>
                                        <option value="HomeAlt">BiHomeAlt</option>
                                        <option value="Truck">GiTruck</option>
                                        <option value="Achievement">GiAchievement</option>
                                        <option value="CardboardBox">GiCardboardBox</option>
                                        <option value="Clothes">GiClothes</option>
                                        <option value="FillSafetyCertificate">AiFillSafetyCertificate</option>
                                    </select>
                                    <div className="iconerror" style={{color: 'red', display: 'none'}}>Required</div>

                                    <div className="my-3">
                                        <input type="text" name='title' style={{width: '100%'}} placeholder="Add Title" onChange={textchange} />
                                        <div className="titleerror" style={{color: 'red', display: 'none'}}>Required</div>
                                    </div>
                                    <div>
                                        <input type="text" name='desc' style={{width: '100%'}} placeholder="Add Short Description" onChange={textchange} />
                                        <div className="descerror" style={{color: 'red', display: 'none'}}>Required</div>
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 d-flex justify-content-end align-items-end">
                                    <button className="button_ser" onClick={save_service}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <p><b>*Note:</b> Maximum services you can add is Three Services.</p> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ServicesAdd)
