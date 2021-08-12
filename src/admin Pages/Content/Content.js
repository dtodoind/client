import React, { useEffect, useState } from 'react'

import { MdContentPaste } from 'react-icons/md'
import { IoCloseCircle } from 'react-icons/io5'
import ServicesAdd from '../../admin component/ServicesAdd/ServicesAdd'
import OffersAdd from '../../admin component/OffersAdd/OffersAdd'
import TopImg from '../../admin component/TopImg/TopImg'
import CategoryAdd from '../../admin component/CategoryAdd/CategoryAdd'
import DeliveryCharges from '../../admin component/DeliveryCharges/DeliveryCharges'
import { connect } from 'react-redux'

import './Content.scss'
import axios from 'axios'

function Content(props) {

    const { Aboutus, aboutus, heroimg, Hero_img } = props
    const [about, setabout] = useState(Aboutus)
    const [len, setlen] = useState()
    const [aboutid, setAboutid] = useState()
    const [error,] = useState("File size should be less than 2 MB")
    const [lop, setlop] = useState(true)
    const [lop2, setlop2] = useState(true)
 
    useEffect(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/aboutus/all').then(async res => {
            if(res.data.length === 0) {
                setlen(0)
                setlop(false)
            }
            if(Aboutus !== null) {
                if(Aboutus.length !== res.data[0].Content.length) {
                    aboutus(res.data[0].Content)
                }
                setlop(true)
            } else {
                if(lop) {
                    if(res.data.length === 0) {
                        // await axios.post('https://dtodo-indumentaria-server.herokuapp.com/aboutus/new', {Content: ''}).then(result => {
                        //     console.log(result.data)
                        //     aboutus(result.data)
                        //     setAboutid(result.data[0])
                        // })
                    } else {
                        aboutus(res.data[0].Content)
                        setAboutid(res.data[0])
                    }
                    setlop(false)
                }
            }
        })
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/heroimages/all').then(res => {
            if(Hero_img.length === 0) {
                if(lop2) {
                    heroimg(res.data)
                    setlop2(false)
                }
            } else {
                setlop2(true)
            }
        })
    }, [Aboutus, aboutus, heroimg, Hero_img, lop, lop2])

    function bytesToSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]];
    }

    async function insertImage(val) {
        var formdata = new FormData()
        formdata.append('heroImage', val)
        // formdata.append('Image', val.name)
        await axios.post('https://dtodo-indumentaria-server.herokuapp.com/heroimages/new',formdata)
        await axios.get('https://dtodo-indumentaria-server.herokuapp.com/heroimages/all').then(res => heroimg(res.data))
        // var h = Hero_img
        // if(h === '') {
        //     h = []
        // }
        // h.push(val)
        // heroimg(h)
    }

    const uploadfile = (e) => {
        if(e.target.value !== '') {
            if(Hero_img.length !== 3) {
                var size= bytesToSize(document.getElementsByName(e.target.name)[0].files[0].size)
                if(size[1] === "MB") {
                    if(size[0] <= 2.00) {
                        insertImage(document.getElementsByName(e.target.name)[0].files[0])
                        document.getElementById("error").style.display = "none"
                    } else {
                        document.getElementById("error").style.display = "inherit"
                    }
                } else if(size[1] === "KB") {
                    if(size[0] <= 1024.00) {
                        insertImage(document.getElementsByName(e.target.name)[0].files[0])
                        document.getElementById("error").style.display = "none"
                    } else {
                        document.getElementById("error").style.display = "inherit"
                    }
                } else {
                    document.getElementById("error").style.display = "inherit"
                }
            } else {
                alert('You can only select three images')
            }
        }
    }

    const remove_hero = async (i) => {
        var keyimg = Hero_img[i].Image.split('/').pop()
        await axios.delete(`https://dtodo-indumentaria-server.herokuapp.com/heroimages/delete/${Hero_img[i].HeroImages_id}/${keyimg}`)
        await axios.get('https://dtodo-indumentaria-server.herokuapp.com/heroimages/all').then(res => heroimg(res.data))
    }

    const change_about = (e) => {
        setabout(e.target.value)
    }
    
    const save_about = async () => {
        if(len === 0) {
            await axios.post('https://dtodo-indumentaria-server.herokuapp.com/aboutus/new', {Content: about}).then(res => {
                setAboutid(res.data)
                setlen(1)
            })
        } else {
            await axios.put(`https://dtodo-indumentaria-server.herokuapp.com/aboutus/edit/${aboutid.Aboutus_id}`, {Content: about})
        }
        aboutus(about)
    }

    return (
        <div className="content">
            <div className="tag">
                <div className="dash_icon">
                    <MdContentPaste />
                </div>
                <p style={{fontSize: '18px', margin: '0', fontWeight: '400'}}>Content</p>
            </div>

            <div className="content_content">
                {/* <div className="company_name">
                    <h2>Company Name</h2>
                    <input type="text" />
                    <button className="button">Save</button>
                </div> */}
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Hero Images
                                </button>
                            </h5>
                        </div>

                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="hero_images">
                                    <input type="file" name="hero_upload" onChange={uploadfile} />
                                    <div id="error" style={{color: 'red', fontWeight: '500', display: 'none'}}>{error}</div>
                                    <div className="container-fluid mt-2 overflow-hidden">
                                        <div className="row border rounded">
                                            {
                                                Hero_img.length === 0
                                                ? null
                                                : Hero_img.map((h,i) => 
                                                    <div className="col-md-4 border-right" key={i}>
                                                        <IoCloseCircle className="close_btn" onClick={() => remove_hero(i)} />
                                                        <div className="hero_img_outter">
                                                            <img src={h.Image !== null ? h.Image : null} alt="" id={'img'+i} className="hero_img" />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <p><b>*Note:</b> Maximum images you can display is Three Images.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Services
                                </button>
                            </h5>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <ServicesAdd />
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Offers
                                </button>
                            </h5>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div className="card-body">
                              <OffersAdd /> 
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingFour">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Top Images
                                </button>
                            </h5>
                        </div>
                        <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                            <div className="card-body">
                                <TopImg />  
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingFive">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Category
                                </button>
                            </h5>
                        </div>
                        <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                            <div className="card-body">
                                <CategoryAdd />
                            </div>
                        </div>
                    </div>
                     <div className="card">
                        <div className="card-header" id="headingSix">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                    About us
                                </button>
                            </h5>
                        </div>
                        <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <textarea placeholder="Enter About Us Content" id="aboutus" defaultValue={Aboutus} onChange={change_about} className="w-100" style={{height: '200px'}} />
                                        </div>
                                        <div className="col-12 text-right">
                                            <button className="btn-about" onClick={save_about}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingFive">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseFive">
                                    Delivery Charges
                                </button>
                            </h5>
                        </div>
                        <div id="collapseSeven" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                            <div className="card-body">
                                <DeliveryCharges />
                            </div>
                        </div>
                    </div>
                    {/* <div className="card">
                        <div className="card-header" id="headingSeven">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                    Colors
                                </button>
                            </h5>
                        </div>
                        <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                            <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Hero_img: state.Hero_img,
        Aboutus: state.Aboutus
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        heroimg: (val) => { 
            dispatch({
                type: 'HEROIMG',
                item: val
            })
        },
        aboutus: (val) => {
            dispatch({
                type: 'ABOUTUS',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)