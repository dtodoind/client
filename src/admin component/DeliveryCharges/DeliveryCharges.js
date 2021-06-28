import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { IoCloseCircle } from 'react-icons/io5'
import axios from 'axios'

import './DeliveryCharges.scss'

function DeliveryCharges(props) {

    const [zip, setZip] = useState("")
    const [charges, setCharges] = useState("")
    const [lop, setlop] = useState(true)
    const [ziperror, setZiperror] = useState()
    const [chargeserror, setChargeserror] = useState()
    const [insert, setInsert] = useState(true)
    const { Delivery, setdelivery } = props
    
    useEffect(() => {
        axios.get('http://localhost:5000/delivery/all').then(res => {
            if(Delivery.length !== 0) {
                if(Delivery[Delivery.length - 1].Delivery_id !== res.data[res.data.length - 1].Delivery_id) {
                    setdelivery(res.data)
                }
                setlop(true)
            } else {
                if(lop) {
                    setdelivery(res.data)
                    setlop(false)
                }
            }
        })
    }, [Delivery, lop, setdelivery])
    
    const region = (e) => {
        const re = /^[0-9\b]+$/;

        if (e.target.value === '' || re.test(e.target.value)) {
            if(e.target.name === "zip") {
                setZip(e.target.value)
                setZiperror("")
            }
            if(e.target.name === "charges") {
                setCharges(e.target.value)
                setChargeserror("")
            }
        }
    }

    const different_rec = async (e) => {
        if(e.key === "Enter") {
            if(e.target.name === "zip") {
                if(e.target.value !== ""){
                    if(e.target.value.length === 6) {
                        for(var i=0; i<Delivery.length; i++) {
                            if(Delivery[i].Region === parseInt(zip)) {
                                setInsert(false)
                                setZiperror("The Region is already inserted")
                                return
                            } else {
                                setInsert(true)
                            }
                        }
                        document.getElementsByName("charges")[0].focus()
                        setZiperror("")
                    } else {
                        setZiperror("Zip should be atleast 6 digits long")
                    }
                } else {
                    setZiperror("Required")
                }
            }
            if(e.target.name === "charges") {
                if(e.target.value !== "") {
                    setChargeserror("")
                    var val = {
                        Zip: zip,
                        Charges: charges
                    }
                    if(insert) {
                        await axios.post('http://localhost:5000/delivery/new', val)
                        await axios.get('http://localhost:5000/delivery/all').then(res => {
                            setdelivery(res.data)
                        })
                        setZip('')
                        setCharges('')
                        document.getElementsByName('zip')[0].focus()
                    }
                } else {
                    setChargeserror("Required")
                }
            }
        }
    }

    const remove_delivery = async (id) => {
        await axios.delete(`http://localhost:5000/delivery/delete/${id}`)
        await axios.get('http://localhost:5000/delivery/all').then(res => {
            if(Delivery.length !== 0) {
                if(Delivery.length !== res.data.length) {
                    setdelivery(res.data)
                }
            }
        })
    }

    return (
        <div className="deliverycharges">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Region ZIP code</th>
                        <th scope="col">Charges</th>
                        <th scope="col" className="text-center">Remove</th>
                    </tr>
                </thead>
                <tbody id="delivery_input">
                    {
                        Delivery?.map((d,i) => 
                            <tr key={i}>
                                <td>{d.Region}</td>
                                <td>{d.Charges}</td>
                                <td className="text-center"><IoCloseCircle fontSize="20" style={{cursor: 'pointer'}} onClick={() => remove_delivery(d.Delivery_id)} /></td>
                            </tr>
                        )
                    }
                    <tr>
                        <td>
                            <input type="text" value={zip} name="zip" onChange={region} onKeyUp={different_rec} maxLength="6" />
                            <p style={{margin: '0', color: 'red'}}>{ziperror}</p>
                        </td>
                        <td>
                            <input type="text" value={charges} name="charges" onChange={region} onKeyUp={different_rec} />
                            <p style={{margin: '0', color: 'red'}}>{chargeserror}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Delivery: state.Delivery
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setdelivery: (val) => { 
            dispatch({
                type: 'DELIVERY',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeliveryCharges)
