import React, { useEffect, useState } from 'react'

import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

import './AddProduct.scss'
// import { useStateValue } from '../../Redux/StateProvider';

function AddProduct({inspro}) {

    // const [,dispatch] = useStateValue()
    const [cate, setcate] = useState()

    useEffect(() => {
        
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/category/all').then(res => setcate(res.data))

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
        
    }, [inspro])

    return (
        <div className="container-fluid contain">
            <Formik
                initialValues={{ ProductName: "", cate: "", des: "" }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(async () => {

                    var db_val = {
                        Name: values.ProductName,
                        Description: values.des,
                        Category_id: parseInt(values.cate),
                        Image: JSON.stringify([]),
                        Color: JSON.stringify([]),
                        Size: JSON.stringify([]),
                        Stock: JSON.stringify([]),
                        Price: JSON.stringify([])
                    }
                    await axios.post('https://dtodo-indumentaria-server.herokuapp.com/product/new', db_val)
                    
                    inspro()

                    document.getElementsByName('ProductName')[0].focus()
                    resetForm({ values: '' })
                    
                    setSubmitting(false);
                }, 500);
                }}

                validationSchema={Yup.object().shape({
                    ProductName: Yup.string()
                        .required("Required"),
                    cate: Yup.string()
                        .required("Required"),
                    des: Yup.string()
                        .required("Required"),
                })}
            >
                {
                    props => { const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;
                    return (
                        
                        <form onSubmit={handleSubmit} style={{width: '100%'}}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="input-div one">
                                        <div className="div">
                                            <h5>Product Name</h5>
                                            <input type="text" className="input" name="ProductName" value={values.ProductName} onChange={handleChange} onBlur={handleBlur} />
                                        </div>
                                    </div>
                                    {errors.ProductName && touched.ProductName && (<div className="input-feedback">{errors.ProductName}</div>)}
                                </div>
                                <div className="col-lg-6">
                                    <div className="one">
                                        <h5>Category</h5>
                                        <div className="div">
                                            <div className="form-group">
                                                <select className="form-control" name="cate" value={values.cate} onChange={handleChange} onBlur={handleBlur}>
                                                    <option value="" defaultValue>Select</option>
                                                    {
                                                        cate?.map((c,i) =>
                                                            <option key={i} value={c.Category_id}>{c.Name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.cate && touched.cate && (<div className="input-feedback">{errors.cate}</div>)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="input-div one">
                                        <div className="div">
                                            <h5>Description</h5>
                                            <input type="text" className="input" name="des" value={values.des} onChange={handleChange} onBlur={handleBlur} />
                                        </div>
                                    </div>
                                    {errors.des && touched.des && (<div className="input-feedback">{errors.des}</div>)}
                                </div>
                            </div>
                            
                            <input type="submit" className="btn" value="Submit" disabled={isSubmitting} />
                        </form>
                    )
                    }
                }
            </Formik>
        </div>
    )
}

export default AddProduct
