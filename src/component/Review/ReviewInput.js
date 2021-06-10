import React, { useEffect, useState } from 'react'

import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { connect } from 'react-redux'
import './ReviewInput.scss'
import io from 'socket.io-client'

const socket = io('https://dtodo-indumentaria-server.herokuapp.com')
// import { useStateValue } from '../../Redux/StateProvider';


function ReviewInput(props) {

    // const[{SingleUser, Notification}, dispatch] = useStateValue()
    const SingleUser = JSON.parse(localStorage.getItem('SingleUser'))
    const [count, setcount] = useState(0)
    // console.log(localStorage)

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
        <div className="review_input">
            <Formik
                initialValues={{ fullname: "", message: "" }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(async() => {
                    var db_review = {
                        Message: values.message,
                        Username: SingleUser === null ? values.fullname : SingleUser[0].FirstName + ' ' + SingleUser[0].LastName,
                        User: SingleUser === null ? null : SingleUser[0],
                        Users_id: SingleUser === null ? null : SingleUser[0].Users_id
                    }
                    setcount(count+1)
                    socket.emit('toast', {
                        id: count,
                        name: SingleUser === null ? values.fullname : SingleUser[0].FirstName + ' ' + SingleUser[0].LastName,
                        message: values.message,
                        cat: 'Reviews'
                    })
                    var notify = {
                        FullName: SingleUser === null ? values.fullname : SingleUser[0].FirstName + ' ' + SingleUser[0].LastName,
                        Message: values.message,
                        Notify_cate: 'Reviews'
                    }
                    await axios.post('https://dtodo-indumentaria-server.herokuapp.com/notification/new', notify).then(res => props.insertNotification({...notify, Notification_id: res.data.Notification_id}))
                    await axios.post('https://dtodo-indumentaria-server.herokuapp.com/review/new', db_review).then(res => 
                        axios.get('https://dtodo-indumentaria-server.herokuapp.com/review/all').then(res1 => props.insertReviewAll(res1.data))
                    )
                    resetForm({ values: '' })
                    document.getElementsByName('message')[0].value = ''
                    if(document.getElementsByName('fullname').length !== 0) {
                        document.getElementsByName('fullname')[0].value = ''
                        document.getElementsByName('fullname')[0].focus()
                    }
                    setSubmitting(false);
                }, 500);
                }}

                validationSchema={Yup.object().shape({
                    fullname: SingleUser === null ? Yup.string().required("Required") : null,
                    message: Yup.string()
                        .required("Required")
                })}
            >
                {
                    props => { const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            {
                                SingleUser === null
                                ? <div>
                                    <div className="input-div one">
                                        <div className="div">
                                            <h5>Full Name</h5>
                                            <input type="text" className="input" name="fullname" values={values.fullname} onChange={handleChange} onBlur={handleBlur} />
                                        </div>
                                    </div>
                                    {errors.fullname && touched.fullname && (<div className="input-feedback">{errors.fullname}</div>)}
                                </div>
                                : <div>
                                    <div className="top_part">
                                        <div className="imag_dis">
                                            <img src={SingleUser[0]?.Image} alt="profile" className="profile_pic" />
                                        </div>
                                        <div className="details">
                                            <p className="name">{SingleUser[0].FirstName + ' ' + SingleUser[0].LastName}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="input-div one">
                                <div className="div">
                                    <h5>Message</h5>
                                    <input type="text" className="input" name="message" values={values.message} onChange={handleChange} onBlur={handleBlur} />
                                </div>
                            </div>
                            {errors.message && touched.message && (<div className="input-feedback">{errors.message}</div>)}

                            <input type="submit" className="btn" value="Submit" disabled={isSubmitting} />
                            
                        </form>
                    )
                    }
                }
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        SingleUser: state.SingleUser,
        reviews: state.reviews
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        insertNotification: (val) => { 
            dispatch({
                type: 'NOTIFICATION',
                item: val
            })
        },
        insertReviewAll: (val) => { 
            dispatch({
                type: 'REVIEWS',
                item: val
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewInput)
