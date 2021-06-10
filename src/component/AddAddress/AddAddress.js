import React from 'react'

import { Formik } from 'formik'
import * as Yup from "yup";

import './AddAddress.scss'

function AddAddress({ EditUser, addaddress }) {
    return (
        <div className="addAddress">
            <button className="address" onClick={addaddress}>Add Address</button>
            <div className="drop_contain">
                <Formik
                    initialValues={{ Address: "" }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(async () => {
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
                        // await axios.post('https://dtodo-indumentaria-server.herokuapp.com/product/new', db_val)
    
                        document.getElementsByName('Address')[0].focus()
                        resetForm({ values: '' })
                        
                        setSubmitting(false);
                    }, 500);
                    }}
    
                    validationSchema={Yup.object().shape({
                        // Title: Yup.string()
                        //     .required("Required"),
                        Address: Yup.string()
                            .required("Required"),
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
                                                <h5>Address</h5>
                                                <input type="text" className="input w-100" name="Address" value={values.Address} onChange={handleChange} onBlur={handleBlur} />
                                            </div>
                                        </div>
                                        {errors.Address && touched.Address && (<div className="input-feedback">{errors.Address}</div>)}
                                    </div>
                                </div>
                                
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

export default AddAddress
