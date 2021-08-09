import React, { useEffect } from 'react'

// import { Formik } from "formik";
// import * as Yup from "yup";

import './Billing.scss'
import { connect } from 'react-redux'

function Billing(props) {

    const SingleUser = JSON.parse(localStorage.getItem('SingleUser'))
    
    useEffect(() => {
        const inputs = document.querySelectorAll(".input");
    
        function addcl(){
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }
    
        function remcl(){
            let parent = this.parentNode.parentNode;
            if(this.value === ""){
                parent.classList.remove("focus");
            }
        }
    
        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });
        
    }, [])

    return (
        <div className="billing">
            <div className="main_title">Detalles de Factura</div>

            {
                SingleUser !== null
                ? SingleUser[0].Address !== null
                    ? <div className="form-check">
                        <label className="form-check-label" style={{width: "100%"}}>
                            <input type="radio" style={{marginLeft: '-25px'}} value="1" className="form-check-input" name="address" onChange={props.address} />
                            Retirar en la sucursal
                        </label>
                    </div>
                    : null
                : null
            }

            {
                SingleUser !== null
                ? <div className='container-fluid direction'>
                    <div className="row">
                        {
                            JSON.parse(SingleUser[0].Address)?.map((alladd, i) => 
                                <div className="col-sm-4 p-1" key={i}>
                                    <div className="form-check">
                                        <label className="form-check-label" style={{width: "100%"}}>
                                            <input type="radio" style={{marginLeft: '-25px', marginTop: '15px'}} value={i+2} className="form-check-input" name="address" onChange={props.address} />
                                            {
                                                alladd.map((a, j) => 
                                                    <p key={j} style={{margin: '0'}}>
                                                        {a}<br />
                                                    </p>
                                                )
                                            }
                                            Phone No: {JSON.parse(SingleUser[0].Phoneno)[i]}
                                        </label>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {/* <input type="submit" className="btn-adress" value="Ship to the adress"/> */}
                </div>
                : null
            }
            
            <div className="form-check">
                <label className="form-check-label" style={{width: "100%"}}>
                    <input type="radio" style={{marginLeft: '-25px'}} value="payment" className="form-check-input" name="address" onChange={props.address} defaultChecked />
                    Nueva Dirección
                    {/* <Formik
                        initialValues={{ fname: "", lname: "", street: "", town: "", zip: "", phone: "", email: "" }}
                        onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            localStorage.setItem('Billing', JSON.stringify(values))
                            setSubmitting(false);
                        }, 500);
                        }}

                        validationSchema={Yup.object().shape({
                            fname: Yup.string()
                                .required("Required"),
                            lname: Yup.string()
                                .required("Required"),
                            street: Yup.string()
                                .required("Required"),
                            town: Yup.string()
                                .required("Required"),
                            zip: Yup.string()
                                .required("Required")
                                .max(6, 'Enter only Six digit')
                                .min(6, 'Enter Six Digit')
                                .matches(/[0-9]/, 'Enter only number'),
                            phone: Yup.string()
                                .max(10, "Enter only 10 digits")
                                .min(10, "Minimum 10 digit")
                                .matches(/[0-9]/, 'Enter only number')
                                .required("Required"),
                            email: Yup.string()
                                .email()
                                .required("Required"),
                        })}
                    >
                        {
                            props => { const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="continer-fluid py-3">
                                        <div className="row">
                                            <div className="col-md">
                                                <div className="input-div one">
                                                    <div className="div">
                                                        <h5>First Name</h5>
                                                        <input type="text" className="input" name="fname" values={values.fname} onChange={handleChange} onBlur={handleBlur} />
                                                    </div>
                                                </div>
                                                {errors.fname && touched.fname && (<div className="input-feedback">{errors.fname}</div>)}
                                            </div>
                                            <div className="col-md">
                                                <div className="input-div one">
                                                    <div className="div">
                                                        <h5>Last Name</h5>
                                                        <input type="text" className="input" name="lname" values={values.lname} onChange={handleChange} onBlur={handleBlur} />
                                                    </div>
                                                </div>
                                                {errors.lname && touched.lname && (<div className="input-feedback">{errors.lname}</div>)}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md">
                                                <div className="input-div one">
                                                    <div className="div">
                                                        <h5>Street Address</h5>
                                                        <input type="text" className="input" name="street" values={values.street} onChange={handleChange} onBlur={handleBlur} />
                                                    </div>
                                                </div>
                                                {errors.street && touched.street && (<div className="input-feedback">{errors.street}</div>)}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md">
                                                <div className="input-div one">
                                                    <div className="div">
                                                        <h5>Town</h5>
                                                        <input type="text" className="input" name="town" values={values.town} onChange={handleChange} onBlur={handleBlur} />
                                                    </div>
                                                </div>
                                                {errors.town && touched.town && (<div className="input-feedback">{errors.town}</div>)}
                                            </div>
                                            <div className="col-md">
                                                <div className="input-div one">
                                                    <div className="div">
                                                        <h5>PostCode / ZIP</h5>
                                                        <input type="text" className="input" name="zip" values={values.zip} onChange={handleChange} onBlur={handleBlur} />
                                                    </div>
                                                </div>
                                                {errors.zip && touched.zip && (<div className="input-feedback">{errors.zip}</div>)}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md">
                                                <div className="input-div one">
                                                    <div className="div">
                                                        <h5>Phone Number</h5>
                                                        <input type="text" className="input" name="phone" values={values.phone} onChange={handleChange} onBlur={handleBlur} />
                                                    </div>
                                                </div>
                                                {errors.phone && touched.phone && (<div className="input-feedback">{errors.phone}</div>)}
                                            </div>
                                            <div className="col-md">
                                                <div className="input-div one">
                                                    <div className="div">
                                                        <h5>Email Address</h5>
                                                        <input type="text" className="input" name="email" values={values.email} onChange={handleChange} onBlur={handleBlur} />
                                                    </div>
                                                </div>
                                                {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}
                                            </div>
                                        </div>
                                    </div>

                                    <input type="submit" className="btn" value="Save" disabled={isSubmitting} />
                                    
                                </form>
                            )
                            }
                        }
                    </Formik> */}

                </label>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        SingleUser: state.SingleUser
    }
}

export default connect(mapStateToProps)(Billing)
