import React, { useState } from 'react'

import { Formik } from 'formik'
import * as Yup from "yup";

import './AddAddress.scss'
import { connect } from 'react-redux';

function AddAddress({ EditUser, addaddress, ...props }) {

	const [ziperror, setZiperror] = useState("");
    
    const { Delivery } = props
    
    return (
        <div className="addAddress">
            <button className="address" onClick={addaddress}>NUEVA DIRECCIÓN</button>
            <div className="drop_contain">
                <Formik
                    initialValues={{ Address: "", zip: "" }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(async () => {
                        if(ziperror === "") {
                            EditUser(values)
                            // var db_val = {
                            //     Name: values.ProductName,
                            //     Description: values.des,
                            //     Category_id: parseInt(values.cate),
                            //     Image: JSON.stringify([]),
                            //     Color: JSON.stringify([]),
                            //     Size: JSON.stringify([]),
                            //     Stock: JSON.stringify([]),
                            //     Price: JSON.stringify([])
                            // }
                            // await axios.post('http://localhost:5000/product/new', db_val)
        
                            document.getElementsByName('Address')[0].focus()
                            resetForm({ values: '' })
                        }
                        
                        setSubmitting(false);
                    }, 500);
                    }}
    
                    validationSchema={Yup.object().shape({
                        // Title: Yup.string()
                        //     .required("Required"),
                        Address: Yup.string()
                            .required("Required"),
                        zip: Yup.string()
                            .required("Required")
                            .matches(/(?=.*[0-9])/, "Zip must contain a number."),
                    })}
                >
                    {
                        props => { const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;
                        return (
                            
                            <form onSubmit={handleSubmit} style={{width: '100%'}}>
                                {/* <div className="row">
                                    <div className="col">
                                        <div className="input-div one">
                                            <div className="div">
                                                <h5>Title</h5>
                                                <input type="text" className="input" name="Title" value={values.Title} onChange={handleChange} onBlur={handleBlur} />
                                            </div>
                                        </div>
                                        {errors.Title && touched.Title && (<div className="input-feedback">{errors.Title}</div>)}
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="col">
                                        <div className="input-div one">
                                            <div className="div">
                                                <h5>Dirección</h5>
                                                <input type="text" className="input w-100" name="Address" value={values.Address} onChange={handleChange} onBlur={handleBlur} />
                                            </div>
                                        </div>
                                        {errors.Address && touched.Address && (<div className="input-feedback">{errors.Address}</div>)}
                                    </div>
                                </div>
                                <div className="input-div one">
                                    <div className="div">
                                        <h5>Código postal</h5>
                                        <input
                                            type="text"
                                            className="input"
                                            name="zip"
                                            maxLength="4"
                                            value={values.zip}
                                            onChange={(e) => {
                                                handleChange(e)
                                                if(e.target.value.length === 4) {
                                                    for(var i=0; i<Delivery.length; i++) {
                                                        if(Delivery[i].Region === parseInt(e.target.value)) {
                                                            setZiperror("")
                                                            return
                                                        } else {
                                                            setZiperror("We are not Delivering in this Region")
                                                        }
                                                    }
                                                } else {
                                                    setZiperror("altleast 4 digit")
                                                }
                                            }}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </div>
                                {ziperror === "" ? null : (
                                    <div className="input-feedback">{ziperror}</div>
                                )}
                                {errors.zip && touched.zip && (
                                    <div className="input-feedback">{errors.zip}</div>
                                )}
                                
                                <div className="text-right">
                                    <input type="submit" className="btn_address" value="Submit" disabled={isSubmitting} />
                                </div>
                            </form>
                        )
                        }
                    }
                </Formik>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Delivery: state.Delivery
    }
}

export default connect(mapStateToProps)(AddAddress)
