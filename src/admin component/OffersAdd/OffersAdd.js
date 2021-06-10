
import React, { useEffect, useState } from 'react'

import './OffersAdd.scss'
import { connect } from 'react-redux'
import axios from 'axios'

function OffersAdd(props) {

    const { Offer, offer } = props
    const [Img, setimg] = useState('')
    const [dis, setdis] = useState('')
    const [pri, setpri] = useState('')
    const [des, setdes] = useState('')
    const [error,] = useState("File size should be less than 1 MB")

    useEffect(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/offer/all').then(res => offer(res.data))
    }, [offer])

    const changeoffer = async (e) => {
        if(e.target.name === 'discount') {
            setdis(e.target.value)
        } else if(e.target.name === 'short_des') {
            setdes(e.target.value)
        } else if(e.target.name === 'price') {
            setpri(e.target.value)
        } else if(e.target.name === 'file_img') {
            if(document.getElementsByName('file_img')[0].files.length !== 0) {
                var size= bytesToSize(document.getElementsByName('file_img')[0].files[0].size)
                if(size[1] === "MB") {
                    if(size[0] <= 1.00) {
                        insertOffer(document.getElementsByName('file_img')[0].files[0])
                        document.getElementById("error2").style.display = "none"
                    } else {
                        document.getElementById("error2").style.display = "inherit"
                    }
                } else if(size[1] === "KB") {
                    if(size[0] <= 1024.00) {
                        insertOffer(document.getElementsByName('file_img')[0].files[0])
                        document.getElementById("error2").style.display = "none"
                    } else {
                        document.getElementById("error2").style.display = "inherit"
                    }
                } else {
                    document.getElementById("error2").style.display = "inherit"
                }
            }
        }
    }

    function bytesToSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]];
    }

    const insertOffer = (val) => {
        setimg(val)
        var reader = new FileReader();
        reader.onload = function () {
            document.getElementsByClassName('vl')[0].src = this.result;
        };
        
        if(val) {
            reader.readAsDataURL(val);
        }
    }

    const saveoffer = async () => {
        var formdata = new FormData()
        formdata.append('Image', Img)
        formdata.append('Offer_Image', Img !== '' ? Img.name : Offer[0].Offer_Image)
        formdata.append('Discount', dis !== '' ? dis : Offer[0].Discount)
        formdata.append('Price', pri !== '' ? pri : Offer[0].Price)
        formdata.append('Description', des !== '' ? des : Offer[0].Description)
        if(Offer.length === 0) {
            axios.post('https://dtodo-indumentaria-server.herokuapp.com/offer/new', formdata)
        } else {
            await axios.put('https://dtodo-indumentaria-server.herokuapp.com/offer/edit/1', formdata)
        }
    }

    const displayimg = (val) => {
        if(val !== undefined) {
            var reader = new FileReader();
            reader.onload = function () {
                document.getElementsByClassName('vl')[0].src = this.result;
            };
            reader.readAsDataURL(val);
        }
    }

    return (
        <div className="offersadd">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <input type="file" name="file_img" onChange={changeoffer} />
                        <div id="error2" style={{color: 'red', fontWeight: '500', display: 'none'}}>{error}</div>
                        <div className="w-100 py-2">
                            {
                                Img === ''
                                ? Offer.length !== 0
                                    ? <img src={'https://dtodo-indumentaria-server.herokuapp.com/'+Offer[0].Offer_Image} alt="" className="vl w-100" />
                                    : null
                                : <img src={displayimg(Img)} alt="" className="vl w-100" />
                            }
                        </div>
                    </div>
                    <div className="col-sm-6" style={{position: 'relative'}}>
                        <input type="text" placeholder="Discount in Per(%)" name="discount" defaultValue={Offer.length !== 0 ? Offer[0].Discount : null} onChange={changeoffer} />
                        <p style={{color: 'rgba(0,0,0,0.3)'}}>Example: 10</p>
                        <input type="text" placeholder="Offer Applicable" name="price" defaultValue={Offer.length !== 0 ? Offer[0].Price : null} onChange={changeoffer} />
                        <p style={{color: 'rgba(0,0,0,0.3)'}}>Example: 200</p>
                        <input type="text" placeholder="Short Description" name="short_des" defaultValue={Offer.length !== 0 ? Offer[0].Description : null} onChange={changeoffer} /><br/>
                        <button className="btn-offers" onClick={saveoffer}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Offer: state.Offer
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        offer: (val) => { 
            dispatch({
                type: 'OFFERS',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OffersAdd)